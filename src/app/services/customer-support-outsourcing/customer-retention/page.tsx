
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import CustomerRetentionPage from '@/components/services/CustomerRetentionPage';

export const metadata: Metadata = {
  title:
    'Customer Retention Services in Sri Lanka | FirstNotch Solutions',

  description:
    'Keep more customers with planned welcome calls, regular check-ins, renewal support, win-back campaigns and approved retention offers from FirstNotch Solutions in Colombo.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      'Customer Retention Services | FirstNotch Solutions',

    description:
      'Keep more of your customers with planned contact from a team that knows your products.',

    type: 'website',
  },
};

export default function CustomerRetentionRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="top">
        {/* NEW CUSTOMER RETENTION PAGE */}
        <CustomerRetentionPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
