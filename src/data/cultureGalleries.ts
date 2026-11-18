export type CultureGalleryImage = {
  src: string;
  title: string;
  description?: string;
};

export type CultureGallery = {
  slug: string;
  eyebrow: string;
  title: string;
  highlightedWord: string;
  description: string;
  images: CultureGalleryImage[];
};

export const cultureGalleries: Record<string, CultureGallery> = {
  teamwork: {
    slug: "teamwork",

    eyebrow: "Together at FirstNotch",

    title: "Different strengths. One team.",

    highlightedWord: "One team.",

    description:
      "Collaboration at FirstNotch is built around people sharing ideas, solving problems and helping each other deliver better work.",

    images: [
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85",
        title: "Working Together",
        description: "Different strengths. One shared goal.",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
        title: "Team Discussion",
        description: "Ideas become stronger when shared.",
      },
      {
        src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
        title: "Collaboration",
        description: "Working together across every challenge.",
      },
      {
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85",
        title: "Shared Ideas",
        description: "Better ideas through collaboration.",
      },
      {
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85",
        title: "Team Moments",
        description: "Building relationships beyond projects.",
      },
      {
        src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85",
        title: "Problem Solving",
        description: "Challenges solved together.",
      },
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85",
        title: "Knowledge Sharing",
        description: "Learning from each other.",
      },
      {
        src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=85",
        title: "Learning Together",
        description: "Share. Learn. Grow.",
      },
      {
        src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85",
        title: "Planning",
        description: "Turning ideas into action.",
      },
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
        title: "Digital Teamwork",
        description: "Connected through technology.",
      },
      {
        src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85",
        title: "Project Team",
        description: "Focused on the same outcome.",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
        title: "Brainstorming",
        description: "Every voice has value.",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=85",
        title: "Team Meeting",
        description: "Clear communication matters.",
      },
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
        title: "Our Workplace",
        description: "A space for people and ideas.",
      },
      {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
        title: "One Team",
        description: "Different strengths. One team.",
      },
    ],
  },

  // =====================================================
  // OUR PEOPLE
  // =====================================================

  "our-people": {
    slug: "our-people",

    eyebrow: "People of FirstNotch",

    title: "The heart of FirstNotch.",

    highlightedWord: "FirstNotch.",

    description:
      "Different personalities, skills and experiences come together to shape the team behind FirstNotch.",

    images: createGalleryImages(
      "Our People",
      "The people behind FirstNotch."
    ),
  },

  // =====================================================
  // TEAM DAY
  // =====================================================

  "team-day": {
    slug: "team-day",

    eyebrow: "Life Beyond The Desk",

    title: "People beyond projects.",

    highlightedWord: "projects.",

    description:
      "Team days give us time to step away from everyday work, spend time together and build relationships beyond projects.",

    images: createGalleryImages(
      "Team Day",
      "People beyond projects."
    ),
  },

  // =====================================================
  // CELEBRATIONS
  // =====================================================

  celebrations: {
    slug: "celebrations",

    eyebrow: "Celebrating Together",

    title: "Moments worth remembering.",

    highlightedWord: "remembering.",

    description:
      "From cultural celebrations to everyday milestones, these are some of the moments that bring the FirstNotch team together.",

    images: createGalleryImages(
      "Celebration",
      "Moments worth remembering."
    ),
  },

  // =====================================================
  // TOGETHER
  // =====================================================

  together: {
    slug: "together",

    eyebrow: "Better Together",

    title: "More than colleagues.",

    highlightedWord: "colleagues.",

    description:
      "The strongest teams are built through shared experiences, conversations and the everyday moments that happen beyond the work itself.",

    images: createGalleryImages(
      "Together",
      "More than colleagues."
    ),
  },

  // =====================================================
  // LEARNING
  // =====================================================

  learning: {
    slug: "learning",

    eyebrow: "Growth at FirstNotch",

    title: "Share. Learn. Grow.",

    highlightedWord: "Grow.",

    description:
      "Growth happens faster when knowledge is shared. These moments represent learning, collaboration and development across the FirstNotch team.",

    images: createGalleryImages(
      "Learning",
      "Share. Learn. Grow."
    ),
  },
};

function createGalleryImages(
  title: string,
  description: string
): CultureGalleryImage[] {
  const imageIds = [
    "photo-1522071820081-009f0129c71c",
    "photo-1556761175-b413da4baf72",
    "photo-1521737711867-e3b97375f902",
    "photo-1517245386807-bb43f82c33c4",
    "photo-1529156069898-49953e39b3ac",
    "photo-1531482615713-2afd69097998",
    "photo-1522202176988-66273c2fd55f",
    "photo-1524178232363-1fb2b075b655",
    "photo-1542744173-8e7e53415bb0",
    "photo-1516321318423-f06f85e504b3",
    "photo-1551836022-d5d88e9218df",
    "photo-1556761175-5973dc0f32e7",
    "photo-1556761175-4b46a572b786",
    "photo-1497366754035-f200968a6e72",
    "photo-1497366811353-6870744d04b2",
  ];

  return imageIds.map((id, index) => ({
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`,

    title: `${title} ${String(index + 1).padStart(2, "0")}`,

    description,
  }));
}

export const cultureSlugs = Object.keys(cultureGalleries);