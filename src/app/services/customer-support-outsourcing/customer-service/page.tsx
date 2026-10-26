
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';

import CustomerServicePage from '@/components/services/CustomerServicePage';

export const metadata: Metadata = {
  title:
    'Outsourced Customer Service in Sri Lanka | FirstNotch Solutions',

  description:
    "One team for your emails, chats and calls, with every customer's full history visible. Multilingual, brand-aligned customer service from Colombo.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      'Customer Service Outsourcing | FirstNotch Solutions',

    description:
      'Email, chat, phone and social support in your own help desk, under your brand.',

    type: 'website',
  },
};

export default function CustomerServiceRoute() {
  return (
    <>
      <Navbar />

      <main id="top">
        <CustomerServicePage />

        <StoryContact />
      </main>
    </>
  );
}
