# Design Note — Mysterious Vibes in Transylvania

## 1. Research References & Design Benchmarking
1. **Lowcost Vibes Official Website (`lowcostvibes.com`):** Reviewed the brand's visual identity, typography, color palette (deep navy paired with warm orange accents), navigation structure, and how short-break holiday packages present key inclusions and enquiry flows.
2. **Cheap Summer Holidays Website (`cheapsummerholidays.co.uk`):** Benchmarked promotional UK holiday deal layouts to see how per-person pricing (`£249`), flight-and-hotel highlights, scannable deal cards, and clear call-to-action buttons are structured to encourage quick enquiries.

## 2. Selling Point & Call-to-Action (CTA) Strategy
- **Core Selling Point:** A high-value, 4-day escape to Romania and Transylvania priced at **£249 per person**, bundling return flights from London, **3 nights at Parliament Hotel Bucharest (4★)**, and a **complimentary Transylvania Day Trip**—combining atmospheric European scenery, castles, and historic towns with transparent upfront pricing.
- **Primary & Secondary CTAs:**
  - **Primary CTA (`Enquire Now`):** Styled in high-contrast warm orange (`#F97316`) in the navigation bar, hero section, and dedicated enquiry/conversion section so visitors can act from any stage of the page.
  - **Secondary CTA (`Explore the Trip`):** Styled as a lighter contrasting button (`#FDE8DC`) alongside the primary CTA in the hero section, guiding users downward into the trip overview, highlights, and destination sections without competing visually with `Enquire Now`.

## 3. Desktop & Mobile Design Choices
- **Desktop Experience (`lg` and wider viewports):** Uses generous horizontal spacing, multi-column grids for package highlights and visual showcases, a persistent top navigation bar with direct section links (`Holidays`, `Destinations`, `Deals`, `Overview`, `Contact`) plus `Enquire Now`, and full-bleed photography framed with dark gradient overlays (`#070B34` / `#0B1120`) to preserve text legibility.
- **Mobile Experience (`< 640px` / mobile-first breakpoints):** Stacks action buttons cleanly (`w-full sm:w-auto`), collapses multi-column grids into single-column vertical flows, scales display typography and padding to prevent cramped lines or horizontal overflow (`overflow-x`), and keeps key pricing and CTA actions easy to tap on touchscreens.
- **Rendering & Asset Reliability:** Uses deterministic class names across server and client renders to avoid React hydration mismatches, and assigns explicit image paths under `public/images/` to individual sections (such as `/images/e3186e93f233efae7f920b93e6f791d1.jpg` for Glimpse of Bucharest and `/images/default-excursions.webp` for Excursions) so sections do not share unintended fallback images.

## 4. Data Assumptions
- **Package Pricing & Inclusions:** The advertised `£249 Per Person` rate, London return flights, 3-night stay at Parliament Hotel Bucharest (4★), and complimentary Transylvania Day Trip are treated as the baseline promotional offer displayed on the landing page; dynamic live availability, seat/room inventory, and real-time fare fluctuations are assumed to be handled post-enquiry rather than via a live booking engine.
- **Audience & Currency Context:** Copy, currency (`£` GBP), and departure origin (`London`) assume a UK-based leisure travel audience looking for short European city-and-region breaks.
- **Static & Local Media Assets:** Local images in `public/images/` are assumed to be pre-sized and available in the deployment bundle, and enquiry interactions are assumed to capture user intent cleanly without requiring prior account authentication to view the public site.
