
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import ComplianceKycAmlPage from '@/components/services/ComplianceKycAmlPage';

// ======================================================
// FIRSTNOTCH — COMPLIANCE, KYC & AML SUPPORT SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing/compliance-kyc-aml-support';

const SEO_TITLE =
  'KYC and AML Support Services in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'KYC and AML support from trained specialists in Colombo. Identity checks, sanctions screening and audit-ready records, with every decision left to your team.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'KYC and AML support Sri Lanka',
    'KYC services Sri Lanka',
    'AML support services',
    'KYC outsourcing',
    'AML screening outsourcing',
    'identity verification services',
    'sanctions screening support',
    'customer due diligence support',
    'compliance outsourcing Sri Lanka',
    'KYC document verification',
    'audit-ready compliance records',
    'BPO compliance services',
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
// COMPLIANCE, KYC & AML SUPPORT PAGE
// ======================================================

export default function KycAmlRoute() {
  return (
    <>
      {/* Existing FirstNotch Navbar */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* Existing Compliance, KYC & AML Page */}
        <ComplianceKycAmlPage />

        {/* Existing Contact Form and Footer */}
        <StoryContact />
      </main>
    </>
  );
}
