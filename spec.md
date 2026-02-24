# Specification

## Summary
**Goal:** Add a floating call button fixed to the middle-left of the screen on the TrustFix website.

**Planned changes:**
- Create a new `FloatingCallButton` component that is circular, green (#25D366 background), with a white phone icon, drop shadow, and smooth scale hover effect
- Button is fixed at the vertical center of the left side of the viewport (`position: fixed; left: 1rem; top: 50%; transform: translateY(-50%)`) and stays fixed while scrolling
- Clicking triggers `tel:8884447229`; long-press (≥500ms) on mobile also triggers the call
- Button has `aria-label="Call TrustFix"` and a tooltip reading "Call TrustFix" on hover/focus
- Button size is 52px on mobile and 60px on desktop
- Add `FloatingCallButton` to `Layout.tsx` alongside the existing `FloatingWhatsAppButton`, ensuring no overlap between the two buttons on any screen size and at least 80px clearance from the bottom on mobile

**User-visible outcome:** A floating green call button appears on the left side of every page, allowing users to quickly initiate a phone call to TrustFix by clicking or long-pressing the button.
