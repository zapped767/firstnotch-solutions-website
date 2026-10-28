
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import WebDevelopmentPage from '@/components/services/WebDevelopmentPage';

export const metadata: Metadata = {
  title: 'Web Development Services in Sri Lanka | FirstNotch',
  description:
    'Custom website design and web development from a team in Colombo. Fast, mobile-friendly sites built on modern frameworks and designed to bring in enquiries.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Web Development Services | FirstNotch Solutions',
    description:
      'Custom websites designed and built by a Colombo team, with responsive layouts, easy editing and planned launch support.',
    type: 'website',
  },
};

export default function WebDevelopmentRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="overflow-x-clip">
        <WebDevelopmentPage />
        <StoryContact />
      </main>
    </>
  );
}
