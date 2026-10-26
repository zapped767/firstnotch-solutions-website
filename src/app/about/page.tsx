
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import AboutFirstNotchPage from '@/components/AboutFirstNotchPage';

export const metadata: Metadata = {
  title:
    'About FirstNotch Solutions | Outsourcing Company in Colombo',

  description:
    'Learn about FirstNotch Solutions, an outsourcing company in Colombo serving businesses in Sri Lanka and overseas since 2022. Explore our values, people and services.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'About FirstNotch Solutions',
    description:
      'Outsourcing from Colombo since 2022: our people, values and services.',
    type: 'website',
  },
};

export default function AboutRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <AboutFirstNotchPage />
        <StoryContact />
      </main>
    </>
  );
}
