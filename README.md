# FirstNotch - Complete Next.js Project

Updated homepage using the supplied website copy and the previously approved FirstNotch layout. Next.js, TypeScript, Tailwind CSS, GSAP and Lenis. Application components are TSX files.

## Run on Windows

1. Extract the ZIP and open the folder containing package.json in VS Code.
2. Open Terminal > New Terminal in PowerShell.
3. Run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the localhost URL printed in your terminal. Node.js 22 or newer is required. Internet access is needed for dependency installation, Poppins and stock photographs.

## Included homepage content

- The supplied hero headline and introduction
- Six client logo placeholders
- 30+, 85%, 98% and four-language figures
- Why outsource to Sri Lanka
- Customer Support, BPO & Back Office and IT Services, including all service lists
- All five supplied testimonials
- Why clients stay with FirstNotch
- A careful hiring process and the 15 to 20% screening figure
- All four onboarding steps
- The three supplied recent results
- The four supplied industries
- Full discovery-call form, contact details, office hours and footer

Marketing copy comes from the supplied text. Short accessibility labels and form operation messages support the working interface.

## Motion and interaction

- Four hero layers moving at different speeds, including background -10% and foreground -30%
- Mixed-size bento cards and 0.12-second staggered reveals
- Lift, 1.02 scale, a pointer-tracked radial spotlight and subtle 3D tilt
- Poppins 300, 400, 500, 600 and 700
- Manual word-by-word opacity reveals linked to scroll
- Lenis connected to the GSAP ticker and ScrollTrigger
- Desktop pinned horizontal process story; native horizontal scrolling on smaller screens
- Magnetic primary buttons and a decorative cursor that grows over interactive elements
- An opening brand curtain, a faint noise layer and red gradient accents
- Reduced-motion support and cleanup of animations, listeners and the Lenis ticker

The palette stays FirstNotch Red #B12025, Midnight Charcoal #17191C and white. The requested gradient and glow effects use the existing brand colours.

## Images and client logos

Edit src/components/firstnotch/content.tsx. Replace the MEDIA URLs with /images/your-photo.jpg after adding photographs to public/images. The current photographs are stock placeholders. Add approved client logo paths to CLIENT_LOGOS; null entries display the supplied 'Client logo' placeholder. Official FirstNotch logo files extracted from the brand guide are included.

## Discovery-call form

The form includes all supplied fields and options. It validates input and prepares an email addressed to Info@firstnotch-solutions.com. The visitor reviews and sends it from their email app. A copyable draft is also provided. No backend delivery or calendar booking is configured, and no false sent confirmation is displayed.

## Checks

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd start
```

Production compilation and TypeScript are checked before packaging. Content, anchor targets, form labels and the ZIP contents are also checked. Browser visual testing was unavailable; check desktop, tablet, mobile, keyboard navigation and reduced-motion behaviour locally before release.

The ZIP excludes node_modules, .next, build outputs and local caches. The lockfile is included.

## Files to edit

- content.tsx: approved copy, image paths, figures and service arrays
- Hero.tsx: layered hero composition
- Navbar.tsx: responsive navigation and brand images
- Services.tsx: bento service cards
- ContentBlocks.tsx: statistics, Sri Lanka, testimonials, standards, hiring, results and industries
- Journey.tsx: horizontal process section
- StoryContact.tsx: discovery-call form and footer
- HomeMotion.tsx: page motion, hover effects, Lenis and cursor
- scroll.tsx: synchronises process navigation buttons with Lenis
- Photo.tsx: responsive stock and local images

## Technical reference

Lenis integration follows the official project documentation: https://github.com/darkroomengineering/lenis
