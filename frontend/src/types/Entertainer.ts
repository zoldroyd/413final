export interface Entertainer {
  entertainerId: number;
  entStageName: string;
  entSsn: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
  dateEntered: string;
  bookingsCount?: number;
  lastBookingDate?: string;
}
