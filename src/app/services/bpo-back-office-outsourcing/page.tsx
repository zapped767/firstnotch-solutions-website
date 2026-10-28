
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import BpoBackOfficePage from '@/components/services/BpoBackOfficePage';

export const metadata: Metadata = {
  title:
    'BPO & Back Office Outsourcing in Sri Lanka | FirstNotch',

  description:
    'Back office work delivered at 98% accuracy, checked by software and by people. Explore data entry, document processing, KYC, lead generation and more.',

  openGraph: {
    title: 'BPO & Back Office Outsourcing | FirstNotch',

    description:
      'Software checks and human review for back office work from Colombo.',

    type: 'website',
  },
};

export default function BpoBackOfficeRoute() {
  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        <BpoBackOfficePage />

        {/* Existing contact form and footer */}
        <div className="relative z-10 -mt-5 rounded-t-[28px] bg-[#FFFFFF]">
          <StoryContact />
        </div>
      </main>
    </>
  );
}
