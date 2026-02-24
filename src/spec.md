# Specification

## Summary
**Goal:** Fix mobile dropdown scrolling issue, replace service category images with professional photos, add premium gradient background, enhance card hover effects, and verify booking form functionality.

**Planned changes:**
- Fix service dropdown scrolling on mobile (Booking and Reviews pages) with max-height, overflow-y auto, touch scrolling, z-index 9999, and prevent body scroll
- Replace all 8 service category card images with real professional service photos (pest control, carpentry, cleaning, electrical, AC repair, appliance repair, plumbing, painting)
- Change global background from plain white to premium subtle gradient (linear-gradient(180deg, #f6f8fb 0%, #eef3f9 50%, #f1f5f9 100%)) across all pages
- Add smooth hover lift effect (translateY(-6px), 0.3s transition, enhanced shadow) to service cards on Services and Pricing pages
- Verify booking form WhatsApp integration (wa.me/918884447229) with pre-filled message (Name, Phone, Service, Address, Date/Message)
- Verify booking data storage in Motoko backend and email notifications remain active
- Optimize and lazy load all service images for faster page loading

**User-visible outcome:** Users can smoothly scroll the service dropdown on mobile devices, see professional service photos on category cards, experience a premium gradient background across all pages, interact with smooth hover effects on service cards, and successfully submit bookings via WhatsApp with all details pre-filled.
