"use server";

import { google } from "googleapis";
import { startOfDay, endOfDay, isSameDay } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

export async function getBookedDates(
  startDate: Date,
  endDate: Date,
  timezone: string
) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    // Group booked slots by date IN THE USER'S TIMEZONE
    const slotsByDate: Record<string, Set<string>> = {};

    events.forEach((event) => {
      if (event.start?.dateTime) {
        const utcTime = new Date(event.start.dateTime);

        // Convert to user's timezone
        const zonedTime = toZonedTime(utcTime, timezone);

        const dateStr = format(zonedTime, "yyyy-MM-dd");
        const timeStr = format(zonedTime, "HH:mm");

        if (!slotsByDate[dateStr]) {
          slotsByDate[dateStr] = new Set();
        }
        slotsByDate[dateStr].add(timeStr);
      }
    });

    // Total slots per day (9 AM - 5 PM, 1-hour intervals = 8 slots)
    const totalSlotsPerDay = 8;

    // Only return dates where ALL slots are booked
    const fullyBookedDates = Object.entries(slotsByDate)
      .filter(([_, slots]) => slots.size >= totalSlotsPerDay)
      .map(([date]) => date);

    return fullyBookedDates;
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    return [];
  }
}

export async function getAvailableSlots(date: Date, timezone: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    // Get all booked time slots for this date, converted to user's timezone
    const bookedSlots = events
      .map((event) => {
        if (event.start?.dateTime) {
          // Parse the UTC timestamp from Google Calendar
          const utcTime = new Date(event.start.dateTime);

          // Convert to user's selected timezone
          const zonedTime = toZonedTime(utcTime, timezone);

          // Format as HH:mm in the user's timezone
          const hours = zonedTime.getHours().toString().padStart(2, "0");
          const minutes = zonedTime.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        }
        return null;
      })
      .filter(Boolean) as string[];

    // Check if selected date is today
    const isToday = isSameDay(date, new Date());
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Generate all possible slots (9 AM - 5 PM, 1-hour intervals)
    const allSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;

      // Check if slot is in the past (for today only)
      let isPastSlot = false;
      if (isToday) {
        if (hour < currentHour || (hour === currentHour && currentMinute > 0)) {
          isPastSlot = true;
        }
      }

      allSlots.push({
        time,
        available: !bookedSlots.includes(time) && !isPastSlot,
      });
    }

    return allSlots;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return [];
  }
}
