
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import AboutFirstNotchPage from '@/components/AboutFirstNotchPage';

// ======================================================
// FIRSTNOTCH SOLUTIONS — ABOUT PAGE SEO
// ======================================================

const PAGE_PATH = '/about';

const SEO_TITLE =
  'About FirstNotch Solutions | Outsourcing Company in Colombo';

const SEO_DESCRIPTION =
  'Learn about FirstNotch Solutions, an outsourcing company in Colombo serving businesses in Sri Lanka and overseas since 2022. Explore our values, people and services.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'About FirstNotch Solutions',
    'FirstNotch Solutions Sri Lanka',
    'outsourcing company in Colombo',
    'BPO company in Sri Lanka',
    'business process outsourcing Colombo',
    'outsourcing services Sri Lanka',
    'customer support outsourcing',
    'back office outsourcing Sri Lanka',
    'IT services Colombo',
    'offshore outsourcing Sri Lanka',
    'FirstNotch Solutions company profile',
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
// ABOUT FIRSTNOTCH PAGE
// ======================================================

export default function AboutRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="main-content">
        {/* EXISTING ABOUT PAGE */}
        <AboutFirstNotchPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
