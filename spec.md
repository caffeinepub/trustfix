# Specification

## Summary
**Goal:** Remove all scroll controls, snap/auto-scroll behaviour, and carousel navigation overlays from the TrustFix app, and add soft fade-up entrance animations to Home page sections.

**Planned changes:**
- Remove all CSS scroll-snap properties (`scroll-snap-type`, `scroll-snap-align`) and any JavaScript scroll locking, programmatic scroll jumps, or auto-scroll movement across all components and pages
- Remove all scroll control UI overlays: pagination dots, arrow/chevron navigation icons, and carousel navigation overlays from every component (including ServiceCarousel and FeaturedReviewsCarousel)
- Convert ServiceCarousel into a static vertically stacked or grid layout with no sliding, swipe handlers, or interval timers
- Convert FeaturedReviewsCarousel into a static grid or list displaying all reviews with no auto-advance interval or navigation state
- Add a soft fade-up entrance animation (opacity 0→1, translateY 20px→0) to each major Home page section using IntersectionObserver — triggers once per section, never interferes with manual scrolling
- Remove the "View All Options" button from all service category sections on the Services page; subcategory cards must expand and display immediately upon clicking the parent category with no secondary interaction required

**User-visible outcome:** The app scrolls freely and manually at all times with no jumps or locking. Home page sections fade up softly as they enter the viewport. Carousels are replaced with static layouts. The Services page shows all subcategory cards immediately on category click with no extra button.
