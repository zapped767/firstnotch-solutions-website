
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// ======================================================
// FIRSTNOTCH SOLUTIONS — GLOBAL FONT
// ======================================================

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

// ======================================================
// GLOBAL SEO CONFIGURATION
// ======================================================

const SITE_NAME = 'FirstNotch Solutions';

const SITE_TITLE =
  'BPO Company in Sri Lanka | Outsourcing by FirstNotch';

const SITE_DESCRIPTION =
  'FirstNotch is a BPO company in Sri Lanka. We handle customer support, back office and IT services for businesses here and overseas. Book a free discovery call.';

// Set NEXT_PUBLIC_SITE_URL to your verified live domain
// in your .env.local / production environment.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');

// ======================================================
// GLOBAL METADATA
// ======================================================

export const metadata: Metadata = {
  ...(SITE_URL
    ? {
        metadataBase: new URL(SITE_URL),
      }
    : {}),

  applicationName: SITE_NAME,

  title: {
    default: SITE_TITLE,
    template: '%s | FirstNotch Solutions',
  },

  description: SITE_DESCRIPTION,

  keywords: [
    'BPO company in Sri Lanka',
    'BPO services Sri Lanka',
    'Outsourcing services Sri Lanka',
    'Customer support outsourcing',
    'Call center outsourcing',
    'Back office outsourcing',
    'Data entry services Sri Lanka',
    'Document processing services',
    'IT services Sri Lanka',
    'Web development Sri Lanka',
    'IT support services',
    'Offshore outsourcing',
    'FirstNotch Solutions',
  ],

  authors: [
    {
      name: SITE_NAME,
      ...(SITE_URL ? { url: SITE_URL } : {}),
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  category: 'Business Process Outsourcing',

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_GB',

    siteName: SITE_NAME,

    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    ...(SITE_URL ? { url: SITE_URL } : {}),
  },

  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// ======================================================
// VIEWPORT
// ======================================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

// ======================================================
// ORGANIZATION STRUCTURED DATA (JSON-LD)
// ======================================================

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',

  name: 'FirstNotch Solutions (Pvt) Ltd',

  ...(SITE_URL
    ? {
        url: SITE_URL,
        '@id': `${SITE_URL}/#organization`,
      }
    : {}),

  description:
    'A BPO company in Sri Lanka providing customer support, back office outsourcing and IT services.',

  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No 1A, 1/1 R A De Mel Mawatha',
    addressLocality: 'Colombo 4',
    addressCountry: 'LK',
  },

  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+94-77-222-1966',
    email: 'Info@firstnotch-solutions.com',
    contactType: 'sales',
    availableLanguage: [
      'English',
      'Sinhala',
      'Tamil',
      'Hindi',
    ],
  },
};

// ======================================================
// ROOT LAYOUT
// ======================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${poppins.variable} ${poppins.className} m-0 antialiased`}
      >
        {/* ORGANIZATION STRUCTURED DATA */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationSchema
            ).replace(/</g, '\\u003c'),
          }}
        />

        {/* EXISTING WEBSITE CONTENT */}

        {children}

        {/* ==================================================
            EXISTING SCROLL RESET SCRIPT
            PRESERVED WITHOUT DESIGN CHANGES
        ================================================== */}

        <Script
          id="firstnotch-scroll-reset"
          strategy="beforeInteractive"
        >
          {`
            (function () {
              // Prevent browser scroll restoration
              if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
              }

              // Detect a real browser refresh
              var navigation = performance.getEntriesByType('navigation');
              var isReload =
                navigation.length > 0 &&
                navigation[0].type === 'reload';

              if (!isReload) return;

              function resetScroll() {
                var html = document.documentElement;
                var previous = html.style.scrollBehavior;

                html.style.scrollBehavior = 'auto';
                window.scrollTo(0, 0);
                html.style.scrollBehavior = previous;
              }

              resetScroll();

              window.addEventListener('load', resetScroll, {
                once: true
              });

              window.addEventListener('pageshow', resetScroll, {
                once: true
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
