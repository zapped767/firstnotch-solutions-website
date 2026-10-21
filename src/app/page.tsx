
import HomeMotion from '../components/HomeMotion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Journey from '../components/Journey';
import StoryContact from '../components/StoryContact';

import {
  About,
  ClientStats,
  Hiring,
  QuoteBand,
  ResultsIndustries,
  Standards,
} from '../components/ContentBlocks';

export default function HomePage() {
  return (
    <HomeMotion>
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-white px-5 py-3 text-sm text-[#17191C] focus:translate-y-0"
      >
        Skip to content
      </a>

      {/* Existing Navbar */}
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        {/* Homepage Hero */}
        <Hero />

        {/* Statistics */}
        <ClientStats />

        {/* ORIGINAL WHY OUTSOURCE SECTION */}
        <About />

        {/* Services */}
        <Services />

        <QuoteBand index={0} />

        {/* Standards */}
        <Standards />

        <QuoteBand index={1} />

        {/* Hiring */}
        <Hiring />

        <QuoteBand index={2} />

        {/* Journey */}
        <Journey />

        <QuoteBand index={3} />

        {/* Results and Industries */}
        <ResultsIndustries />

        <QuoteBand index={4} />

        {/* Contact and Footer */}
        <StoryContact />
      </main>
    </HomeMotion>
  );
}
