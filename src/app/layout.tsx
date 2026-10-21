import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "FirstNotch | Outsourcing that works like it's in-house.",
  description:
    'Customer support, back office and IT services for businesses in Sri Lanka and overseas. Handled by a Colombo team that learns your processes and meets your standards.',
  openGraph: {
    title: "FirstNotch | Outsourcing that works like it's in-house.",
    description:
      'A BPO company in Sri Lanka for customer support, back office work and IT services.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'FirstNotch',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${poppins.variable} ${poppins.className} m-0 antialiased`}> {children}</body>
    </html>
  );
}
