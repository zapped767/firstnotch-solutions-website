import HomeMotion from '../components/firstnotch/HomeMotion';
import Navbar from '../components/firstnotch/Navbar';
import Hero from '../components/firstnotch/Hero';
import Services from '../components/firstnotch/Services';
import Journey from '../components/firstnotch/Journey';
import StoryContact from '../components/firstnotch/StoryContact';
import {
  About,
  ClientStats,
  Hiring,
  QuoteBand,
  ResultsIndustries,
  Standards,
} from '../components/firstnotch/ContentBlocks';

export default function HomePage() {
  return (
    <HomeMotion>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-white px-5 py-3 text-sm text-[#17191C] focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <ClientStats />
        <About />
        <Services />
        <QuoteBand index={0} />
        <Standards />
        <QuoteBand index={1} />
        <Hiring />
        <QuoteBand index={2} />
        <Journey />
        <QuoteBand index={3} />
        <ResultsIndustries />
        <QuoteBand index={4} />
        <StoryContact />
      </main>
    </HomeMotion>
  );
}
