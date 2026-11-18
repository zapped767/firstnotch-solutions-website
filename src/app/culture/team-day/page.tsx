import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import CultureGalleryPage from "@/components/culture/CultureGalleryPage";

export const metadata: Metadata = {
  title: "Team Day | FirstNotch Culture",
  description: "Team days and shared experiences at FirstNotch Solutions.",
};

const images = [
  "photo-1511632765486-a01980e01a18",
  "photo-1527529482837-4698179dc6ce",
  "photo-1529156069898-49953e39b3ac",
  "photo-1521737711867-e3b97375f902",
  "photo-1517245386807-bb43f82c33c4",
  "photo-1506869640319-fe1a24fd76dc",
  "photo-1522071820081-009f0129c71c",
  "photo-1539635278303-d4002c07eae3",
  "photo-1539635278303-d4002c07eae3",
  "photo-1500530855697-b586d89ba3ee",
  "photo-1529156069898-49953e39b3ac",
  "photo-1527529482837-4698179dc6ce",
  "photo-1511632765486-a01980e01a18",
  "photo-1517486808906-6ca8b3f04846",
  "photo-1517457373958-b7bdd4587205",
].map((id, index) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`,
  title: `Team Day ${String(index + 1).padStart(2, "0")}`,
  description: "People beyond projects.",
}));

export default function TeamDayPage() {
  return (
    <>
      <Navbar />

      <CultureGalleryPage
        eyebrow="Life Beyond The Desk"
        title="People beyond projects."
        highlightedWord="projects."
        description="Team days give us time to step away from everyday work, spend time together and build relationships beyond projects."
        images={images}
      />

      <StoryContact />
    </>
  );
}