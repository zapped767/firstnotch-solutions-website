
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import LeadGenerationPage from '@/components/services/LeadGenerationPage';

export const metadata: Metadata = {
  title: 'Lead Generation Services in Sri Lanka | FirstNotch',
  description:
    'Verified contacts and booked meetings for your sales team. FirstNotch researches prospects, checks details, handles approved outreach and records leads in your CRM.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Lead Generation Services | FirstNotch Solutions',
    description:
      'Verified contacts and booked meetings, with prospect research, approved outreach and CRM handover.',
    type: 'website',
  },
};

export default function LeadGenerationRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="overflow-x-clip">
        <LeadGenerationPage />
        <StoryContact />
      </main>
    </>
  );
}
