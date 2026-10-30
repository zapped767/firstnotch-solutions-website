
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import VirtualAssistantServicesPage from '@/components/services/VirtualAssistantServicesPage';

// ======================================================
// FIRSTNOTCH — VIRTUAL ASSISTANT SERVICES SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing/virtual-assistant-services';

const SEO_TITLE =
  'Virtual Assistant Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Virtual assistant services from Colombo. Get help with calendars, inboxes, client emails, travel bookings, meetings and research.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'virtual assistant services Sri Lanka',
    'virtual assistant outsourcing',
    'virtual assistant Colombo',
    'remote administrative assistant',
    'outsourced personal assistant',
    'executive assistant services',
    'calendar management services',
    'email and inbox management',
    'appointment scheduling support',
    'business research assistance',
    'travel booking assistance',
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
// VIRTUAL ASSISTANT SERVICES PAGE
// ======================================================

export default function VirtualAssistantRoute() {
  return (
    <>
      {/* Existing FirstNotch Navbar */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* Existing Virtual Assistant Services Page */}
        <VirtualAssistantServicesPage />

        {/* Existing Contact Form and Footer */}
        <StoryContact />
      </main>
    </>
  );
}
