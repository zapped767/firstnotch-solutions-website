import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import CultureGalleryPage from "@/components/culture/CultureGalleryPage";

export const metadata: Metadata = {
  title: "Celebrations | FirstNotch Culture",
  description:
    "Celebrations, cultural traditions and memorable moments at FirstNotch Solutions.",
};

const images = [
  "photo-1519167758481-83f550bb49b3",
  "photo-1492684223066-81342ee5ff30",
  "photo-1507501336603-6e31db2be093",
  "photo-1513151233558-d860c5398176",
  "photo-1527529482837-4698179dc6ce",
  "photo-1530103862676-de8c9debad1d",
  "photo-1464349153735-7db50ed83c84",
  "photo-1472653431158-6364773b2a56",
  "photo-1496024840928-4c417adf211d",
  "photo-1519225421980-715cb0215aed",
  "photo-1507501336603-6e31db2be093",
  "photo-1519167758481-83f550bb49b3",
  "photo-1513151233558-d860c5398176",
  "photo-1492684223066-81342ee5ff30",
  "photo-1527529482837-4698179dc6ce",
].map((id, index) => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`,
  title: `Celebration ${String(index + 1).padStart(2, "0")}`,
  description: "Moments worth remembering.",
}));

export default function CelebrationsPage() {
  return (
    <>
      <Navbar />

      <CultureGalleryPage
        eyebrow="Celebrating Together"
        title="Moments worth remembering."
        highlightedWord="remembering."
        description="From cultural celebrations to everyday milestones, these are some of the moments that bring the FirstNotch team together."
        images={images}
      />

      <StoryContact />
    </>
  );
}