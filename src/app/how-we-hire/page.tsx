
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import HowWeHirePage from '@/components/HowWeHirePage';

export const metadata: Metadata = {
  title: 'How We Hire | FirstNotch Solutions Sri Lanka',

  description:
    'Discover how FirstNotch Solutions selects, trains and monitors its people. Language testing, practical assessments, experience reviews, reference checks and quality assurance.',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'How We Hire | FirstNotch Solutions',

    description:
      'Only 15 to 20% of applicants pass the FirstNotch hiring checks. Learn how we select and train the teams working on client accounts.',

    type: 'website',
  },
};

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

export default function HowWeHireRoute() {
  return (
    <>
      <Navbar />

      <main id="top">
        <HowWeHirePage />
        <StoryContact />
      </main>

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
