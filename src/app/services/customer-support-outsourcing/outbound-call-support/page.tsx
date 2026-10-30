
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import OutboundCallSupportPage from '@/components/services/OutboundCallSupportPage';

// ======================================================
// FIRSTNOTCH — OUTBOUND CALL SUPPORT SEO
// ======================================================

const PAGE_PATH =
  '/services/customer-support-outsourcing/outbound-call-support';

const SEO_TITLE =
  'Outbound Call Center Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Outbound call center services from a trained team in Colombo. Follow-ups and campaigns made on your scripts, with each result logged in your CRM.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'outbound call center services Sri Lanka',
    'outbound call support',
    'outbound call center outsourcing',
    'outbound calling services',
    'customer follow-up calls',
    'appointment confirmation calls',
    'payment reminder calls',
    'customer survey calling',
    'lead qualification services',
    'call center outsourcing Colombo',
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
// OUTBOUND CALL SUPPORT PAGE
// ======================================================

export default function OutboundCallSupportRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="top">
        {/* EXISTING OUTBOUND CALL SUPPORT PAGE */}
        <OutboundCallSupportPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
