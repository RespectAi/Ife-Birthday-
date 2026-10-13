# Operation Birthday Website (Pirah & Ife Mi)

A mobile-first, high-impact web application that hosts a private birthday experience for **Ifeoluwa Rose Bamidele** (*Ife Mi*) at `/birthday`, transitioning into a public business storefront for **Pirah** at `/`.

---

## Project Structure

```text
├── ANTIGRAVITY_WORKFLOW.md      # Implementation guidelines and phased delivery workflow
├── OPERATION_BIRTHDAY_WEBSITE.md # Product specification and single source of truth
├── DECISIONS.md                 # Architecture decisions, assumptions, and placeholder tracker
├── README.md                    # Setup, running, and deployment instructions
├── index.html                   # HTML entry point with Google Fonts preconnect
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite bundler configuration
├── public/                      # Static assets
│   ├── images/                  # Brand & product imagery (contains official pirah-logo.jpg)
│   └── audio/                   # Directory for optional lawful background audio
└── src/
    ├── config/
    │   └── business.js          # Central Pirah business configuration (WhatsApp number placeholder)
    ├── pages/
    │   ├── BirthdayPage.jsx     # Route shell for `/birthday` (private birthday experience)
    │   └── PirahPage.jsx        # Route shell for `/` (public Pirah business website)
    ├── styles/
    │   └── tokens.css           # Comprehensive design tokens (Pirah luxury & Birthday stationery)
    ├── App.jsx                  # Root router setup
    ├── App.css                  # Shell layout and component styling
    ├── index.css                # Global CSS reset & base element styling
    └── main.jsx                 # React root mount
```

---

## Quick Start & Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Start Development Server
Run Vite's local development server with hot module replacement (HMR):
```bash
npm run dev
```
Open your browser to the local URL (typically `http://localhost:5173`).
- **Pirah Business Route:** `http://localhost:5173/`
- **Birthday Experience Route:** `http://localhost:5173/birthday`

### 3. Production Build & Verification
Create an optimized static build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## Key Configurations & Placeholders

### Business WhatsApp Number Configuration
The WhatsApp phone number for Pirah is safely handled via `src/config/business.js`:
- Current state: `isConfigured: false` with placeholder `UNCONFIGURED_WHATSAPP_NUMBER`.
- Storefront behavior: Product cards show "Enquire on WhatsApp". Clicking them opens a modal with the prefilled message and a clear explanation that the business line is awaiting activation.
- **To activate live WhatsApp ordering:**
  1. Open [`src/config/business.js`](./src/config/business.js).
  2. Set `whatsapp.number` to the real phone number without `+` or spaces (e.g. `'2348012345678'`).
  3. Set `whatsapp.isConfigured` to `true`.
  4. Once updated, clicking any "Enquire on WhatsApp" button will instantly launch WhatsApp with that product's order text prefilled.

### Static Hosting & Deployment (Cloudflare Pages)
The application is pre-configured for free static hosting (e.g., Cloudflare Pages, Netlify, Vercel Static):
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **SPA Routing Redirects:** Automatically provided by [`public/_redirects`](./public/_redirects) (`/* /index.html 200`), copied to `dist/_redirects` on every build. Both `/` and `/birthday` support direct URL access and browser refreshes.

---

## Phased Implementation Roadmap

- [x] **Phase 0:** Inspect and scaffold (React + Vite + JS shell, routing, `.gitignore`, documentation, and placeholders)
- [x] **Phase 1:** Design foundation (brand assets, typography, color tokens, layout system, logo integration)
- [x] **Phase 2:** Birthday envelope interaction (CSS 3D envelope, sculpted burgundy rose seal, bloom animation)
- [x] **Phase 3:** Birthday letter and audio (letter content, Christian prayer, handwritten signature, audio control)
- [x] **Phase 4:** Pirah homepage and catalogue (catalogue data, responsive grid, real assets, WhatsApp order CTAs)
- [x] **Phase 5:** Scroll storytelling and reveal transition (logo reveal modal, connection tribute, route navigation)
- [x] **Phase 6:** Quality audit and launch preparation (mobile responsiveness, accessibility, SEO, build verification)


