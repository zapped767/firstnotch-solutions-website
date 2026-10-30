
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';

import ComplaintQueryHandlingPage from '@/components/services/ComplaintQueryHandlingPage';

// ======================================================
// FIRSTNOTCH — COMPLAINT & QUERY HANDLING SEO
// ======================================================

const PAGE_PATH =
  '/services/customer-support-outsourcing/complaint-query-handling';

const SEO_TITLE =
  'Complaint Handling Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Complaint and query handling from a trained team in Colombo. Each case is logged and tracked until it is closed, under rules agreed with you.';

// ======================================================
// NEXT.JS METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'complaint handling services Sri Lanka',
    'complaint and query handling',
    'complaint management outsourcing',
    'customer query handling',
    'complaint resolution services',
    'customer complaint outsourcing',
    'customer support outsourcing Sri Lanka',
    'complaint tracking services',
    'customer service Sri Lanka',
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
// COMPLAINT & QUERY HANDLING PAGE
// ======================================================

export default function ComplaintQueryHandlingRoute() {
  return (
    <>
      {/* Existing Navbar */}
      <Navbar />

      <main id="top">
        {/* Existing Complaint & Query Handling Page */}
        <ComplaintQueryHandlingPage />

        {/* Existing Contact Form and Footer */}
        <StoryContact />
      </main>
    </>
  );
}
