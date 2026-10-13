# Architecture & Implementation Decisions (DECISIONS.md)

This log records implementation choices, conservative assumptions, approved deviations, and unresolved placeholders for **Operation Birthday Website**.

---

### Record of Decisions

#### DEC-001: Framework and Build Tooling Selection
* **Context:** The project requires a fast, lightweight, mobile-first static build with minimal configuration and no backend overhead.
* **Decision:** Initialized React (v19) + Vite (v8) + JavaScript using React Router DOM (v7) for SPA client-side routing.
* **Rationale:** Aligns strictly with `OPERATION_BIRTHDAY_WEBSITE.md` (Section 7), provides instant HMR during development, and produces a purely static `/dist` bundle suitable for free static hosting (Cloudflare Pages).

#### DEC-002: Dual-Route Architecture
* **Context:** The site serves two distinct purposes: a private birthday experience for Ifeoluwa Rose Bamidele (*Ife Mi*) and a public-facing commercial website for *Pirah*.
* **Decision:** 
  - `/` is designated as the primary public route for the Pirah business homepage.
  - `/birthday` is designated as the private birthday experience.
* **Rationale:** As outlined in the spec, `/birthday` will be shared directly with the recipient, while `/` serves as the long-term public storefront for the business.

#### DEC-003: Unresolved WhatsApp Business Number Placeholder
* **Context:** The business owner has a dedicated WhatsApp line, but the phone number has not yet been provided.
* **Decision:** Created `src/config/business.js` with `PIRAH_CONFIG.whatsapp.number = null` and a clear placeholder string (`UNCONFIGURED_WHATSAPP_NUMBER`). The inquiry CTA remains disabled in the UI until the real number is supplied.
* **Rationale:** Specification rule: *“Do not invent prices, addresses, delivery areas, sizes, stock, social accounts, or policies. If the real WhatsApp number is not yet supplied, keep the CTA wired to a clearly marked placeholder and report it as a launch blocker—not a fake number.”*

#### DEC-004: Static Build & Cost Constraint
* **Context:** The site must incur no hosting fees and avoid complex server requirements.
* **Decision:** No backend, database, authentication, or paid APIs have been introduced.
* **Rationale:** Preserves free tier compatibility on static hosts (e.g., Cloudflare Pages) with zero ongoing hosting expense.

#### DEC-005: Search Indexing for Birthday Route
* **Context:** The birthday route is personal and intended for private sharing.
* **Decision:** Added client-side `noindex, nofollow` robots metadata injection to the `/birthday` route.
* **Rationale:** Discourages search engine indexing while avoiding misleading claims of cryptographic security or secret authentication.

#### DEC-006: Staged Implementation Boundary
* **Context:** Phase 0 strictly prohibits building animations, envelope interaction, letter content, audio, or business catalogue prematurely.
* **Decision:** Built minimal, semantic component shells for `/` and `/birthday` highlighting the scope of subsequent phases.
* **Rationale:** Adheres strictly to `ANTIGRAVITY_WORKFLOW.md` staged delivery rules.

#### DEC-007: Official Pirah Logo Asset Integration & Brand Palette
* **Context:** The official logo was supplied at `public/images/Pirah Logo.jpg` (859 x 1145 px).
* **Decision:** Integrated the logo preserving its exact aspect ratio, and extracted its visual palette into design tokens: Near-black (`#070709`), Charcoal (`#121318`), Metallic Gold (`#D4AF37`), Metallic Silver (`#C0C7D0`), and Warm Ivory (`#FBF9F5`). Provided a web-safe copy at `public/images/pirah-logo.jpg`.
* **Rationale:** Adheres to Phase 1 rules by using the authentic brand asset without alteration or distortion, grounding Pirah's identity in the supplied artwork.

#### DEC-008: Asset Directory Organization
* **Context:** The application will require product imagery in Phase 4 and optional audio in Phase 3.
* **Decision:** Structured `public/images/` for imagery and `public/audio/` for audio. No placeholder or fictitious product images were downloaded or fabricated.
* **Rationale:** Ensures clean asset separation and avoids polluting the repository with unauthorized or fabricated media.

#### DEC-009: Decoupled Design Tokens for Dual Experiences
* **Context:** The birthday experience and Pirah business site serve different emotional contexts and must not share the exact same palette.
* **Decision:** Established `src/styles/tokens.css` with shared scales (typography, spacing, shadows, motion) while decoupling color tokens: Pirah utilizes the luxury dark/gold/silver/ivory spectrum, whereas the birthday route utilizes a cinematic dark background with cream stationery, warm gilt, and burgundy wine-red rose accents.
* **Rationale:** Honoring the spec mandate: *“The birthday and Pirah experiences should feel related through quality and polish, not forced into the same colour palette.”*

#### DEC-010: Sculpted Rose Seal Dimensional SVG Artwork
* **Context:** The spec strictly prohibits flat rose emojis or generic circular seals with an icon, requiring a sculpted, dimensional burgundy rose seal with realistic petals.
* **Decision:** Created `SculptedRoseSeal.jsx` featuring multi-tiered organic SVG petals (outer leaves, mid-cup, inner swirl, core whorl) with rich wine-to-burgundy gradients, molten wax flange, subtle drop shadows, and delicate golden rim sheens.
* **Rationale:** Delivers high visual fidelity and artisanal physical feel with zero external 3D libraries or image file dependencies.

#### DEC-011: Coordinated Staged Sequence for 3D Envelope Opening
* **Context:** The envelope opening must feel cinematic and deliberate without awkward jumps or heavy WebGL libraries.
* **Decision:** Built a multi-step state machine (`SEALED` → `BLOOMING` [650ms] → `OPENING` [600ms] → `RISING` [700ms] → `EXPANDING` [750ms] → `OPENED`) powered by CSS 3D perspective (`perspective: 1400px`, `transform-style: preserve-3d`, `rotateX(180deg)`).
* **Rationale:** Provides smooth 60fps performance on mobile devices (e.g. iPhone XR/11) with authentic paper perspective depth.

#### DEC-012: Expanded Parchment Reading Surface and Replay Mechanism
* **Context:** The letter must become a prominent, comfortable reading page rather than remaining stuck in a small envelope box.
* **Decision:** Implemented `.expanded-letter-container` that unfolds and settles into a `max-width: 680px` parchment surface while the envelope recedes as a subtle pedestal. Added a replay/reset control allowing the user to re-seal and re-watch the animation.
* **Rationale:** Balances physical paper realism during the opening transition with optimal reading ergonomics on screens.

#### DEC-013: Accessibility, Live Regions, and Reduced Motion Support
* **Context:** The animation must be keyboard-accessible, screen-reader friendly, and respectful of reduced motion settings.
* **Decision:** Enabled keyboard focus on the seal button with clear focus rings, added an `aria-live="polite"` dynamic announcement describing each animation phase, provided a "Skip opening animation" button, and bypassed animations immediately when `prefers-reduced-motion` is active.
* **Rationale:** Ensures compliance with Phase 2 accessibility requirements without detracting from the cinematic experience.

#### DEC-014: Sculptural Burgundy Rose Asset with Clean Transparency
* **Context:** The initial SVG rose illustration appeared too flat and stylized. A realistic, three-dimensional sculptural flower with individually formed curling petals and directional highlights was required.
* **Decision:** Generated a high-resolution sculptural burgundy rose asset and processed it into a clean, transparent PNG (`public/images/sculpted-rose-seal.png`), integrated with gentle bloom radiance and restrained lighting in `SculptedRoseSeal.jsx`.
* **Rationale:** Delivers artisanal physical beauty and organic petal depth while keeping the asset lightweight with zero runtime overhead.

#### DEC-015: Physical Pointed-Flap Envelope Reconstruction
* **Context:** The initial envelope flap geometry appeared inverted and lacked authentic paper fold seams.
* **Decision:** Reconstructed the envelope as a realistic pointed-flap stationery envelope: the triangular top flap is hinged along the envelope's top edge, pointing downward over the front pocket when sealed, and rotating upward and backward (`rotateX(180deg)`) upon opening to reveal the silk interior lining.
* **Rationale:** Accurately mimics physical stationery kinematics with believable paper fold seams and ambient shadows.

#### DEC-016: Letter-in-Pocket Layered Composition & Internal Scrolling
* **Context:** The letter should not detach and float as a separate full-screen card, but must remain visibly emerging from and framed by the physical envelope pocket.
* **Decision:** Layered the composition so the envelope back and open flap sit at the rear (`z-index: 10`), the letter paper rises from inside the pouch (`z-index: 20`), and the envelope front pocket remains in the foreground (`z-index: 30`) overlapping the lower portion of the letter. Made the letter's inner content scrollable (`overflow-y: auto`) with a custom gilt scrollbar.
* **Rationale:** Maintains the intimate physical presence of the stationery envelope throughout the reading experience while providing comfortable reading ergonomics on mobile screens.

#### DEC-017: Deliberate Cinematic Animation Pacing
* **Context:** The initial sequence felt too fast (~2.7s) to appreciate the emotional physical transition.
* **Decision:** Expanded the staged animation sequence to ~4.6s: Rose Bloom (~1.2s) → Flap Opening (~1.2s) → Letter Emergence (~1.4s) → Settling (~0.8s).
* **Rationale:** Creates a graceful, cinematic rhythm with smooth physical continuity, while providing an instant skip option and respecting reduced-motion preferences.

#### DEC-018: User Visual Reference & Motion Video Calibration
* **Context:** Moses provided two specific visual assets (authentic blooming deep red rose and luxury white/ivory woven linen envelope) and two reference motion videos in `public/Video/` (`Env Open.mp4` and `Env Letter out .mp4`).
* **Decision:** 
  1. Extracted and integrated Moses' exact chosen red rose as a high-resolution transparent asset (`public/images/chosen-rose.png`).
  2. Implemented the fine linen woven paper cross-hatching pattern (`#linenPocketWeave`, `#linenFlapFront`, `#linenBackWeave`) and pointed flap geometry directly inspired by Moses' envelope reference image.
  3. Calibrated the letter emergence motion from `Env Letter out .mp4`: letter glides straight upward out of the pocket, resting with the lower portion firmly nestled inside the foreground pocket.
* **Rationale:** Faithfully reflects the user's explicit aesthetic direction and motion references while maintaining responsive mobile ergonomics and clean code boundaries.

#### DEC-019: Rose Petal Unfolding Mechanics & Envelope Emergence Refinements
* **Context:** User feedback identified three specific issues: (1) the letter paper momentarily peeked below the envelope before sliding out; (2) the letter needed to emerge higher and settle more prominently; (3) the glowing rays/sparkles were undesirable—the rose itself should physically unfold its petals.
* **Decision:**
  1. **Physical Petal Unfolding:** Decomposed the chosen rose into three concentric dimensional layers (`rose-outer.png`, `rose-mid.png`, `rose-core.png`). On tap, the outer petals peel and tilt outward in 3D perspective (`scale(1.18) rotate(14deg) rotateX(12deg)`), the mid cup unrolls in counter-rotation (`scale(1.12) rotate(-22deg) rotateY(-8deg)`), and the core heart blossoms open (`scale(1.24) rotate(12deg)`). Removed all artificial glowing rays and emoji sparkles.
  2. **Zero-Leak Bottom Seam Clipping:** Applied a bottom-seam boundary clip (`clip-path: polygon(-30% -300%, 130% -300%, 130% 100%, -30% 100%)`) to the envelope container and maintained `opacity: 0` until `stage-rising` begins, guaranteeing that the letter can never show below the envelope at any point.
  3. **Higher Emergence & Settling:** Increased letter emergence to `-155px` (desktop) and `-135px` (mobile), revealing the full formal greeting and preview content while keeping the lower half securely held inside the foreground linen pocket. Adjusted upper clearance to preserve header visibility.
* **Rationale:** Resolves the visual glitch, honors user feedback, and achieves natural botanical blooming without artificial overlay effects.

#### DEC-020: Phase 3 Birthday Letter Content & Background Audio Integration
* **Context:** Phase 3 requires the complete birthday letter for Ifeoluwa Rose Bamidele (*Ife Mi*) from Moses (Birthday: 14 October) and a background piano music experience using the audio provided in `public/audio/`.
* **Decision:**
  1. **Protected Phase 2 Integrity:** Maintained the exact 3-layer sculpted rose petal unfolding, pointed-flap kinematics, and envelope pocket framing without refactoring or breaking existing `/` or `/birthday` components.
  2. **Verbatim Letter Integration:** Integrated Moses' complete, unaltered letter copy inside `.letter-scroll-area` with smooth independent scrolling (`overflow-y: auto`), custom gilded scrollbar, and 12rem bottom scroll padding ensuring Moses' signature (`Moses ❤️`) scrolls fully into the framed reading window.
  3. **Typography & Styling:** Formatted with Cormorant Garamond headings, EB Garamond body prose, Caveat script signature, an elegant humor card (`.letter-humor-card`) for the cousin banter, and an ornate benediction box (`.letter-benediction-box`) for the Christian prayer.
  4. **Audio Architecture:** Configured `public/audio/leberch-happy-birthday-581704.mp3` (soft piano instrumental "Happy Birthday" by Leberch via Pixabay Content License, royalty-free for commercial/personal use). Audio starts exclusively on user interaction (rose tap), ramping gently from 0 to 0.35 volume over 2.5s. Added an accessible floating toggle button with animated equalizer bars for mute/unmute control that does not disturb the envelope state, and guaranteed clean cleanup on route unmount.
  5. **Strict Scope Control:** Did not advance to Phase 4 (no Pirah transition, mystery reveal, catalogue, or WhatsApp integration).
* **Rationale:** Fulfills all Phase 3 requirements with authentic, emotional resonance, robust mobile ergonomics, and strict compliance with browser audio autoplay policies.

#### DEC-021: Pirah Storefront Architecture, Real Assets, & Safe WhatsApp Protocol
* **Context:** The final phase requires a complete, responsive storefront for **Pirah Store** at `/` using real available assets and strict protection against fabricated business data.
* **Decision:**
  1. **Authentic Assets & Data Structure:** Created `src/data/products.js` mapped directly to the 5 authentic boutique photos in `public/images/`:
     - `IMG-20261008-WA0001.jpg`: Signature Textured Knit Polo (Clothes)
     - `IMG-20261008-WA0002.jpg`: Heavyweight Boxy Crewneck Tee (Clothes)
     - `IMG-20261008-WA0004.jpg`: Curated Retro Low-Top Sneakers (Shoes)
     - `IMG-20261008-WA0000.jpg`: Chrome Split-Toe Leather Mules (Shoes / Palm Slippers)
     - `IMG-20261008-WA0008.jpg`: Suede Double-Strap Clog Slides (Palm Slippers / Shoes)
  2. **Zero Fabricated Data:** Did not invent prices, sizes, stock counts, physical addresses, or delivery charges. Cards clearly state *"Enquire for size availability & pricing"*.
  3. **Safe WhatsApp Protocol:** If `PIRAH_CONFIG.whatsapp.isConfigured` is `false`, clicking an enquiry button opens an honest configuration modal showing the exact prefilled message and explaining the line is awaiting activation (`UNCONFIGURED_WHATSAPP_NUMBER`), rather than silently failing. When configured with a real phone number, it opens direct `https://wa.me/...` links in a new tab.
  4. **Category Filtering:** Implemented instantaneous tab filtering (`All Items`, `Clothes`, `Shoes`, `Palm Slippers & Slides`).
* **Rationale:** Conforms strictly to business reality, protects brand integrity, and enables zero-effort activation when the real phone number is supplied.

#### DEC-022: Birthday Surprise Reveal Sequence & Non-Intrusive Audio Continuity
* **Context:** The transition from the intimate birthday letter to the Pirah business storefront must feel warm, personal, and surprising—without interrupting the recipient's reading experience.
* **Decision:**
  1. **User-Triggered Reveal:** Placed a subtle gold-embossed invitation (`.letter-reveal-invitation`) right beneath Moses' handwritten signature inside the framed letter, plus an action pill in the bottom controls bar. The reveal never auto-triggers.
  2. **Dedicated Logo Moment:** The reveal opens a celebratory dark/gold modal (`.birthday-reveal-overlay`) featuring personal celebratory copy recognizing Ifeoluwa's entrepreneurial ambition, paired with a hero stage displaying the authentic Pirah Logo framed in radiant champagne gold with ambient halo pulsation.
  3. **Audio Continuity:** Background piano music is untouched and continues playing seamlessly during the reveal without restarting or skipping.
  4. **Direct Navigation:** Provides clear buttons to visit the Pirah storefront (`/`) or return to the letter.
* **Rationale:** Creates an emotionally resonant climax that elevates her birthday while honoring her business ambition.

#### DEC-023: Production Routing & Cloudflare Pages Static Single-Page App Deployment
* **Context:** SPA client-side routing on static hosting (like Cloudflare Pages) requires deep linking and browser refresh fallback to `index.html`.
* **Decision:** Created `public/_redirects` configured with `/* /index.html 200`, automatically copied by Vite into `dist/_redirects` upon build. Documented build command (`npm run build`) and output directory (`dist`).
* **Rationale:** Ensures flawless route navigation and browser refreshing across both `/` and `/birthday` in production without requiring server-side runtimes.


