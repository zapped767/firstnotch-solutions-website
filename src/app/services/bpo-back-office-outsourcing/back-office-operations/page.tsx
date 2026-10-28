
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import BackOfficeOperationsPage from '@/components/services/BackOfficeOperationsPage';

export const metadata: Metadata = {
  title: 'Back Office Support Services in Sri Lanka | FirstNotch',
  description:
    'Back office support from a trained team in Colombo. Order processing, record updates, supplier paperwork, scheduling and reporting with agreed turnaround times.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Back Office Operations | FirstNotch Solutions',
    description:
      'Daily administration handled on time by a team that can change size as your workload changes.',
    type: 'website',
  },
};

export default function BackOfficeOperationsRoute() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <BackOfficeOperationsPage />
        <StoryContact />
      </main>
    </>
  );
}
