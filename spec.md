# Specification

## Summary
**Goal:** Remove all slider/carousel controls and logic from the ServiceCarousel component, converting it to a simple static vertically stacked list of service category cards.

**Planned changes:**
- Remove the circular up/down arrow navigation button, pagination dots, and slide counter text (e.g. "1 / 8") from ServiceCarousel
- Remove all carousel logic: touch/swipe event handlers, scroll-snap styles, overflow hidden, and active slide index state
- Render all service category cards as a plain vertically stacked block layout with normal page scroll
- Preserve all card visuals exactly: images, titles, descriptions, "View Services" links, colors, fonts, and spacing

**User-visible outcome:** All service category cards are displayed stacked vertically on the page with no carousel controls, allowing normal smooth scrolling through all cards.
