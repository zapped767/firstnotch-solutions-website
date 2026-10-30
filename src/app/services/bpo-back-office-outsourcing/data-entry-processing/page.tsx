
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import DataEntryProcessingPage from '@/components/services/DataEntryProcessingPage';

// ======================================================
// FIRSTNOTCH — DATA ENTRY & PROCESSING SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing/data-entry-processing';

const SEO_TITLE =
  'Data Entry Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Data entry and processing from a trained team in Colombo. Records are entered with software tools and checked by hand, at a 98% accuracy rate.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'data entry services Sri Lanka',
    'data entry outsourcing',
    'data processing services',
    'offshore data entry',
    'data entry and processing',
    'data entry outsourcing Sri Lanka',
    'data entry company Colombo',
    'outsourced data processing',
    'data formatting services',
    'data verification services',
    'back office outsourcing Sri Lanka',
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
// DATA ENTRY & PROCESSING PAGE
// ======================================================

export default function DataEntryProcessingRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* EXISTING DATA ENTRY & PROCESSING PAGE */}
        <DataEntryProcessingPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <div className="relative z-10 -mt-5 rounded-t-[28px] bg-white">
          <StoryContact />
        </div>
      </main>
    </>
  );
}
