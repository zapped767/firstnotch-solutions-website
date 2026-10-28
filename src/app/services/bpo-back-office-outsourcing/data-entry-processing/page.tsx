
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import DataEntryProcessingPage from '@/components/services/DataEntryProcessingPage';

export const metadata: Metadata = {
  title:
    'Data Entry and Processing Services in Sri Lanka | FirstNotch',

  description:
    'Clean data in your systems, with each record checked by hand before delivery. Data entry, processing, formatting and verification from FirstNotch in Colombo.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Data Entry and Processing | FirstNotch Solutions',
    description:
      'Data entry and processing from Colombo, using software checks and human review.',
    type: 'website',
  },
};

export default function DataEntryProcessingRoute() {
  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        <DataEntryProcessingPage />

        {/* Shared discovery form and FirstNotch footer */}
        <div className="relative z-10 -mt-5 rounded-t-[28px] bg-white">
          <StoryContact />
        </div>
      </main>
    </>
  );
}
