
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import HowWeHirePage from '@/components/HowWeHirePage';

// ======================================================
// FIRSTNOTCH — HOW WE HIRE PAGE SEO
// ======================================================

const PAGE_PATH = '/how-we-hire';

const SEO_TITLE =
  'How We Hire | FirstNotch Solutions Sri Lanka';

const SEO_DESCRIPTION =
  'Discover how FirstNotch Solutions selects, trains and monitors its people. Language testing, practical assessments, experience reviews, reference checks and quality assurance.';

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    'FirstNotch Solutions hiring process',
    'How FirstNotch hires',
    'BPO recruitment Sri Lanka',
    'BPO employee screening',
    'outsourcing team recruitment',
    'employee training Colombo',
    'customer support agent training',
    'language assessment Sri Lanka',
    'technical skills assessment',
    'employee reference checks',
    'outsourcing quality assurance',
    'FirstNotch Solutions Sri Lanka',
  ],

  alternates: {
    canonical: PAGE_PATH,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    type: 'website',
    locale: 'en_GB',
    siteName: 'FirstNotch Solutions',
    url: PAGE_PATH,
  },

  twitter: {
    card: 'summary',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
};

// ======================================================
// FAQ STRUCTURED DATA
// ======================================================

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can we interview the people who will work on our account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. You can meet shortlisted staff on a video call before they join your account.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we add our own test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. A test or question set from your business can be added to the checks for your account.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which languages can the team work in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'English, Sinhala, Tamil and Hindi. Staff for your account are chosen to match the languages your customers use.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are team members employees or freelancers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'They are full-time employees of FirstNotch and work from the Colombo office.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if someone on our account leaves?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'A replacement goes through the same checks and training. The handover timing is agreed with you.',
      },
    },
  ],
};

// ======================================================
// HOW WE HIRE PAGE
// ======================================================

export default function HowWeHireRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="top">
        {/* EXISTING HOW WE HIRE PAGE */}
        <HowWeHirePage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>

      {/* FAQ STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(
            /</g,
            '\\u003c'
          ),
        }}
      />
    </>
  );
}
