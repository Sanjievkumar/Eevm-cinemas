import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EVM Cinemas — Where Stories Come Alive',
  description:
    'Experience premium cinema at EVM Cinemas. Now showing the latest blockbusters with state-of-the-art 4K projection and Dolby Atmos sound.',
  keywords: ['EVM Cinemas', 'cinema', 'movies', 'Kochi', 'Keralam', '4K', 'Dolby Atmos'],
  openGraph: {
    title: 'EVM Cinemas — Where Stories Come Alive',
    description:
      'Experience premium cinema at EVM Cinemas. Now showing the latest blockbusters.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'EVM Cinemas',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-primary text-text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
