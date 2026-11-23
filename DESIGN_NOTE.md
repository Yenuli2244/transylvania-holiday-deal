### 2. `DESIGN_NOTE.md`

```markdown
# Design Note — Mysterious Vibes in Transylvania

## Layout & Section Structure
The page follows an **11-section vertical flow** structured to present package value clearly and guide visitors to enquiry:
1. **Top Navigation Bar:** Brand mark (`Lowcost Vibes`), section links (`Holidays`, `Destinations`, `Deals`, `Overview`, `Contact`), and primary `Enquire Now` CTA.
2. **Hero Section:** Full-bleed landscape backdrop with a dark gradient overlay for legibility, location eyebrow (`ROMANIA · EUROPE`), bold display headline (`MYSTERIOUS VIBES IN TRANSYLVANIA`), 4-day package overview, price callout (`£249 Per Person`), key inclusions, and primary/secondary CTAs (`Enquire Now`, `Explore the Trip`).
3. **Overview & Visual Grid (`#overview`):** Editorial package details paired with structured image cards.
4. **Trip Highlights (`#highlights`):** Scannable cards highlighting key trip inclusions and experience pillars.
5. **Glimpse of Bucharest:** Dedicated section paired with `/images/e3186e93f233efae7f920b93e6f791d1.jpg`.
6. **Seasons & Atmosphere:** Seasonal visual section paired with `/images/b2b7d31002926a362ce3ca0f11cd0e3c.jpg`.
7. **Culture & Heritage:** Destination narrative paired with `/images/Bucharest.jpg`.
8. **Excursions:** Dedicated excursion banner paired with `/images/default-excursions.webp`.
9. **Discover More:** Additional destination exploration section paired with `/images/243a3612-c6c2-4262-a303-9ed5c40b24dc.jpg`.
10. **Enquiry / Call-to-Action:** Dedicated booking enquiry section and interactive flow.
11. **Footer:** Supporting navigation, brand summary, and closing links.

## Color & Typography System
- **Primary Brand Accent:** Warm orange (`#F97316`) for primary CTAs and interactive hover states, paired with soft warm peach (`#FDE8DC`) for secondary buttons and warm off-white surfaces (`#FAF8F5`) for section contrast.
- **Dark Surfaces & Text:** Deep navy (`#070B34` / `#0B1120`) for text hierarchy, header contrast, and hero gradient overlays.
- **Typography:** Clean sans-serif hierarchy with bold uppercase display headings, clear pricing emphasis, and readable body spacing.

## Responsive & Technical Decisions
- **Mobile-First Breakpoints:** Responsive grid layouts, stacked or inline buttons (`w-full sm:w-auto`), and scaled spacing/typography across mobile, tablet (`sm`/`md`), and desktop (`lg`) viewports while preventing horizontal overflow.
- **Consistent Server/Client Rendering:** Deterministic class definitions and elements across server and client renders to avoid React hydration mismatches.
- **Explicit Asset Assignment:** Distinct `/images/...` paths assigned to individual sections (such as Glimpse of Bucharest vs. Excursions) so sections do not share unintended fallback imagery.
