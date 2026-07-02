# Walkthrough: Cinematic Splash Intro Reveal

We implemented a cinematic splash screen that plays the Tulizo Foundation launch video full-screen on load, hiding the text overlays and navigation links until the user enters the site.

## Changes Made

### 1. Cinematic Splash View
- **Autoplay Video First:** On load, the video plays full screen without any layout overlay, menu bar, or text.
- **Entry Typography Card:** Displayed a minimalist centered title **TULIZO FOUNDATION** and an **"ENTER EXPERIENCE"** button.
- **Scroll & Button Triggers:** The site reveal can be triggered by either clicking the button or simply scrolling down.

### 2. Smooth reveal transitions
- **Body & Header Transitions:** Tied reveal animations to `body.cinematic-active` and `#hero.cinematic-mode`. When entering:
  - Header transitions down into place.
  - Hero text and action buttons slide up from the bottom.
  - Rotating logo badge, video timeline, and controls slide into view.

---

## Verification Results

- Tested on **[http://localhost:3000](http://localhost:3000)**.
- Cinematic video starts immediately. Click-to-enter or scroll reveals the page smoothly without lag.
