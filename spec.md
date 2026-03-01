# Specification

## Summary
**Goal:** Revamp the Home page service cards with a water-waves scroll animation and expand each card inline to show full pricing, subcategories, a sq.ft calculator for applicable pest control types, and selectable add-on options.

**Planned changes:**
- Update the Home page to display all 8 service category cards (Pest Control, Deep Cleaning, Painting, Electrical, Plumbing, Carpentry, AC Services, Appliances Repair) in a vertical stacked layout
- Add a water-waves / ripple pop-up scroll animation using IntersectionObserver so each card animates into view one at a time with staggered delay (CSS/JS only, no external animation libraries)
- Clicking a service card on the Home page directly expands an inline panel or modal showing all subcategories and prices — no navigation to a separate page
- Update `frontend/src/data/services.ts` with complete pricing for all 8 services, including ₹499 service visit charges for Electrical, Plumbing, Carpentry, AC Services, and Appliances Repair; Pest Control split into Residential (flat), Commercial (₹/sq.ft), and Construction (₹/sq.ft)
- Add an inline sq.ft calculator inside the expanded Pest Control card for Commercial and Construction subcategories, with real-time total calculation and Book Now / WhatsApp buttons using the computed price
- Display Add-on Options (Same Day Emergency +₹999, Sunday/Holiday +₹799, Warranty Certificate – Included) as selectable checkboxes or toggle chips in every expanded service panel, with costs reflected in the displayed total and WhatsApp pre-filled messages

**User-visible outcome:** On the Home page, users see all 8 service cards animate in one by one as they scroll. Tapping any card instantly reveals its full subcategories, pricing, optional add-ons, and (for commercial/construction pest control) a live sq.ft price calculator — all without leaving the page.
