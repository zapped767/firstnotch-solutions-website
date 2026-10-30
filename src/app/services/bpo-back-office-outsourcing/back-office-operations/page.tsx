
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import BackOfficeOperationsPage from '@/components/services/BackOfficeOperationsPage';

// ======================================================
// FIRSTNOTCH — BACK OFFICE OPERATIONS SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing/back-office-operations';

const SEO_TITLE =
  'Back Office Support Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Back office support from a trained team in Colombo. Order processing, record updates, supplier paperwork, scheduling and reporting with agreed turnaround times.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'back office support services Sri Lanka',
    'back office operations outsourcing',
    'back office outsourcing Sri Lanka',
    'outsourced administrative support',
    'business process outsourcing',
    'order processing services',
    'record management services',
    'supplier paperwork processing',
    'business administration outsourcing',
    'scheduling and reporting services',
    'back office support Colombo',
    'offshore back office services',
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
// BACK OFFICE OPERATIONS PAGE
// ======================================================

export default function BackOfficeOperationsRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* EXISTING BACK OFFICE OPERATIONS PAGE */}
        <BackOfficeOperationsPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
