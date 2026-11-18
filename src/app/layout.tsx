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

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://www.firstnotch-solutions.com'
).replace(/\/+$/, '');

// ======================================================
// GLOBAL METADATA
// ======================================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

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
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  category: 'Business Process Outsourcing',

  // ------------------------------------------------------
  // GOOGLE / BROWSER FAVICON
  // ------------------------------------------------------

  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  // ------------------------------------------------------
  // HOMEPAGE CANONICAL
  // ------------------------------------------------------

  alternates: {
    canonical: '/',
  },

  // ------------------------------------------------------
  // SEARCH ENGINE CRAWLING
  // ------------------------------------------------------

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

  // ------------------------------------------------------
  // OPEN GRAPH
  // ------------------------------------------------------

  openGraph: {
    type: 'website',
    locale: 'en_GB',

    siteName: SITE_NAME,

    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    url: SITE_URL,
  },

  // ------------------------------------------------------
  // X / TWITTER
  // ------------------------------------------------------

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
// ORGANIZATION STRUCTURED DATA
// ======================================================

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',

  '@id': `${SITE_URL}/#organization`,

  name: 'FirstNotch Solutions (Pvt) Ltd',
  alternateName: 'FirstNotch Solutions',

  url: SITE_URL,

  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon.png`,
  },

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
    email: 'info@firstnotch-solutions.com',
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
// WEBSITE STRUCTURED DATA
// Helps Google understand the website identity/site name
// ======================================================

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',

  '@id': `${SITE_URL}/#website`,

  url: SITE_URL,

  name: 'FirstNotch Solutions',
  alternateName: 'FirstNotch',

  publisher: {
    '@id': `${SITE_URL}/#organization`,
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
        {/* ==================================================
            ORGANIZATION STRUCTURED DATA
        ================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(
              /</g,
              '\\u003c'
            ),
          }}
        />

        {/* ==================================================
            WEBSITE STRUCTURED DATA
        ================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(
              /</g,
              '\\u003c'
            ),
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
              var navigation =
                performance.getEntriesByType('navigation');

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
                once: true,
              });

              window.addEventListener('pageshow', resetScroll, {
                once: true,
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}