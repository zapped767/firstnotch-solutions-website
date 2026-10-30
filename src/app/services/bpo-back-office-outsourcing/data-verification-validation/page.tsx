
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import DataVerificationPage from '@/components/services/DataVerificationPage';

// ======================================================
// FIRSTNOTCH — DATA VERIFICATION & VALIDATION SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing/data-verification-validation';

const SEO_TITLE =
  'Data Verification and Validation Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Find duplicates and errors in your records, and approve the changes before they are made. Data verification and validation services from FirstNotch in Colombo.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'data verification services Sri Lanka',
    'data validation services Sri Lanka',
    'data verification and validation',
    'data quality assurance',
    'data cleansing services',
    'duplicate data detection',
    'data accuracy checks',
    'database verification services',
    'data quality management',
    'data verification outsourcing',
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
// DATA VERIFICATION & VALIDATION PAGE
// ======================================================

export default function DataVerificationRoute() {
  return (
    <>
      {/* Existing FirstNotch Navbar */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* Existing Data Verification Page */}
        <DataVerificationPage />

        {/* Existing Discovery Form and Footer */}
        <StoryContact />
      </main>
    </>
  );
}
