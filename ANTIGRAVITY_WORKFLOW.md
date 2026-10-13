# Antigravity CLI --- Working Rules for Operation Birthday Website

This file governs how to implement the project described in
`OPERATION_BIRTHDAY_WEBSITE.md`.

## Non-negotiable workflow

**Do not attempt to build the entire website in one pass. Work in the
phases below.**

1.  Read `OPERATION_BIRTHDAY_WEBSITE.md` and this file before making
    changes.
2.  Treat the specification as the source of truth. Do not silently
    change decisions or invent business details.
3.  Implement only the current phase requested by Moses.
4.  At the end of each phase:
    -   run relevant checks/build;
    -   report files created/changed;
    -   list tests actually performed and their results;
    -   identify unresolved blockers and assumptions;
    -   stop and wait for Moses to approve the next phase.
5.  Do not proceed to a later phase merely because it seems convenient.
6.  If a requirement is ambiguous but non-blocking, make a conservative,
    reversible choice and record it in `DECISIONS.md`; do not interrupt
    progress with repeated questions.
7.  Ask Moses only when a genuinely blocking decision cannot be handled
    with a placeholder or safe default.
8.  Never claim to have tested a behavior you did not actually test.
9.  Do not add paid services, paid APIs, billing-dependent products, or
    a backend/database without explicit approval.
10. Keep project documentation current. If a specification change is
    approved, update the spec/decision log before implementing the
    change.

## Project phases

### Phase 0 --- Inspect and scaffold

-   Inspect the current directory before modifying it.
-   If no project exists, initialize React + Vite + JavaScript in the
    current project directory.
-   Create/update `README.md`, `DECISIONS.md`, and `.gitignore`.
-   Add a simple app shell and routes for `/` and `/birthday`.
-   Add a clearly labelled placeholder configuration for Pirah's
    WhatsApp number.
-   Do not build final animations or the full catalogue yet.
-   Run the initial development/build checks and stop.

### Phase 1 --- Design foundation

-   Inspect available logo/product assets and record their actual
    filenames/dimensions.
-   Establish shared typography, spacing, responsive layout, buttons,
    and color tokens.
-   If brand assets are not present yet, use temporary neutral
    placeholders and document where supplied files should be placed.
-   Build only the visual foundations and route shells.
-   Run checks and stop.

### Phase 2 --- Birthday envelope interaction

-   Build the envelope, sculpted rose seal, bloom/glow, flap opening,
    letter emergence, and expansion.
-   Prioritize CSS 3D and mobile performance.
-   Provide accessible interaction and reduced-motion behavior.
-   Use placeholder letter content until the approved letter is added in
    Phase 3.
-   Test and stop.

### Phase 3 --- Birthday letter and audio

-   Add the complete letter consistent with the spec and Moses's voice.
-   Keep it readable and easy to scroll.
-   Add optional licensed/original/public-domain piano audio only if a
    suitable asset is available; otherwise omit music without blocking
    launch.
-   Add the final birthday message and the user-controlled continuation
    button.
-   Test and stop.

### Phase 4 --- Pirah homepage and catalogue

-   Build a polished responsive homepage and product catalogue using
    supplied assets where available.
-   Keep products in a simple data file.
-   Implement product-specific WhatsApp enquiry links using the
    configured business number.
-   Do not invent prices, addresses, delivery areas, sizes, stock,
    social accounts, or policies.
-   If the real WhatsApp number is not yet supplied, keep the CTA wired
    to a clearly marked placeholder and report it as a launch
    blocker---not a fake number.
-   Test and stop.

### Phase 5 --- Scroll storytelling and reveal

-   Add a short logo reveal and transition from the birthday experience
    to Pirah.
-   Add scroll-driven 2.5D scene transitions on the business homepage
    where they improve the story.
-   Use GSAP/ScrollTrigger only if useful and stable; avoid a
    heavyweight 3D engine unless justified.
-   Ensure reduced-motion behavior and content access.
-   Test and stop.

### Phase 6 --- Quality and launch

-   Audit mobile/desktop responsiveness, accessibility, SEO metadata,
    social previews, image performance, navigation, WhatsApp links,
    console output, and build.
-   Fix issues and document anything that cannot be tested in the
    current environment.
-   Provide exact deployment instructions for the chosen free static
    host, after checking current terms.
-   Do not deploy publicly or create/connect accounts unless Moses
    explicitly requests it.
-   Stop and report launch readiness.

## Expected project files

Keep documentation in the project root: -
`OPERATION_BIRTHDAY_WEBSITE.md` --- product specification / source of
truth. - `ANTIGRAVITY_WORKFLOW.md` --- this staged implementation
process. - `README.md` --- setup and maintenance instructions. -
`DECISIONS.md` --- approved deviations, assumptions, and unresolved
placeholders.

## Definition of done for each phase

A phase is complete only when its scoped work exists, the relevant
check/build has been run where possible, actual results are reported,
and the agent has stopped for review. "Generated code" alone is not
proof that a phase is complete.
