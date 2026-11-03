import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import WebsiteMaintenancePage from "@/components/services/WebsiteMaintenancePage";
import StoryContact from "@/components/StoryContact";

export const metadata: Metadata = {
  title: "Website Maintenance Services in Sri Lanka | FirstNotch",

  description:
    "Website maintenance services in Sri Lanka for updates, backups, security checks, uptime monitoring, small content changes and monthly reporting.",

  keywords: [
    "website maintenance Sri Lanka",
    "website maintenance services",
    "website support Sri Lanka",
    "WordPress maintenance Sri Lanka",
    "website security Sri Lanka",
    "website backups Sri Lanka",
    "website maintenance Colombo",
    "FirstNotch Solutions",
  ],

  alternates: {
    canonical: "/services/it-services/website-maintenance",
  },

  openGraph: {
    title: "Website Maintenance Services in Sri Lanka | FirstNotch",
    description:
      "Website updates, backups, security checks, uptime monitoring and monthly reporting from FirstNotch Solutions.",
    url: "/services/it-services/website-maintenance",
    siteName: "FirstNotch Solutions",
    type: "website",
    locale: "en_LK",
  },

  twitter: {
    card: "summary_large_image",
    title: "Website Maintenance Services in Sri Lanka | FirstNotch",
    description:
      "Website updates, backups, security checks, uptime monitoring and monthly reporting from FirstNotch Solutions.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="overflow-x-clip">
        <WebsiteMaintenancePage />
      </main>

      <StoryContact />
    </>
  );
}
