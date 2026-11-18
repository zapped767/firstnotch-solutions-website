import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import CultureGalleryPage from "@/components/culture/CultureGalleryPage";

export const metadata: Metadata = {
  title: "Learning Together | FirstNotch Culture",
  description:
    "Learning, knowledge sharing and professional growth at FirstNotch Solutions.",
};

const images = [
  "photo-1522071820081-009f0129c71c",
  "photo-1524178232363-1fb2b075b655",
  "photo-1516321318423-f06f85e504b3",
  "photo-1522202176988-66273c2fd55f",
  "photo-1531482615713-2afd69097998",
  "photo-1542744173-8e7e53415bb0",
  "photo-1551836022-d5d88e9218df",
  "photo-1556761175-b413da4baf72",
  "photo-1497366754035-f200968a6e72",
  "photo-1497366811353-6870744d04b2",
  "photo-1497215842964-222b430dc094",
  "photo-1497366216548-37526070297c",
  "photo-1524758631624-e2822e304c36",
  "photo-1552664730-d307ca884978",
  "photo-1556761175-5973dc0f32e7",
].map((id, index) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`,
  title: `Learning ${String(index + 1).padStart(2, "0")}`,
  description: "Share. Learn. Grow.",
}));

export default function LearningPage() {
  return (
    <>
      <Navbar />

      <CultureGalleryPage
        eyebrow="Growth at FirstNotch"
        title="Share. Learn. Grow."
        highlightedWord="Grow."
        description="Growth happens faster when knowledge is shared. These moments represent learning, collaboration and development across the FirstNotch team."
        images={images}
      />

      <StoryContact />
    </>
  );
}