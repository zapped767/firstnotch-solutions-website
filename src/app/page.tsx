
import type { Metadata } from 'next';

import HomeMotion from '../components/HomeMotion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Journey from '../components/Journey';
import StoryContact from '../components/StoryContact';

import {
  About,
  ClientStats,
  Hiring,
  QuoteBand,
  ResultsIndustries,
  Standards,
} from '../components/ContentBlocks';

// ======================================================
// FIRSTNOTCH SOLUTIONS — HOMEPAGE SEO
// ======================================================

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');

const seoTitle =
  'BPO Company in Sri Lanka | Outsourcing by FirstNotch';

const seoDescription =
  'FirstNotch is a BPO company in Sri Lanka. We handle customer support, back office and IT services for businesses here and overseas. Book a free discovery call.';

// ======================================================
// NEXT.JS METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: seoTitle,
  },

  description: seoDescription,

  applicationName: 'FirstNotch Solutions',

  keywords: [
    'BPO company in Sri Lanka',
    'BPO services Sri Lanka',
    'Outsourcing to Sri Lanka',
    'Outsourcing company in Sri Lanka',
    'Customer support outsourcing',
    'Call center outsourcing Sri Lanka',
    'Back office outsourcing',
    'Data entry outsourcing',
    'Document processing services',
    'KYC and AML support',
    'IT services in Sri Lanka',
    'IT support Sri Lanka',
    'Web development Sri Lanka',
    'Offshore outsourcing',
    'FirstNotch Solutions',
  ],

  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),

        alternates: {
          canonical: '/',
        },
      }
    : {}),

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'FirstNotch Solutions',
    title: seoTitle,
    description: seoDescription,
    ...(siteUrl ? { url: siteUrl } : {}),
  },

  twitter: {
    card: 'summary',
    title: seoTitle,
    description: seoDescription,
  },
};

// ======================================================
// HOMEPAGE
// ======================================================

export default function HomePage() {
  return (
    <HomeMotion>
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-white px-5 py-3 text-sm text-[#17191C] focus:translate-y-0"
      >
        Skip to content
      </a>

      {/* Existing Navbar */}
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        {/* Homepage Hero */}
        <Hero />

        {/* Statistics */}
        <ClientStats />

        {/* ORIGINAL WHY OUTSOURCE SECTION */}
        <About />

        {/* Services */}
        <Services />

        <QuoteBand index={0} />

        {/* Standards */}
        <Standards />

        <QuoteBand index={1} />

        {/* Hiring */}
        <Hiring />

        <QuoteBand index={2} />

        {/* Journey */}
        <Journey />

        <QuoteBand index={3} />

        {/* Results and Industries */}
        <ResultsIndustries />

        <QuoteBand index={4} />

        {/* Contact and Footer */}
        <StoryContact />
      </main>
    </HomeMotion>
  );
}
