import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import CultureGalleryPage from "@/components/culture/CultureGalleryPage";

export const metadata: Metadata = {
  title: "Together | FirstNotch Culture",
  description:
    "Shared moments, friendships and team experiences at FirstNotch Solutions.",
};

const images = [
  "photo-1527529482837-4698179dc6ce",
  "photo-1511632765486-a01980e01a18",
  "photo-1529156069898-49953e39b3ac",
  "photo-1521737711867-e3b97375f902",
  "photo-1517245386807-bb43f82c33c4",
  "photo-1522071820081-009f0129c71c",
  "photo-1517486808906-6ca8b3f04846",
  "photo-1517457373958-b7bdd4587205",
  "photo-1506869640319-fe1a24fd76dc",
  "photo-1522202176988-66273c2fd55f",
  "photo-1531482615713-2afd69097998",
  "photo-1556761175-b413da4baf72",
  "photo-1524178232363-1fb2b075b655",
  "photo-1542744173-8e7e53415bb0",
  "photo-1516321318423-f06f85e504b3",
].map((id, index) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`,
  title: `Together ${String(index + 1).padStart(2, "0")}`,
  description: "More than colleagues.",
}));

export default function TogetherPage() {
  return (
    <>
      <Navbar />

      <CultureGalleryPage
        eyebrow="Better Together"
        title="More than colleagues."
        highlightedWord="colleagues."
        description="The strongest teams are built through shared experiences, conversations and the everyday moments that happen beyond the work itself."
        images={images}
      />

      <StoryContact />
    </>
  );
}