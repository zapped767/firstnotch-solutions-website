
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';

import CustomerServicePage from '@/components/services/CustomerServicePage';

// ======================================================
// FIRSTNOTCH — CUSTOMER SERVICE OUTSOURCING SEO
// ======================================================

const PAGE_PATH =
  '/services/customer-support-outsourcing/customer-service';

const SEO_TITLE =
  'Outsourced Customer Service in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Outsourced customer service from a trained team in Colombo. Emails, chats and calls handled in four languages, with a quality score on every ticket.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'outsourced customer service Sri Lanka',
    'customer service outsourcing',
    'customer support outsourcing Sri Lanka',
    'outsourced customer service',
    'email customer support',
    'live chat support services',
    'multilingual customer service',
    'call center services Sri Lanka',
    'phone support outsourcing',
    'social media customer support',
    'customer helpdesk outsourcing',
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
// CUSTOMER SERVICE PAGE
// ======================================================

export default function CustomerServiceRoute() {
  return (
    <>
      {/* Existing FirstNotch Navbar */}
      <Navbar />

      <main id="top">
        {/* Customer Service Content */}
        <CustomerServicePage />

        {/* Existing Contact Form and Footer */}
        <StoryContact />
      </main>
    </>
  );
}
