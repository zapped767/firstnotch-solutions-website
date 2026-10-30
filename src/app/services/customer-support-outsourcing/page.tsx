
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import CustomerSupportPage from '@/components/services/CustomerSupportPage';

// ======================================================
// FIRSTNOTCH — CUSTOMER SUPPORT OUTSOURCING SEO
// ======================================================

const PAGE_PATH = '/services/customer-support-outsourcing';

const SEO_TITLE =
  'Customer Support Outsourcing in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Call center, email and live chat support from a trained team in Colombo. Customer support outsourcing in Sri Lanka, in four languages. Book a free call.';

// ======================================================
// PAGE METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'customer support outsourcing Sri Lanka',
    'customer support outsourcing',
    'call center Sri Lanka',
    'call center outsourcing Sri Lanka',
    'inbound call support',
    'outbound call support',
    'outsourced customer service',
    'multilingual customer support',
    'customer retention services',
    'complaint handling services',
    'FirstNotch Solutions',
  ],

  alternates: {
    canonical: PAGE_PATH,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    type: 'website',
    locale: 'en_GB',
    siteName: 'FirstNotch Solutions',
    url: PAGE_PATH,
  },

  twitter: {
    card: 'summary',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
};

// ======================================================
// CUSTOMER SUPPORT OUTSOURCING PAGE
// ======================================================

export default function CustomerSupportOutsourcingPage() {
  return (
    <>
      {/* Existing FirstNotch Navbar */}
      <Navbar />

      <main id="top" className="overflow-x-clip bg-white">
        {/* Customer Support Page */}
        <CustomerSupportPage />

        {/* Existing Booking Form and Company Footer */}
        <StoryContact />
      </main>
    </>
  );
}
