
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import CustomerRetentionPage from '@/components/services/CustomerRetentionPage';

// ======================================================
// FIRSTNOTCH — CUSTOMER RETENTION SEO
// ======================================================

const PAGE_PATH =
  '/services/customer-support-outsourcing/customer-retention';

const SEO_TITLE =
  'Customer Retention Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Customer retention services from a trained team in Colombo. Welcome calls, check-ins, cancellation requests and win-back calls, handled in four languages.';

// ======================================================
// NEXT.JS PAGE METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'customer retention services Sri Lanka',
    'customer retention outsourcing',
    'customer retention services',
    'customer loyalty programmes',
    'win-back calls',
    'customer win-back campaigns',
    'customer retention programme',
    'customer renewal support',
    'customer check-in calls',
    'customer support outsourcing Sri Lanka',
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
// CUSTOMER RETENTION PAGE
// ======================================================

export default function CustomerRetentionRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="top">
        {/* CUSTOMER RETENTION PAGE */}
        <CustomerRetentionPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
