
import type { Metadata } from 'next';

import ServicesExperience from '@/components/services/ServicesExperience';

// ======================================================
// FIRSTNOTCH SOLUTIONS — SERVICES PAGE SEO
// ======================================================

const PAGE_PATH = '/services';

const SEO_TITLE =
  'Outsourcing Services in Sri Lanka | FirstNotch Solutions';

const SEO_DESCRIPTION =
  'Customer support, back office and IT outsourcing services in Sri Lanka, run by one trained team in Colombo. Start with one service or combine several.';

// ======================================================
// NEXT.JS METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'outsourcing services in Sri Lanka',
    'BPO services in Sri Lanka',
    'outsourcing company Sri Lanka',
    'customer support outsourcing',
    'back office outsourcing',
    'IT outsourcing services',
    'call center services Sri Lanka',
    'data entry outsourcing',
    'document processing services',
    'KYC and AML support',
    'IT support services',
    'web development Sri Lanka',
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
// SERVICES PAGE — EXISTING COMPONENT
// ======================================================

export default function ServicesPage() {
  return <ServicesExperience />;
}
