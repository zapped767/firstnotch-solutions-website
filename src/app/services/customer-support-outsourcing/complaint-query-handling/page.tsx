
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';

import ComplaintQueryHandlingPage from '@/components/services/ComplaintQueryHandlingPage';

export const metadata: Metadata = {
  title:
    'Complaint Handling Services in Sri Lanka | FirstNotch Solutions',

  description:
    'Outsource complaint and query handling to FirstNotch Solutions in Colombo. Case tracking, acknowledgements, approved remedies, escalation and quality reporting.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      'Complaint & Query Handling | FirstNotch Solutions',

    description:
      'Complaints answered and closed under rules you set, with a record of every case.',

    type: 'website',
  },
};

export default function ComplaintQueryHandlingRoute() {
  return (
    <>
      <Navbar />

      <main id="top">
        <ComplaintQueryHandlingPage />
        <StoryContact />
      </main>
    </>
  );
}
