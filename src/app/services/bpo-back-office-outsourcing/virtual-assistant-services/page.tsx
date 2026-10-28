
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import VirtualAssistantServicesPage from '@/components/services/VirtualAssistantServicesPage';

export const metadata: Metadata = {
  title: 'Virtual Assistant Services in Sri Lanka | FirstNotch',
  description:
    'Virtual assistant services from Colombo. Get help with calendars, inboxes, client emails, travel bookings, meetings and research.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Virtual Assistant Services | FirstNotch Solutions',
    description:
      'An assistant who manages your calendar and inbox, so you can focus on your own work.',
    type: 'website',
  },
};

export default function VirtualAssistantRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="overflow-x-clip">
        <VirtualAssistantServicesPage />
        <StoryContact />
      </main>
    </>
  );
}
