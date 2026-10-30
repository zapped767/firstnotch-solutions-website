
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import InboundCallSupportPage from '@/components/services/InboundCallSupportPage';

// ======================================================
// FIRSTNOTCH — INBOUND CALL SUPPORT SEO
// ======================================================

const PAGE_PATH =
  '/services/customer-support-outsourcing/inbound-call-support';

const SEO_TITLE =
  'Inbound Call Center Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Inbound call center services from a trained team in Colombo. Calls answered in your company name, in four languages, with quality checks on every call.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'inbound call center services Sri Lanka',
    'inbound call support',
    'inbound call center outsourcing',
    'call answering services Sri Lanka',
    'customer support outsourcing Sri Lanka',
    'call center services Colombo',
    'multilingual call center',
    'outsourced inbound calls',
    'CRM integrated call support',
    'customer helpline outsourcing',
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
// INBOUND CALL SUPPORT PAGE
// ======================================================

export default function InboundCallSupportRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="top">
        {/* EXISTING INBOUND CALL SUPPORT PAGE */}
        <InboundCallSupportPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
