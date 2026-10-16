import type { Metadata } from 'next';
import { BookingComingSoon } from '@/components/booking/BookingComingSoon';

export const metadata: Metadata = {
  title: 'Online Booking Coming Soon — EVM Cinemas',
  description:
    "We're getting our online booking experience ready. Online ticket booking at EVM Cinemas will be available soon. Counter bookings are open daily at the theatre.",
};

export default function BookingPage() {
  return <BookingComingSoon />;
}
