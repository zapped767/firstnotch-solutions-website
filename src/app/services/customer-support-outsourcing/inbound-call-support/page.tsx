
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import InboundCallSupportPage from '@/components/services/InboundCallSupportPage';

export const metadata: Metadata = {
  title:
    'Inbound Call Center Services in Sri Lanka | FirstNotch Solutions',

  description:
    'Reduce customer wait times with inbound call support from FirstNotch Solutions in Colombo, Sri Lanka. CRM integration, multilingual agents, call reporting and quality checks.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      'Inbound Call Support | FirstNotch Solutions',
    description:
      'Shorter waits and accurate answers for the people who call you.',
    type: 'website',
  },
};

export default function InboundCallSupportRoute() {
  return (
    <>
      {/* Existing FirstNotch Navbar */}
      <Navbar />

      <main id="top">
        {/* New animated inbound service page */}
        <InboundCallSupportPage />

        {/* Existing discovery-call form and footer */}
        <StoryContact />
      </main>
    </>
  );
}
