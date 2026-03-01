import { useState, useCallback } from "react";
import { MessageCircle, CalendarCheck, Info } from "lucide-react";
import { ServiceCategory, ServiceItem, AddOnOption } from "../data/services";
import PricingCalculator from "./PricingCalculator";
import AddOnOptions from "./AddOnOptions";
import BookingFormPopup from "./BookingFormPopup";
import { getWhatsAppBookingUrl } from "../utils/whatsappHelper";

interface ExpandedServicePanelProps {
  category: ServiceCategory;
}

interface SqftState {
  [serviceId: string]: { sqft: number; total: number };
}

export default function ExpandedServicePanel({ category }: ExpandedServicePanelProps) {
  const [sqftState, setSqftState] = useState<SqftState>({});
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  const [addOnTotal, setAddOnTotal] = useState(0);
  const [bookingService, setBookingService] = useState<string | null>(null);

  const handleSqftChange = useCallback(
    (serviceId: string, sqft: number, total: number) => {
      setSqftState((prev) => ({ ...prev, [serviceId]: { sqft, total } }));
    },
    []
  );

  const handleAddOnChange = useCallback((addOns: AddOnOption[], total: number) => {
    setSelectedAddOns(addOns);
    setAddOnTotal(total);
  }, []);

  const getWhatsAppUrl = (item: ServiceItem, groupName: string) => {
    const sqftData = sqftState[item.id];
    const paidAddOns = selectedAddOns.filter((a) => !a.alwaysIncluded);
    return getWhatsAppBookingUrl({
      serviceName: category.name,
      categoryName: groupName,
      itemName: item.name,
      basePrice: item.price as number,
      priceType: item.priceType === "per_sqft" ? "per_sqft" : "fixed",
      sqft: sqftData?.sqft,
      calculatedTotal: sqftData?.total,
      selectedAddOns: paidAddOns,
      addOnTotal,
    });
  };

  const getBookingServiceName = (item: ServiceItem, groupName: string) => {
    return `${category.name} - ${groupName} - ${item.name}`;
  };

  const renderServiceRow = (item: ServiceItem, groupName: string, pricingType: "flat" | "per_sqft") => {
    const sqftData = sqftState[item.id];
    const isPerSqft = pricingType === "per_sqft";
    const displayTotal = isPerSqft && sqftData?.total ? sqftData.total + addOnTotal : null;
    const flatTotal = !isPerSqft ? (item.price as number) + addOnTotal : null;

    return (
      <div key={item.id} className="border border-border rounded-xl p-4 bg-card hover:bg-muted/30 transition-colors">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm">{item.name}</p>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            {isPerSqft ? (
              <span className="text-primary font-bold text-sm">
                ₹{item.price}/sq.ft
              </span>
            ) : (
              <span className="text-primary font-bold text-sm">
                ₹{Number(item.price).toLocaleString("en-IN")}
                {item.priceUnit ? ` ${item.priceUnit}` : ""}
                {item.description === "Starting price" ? "+" : ""}
              </span>
            )}
          </div>
        </div>

        {isPerSqft && (
          <PricingCalculator
            pricePerSqft={item.price as number}
            serviceName={item.name}
            onCalculate={(sqft, total) => handleSqftChange(item.id, sqft, total)}
          />
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <a
            href={getWhatsAppUrl(item, groupName)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
          <button
            onClick={() => setBookingService(getBookingServiceName(item, groupName))}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            Book Now
          </button>
        </div>

        {/* Show total with add-ons if applicable */}
        {(displayTotal !== null || (flatTotal !== null && addOnTotal > 0)) && (
          <div className="mt-2 text-xs text-center text-muted-foreground bg-muted/50 rounded-lg py-1.5 px-2">
            {addOnTotal > 0 && (
              <span>
                Base + Add-ons:{" "}
                <strong className="text-green-700">
                  ₹{(displayTotal ?? flatTotal ?? 0).toLocaleString("en-IN")}
                </strong>
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  // Render with subcategory groups (Pest Control)
  if (category.subcategoryGroups && category.subcategoryGroups.length > 0) {
    return (
      <div className="mt-4 space-y-5">
        {category.serviceVisitCharge && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Service Visit Charge: ₹{category.serviceVisitCharge}</strong> (compulsory)
            </p>
          </div>
        )}

        {category.subcategoryGroups.map((group) => (
          <div key={group.name}>
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              {group.name}
            </h4>
            <div className="space-y-2">
              {group.services.map((item) =>
                renderServiceRow(item, group.name, group.pricingType)
              )}
            </div>
          </div>
        ))}

        <AddOnOptions onChange={handleAddOnChange} />

        {bookingService && (
          <BookingFormPopup
            isOpen={true}
            onClose={() => setBookingService(null)}
            serviceName={bookingService}
          />
        )}
      </div>
    );
  }

  // Render flat list (all other services)
  return (
    <div className="mt-4 space-y-3">
      {category.serviceVisitCharge && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Service Visit Charge: ₹{category.serviceVisitCharge}</strong> (compulsory)
          </p>
        </div>
      )}

      <div className="space-y-2">
        {category.services.map((item) =>
          renderServiceRow(item, category.name, item.priceType === "per_sqft" ? "per_sqft" : "flat")
        )}
      </div>

      <AddOnOptions onChange={handleAddOnChange} />

      {bookingService && (
        <BookingFormPopup
          isOpen={true}
          onClose={() => setBookingService(null)}
          serviceName={bookingService}
        />
      )}
    </div>
  );
}
