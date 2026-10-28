
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import DataVerificationPage from '@/components/services/DataVerificationPage';

export const metadata: Metadata = {
  title:
    'Data Verification and Validation Services in Sri Lanka | FirstNotch',
  description:
    'Find duplicates and errors in your records, and approve the changes before they are made. Data verification and validation services from FirstNotch in Colombo.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Data Verification and Validation | FirstNotch Solutions',
    description:
      'Records checked against your rules, with every proposed change awaiting approval.',
    type: 'website',
  },
};

export default function DataVerificationRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="overflow-x-clip">
        <DataVerificationPage />

        {/* Existing discovery form and footer */}
        <StoryContact />
      </main>
    </>
  );
}
