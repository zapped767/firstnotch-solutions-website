
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import WorkWithUsPage from '@/components/WorkWithUsPage';

export const metadata: Metadata = {
  title:
    'Work With Us | Careers in Colombo | FirstNotch Solutions',

  description:
    'Explore Customer Support, Data Analyst, Digital Marketing and Business Development roles at FirstNotch Solutions in Colombo. Learn about benefits, training and how to apply.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      'Work With Us | FirstNotch Solutions',

    description:
      'Jobs in Colombo with salary, monthly incentives and opportunities to grow.',

    type: 'website',
  },
};

export default function WorkWithUsRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <WorkWithUsPage />
      </main>
    </>
  );
}
