import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import CulturePage from '@/components/culture/CulturePage';
import StoryContact from '@/components/StoryContact';

export const metadata: Metadata = {
  title:
    'Culture at FirstNotch | Life at FirstNotch Solutions',

  description:
    'See life at FirstNotch Solutions in Colombo — cultural celebrations, team events, sports, shared traditions and the moments that bring our people together.',

  keywords: [
    'FirstNotch culture',
    'FirstNotch Solutions culture',
    'life at FirstNotch',
    'work culture Sri Lanka',
    'company culture Colombo',
    'IT company culture Sri Lanka',
    'BPO company culture Sri Lanka',
  ],

  alternates: {
    canonical: '/culture',
  },

  openGraph: {
    title:
      'Culture at FirstNotch | Different Stories. One Team.',

    description:
      'The celebrations, traditions, sports and everyday moments that shape life at FirstNotch Solutions.',

    type: 'website',
  },
};

export default function Culture() {
  return (
    <>
      <Navbar />

      <CulturePage />

      <StoryContact />
    </>
  );
}