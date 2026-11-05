import type { Metadata } from "next";
import BookAFreeCallPage from "@/components/BookAFreeCallPage";

export const metadata: Metadata = {
  title: "Book a Free Discovery Call | FirstNotch Solutions",
  description:
    "Book a free discovery call with FirstNotch Solutions to discuss customer support, BPO and back-office outsourcing, IT services and your requirements.",
  alternates: {
    canonical: "/book-a-free-call",
  },
  openGraph: {
    title: "Book a Free Discovery Call | FirstNotch Solutions",
    description:
      "Talk to FirstNotch about the work you want to outsource. Free discovery call, around 30 minutes, with no obligation.",
    type: "website",
  },
};

export default function Page() {
  return <BookAFreeCallPage />;
}
