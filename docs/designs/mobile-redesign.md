# Lintel website: mobile redesign

* **Author:** Lee Guan Feng
* **Date:** 2026-11-11
* **Scope:** `lintel.leeguanfeng.com` — the marketing homepage (`index.html`) and the
  shared header/theme that `/install` and `/privacy` inherit.

## Overview

Lintel's site is read on a phone by students who are standing in a corridor deciding
whether to install something a classmate mentioned. The page was designed on a laptop
and only survived on a phone by hiding things: below 420 px the nav drops three of its
four links, and every product picture is a 1280 px desktop screenshot squeezed into a
388 px column. The redesign keeps the words and the claims, and changes the presentation
so the phone is the primary layout rather than the broken fallback.

## Evidence from the site (measured at 390 × 844)

* **Page height 5,978 px** — 7.1 screens. The hero alone is 672 px, so the first
  screen shows a headline, a paragraph, two buttons and the top of a picture.
* **Navigation disappears.** `@media (max-width: 420px)` hides every nav link except
  "Get Lintel". A phone visitor has no route to Before/after, Safety or FAQ. The
  remaining link is 66 × 18 px — under half the 44 px tap target.
* **The product is unreadable.** `/images/board.jpg` is 1280 × 800 rendered at
  388 × 243, so the room labels and time headers land around 4–5 px. The same is true of
  `before.jpg`, `after.jpg`, `booking.jpg`, `equipment.jpg`, `dark.jpg`: every one is a
  desktop capture at 348–388 px wide.
* **"Before and after" is 1,125 px (1.3 screens)** and holds two labelled figures plus a
  five-row comparison table whose cells are 348 px wide.
* **Type is desktop type**: h1 `clamp(38px, 7vw, 64px)` → 38 px on a phone, which puts
  "Every SIT room, on one screen." across two lines at 38 px and crowds the lead.
* **Sections have no identity on mobile**: "What you can do" is 1,233 px of three
  stacked text+image pairs with no markers between them.

## Goals vs. non-goals

* **In scope:** mobile-first layout for the homepage; a navigation that exists on a
  phone; product imagery that is legible at 390 px; per-section rhythm; tap targets
  ≥ 44 px; the same header and palette on `/install` and `/privacy`; light and dark.
* **Out of scope:** new claims or new screenshots; a framework rewrite; a blog or docs;
  changing the install flow (already an accordion); analytics or A/B testing; a landing
  page for the Chrome Web Store.

## Alternatives weighed

* **Keep the desktop screenshots, add pinch-to-zoom.** Rejected: a marketing page that
  asks the visitor to zoom to read the product has not shown the product.
* **Crop each screenshot to its top-left quarter.** Rejected: cropping cuts the
  time headers off, and the board is only meaningful with both axes visible.
* **Ship a phone-sized `board-mobile.jpg` capture.** Rejected as the primary visual:
  it goes stale on every UI change and needs a new capture per theme. Kept only as a
  fallback for the wide layout.
* **Live HTML board mock in the hero.** Chosen: crisp at any density, no asset to
  refresh, and it is the actual interface — the same rows, columns and booked states.
* **Hamburger menu in the top-left** (the stock mobile answer). Rejected: four
  destinations do not justify a menu icon students must learn, and the top-left is the
  hardest corner to reach one-handed. Chosen instead: brand + one primary action in the
  bar, and all six in-page links in a native `<dialog>` sheet opened by a 44 px "Sections"
  control (`showModal()`, so Escape, the backdrop and focus containment come from the platform).

## Key decisions

1. **Phone first, wide second.** Base CSS targets 390 px; `@media (min-width: 760px)`
   adds the two-column layouts. No rule hides content on small screens.
2. **Live board mock replaces the hero screenshot** at every width; the desktop capture
   moves to the "before and after" section where the comparison needs the real thing.
3. **Navigation is a bottom sheet**, 44 px rows, labelled "Sections", dismissed by
   tapping the backdrop, Escape, or a Close button.
4. **One idea per section, each with a short eyebrow** so a thumb-scrolling reader knows
   where they are: The problem · How it works · What you can do · Safety · Questions ·
   Get Lintel.
5. **A sticky "Get Lintel" bar on phones** appears after the hero and hides while the
   Get section is on screen, with `env(safe-area-inset-bottom)` padding.
6. **Type scale**: h1 34/40 px on phone (not 38+), h2 24/30, h3 19, body 17, secondary 15,
   minimum 13 for the board mock's labels but never below 11.
7. **Contrast**, recomputed from the hex values: body `#5C5A56` on `#FBFAF7` (6.59:1),
   dark `#B4B1AB` on `#17161A` (8.42:1), white on red `#DA1A21` (5.06:1). All pass AA for
their sizes.
8. **Motion** is one 200 ms sheet transition and nothing else; `prefers-reduced-motion`
   removes it.

## Analysis

Seven review lenses were run against this brief in parallel; the findings below are
the ones that survived a check against the built page. Two were dropped.

**Accepted and fixed in the build**

* **The hero mock is an excerpt, and it was lying about it.** The board runs
  07:00–22:30 across the whole campus; a phone column cannot hold 31 half-hours at a
  13 px label. The mock shows five columns (08:00–10:30) and six rooms, which is right,
  but the first version presented it as the whole board. It now says `Preview · All rooms · 8 Nov · 08:00–10:30` in its own top bar and
  the accessible label states that the day continues to 22:30. This is deliberate: a compressed 28-column ruler (each column
  9 px) proves scale but cannot be read or tapped, and a horizontally scrolled board
  puts the room names off-screen, which is the exact failure the redesign was fixing.
* **The legend had been lost** in an edit, so the first screen showed striped and
  ticked cells with nothing explaining them. Restored above the grid, with swatches
  that carry the same two cues as the cells rather than plain colour.
* **The page never named the site.** "The booking site" appeared 2,100 px down; the
  hero now names `rbs.singaporetech.edu.sg` and calls Lintel an add-on for it, so a
  visitor knows what they would be installing within the first screen.
* **The safety sub-line narrated the section** ("You should know what you're
  installing…") without adding a fact; removed.
* **"Credits" was never explained**; reworded to "credit balance".
* **Ratios in this brief were estimated, not computed**; corrected to 6.59:1, 8.42:1
  and 5.06:1.

**Accepted, left open**

* **The shared header does not exist.** Every style is inline in `index.html`; there is
  no stylesheet to inherit. Scope is therefore the homepage only, and `/install` and
  `/privacy` keep their own headers. Extracting `site.css` is the next step if the two
  pages are to match exactly — they already share the red and the near-black ground but
  not the greys (`#1c1b1a`/`#dcd9d1` there versus `#1c1b1d`/`#e2ded5` here).
* **`og:image` was stale and is now fixed.** `share.jpg` is a fresh 1200×630 capture of
  the new hero, with `og:image:width/height/alt` and `summary_large_image` so chat apps
  show the large card. It needs recapturing whenever the hero changes.
* **The four remaining screenshots are 1280 px captures** at 560 px inside a swipe
  container (`booking.jpg`, `equipment.jpg`, `dark.jpg`, plus the two in the
  comparison). Their interface text is legible once swiped, but they are captures of a
  UI that will drift; a phone-width capture set is the honest long-term fix.
* **The palette now matches across pages** (`#fbfaf7`, `#1c1b1d`, `#e2ded5`, `#f1efe8`,
  `#232228`, link `#b5141a`/`#f59a9e` in `install.html` and `privacy.html`), but the CSS
  is still duplicated per file — there is no `site.css` to inherit.
* **No success metric exists.** This is a taste-driven change with measured CSS
  outcomes but no behavioural baseline: no device split, no install rate, no drop-off
  point. If the goal is installs rather than appearance, the next measurement belongs
  on `/install`, not here.

**Dropped as wrong or not applicable**

* *"The live mock is geometrically impossible"* — true for a full 28-column day, and the
  reason the mock is now labelled as an excerpt rather than expanded. The finding
  assumed the mock was trying to show the whole day; it is not.
* *"The sticky bottom bar costs 6.6% of the viewport"* — the bar was cut before this
  review arrived: it covered content and duplicated the header action.
