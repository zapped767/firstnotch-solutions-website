
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import WebDevelopmentPage from '@/components/services/WebDevelopmentPage';

// ======================================================
// FIRSTNOTCH — WEB DEVELOPMENT SERVICES SEO
// ======================================================

const PAGE_PATH =
  '/services/it-services/web-development';

const SEO_TITLE =
  'Web Development Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Custom website design and web development from a team in Colombo. Fast, mobile-friendly sites built on modern frameworks and designed to bring in enquiries.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'web development services Sri Lanka',
    'web development company Sri Lanka',
    'website development Colombo',
    'custom website development',
    'website design Sri Lanka',
    'professional web development',
    'Next.js development services',
    'React web development',
    'responsive website design',
    'business website development',
    'website redesign services',
    'mobile-friendly website development',
    'IT services Sri Lanka',
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
// WEB DEVELOPMENT PAGE — EXISTING COMPONENTS
// ======================================================

export default function WebDevelopmentRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* EXISTING WEB DEVELOPMENT PAGE */}
        <WebDevelopmentPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
