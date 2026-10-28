
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import StoryContact from "@/components/StoryContact";
import ITSupportPage from "@/components/services/ITSupportPage";

export const metadata: Metadata = {
  title: "IT Support Services in Sri Lanka | FirstNotch",

  description:
    "Remote IT support services in Sri Lanka for businesses. Helpdesk tickets, login, email and system monitoring that finds problems early.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "IT Support Services | FirstNotch Solutions",

    description:
      "Remote helpdesk support, device setup, account management and monitoring from our team in Colombo.",

    type: "website",
  },
};

export default function ITSupportRoute() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <ITSupportPage />

        <StoryContact />
      </main>
    </>
  );
}
