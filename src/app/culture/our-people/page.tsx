import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import CultureGalleryPage from "@/components/culture/CultureGalleryPage";

export const metadata: Metadata = {
  title: "Our People | FirstNotch Culture",
  description: "Meet the people and teams behind FirstNotch Solutions.",
};

const images = [
  "photo-1529156069898-49953e39b3ac",
  "photo-1511632765486-a01980e01a18",
  "photo-1521737711867-e3b97375f902",
  "photo-1522071820081-009f0129c71c",
  "photo-1529156069898-49953e39b3ac",
  "photo-1517245386807-bb43f82c33c4",
  "photo-1522202176988-66273c2fd55f",
  "photo-1531482615713-2afd69097998",
  "photo-1556761175-b413da4baf72",
  "photo-1524178232363-1fb2b075b655",
  "photo-1542744173-8e7e53415bb0",
  "photo-1516321318423-f06f85e504b3",
  "photo-1551836022-d5d88e9218df",
  "photo-1497366754035-f200968a6e72",
  "photo-1497366811353-6870744d04b2",
].map((id, index) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`,
  title: `Our People ${String(index + 1).padStart(2, "0")}`,
  description: "The people behind FirstNotch.",
}));

export default function OurPeoplePage() {
  return (
    <>
      <Navbar />

      <CultureGalleryPage
        eyebrow="People of FirstNotch"
        title="The heart of FirstNotch."
        highlightedWord="FirstNotch."
        description="Different personalities, skills and experiences come together to shape the team behind FirstNotch."
        images={images}
      />

      <StoryContact />
    </>
  );
}