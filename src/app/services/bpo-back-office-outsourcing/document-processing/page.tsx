
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import DocumentProcessingPage from '@/components/services/DocumentProcessingPage';

export const metadata: Metadata = {
  title:
    'Document Processing Services in Sri Lanka | FirstNotch Solutions',
  description:
    'Paper files and PDFs turned into organised records you can search. FirstNotch scans, imports, names and checks your documents in Colombo.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Document Processing | FirstNotch Solutions',
    description:
      'Turn paper files and PDFs into organised, searchable records with document processing support from Colombo.',
    type: 'website',
  },
};

export default function DocumentProcessingRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="overflow-x-clip">
        <DocumentProcessingPage />

        {/* Your existing contact form and footer */}
        <StoryContact />
      </main>
    </>
  );
}
