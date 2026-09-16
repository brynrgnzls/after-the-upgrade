# After the Upgrade // Sustainable Tech Advocacy Platform

> **Main Campaign Message:** *“A gadget’s usefulness should not end when you upgrade.”*  
> **Campaign Slogan:** *“Repair it. Reuse it. Return it responsibly.”*

“After the Upgrade” is an educational advocacy campaign promoting responsible electronic-waste management, hardware repair, creative reuse, safe donation, data protection, and sustainable technology consumption. It challenges the cycle of planned obsolescence and consumer tech disposability by empowering individuals and institutions with practical, truthful stewardship habits.

---

## 1. Target Audiences

- **Students & Youth Advocates:** Practical maintenance, campus repair initiatives, and digital inclusion drives.
- **Gadget Owners & Tech Consumers:** Diagnostic guidance, battery health preservation, and cost-effective repair thresholds.
- **Schools & Computer Laboratories:** Equipment triage frameworks, open-source refurbishing (e.g. lightweight Linux), and campus collection protocols.
- **Offices & Small Businesses:** Standardized data sanitization policies (NIST SP 800-88), responsible retirement paths, and certified recycler vetting.
- **Families with Unused Electronics:** Junk drawer audits, safe cable and adapter sorting, and curbside battery hazard prevention.
- **Technology Enthusiasts & Makers:** Modular hardware choices, creative repurposing projects, and right-to-repair advocacy.

---

## 2. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** CSS Modules with shared global CSS custom properties (Reclaimed Technology Editorial aesthetic)
- **Content Architecture:** Strongly-typed static JSON data files (`data/*.json`)
- **Client Storage:** Native browser IndexedDB (`AfterTheUpgradeDB`)
- **Linting & Code Quality:** ESLint with Next.js Core Web Vitals configuration
- **Target Output:** Completely static export (`output: 'export'` generating the `out/` distribution)
- **Zero-Dependency Core:**
  - Zero server-side API routes or middleware
  - Zero external database services or remote analytics
  - Zero third-party telemetry or authentication dependencies

---

## 3. Project Structure

```text
mite0005_final-requirement/
├── app/                              # Next.js App Router routes & layouts
│   ├── layout.tsx                    # Root semantic HTML layout (header, main, footer)
│   ├── page.tsx                      # Route: / (Campaign Homepage)
│   ├── page.module.css               # Homepage-specific CSS styles
│   ├── subpage.module.css            # Shared editorial subpage styles
│   ├── globals.css                   # Global variables, typography, and responsive reset
│   ├── not-found.tsx                 # Route: /_not-found (Custom 404 page)
│   ├── about/page.tsx                # Route: /about (Mission, origins, principles)
│   ├── e-waste-problem/page.tsx      # Route: /e-waste-problem (Crisis, urban mining, myths)
│   ├── extend-device-life/page.tsx   # Route: /extend-device-life (Maintenance, care, reuse)
│   ├── device-decision/page.tsx      # Route: /device-decision (Diagnostic questionnaire)
│   ├── safe-disposal/page.tsx        # Route: /safe-disposal (Battery hazards, recycler vetting)
│   ├── data-safety/page.tsx          # Route: /data-safety (Cryptographic wipe checklist)
│   ├── take-action/page.tsx          # Route: /take-action (IndexedDB checklist & pledge hub)
│   └── toolkit/page.tsx              # Route: /toolkit (Captions, schedule, prompts)
├── components/                       # Reusable React components
│   ├── campaign/                     # Interactive checklists & specialized views
│   ├── decision-tool/                # Device diagnostic questionnaire component
│   ├── layout/                       # Semantic Footer and structural components
│   ├── navigation/                   # Accessible responsive Navbar with mobile drawer
│   ├── take-action/                  # IndexedDB-backed action dashboard & pledge widget
│   ├── toolkit/                      # Searchable copy toolbox & 7-day schedule
│   └── ui/                           # Atoms: Buttons, Cards, Headings, Callouts, CTAs
├── data/                             # Pure campaign content datasets
│   ├── action-checklist.json         # Role-based community action items
│   ├── campaign.json                 # Core metadata, mission, principles, objectives
│   ├── data-safety-checklist.json    # 8-step sanitization checklist with OS guidance
│   ├── device-decisions.json         # 6 recommendation outcomes and device categories
│   ├── device-maintenance.json       # Nontechnical hardware care & reuse guides
│   ├── disposal-guidance.json        # Battery hazards, dual pathways, provider vetting
│   ├── learning-topics.json          # E-waste definitions, heavy metals, debunked myths
│   ├── social-posts.json             # Captions, hashtags, poster slogans, 7-day calendar
│   └── take-action-items.json        # 16 personal stewardship checklist challenges
├── lib/                              # Core application logic & TypeScript definitions
│   ├── campaign-data.ts              # Strongly-typed data accessors
│   ├── indexed-db.ts                 # Native IndexedDB wrapper & safe lifecycle manager
│   └── types.ts                      # Universal domain interfaces and data schemas
├── out/                              # Compiled static distribution (generated upon build)
├── public/                           # Static assets, vector icons, and favicon
├── next.config.ts                    # Next.js build configuration (`output: 'export'`)
├── tsconfig.json                     # TypeScript compiler configuration
└── package.json                      # Project dependencies and operational scripts
```

---

## 4. The Nine Campaign Routes

| Route | Page Name | Primary Purpose & Key Highlights |
| :--- | :--- | :--- |
| [`/`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/page.tsx) | **Campaign Home** | Campaign slogan, headline, dual primary CTAs, 3 core actions, topic previews, decision preview, pledge CTA. |
| [`/about`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/about/page.tsx) | **About the Campaign** | Founding mission, vision, 4 strategic objectives, 4 core principles, responsible consumption deep-dive, community playbooks. |
| [`/e-waste-problem`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/e-waste-problem/page.tsx) | **The E-Waste Problem** | Definition of e-waste, 4 equipment categories, compaction truck fire prevention, toxic heavy metals, urban mining economics, 5 debunked myths. |
| [`/extend-device-life`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/extend-device-life/page.tsx) | **Extend Your Device's Life** | 9 nontechnical modules: phone/laptop care, battery 80% rule, safe cleaning, storage, software reboots, repair vs. replace, creative reuse, safe donation, retirement rubric. |
| [`/device-decision`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/device-decision/page.tsx) | **Device Decision Tool** | Interactive diagnostic questionnaire (*“What Should I Do With This Device?”*), 7 diagnostic questions, 6 tailored recommendations, 50% economic repair rule. |
| [`/safe-disposal`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/safe-disposal/page.tsx) | **Safe Electronic Disposal** | Working vs. broken pathways, swollen battery emergency protocols, cable/charger segregation, drop-off prep, 6 questions to vet certified recyclers (R2v3 / e-Stewards). |
| [`/data-safety`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/data-safety/page.tsx) | **Data Safety & Sanitization** | Interactive 8-step sanitization checklist, cryptographic wiping vs. trash unlinking, Apple/Google/Windows platform tips, activation locks (Find My / FRP). |
| [`/take-action`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/take-action/page.tsx) | **Take Action & Pledge** | Device-local IndexedDB hub: 16 action challenges across 4 categories, live progress bar, advocacy pledge tool with duplicate prevention, confirmation-protected nuclear data reset. |
| [`/toolkit`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/app/toolkit/page.tsx) | **Campaign Toolkit** | Filterable social captions, hashtag groups, typographic poster headlines, seven-day campaign calendar, classroom discussion prompts, offline activity event guides. |

---

## 5. Local Development Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) version 18.18+ or 20+ (developed with Node v24.11.1)
- npm version 9+

### Installation
```bash
# Clone or navigate into the project directory
cd mite0005_final-requirement

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application with hot reloading.

### Running Quality Checks
```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Run ESLint validation
npm run lint
```

---

## 6. Static Build & Export Instructions

The application is configured for full static HTML export via `output: 'export'` in [`next.config.ts`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/next.config.ts).

```bash
# Execute production static build
npm run build
```

Upon completion, Next.js compiles and writes all static assets, HTML files, and optimized bundles directly into the `out/` directory:
- `out/index.html` (Home)
- `out/about.html`
- `out/e-waste-problem.html`
- `out/extend-device-life.html`
- `out/device-decision.html`
- `out/safe-disposal.html`
- `out/data-safety.html`
- `out/take-action.html`
- `out/toolkit.html`
- `out/404.html`

To preview the generated static output locally:
```bash
npx serve out
```

---

## 7. Deployment Instructions

Because the build produces pure static files (HTML, CSS, JavaScript, and SVG assets) with zero server runtime dependencies, it can be deployed to any static web hosting platform:

### A. Vercel
Connect your repository to Vercel. The framework preset will automatically detect Next.js. Ensure the build command is `npm run build` and the output directory is `out`.

### B. GitHub Pages
1. In your repository settings under **Pages**, set the Source to **GitHub Actions** or select the `gh-pages` branch.
2. Ensure images have `unoptimized: true` (already configured in [`next.config.ts`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/next.config.ts)).

### C. Cloudflare Pages / Netlify
Set build command to `npm run build` and publish directory to `out`.

### D. Traditional Web Servers (Apache / Nginx)
Copy the contents of `out/` directly into your web root directory (e.g. `/var/www/html`). Configure your server to serve `404.html` for unknown routes.

---

## 8. Architecture: JSON Content Management

All educational copy, campaign slogans, maintenance steps, and diagnostic rules are decoupled from presentation components and stored in clean, auditable JSON files in `data/`:

- **Strong Type Safety:** Every JSON structure is typed in [`lib/types.ts`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/lib/types.ts).
- **Centralized Data Accessors:** Handled through typed getters in [`lib/campaign-data.ts`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/lib/campaign-data.ts).
- **Truthful Content Standard:** All materials avoid unsourced statistics and provide factual, region-agnostic guidance without inventing fictional government collection programs or fake recycling partners.

---

## 9. Architecture: Device-Local IndexedDB (`AfterTheUpgradeDB`)

The application features a zero-backend, client-side database implemented through a reusable TypeScript wrapper in [`lib/indexed-db.ts`](file:///home/bryan-gonzales/Documents/mit/mite0005_final-requirement/lib/indexed-db.ts).

### Database Name
`AfterTheUpgradeDB` (Version `1`)

### Object Stores
1. **`pledges`** (Primary Key: `id`)
   - Fields: `id`, `pledgeVersion`, `completed`, `completedAt`
   - Stores the visitor's local community commitment and timestamp.
2. **`actionProgress`** (Primary Key: `id`, Index: `actionId`)
   - Fields: `id`, `actionId`, `completed`, `updatedAt`
   - Persists completion states for personal stewardship checklist challenges.
3. **`deviceDecisions`** (Primary Key: `id`)
   - Fields: `id`, `deviceType`, `recommendation`, `completedAt`
   - Logs completed hardware evaluations from the Decision Matrix tool.

### Robustness & Safety Controls
- **SSR Isolation:** Guarded with `isIndexedDBAvailable()` and React 19 `useSyncExternalStore` to ensure no browser APIs are invoked during server rendering or static prerendering.
- **Graceful Degradation:** If IndexedDB is blocked, disabled, or unavailable (e.g. strict private browsing mode or sandboxed iframes), the application seamlessly continues using in-memory React session state without crashing or freezing.
- **Confirmation Protection:** Permanent deletion of stored records requires explicit confirmation through an accessible modal dialog.

---

## 10. Data Privacy & Local-First Principles

- **Zero Cloud Tracking:** No personal data is transmitted across the network. There are no tracking pixels, analytics beacons, or remote logging.
- **Zero Personally Identifiable Information (PII):** The platform never asks for, captures, or stores names, email addresses, phone numbers, geolocation data, passwords, or account credentials.
- **Client Sovereignty:** All stored data lives strictly inside the visitor's local browser instance and can be purged at any time using the "Clear All Campaign Data" button on the Take Action page.
