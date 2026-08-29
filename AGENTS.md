# Grace Alarm — Agent Instructions

This file is the single source of truth for AI agents working on the **GraceAlarm Landing Page** project (codename: Grace Alarm). Read it completely before making any changes. Violations of these rules are unacceptable.

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| **Product** | Grace Alarm — a free Android app that wakes users with soft music and a Bible verse read aloud via TTS |
| **This Repo** | The **landing page / marketing website** for the Grace Alarm app |
| **Live URL** | https://gracealarm.free.nf |
| **Hosting** | InfinityFree (static file hosting — `htdocs/` root) |
| **Developer** | WorkPress — info.workpressmail@gmail.com |

> **Key distinction:** This repo is **NOT** the Android app. It is a static promotional website. Do not introduce app-level code, backend logic, databases, or server-side rendering.

---

## 2. Tech Stack — Strict Boundaries

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Markup** | HTML5 | Semantic, accessible, SEO-optimised |
| **Styling** | Vanilla CSS | Single file: `css/style.css` — uses CSS custom properties |
| **Logic** | Vanilla JavaScript (ES6+) | Two files: `js/main.js` (interactions) + `js/analytics.js` (GA4 tracking) |
| **Fonts** | Google Fonts — Ubuntu (300, 400, 500, 700) | Loaded via `<link>` in `<head>` |
| **Analytics** | Google Analytics 4 (GA4) via gtag.js | Loaded conditionally after cookie consent |
| **Icons** | Inline SVG only | No icon libraries (no Font Awesome, no Material Icons) |

### Absolutely Forbidden

- **No frameworks or libraries** — no React, Vue, Angular, Svelte, jQuery, Alpine, HTMX, Lit, etc.
- **No CSS frameworks** — no Tailwind, Bootstrap, Bulma, etc.
- **No build tools** — no Webpack, Vite, Parcel, PostCSS, Sass, Less, etc.
- **No package managers** — no `npm`, `yarn`, `pnpm`, no `package.json`, no `node_modules/`
- **No server-side code** — no Node.js, PHP, Python, etc. This is a static site on InfinityFree
- **No CDN-hosted JS libraries** — no lodash, GSAP, anime.js, etc.
- **No external CSS** — only Google Fonts `<link>` tags are allowed as external resources
- **No TypeScript** — plain JavaScript only

---

## 3. File Structure

```
Grace Alarm/                  ← Repo root
├── AGENTS.md                 ← THIS FILE — agent instructions
├── README.md                 ← Project documentation
├── .gitignore
├── index.html                ← Landing page (single page)
├── privacy.html              ← Privacy policy page
├── css/
│   └── style.css             ← ALL styles — design system + layout + components
├── js/
│   ├── main.js               ← ALL interactions — scroll, carousel, nav, cookies, etc.
│   └── analytics.js          ← GA4 event tracking — loaded after cookie consent
├── downloads/
│   └── (GraceAlarm-v1.0.apk) ← APK download (when ready)
└── assets/
    └── images/
        ├── favicon.ico        ← App favicon
        ├── og-image.jpg       ← 1200×630 social sharing image
        └── (other images)     ← Any additional image assets
```

### File Rules

- **Do NOT create new HTML pages** unless explicitly requested. The site is two pages: `index.html` + `privacy.html`.
- **Do NOT split `style.css`** into multiple CSS files. All styles live in one file.
- **Do NOT split JavaScript** beyond the existing two files without explicit approval. `main.js` handles interactions; `analytics.js` handles GA4 events.
- **Do NOT add new top-level directories** without explicit approval.
- **Do NOT modify `.gitignore`** without explicit approval.

---

## 4. Design System

The design system is codified in CSS custom properties at the top of `css/style.css`. All styling MUST use these tokens.

### 4.1 Colour Palette (from the Android app's `Color.kt`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-canvas` | `#F4EEE2` | Page background — warm parchment |
| `--color-primary` | `#7A4F2E` | CTAs, brand accent — warm brown |
| `--color-primary-hover` | `#5E3B1F` | Button hover state |
| `--color-text` | `#2B221C` | Body text — dark chocolate |
| `--color-text-muted` | `#A89B8C` | Secondary text, captions |
| `--color-accent` | `#6F7A4A` | Secondary accent — olive green |
| `--color-accent-hover` | `#5B6640` | Accent hover state |
| `--color-surface` | `#FFFFFF` | Cards, elevated surfaces |
| `--color-surface-raised` | `#FAF5EB` | Slightly elevated backgrounds |
| `--color-border` | `#DCD7D1` | Borders, dividers |
| `--color-alert` | `#B5563A` | Warnings, alerts — terracotta |
| `--color-overlay` | `rgba(43,34,28,0.6)` | Modal/overlay backdrop |

### 4.2 Typography

- **Font family:** Ubuntu (`--font-family: 'Ubuntu', sans-serif`)
- **Weights used:** 300 (light), 400 (regular), 500 (medium), 700 (bold)
- Do NOT introduce additional fonts without explicit approval

### 4.3 Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | 8px |
| `--space-sm` | 16px |
| `--space-md` | 24px |
| `--space-lg` | 40px |
| `--space-xl` | 64px |
| `--space-2xl` | 100px |

### 4.4 Shape & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-card` | 16px | Cards, major containers |
| `--radius-button` | 12px | Buttons |
| `--radius-pill` | 100px | Pills, tags, badges |
| `--radius-small` | 8px | Small elements, chips |

### 4.5 Design Principles

- **Warm, spiritual, clean.** The design evokes calm mornings, not tech startups.
- **No gradients.** The design intentionally avoids CSS gradients. Do NOT add them.
- **Flat cards with subtle shadows** — `--shadow-card` and `--shadow-card-hover`.
- **Scroll reveal animations** using Intersection Observer + CSS `opacity`/`transform` transitions.
- **Mobile-first responsive** — all breakpoints are handled within `style.css`.

---

## 5. Page Sections (index.html)

The landing page has the following sections, in order. Do NOT reorder them or remove any without explicit approval:

1. **Header** — Fixed nav with logo, section links, and CTA button. Adds `.scrolled` class on scroll.
2. **Hero** — Headline ("Wake Up With the Word"), subtitle, CTA buttons, animated phone mockup.
3. **Features** — 4-card grid: Silent/DND, 4 Translations, Gentle Wake-Up, 100% Offline & Private.
4. **How It Works** — 3-step flow: Set → Wake → Start.
5. **Themes & Translations** — 8 interactive theme chips with verse preview + 4 translation pills.
6. **Verse Showcase** — Auto-rotating verse carousel with dot navigation and swipe support.
7. **Download CTA** — Download button (currently "Coming Soon"), install instructions toggle.
8. **Footer** — Privacy link, contact email, WorkPress credit, copyright.
9. **Cookie Consent Banner** — GDPR-style banner for GA4 opt-in/opt-out.

---

## 6. JavaScript Behaviour

### 6.1 main.js Responsibilities

| Feature | Description |
|---------|-------------|
| Scroll Reveal | Intersection Observer adds `.revealed` class to `.reveal` elements |
| Header Scroll | Toggles `.scrolled` class on header at 20px scroll |
| Mobile Nav | Hamburger toggle for mobile nav with body scroll lock |
| Verse Carousel | Auto-advances every 8s, dot navigation, touch swipe, pause on hover |
| Theme Chips | Click → highlights chip + shows sample verse with fade animation |
| Install Toggle | Expands/collapses APK install instructions |
| Cookie Consent | LocalStorage-based consent; conditionally loads GA4 |
| Smooth Scroll | Anchor links scroll smoothly with 80px header offset |
| Download Handler | Shows "Coming Soon" feedback when APK download is clicked |

### 6.2 analytics.js Responsibilities

All tracking functions are wrapped in `window.initAnalyticsEvents()`, called after GA4 loads.

| Event Name | Trigger |
|------------|---------|
| `cta_click_hero` | Hero download button click |
| `cta_click_bottom` | Bottom download button click |
| `apk_download_start` | APK download begins |
| `scroll_depth` | 25%, 50%, 75%, 100% thresholds |
| `theme_chip_click` | Theme chip interaction |
| `verse_carousel_interact` | Carousel dot click |
| `privacy_policy_click` | Privacy link click |
| `workpress_credit_click` | Developer credit click |
| `learn_more_click` | "Learn More" button click |
| `outbound_link` | Any `target="_blank"` link click |

### 6.3 JavaScript Rules

- All code runs inside an IIFE: `(function() { 'use strict'; ... })();`
- No global variables except `window.handleDownload` and `window.initAnalyticsEvents`
- Use `requestAnimationFrame` for scroll handlers (throttling)
- Use `{ passive: true }` for touch event listeners
- GA4 Measurement ID placeholder: `G-XXXXXXXXXX` — replace when actual ID is available
- Cookie consent state is stored in `localStorage` as `cookie-consent` (`'accepted'` or `'declined'`)

---

## 7. SEO & Meta

The site implements the following SEO elements — do NOT remove or break them:

- **Title tags** on both pages
- **Meta description** on both pages
- **Open Graph tags** (og:type, og:url, og:title, og:description, og:image)
- **Twitter card tags** (summary_large_image)
- **JSON-LD structured data** (SoftwareApplication schema)
- **Semantic HTML5** (header, nav, main, section, footer)
- **Single `<h1>`** per page with proper heading hierarchy
- **`robots: noindex`** on `privacy.html` (intentional — don't change)

---

## 8. Accessibility

- All interactive elements must have accessible labels
- Hamburger button has `aria-label="Toggle navigation"` and `aria-expanded`
- Carousel dots have `aria-label` attributes
- Install toggle has `aria-expanded` attribute
- All SVG icons are decorative (no `role="img"` needed as they're inline)
- Colour contrast meets WCAG AA on the warm palette

---

## 9. App Features Referenced on the Landing Page

The landing page promotes these Grace Alarm app features. Keep content consistent:

| Feature | Detail |
|---------|--------|
| **Alarm** | Android alarm using `setAlarmClock` / `setExactAndAllowWhileIdle` |
| **Silent/DND** | Fires on Silent and Do Not Disturb modes |
| **Bible Translations** | 4 bundled: KJV, NKJV, NIV, NLT |
| **Verse Themes** | 8 themes: Faith, Gratitude, Anxiety, Salvation, Hope, Love, Healing, Prosperity |
| **Verse Modes** | Random or Theme-based selection |
| **TTS** | Android built-in Text-to-Speech (no external API) |
| **Wake-Up Flow** | 5s soft music → verse read aloud → dismiss or snooze |
| **Offline** | 100% offline for all core features |
| **Privacy** | No accounts, no PII, no ads |
| **Price** | Free, forever |
| **Platform** | Android 7.0+ (API 24+) |
| **No-Repeat** | Fresh verse for 7 days |

---

## 10. Deployment & Hosting Constraints

- **Host:** InfinityFree (free tier) — supports static files only
- **Root:** Files are uploaded to `htdocs/` on InfinityFree
- **No server-side processing** — no PHP, no `.htaccess` rewrites beyond basic redirects
- **No SSL cert management** — InfinityFree provides free SSL
- **File size awareness** — keep total site size minimal (no large media files without approval)

---

## 11. What Agents CAN Do (Without Explicit Approval)

- Fix bugs in existing HTML, CSS, or JS
- Improve accessibility (add missing ARIA attributes, improve keyboard navigation)
- Optimise CSS (remove unused styles, consolidate selectors)
- Improve scroll performance (debouncing, throttling)
- Refine responsive breakpoints
- Fix SEO issues (broken meta tags, invalid structured data)
- Update content text (fix typos, improve copy)
- Add CSS transitions/animations that align with the existing design principles
- Replace the GA4 placeholder ID with an actual measurement ID

---

## 12. What Agents MUST NOT Do (Without Explicit Approval)

- Add any npm packages, libraries, or frameworks
- Create new HTML pages
- Split CSS or JS into additional files
- Add build steps or tooling
- Change the colour palette or font
- Add gradients to the design
- Remove or reorder page sections
- Add backend/server-side functionality
- Introduce external CDN dependencies
- Change the hosting or deployment strategy
- Modify analytics event names (they're referenced in GA4 reports)
- Remove the cookie consent mechanism
- Add features not listed in Section 9

---

## 13. Contact & Attribution

- **Developer:** WorkPress
- **Developer site:** https://workpress.free.nf
- **Email:** info.workpressmail@gmail.com
- **Copyright:** © 2026 Grace Alarm
- **Footer credit format:** `Developed by WorkPress` (linked to developer site)
