
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import LeadGenerationPage from '@/components/services/LeadGenerationPage';

// ======================================================
// FIRSTNOTCH — LEAD GENERATION SERVICES SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing/lead-generation';

const SEO_TITLE =
  'Lead Generation Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Verified contacts and booked meetings for your sales team. FirstNotch researches prospects, checks details, handles approved outreach and records leads in your CRM.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'lead generation services Sri Lanka',
    'lead generation outsourcing',
    'B2B lead generation Sri Lanka',
    'outsourced lead generation',
    'prospect research services',
    'lead qualification services',
    'appointment setting services',
    'sales lead generation Colombo',
    'verified business contacts',
    'CRM lead management',
    'sales outreach support',
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
// LEAD GENERATION SERVICES PAGE
// ======================================================

export default function LeadGenerationRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* EXISTING LEAD GENERATION PAGE */}
        <LeadGenerationPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
