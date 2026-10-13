# Operation Birthday Website --- Project Specification

**Version:** 1.0\
**Status:** Decisions frozen for the first implementation pass\
**Created:** 10 October 2026\
**Birthday deadline:** 14 October 2026\
**Primary implementer:** Antigravity CLI\
**Project owner / signature:** Moses

## 1. Project goal

Build one polished, mobile-first website that begins as a private
birthday experience for **Ifeoluwa Rose Bamidele**, affectionately
called **Ife Mi**, then offers a deliberate transition into the
public-facing business website for **Pirah**.

The birthday experience must feel personal, cinematic, and memorable.
The Pirah website must be useful to real customers, visually strong,
easy to maintain, and inexpensive to host.

This project has a short deadline. Prioritize a complete, polished,
reliable core experience over technically impressive features that risk
preventing launch.

## 2. People and tone

-   Recipient's full name: **Ifeoluwa Rose Bamidele**.
-   Affectionate name used in the birthday letter: **Ife Mi**.
-   Relationship: cousin and very good friend.
-   Sender/signature: **Moses**.
-   She is ambitious, resilient, supportive, kind, and beautiful.
-   The message should sound sincere, warm, playful, and personal---not
    like a generic greeting card.
-   Light affectionate/flirty teasing is acceptable as a joke between
    close cousins, but do not make the site feel like a romantic
    confession.
-   A familiar joke is asking when she will grow taller; use it gently
    near the end.
-   Do not invent specific shared memories or events.
-   Include a substantial Christian birthday prayer for her life,
    dreams, relationships, business, growth, and future.
-   Letter target: approximately 600--900 words.
-   The final sign-off should look handwritten and say **Moses**, with a
    small affectionate message beneath it.

## 3. Site architecture

Implement as **one React application** with two experiences:

-   `/birthday` --- birthday journey. It should remain accessible after
    the birthday.
-   `/` --- Pirah business homepage, the eventual primary public
    destination.
-   Additional `/shop`, `/about`, and `/contact` routes are optional.
    Prefer a small, coherent site over unnecessary route complexity. The
    product catalogue and business information may be implemented as
    sections on the homepage if that is simpler and clearer.

The birthday URL will be sent privately. Do not describe the route as
secure or secret. Do not put sensitive information on it. Add `noindex`
metadata to the birthday route where practical so it is not
intentionally indexed by search engines.

## 4. Birthday experience

### 4.1 First screen

-   Mobile-first and responsive, especially for iPhone XR/11-sized
    screens.
-   Start with an elegant, cinematic dark scene.
-   Show a centered cream stationery envelope.
-   Use the recipient's full name for the formal greeting where
    appropriate; use **Ife Mi** throughout the personal letter.
-   Keep the introduction short. Avoid a long loading screen or an
    unskippable animation.

### 4.2 Envelope and rose seal

-   Envelope: classic cream stationery, layered paper, dimensional
    shadows, refined details.
-   Seal: a sculpted burgundy/wine-red rose-shaped wax-seal-like flower,
    with dimensional petals---not merely a flat rose icon inside a
    standard circular seal.
-   On tapping the rose seal:
    1.  The rose gently blooms and glows.
    2.  The seal/envelope releases.
    3.  The envelope flap opens with a CSS 3D perspective effect.
    4.  The letter rises out of the envelope.
    5.  The letter settles and expands into a comfortable reading
        layout.
-   Use a dark cinematic background that gradually brightens as the
    envelope opens.
-   Make the interaction understandable on touchscreens. Include a
    visible accessible button/label, not only a decorative clickable
    object.
-   Use CSS 3D transforms, layered elements, shadows, and carefully
    timed transitions. Do not require a heavyweight 3D engine for the
    envelope.

### 4.3 Letter

-   The letter should become a large, readable page---not remain a tiny
    box in the middle of the screen.
-   Use a readable serif face for the body and a handwritten-style
    treatment for the signature.
-   Animate the opening/greeting and initial reveal gently. The main
    letter must then be readable at the reader's own pace; do not force
    word-by-word animation or make the user wait for every sentence.
-   Keep line length, font size, contrast, and spacing comfortable on
    mobile.
-   The letter must include genuine appreciation, acknowledgement of her
    support, playful warmth, and a strong Christian prayer.
-   Do not fabricate personal memories.

### 4.4 Music

-   Soft piano ambience may start only after the user taps the rose
    seal, respecting mobile autoplay restrictions.
-   Music stays quiet during the letter and fades during the transition
    to Pirah.
-   Include a visible mute/play control.
-   Use an original, public-domain, or clearly licensed audio asset. Do
    not download or embed copyrighted commercial music without
    permission.
-   If a suitable lawful audio asset is not readily available, ship
    without music rather than blocking the project.

### 4.5 Final birthday message and transition

-   After the letter, show a final birthday wish/prayer and a playful
    mystery message, such as: "You didn't think that was all, did you?
    😂" or "There's one more thing..."
-   The reader should choose when to continue. Do not automatically
    redirect.
-   A clear button advances to a short, dramatic Pirah logo reveal.
-   Fade out the music during the transition.
-   Then navigate to or reveal the Pirah business homepage.
-   The transition must be skippable/recoverable and must not trap the
    user.

## 5. Pirah business website

### 5.1 Known information and uncertainty

Known: - Business name: **Pirah**. - The owner has a dedicated business
WhatsApp number, but the number has not yet been supplied. - A logo and
product photographs are expected to be provided by the owner/user. -
Known product types include clothes, shoes, and palm slippers; only
include products supported by the supplied photographs/information.

Unknown and must not be invented: - WhatsApp number until supplied. -
Prices, sizes, stock, product descriptions beyond what can reasonably be
observed, delivery areas, physical address, payment methods, social
media URLs, business hours, guarantees, or policies.

Use clearly named placeholders in a single configuration/data file for
missing contact details. Make it easy to replace them later. Never
publish fake contact details or imply an unconfirmed delivery/payment
policy.

### 5.2 Core features

-   Strong homepage/brand introduction based on the supplied logo and
    product imagery.
-   Responsive product catalogue/grid.
-   Product-specific WhatsApp enquiry/order CTA, with a prefilled
    message that identifies the selected product.
-   Example message: "Hello Pirah! I'm interested in \[product name\]
    shown on your website. Could you please tell me more about it?"
-   No customer login, cart, online checkout, inventory management,
    admin dashboard, or database in this version.
-   If price information is unavailable, show an enquiry CTA rather than
    inventing prices.
-   Include only business information that is known and approved.
-   The site should be easy for the owner/user to update by editing a
    simple product data file and replacing image assets.

### 5.3 Scroll-driven visual direction

The business homepage should feel like a sequence of connected visual
scenes. As the visitor scrolls, sections/backgrounds and product imagery
should transform or move with a deliberate cinematic rhythm.

-   Prefer performant **2.5D** techniques: CSS transforms, layered
    imagery, sticky/pinned sections where appropriate, parallax,
    controlled scaling/positioning, and scroll-triggered transitions.
-   GSAP + ScrollTrigger may be used if it materially improves the
    experience and can be implemented reliably within the deadline.
-   Use Three.js/React Three Fiber only if a specific, worthwhile scene
    clearly requires it; it is not a default requirement.
-   The site should not become an exhausting animation demo. Keep text,
    navigation, product details, and CTAs clear and usable.
-   Provide graceful reduced-motion behavior and a static/low-motion
    fallback.

## 6. Visual design system

-   Overall feel: premium, elegant, emotional, cinematic, polished.
-   Initial tentative birthday palette: cream/champagne, burgundy/wine
    red, deep dark background, warm highlights.
-   The rose is a design motif linked to her middle name, **Rose**; do
    not claim it is her favourite flower.
-   The Pirah brand palette must be informed by the actual supplied
    logo. Do not force the birthday palette onto Pirah if it conflicts
    with the logo.
-   Use consistent typography, spacing, buttons, focus states, borders,
    shadows, and responsive breakpoints.
-   Do not use random gradients, generic template styling, or decorative
    effects that weaken readability.

## 7. Technical constraints

Preferred stack: - React + Vite + JavaScript. - CSS/CSS 3D transforms
for the envelope. - GSAP/ScrollTrigger only if useful for the
scroll-driven business scenes. - Static build; no production server,
database, authentication, or paid API required. - Keep dependencies
limited and document any added dependency. - Use semantic HTML and
reusable React components. - Keep content/product data separate from
layout and animation code. - Use the supplied logo and product images
once available. Do not invent replacement brand assets when the real
assets are forthcoming; use tasteful temporary placeholders during
development. - Do not add unnecessary TypeScript, Next.js, a backend, or
a database in this project unless a specific requirement justifies it.
The priority is to launch the experience, not to turn this into a
framework-learning exercise.

## 8. Performance, accessibility, SEO, and safety

-   Mobile-first; test at narrow phone widths and desktop.
-   Optimize/compress images and use responsive image sizing where
    possible.
-   Avoid huge assets and unnecessary libraries.
-   Respect `prefers-reduced-motion`; ensure animations do not block
    access to content.
-   Keyboard-operable buttons and navigation; visible focus indicators;
    meaningful alt text; sufficient contrast; labels for controls.
-   Ensure essential content and CTAs remain usable when animations fail
    or are reduced.
-   Add appropriate page titles, descriptions, Open Graph metadata,
    semantic headings, and basic structured content for the business
    site.
-   Birthday route should use `noindex` where practical.
-   No unexpected paid services or subscriptions.
-   No external trackers or unnecessary collection of personal data.
-   Check broken images, console errors, links, mobile overflow, and
    WhatsApp CTA generation before deployment.

## 9. Hosting and cost

Preferred target: a free static hosting option such as **Cloudflare
Pages**, subject to verifying current terms and build compatibility at
deployment time.

-   Do not select a hosting tier that forbids commercial use for Pirah.
-   Do not enable paid add-ons, paid APIs, or billing-dependent services
    without explicit approval.
-   A free hosting subdomain is acceptable for launch. A custom domain
    can be considered later; do not assume a free custom domain is
    available.
-   Confirm build output directory and deployment steps in the README.

## 10. Delivery priorities

In priority order: 1. Visual quality and emotional impact. 2. Minimal
hosting costs and no surprise charges. 3. Search-engine visibility for
Pirah. 4. Easy maintenance. 5. Loading speed. 6. Accessibility.

Performance and accessibility remain release requirements even though
they are lower in the preference ranking.

## 11. Acceptance checklist

### Birthday

-   [ ] `/birthday` loads directly on a phone and desktop.
-   [ ] The rose seal is visibly rose-shaped and dimensional.
-   [ ] Tapping it triggers the bloom, envelope opening, and letter
    emergence.
-   [ ] Letter is readable, scrollable, and not stuck in a tiny panel.
-   [ ] Full letter is approximately 600--900 words and includes a
    personal Christian prayer.
-   [ ] Signature reads "Moses".
-   [ ] Music starts only after interaction, has a mute control, and
    fades out; or the feature is omitted if no suitable licensed asset
    is available.
-   [ ] Final birthday message leads to a user-controlled Pirah reveal.
-   [ ] No automatic redirect and no trapped state.
-   [ ] Reduced-motion and keyboard behavior are usable.

### Pirah

-   [ ] `/` loads directly.
-   [ ] Supplied logo is used once available.
-   [ ] Product catalogue uses only supplied/confirmed items.
-   [ ] Product enquiries open WhatsApp with a product-specific
    prefilled message.
-   [ ] Missing business details are placeholders, not fabricated facts.
-   [ ] Scroll scenes feel connected but do not interfere with reading
    or shopping.
-   [ ] Mobile layout works without horizontal overflow.
-   [ ] SEO metadata and social preview metadata are present.

### Engineering/release

-   [ ] `npm run build` succeeds.
-   [ ] No critical console errors or broken assets.
-   [ ] README includes setup, run, build, deployment, and instructions
    for replacing images/contact details/products.
-   [ ] No paid services or billing-dependent features were added
    without approval.
