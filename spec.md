# Specification

## Summary
**Goal:** Update TrustFix with painting and cleaning price changes, service page isolation, a conditional property type field in the booking form, and wire all CTA buttons to WhatsApp.

**Planned changes:**
- Reduce all painting package prices by exactly ₹1 each in the services data file.
- Update cleaning service prices: Bathroom ₹449, Sofa ₹699, Mattress ₹799, Kitchen ₹1499, and six home cleaning BHK/occupancy tiers with specified prices; replace Villa, Commercial, and Carpet prices with "Free Inspection → Quote → Service" label.
- Fix service detail pages so that selecting Pest Control, Cleaning, or Painting shows only that service's own subcategory cards with no cards from other services bleeding through.
- Add a "Property Type" select field (1BHK, 2BHK, 3BHK, Square Feet, Villa, Commercial) to the booking form, visible only when Pest Control, Cleaning, or Painting is the selected service type.
- Update all CTA buttons ("Free Inspection", "Book Now", "Call") and the floating WhatsApp button across all relevant components to open `https://wa.me/918884447229`.

**User-visible outcome:** Users see updated painting and cleaning prices, each service detail page shows only its own subcategories, the booking form shows a property type selector for relevant services, and every booking/call button opens the correct WhatsApp chat.
