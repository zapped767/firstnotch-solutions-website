import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import ITServicesPage from '@/components/services/ITServicesPage';
import StoryContact from '@/components/StoryContact';

export const metadata: Metadata = {
  title:
    'IT Services and Web Development in Sri Lanka | FirstNotch',

  description:
    'IT services from Colombo: web development, website maintenance, IT support and technical support, all from one team that learns your systems.',

  keywords: [
    'IT services Sri Lanka',
    'web development Sri Lanka',
    'IT support outsourcing',
    'website maintenance services',
    'IT services Colombo',
    'web development Colombo',
    'technical support Sri Lanka',
    'FirstNotch Solutions',
  ],

  alternates: {
    canonical: '/services/it-services',
  },

  openGraph: {
    title:
      'IT Services and Web Development in Sri Lanka | FirstNotch',

    description:
      'IT services from Colombo: web development, website maintenance, IT support and technical support, all from one team that learns your systems.',

    url: '/services/it-services',

    siteName: 'FirstNotch Solutions',

    type: 'website',

    locale: 'en_LK',
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'IT Services and Web Development in Sri Lanka | FirstNotch',

    description:
      'IT services from Colombo: web development, website maintenance, IT support and technical support, all from one team that learns your systems.',
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function Page() {
  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="overflow-x-clip"
      >
        <ITServicesPage />
      </main>

      <StoryContact />
    </>
  );
}