
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import BpoBackOfficePage from '@/components/services/BpoBackOfficePage';

// ======================================================
// FIRSTNOTCH — BPO & BACK OFFICE OUTSOURCING SEO
// ======================================================

const PAGE_PATH =
  '/services/bpo-back-office-outsourcing';

const SEO_TITLE =
  'BPO & Back Office Outsourcing in Sri Lanka | FirstNotch';

const SEO_DESCRIPTION =
  'Back office outsourcing in Sri Lanka for data entry, documents, KYC checks and admin. Each task is checked by software and by a person before delivery.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'back office outsourcing Sri Lanka',
    'BPO services Sri Lanka',
    'BPO and back office outsourcing',
    'back office services Colombo',
    'data entry outsourcing',
    'document processing services',
    'data verification and validation',
    'KYC and AML support',
    'lead generation services',
    'back office operations',
    'virtual assistant services',
    'offshore back office outsourcing',
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
// BPO & BACK OFFICE PAGE
// ======================================================

export default function BpoBackOfficeRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        {/* EXISTING BPO & BACK OFFICE PAGE */}
        <BpoBackOfficePage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <div className="relative z-10 -mt-5 rounded-t-[28px] bg-[#FFFFFF]">
          <StoryContact />
        </div>
      </main>
    </>
  );
}
