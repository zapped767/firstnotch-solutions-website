import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import StoryContact from '@/components/StoryContact';
import OutboundCallSupportPage from '@/components/services/OutboundCallSupportPage';

export const metadata: Metadata = {
  title: 'Outbound Call Center Services in Sri Lanka | FirstNotch Solutions',
  description: 'Campaign calling, payment reminders, appointment confirmations, surveys and lead follow-ups by trained FirstNotch agents. Approved scripts, CRM results and weekly reporting.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Outbound Call Support | FirstNotch Solutions',
    description: 'Follow-up calls and campaigns run on schedule, with each result logged in your CRM.',
    type: 'website',
  },
};

export default function OutboundCallSupportRoute() {
  return (
    <>
      <Navbar />
      <main id="top">
        <OutboundCallSupportPage />
        <StoryContact />
      </main>
    </>
  );
}
