
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import WorkWithUsPage from '@/components/WorkWithUsPage';

// ======================================================
// FIRSTNOTCH — WORK WITH US / CAREERS SEO
// ======================================================

const PAGE_PATH = '/work-with-us';

const SEO_TITLE =
  'Work With Us | Careers in Colombo | FirstNotch Solutions';

const SEO_DESCRIPTION =
  'Explore Customer Support, Data Analyst, Digital Marketing and Business Development roles at FirstNotch Solutions in Colombo. Learn about benefits, training and how to apply.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'FirstNotch Solutions careers',
    'FirstNotch Solutions jobs',
    'careers in Colombo',
    'BPO jobs Sri Lanka',
    'customer support jobs Colombo',
    'data analyst jobs Sri Lanka',
    'digital marketing jobs Colombo',
    'business development jobs Sri Lanka',
    'outsourcing company careers',
    'IT jobs Colombo',
    'career opportunities Sri Lanka',
    'FirstNotch recruitment',
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
// WORK WITH US PAGE — EXISTING COMPONENTS
// ======================================================

export default function WorkWithUsRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="main-content">
        {/* EXISTING WORK WITH US PAGE */}
        <WorkWithUsPage />
      </main>
    </>
  );
}
