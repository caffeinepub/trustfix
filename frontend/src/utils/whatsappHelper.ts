import { WHATSAPP_NUMBER } from "../data/services";

export interface WhatsAppMessageParams {
  serviceName: string;
  categoryName: string;
  itemName: string;
  basePrice: number | string;
  priceType: "fixed" | "per_sqft";
  sqft?: number;
  calculatedTotal?: number;
  selectedAddOns?: { name: string; price: number }[];
  addOnTotal?: number;
}

export function buildWhatsAppMessage(params: WhatsAppMessageParams): string {
  const {
    serviceName,
    categoryName,
    itemName,
    basePrice,
    priceType,
    sqft,
    calculatedTotal,
    selectedAddOns = [],
    addOnTotal = 0,
  } = params;

  let message = `Hi TrustFix! I'd like to book a service.\n\n`;
  message += `🔧 *Service:* ${serviceName}\n`;
  if (categoryName && categoryName !== serviceName) {
    message += `📂 *Category:* ${categoryName}\n`;
  }
  message += `✅ *Selected:* ${itemName}\n`;

  if (priceType === "per_sqft" && sqft && calculatedTotal !== undefined) {
    message += `📐 *Area:* ${sqft} sq.ft\n`;
    message += `💰 *Rate:* ₹${basePrice}/sq.ft\n`;
    message += `💵 *Service Total:* ₹${calculatedTotal.toLocaleString("en-IN")}\n`;
  } else {
    message += `💰 *Price:* ₹${Number(basePrice).toLocaleString("en-IN")}\n`;
  }

  if (selectedAddOns.length > 0) {
    message += `\n🔥 *Add-ons Selected:*\n`;
    selectedAddOns.forEach((addon) => {
      if (addon.price === 0) {
        message += `  • ${addon.name} – Included ✓\n`;
      } else {
        message += `  • ${addon.name} – +₹${addon.price.toLocaleString("en-IN")}\n`;
      }
    });
  }

  const finalTotal =
    priceType === "per_sqft" && calculatedTotal !== undefined
      ? calculatedTotal + addOnTotal
      : Number(basePrice) + addOnTotal;

  if (addOnTotal > 0) {
    message += `\n💳 *Grand Total:* ₹${finalTotal.toLocaleString("en-IN")}\n`;
  }

  message += `\nPlease confirm my booking. Thank you!`;
  return message;
}

export function getWhatsAppBookingUrl(params: WhatsAppMessageParams): string {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
