# Specification

## Summary
**Goal:** Add a reusable popup booking form with WhatsApp integration to all subcategory cards across every service category, without changing any existing design or layout.

**Planned changes:**
- Create a `BookingFormPopup` modal component with fields: Customer Name (required), Mobile Number (required), Address, Selected Service (auto-filled, read-only), Property Type dropdown (1BHK, 2BHK, 3BHK, Square Feet, Villa, Commercial), Preferred Date, Preferred Time, and Notes
- Popup closes via a close button or clicking the semi-transparent backdrop
- On form submission, construct a pre-filled WhatsApp URL and open `https://wa.me/918884447229?text=ENCODED_MESSAGE` in a new tab with all 8 field values URL-encoded; no redirect or thank-you page
- Add a "Book Now" button to every subcategory card in all 8 service categories (Cleaning, Painting, Pest Control, Electrical, Carpentry, AC, Appliances, Plumbing), including `SubcategoryCard`, `CleaningServiceCard`, `PaintingServiceCard`, and `PestControlCard`
- Each "Book Now" button passes the corresponding service/subcategory name to the popup as the auto-filled Selected Service value
- Wire popup open/closed state and selected service name into the Services and Home pages using React state
- Existing card layout, colors, images, pricing, animations, existing WhatsApp/Get Quote buttons, `FloatingWhatsAppButton`, and `FloatingCallButton` remain completely unchanged

**User-visible outcome:** Users can click a "Book Now" button on any subcategory card to open a booking form popup, fill in their details, and submit to instantly open a pre-filled WhatsApp chat with TrustFix — all without leaving the current page.
