import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import CultureGalleryPage from "@/components/culture/CultureGalleryPage";

import {
  cultureGalleries,
  cultureSlugs,
} from "@/data/cultureGalleries";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return cultureSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const gallery = cultureGalleries[slug];

  if (!gallery) {
    return {};
  }

  return {
    title: `${gallery.title} | Culture at FirstNotch Solutions`,

    description: gallery.description,

    alternates: {
      canonical: `/culture/${gallery.slug}`,
    },

    openGraph: {
      title: `${gallery.title} | FirstNotch Culture`,
      description: gallery.description,
      type: "website",
    },
  };
}

export default async function CultureGalleryRoute({
  params,
}: PageProps) {
  const { slug } = await params;

  const gallery = cultureGalleries[slug];

  if (!gallery) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <CultureGalleryPage
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        highlightedWord={gallery.highlightedWord}
        description={gallery.description}
        images={gallery.images}
      />

      <StoryContact />
    </>
  );
}