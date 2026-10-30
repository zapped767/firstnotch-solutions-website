
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import ITSupportPage from "@/components/services/ITSupportPage";

// ======================================================
// FIRSTNOTCH — IT SUPPORT SERVICES SEO
// ======================================================

const PAGE_PATH = "/services/it-services/it-support";

const SEO_TITLE =
  "IT Support Services in Sri Lanka | FirstNotch";

const SEO_DESCRIPTION =
  "Remote IT support services in Sri Lanka for businesses. Helpdesk tickets, login, email and system monitoring that finds problems early.";

// ======================================================
// NEXT.JS SEO METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    "IT support services Sri Lanka",
    "IT support outsourcing Sri Lanka",
    "remote IT support",
    "IT helpdesk services",
    "outsourced IT support",
    "business IT support Colombo",
    "remote helpdesk support",
    "IT troubleshooting services",
    "device setup and management",
    "Microsoft 365 support",
    "Google Workspace support",
    "IT system monitoring",
    "technical support outsourcing",
    "FirstNotch Solutions",
  ],

  alternates: {
    canonical: PAGE_PATH,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    type: "website",
    locale: "en_GB",
    siteName: "FirstNotch Solutions",
    url: PAGE_PATH,
  },

  twitter: {
    card: "summary",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
};

// ======================================================
// IT SUPPORT SERVICES PAGE
// ======================================================

export default function ITSupportRoute() {
  return (
    <>
      {/* EXISTING FIRSTNOTCH NAVBAR */}
      <Navbar />

      <main id="main-content">
        {/* EXISTING IT SUPPORT PAGE */}
        <ITSupportPage />

        {/* EXISTING CONTACT FORM AND FOOTER */}
        <StoryContact />
      </main>
    </>
  );
}
