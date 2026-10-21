
import type { Metadata } from 'next';

import ServicesExperience from '@/components/services/ServicesExperience';

export const metadata: Metadata = {
  title:
    'Outsourcing Services in Sri Lanka | FirstNotch Solutions',

  description:
    'Explore 16 outsourcing services from FirstNotch Solutions in Colombo, Sri Lanka, including customer support, BPO and back office operations, and IT services.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      'Outsourcing Services | FirstNotch Solutions',

    description:
      'Customer support, back office and IT services from a dedicated team in Colombo, Sri Lanka.',

    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesExperience />;
}
