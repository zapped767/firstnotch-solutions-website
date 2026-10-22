
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import CustomerSupportPage from '@/components/services/CustomerSupportPage';

export const metadata: Metadata = {
  title:
    'Customer Support Outsourcing in Sri Lanka | FirstNotch Solutions',
  description:
    'Outsource inbound calls, outbound calls, customer service, retention and complaint handling to FirstNotch Solutions in Colombo, Sri Lanka.',
  openGraph: {
    title:
      'Customer Support Outsourcing | FirstNotch Solutions',
    description:
      'Customer support handled for you, from the first call to the follow-up.',
    type: 'website',
  },
};

export default function CustomerSupportOutsourcingPage() {
  return (
    <>
      {/* Existing FirstNotch Navbar */}
      <Navbar />

      <main id="top" className="overflow-x-clip bg-white">
        {/* New customer support page */}
        <CustomerSupportPage />

        {/* Existing booking form and company footer */}
        <StoryContact />
      </main>
    </>
  );
}
