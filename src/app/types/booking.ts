export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
}

export interface BookCallData {
  heading: {
    part1: string;
    part2: string;
  };
  leftColumn: {
    logo: string;
    title: string;
    description: string;
    meetIcon: string;
    meetText: string;
    globeIcon: string;
  };
  timezones: string[];
  defaultTimezone: string;
}
