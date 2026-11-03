import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import TechnicalSupportPage from "@/components/services/TechnicalSupportPage";
import StoryContact from "@/components/StoryContact";

export const metadata: Metadata = {
  title: "Technical Support Outsourcing in Sri Lanka | FirstNotch",

  description:
    "Technical support outsourcing in Sri Lanka for software and hardware questions, first-line helpdesk support, troubleshooting, escalation and customer issue reporting.",

  keywords: [
    "technical support outsourcing Sri Lanka",
    "technical support Sri Lanka",
    "helpdesk outsourcing Sri Lanka",
    "customer technical support",
    "software support outsourcing",
    "hardware support outsourcing",
    "technical support Colombo",
    "FirstNotch Solutions",
  ],

  alternates: {
    canonical: "/services/it-services/technical-support",
  },

  openGraph: {
    title: "Technical Support Outsourcing in Sri Lanka | FirstNotch",
    description:
      "A trained technical helpdesk for your customers, with troubleshooting, escalation rules and reporting from FirstNotch Solutions.",
    url: "/services/it-services/technical-support",
    siteName: "FirstNotch Solutions",
    type: "website",
    locale: "en_LK",
  },

  twitter: {
    card: "summary_large_image",
    title: "Technical Support Outsourcing in Sri Lanka | FirstNotch",
    description:
      "A trained technical helpdesk for your customers, with troubleshooting, escalation rules and reporting from FirstNotch Solutions.",
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
        <TechnicalSupportPage />
      </main>

      <StoryContact />
    </>
  );
}
