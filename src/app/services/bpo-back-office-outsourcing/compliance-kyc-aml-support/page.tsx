
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import ComplianceKycAmlPage from '@/components/services/ComplianceKycAmlPage';

export const metadata: Metadata = {
  title:
    'KYC and AML Support Services in Sri Lanka | FirstNotch',
  description:
    'KYC and AML support from trained specialists in Colombo. Identity checks, sanctions screening and audit-ready records, with every decision left to your team.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Compliance, KYC and AML Support | FirstNotch Solutions',
    description:
      'Specialists prepare KYC and AML case files. Your compliance team makes the final decisions.',
    type: 'website',
  },
};

export default function KycAmlRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="overflow-x-clip">
        <ComplianceKycAmlPage />

        {/* Existing contact form and footer */}
        <StoryContact />
      </main>
    </>
  );
}
