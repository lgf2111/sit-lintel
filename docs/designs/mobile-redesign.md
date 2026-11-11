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
  bar, and the four in-page links in a bottom sheet opened by a 44 px "Sections" control.

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
7. **Contrast**: body `#5C5A56` on `#FBFAF7` (6.9:1), dark `#B4B1AB` on `#17161A`
   (8.0:1); red `#DA1A21` keeps white text (5.9:1).
8. **Motion** is one 200 ms sheet transition and nothing else; `prefers-reduced-motion`
   removes it.
