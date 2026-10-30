
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import DocumentProcessingPage from '@/components/services/DocumentProcessingPage';

// ======================================================
// FIRSTNOTCH — DOCUMENT PROCESSING SERVICES SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing/document-processing';

const SEO_TITLE =
  'Document Processing Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Document processing from a trained team in Colombo. Contracts, forms and invoices are digitised, checked and organised into searchable records.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'document processing services Sri Lanka',
    'document processing outsourcing',
    'document digitisation Sri Lanka',
    'document scanning services',
    'document data entry',
    'document management outsourcing',
    'PDF data processing',
    'invoice processing services',
    'contract document processing',
    'document verification',
    'back office outsourcing Sri Lanka',
    'document processing Colombo',
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
// DOCUMENT PROCESSING PAGE
// ======================================================

export default function DocumentProcessingRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* EXISTING DOCUMENT PROCESSING PAGE */}
        <DocumentProcessingPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
