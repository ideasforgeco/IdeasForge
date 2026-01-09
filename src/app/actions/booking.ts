"use server";

import { google } from "googleapis";
import { Resend } from "resend";
import { z } from "zod";
import { fromZonedTime } from "date-fns-tz";
import { format } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

const bookingSchema = z.object({
  email: z.string().email(),
  date: z.string(),
  time: z.string(),
  timezone: z.string(),
});

export async function createBooking(data: {
  email: string;
  date: string;
  time: string;
  timezone: string;
}) {
  try {
    // Validate input
    const validated = bookingSchema.parse(data);

    // Set up Google Calendar API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Parse date and time with timezone awareness
    const [year, month, day] = validated.date.split("-");
    const [hours, minutes] = validated.time.split(":");

    // Create a proper date string in ISO format for the user's timezone
    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:00`;

    // Convert from user's timezone to UTC
    const startDateTime = fromZonedTime(dateTimeString, validated.timezone);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes

    // Generate a simple meet link (you can manually create one or use a placeholder)
    const meetLink = `https://meet.google.com/new`; // This creates a new meeting each time

    // Create Google Calendar event WITHOUT automatic Meet link
    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: "Consultation Call - IdeasForge",
        description: `Consultation call with ${validated.email}\n\nJoin here: ${meetLink}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: validated.timezone,
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: validated.timezone,
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 30 },
          ],
        },
      },
    });

    // Format date for emails
    const formattedDate = format(startDateTime, "MMMM dd, yyyy");

    // Send email to user
    await resend.emails.send({
      from: "IdeasForge <onboarding@resend.dev>",
      to: validated.email,
      subject: "Your Consultation Call is Confirmed! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4B4C4D;">Your Call is Scheduled!</h2>
          <p>Hi there,</p>
          <p>Your consultation call with IdeasForge is confirmed for:</p>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${validated.time} (${validated.timezone})</p>
            <p style="margin: 5px 0;"><strong>Duration:</strong> 30 minutes</p>
          </div>
          <p><strong>Google Meet Link:</strong></p>
          <a href="${meetLink}" style="display: inline-block; background: linear-gradient(to right, #FECB32, #F55D22); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Meeting</a>
          <p style="margin-top: 20px;">We're looking forward to speaking with you!</p>
          <p>Best regards,<br/>The IdeasForge Team</p>
        </div>
      `,
    });

    // Send email to company
    await resend.emails.send({
      from: "IdeasForge Bookings <onboarding@resend.dev>",
      to: process.env.COMPANY_EMAIL!,
      subject: "New Consultation Booking",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Consultation Booked</h2>
          <p><strong>Client Email:</strong> ${validated.email}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${validated.time} (${validated.timezone})</p>
          <p><strong>Google Meet:</strong> <a href="${meetLink}">${meetLink}</a></p>
          <p style="margin-top: 20px; color: #666;"><em>Note: Create a Google Meet link manually and update the calendar event</em></p>
        </div>
      `,
    });

    return {
      success: true,
      meetLink,
    };
  } catch (error) {
    console.error("Booking error:", error);
    throw new Error("Failed to create booking");
  }
}
