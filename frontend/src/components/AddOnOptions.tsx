import { useState, useEffect } from "react";
import { CheckCircle, Zap, Calendar } from "lucide-react";
import { addOnOptions, AddOnOption } from "../data/services";

interface AddOnOptionsProps {
  onChange: (selected: AddOnOption[], total: number) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  emergency: <Zap className="w-4 h-4 text-orange-500" />,
  holiday: <Calendar className="w-4 h-4 text-purple-500" />,
  warranty: <CheckCircle className="w-4 h-4 text-green-500" />,
};

export default function AddOnOptions({ onChange }: AddOnOptionsProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string, alwaysIncluded?: boolean) => {
    if (alwaysIncluded) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    const selectedAddOns = addOnOptions.filter(
      (opt) => opt.alwaysIncluded || selected.has(opt.id)
    );
    const total = addOnOptions
      .filter((opt) => !opt.alwaysIncluded && selected.has(opt.id))
      .reduce((sum, opt) => sum + opt.price, 0);
    onChange(selectedAddOns, total);
  }, [selected, onChange]);

  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        🔥 Add-on Options
        <span className="text-xs font-normal text-muted-foreground">(All Services)</span>
      </p>
      <div className="flex flex-col gap-2">
        {addOnOptions.map((opt) => {
          const isSelected = opt.alwaysIncluded || selected.has(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id, opt.alwaysIncluded)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all duration-200 text-left ${
                opt.alwaysIncluded
                  ? "bg-green-50 border-green-200 cursor-default"
                  : isSelected
                  ? "bg-primary/10 border-primary/40 cursor-pointer"
                  : "bg-card border-border hover:border-primary/30 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                </div>
                <span className="flex items-center gap-1.5">
                  {iconMap[opt.id]}
                  <span className="text-sm font-medium text-foreground">{opt.name}</span>
                </span>
              </div>
              <span
                className={`text-sm font-bold ${
                  opt.alwaysIncluded ? "text-green-600" : "text-primary"
                }`}
              >
                {opt.alwaysIncluded ? "Included ✓" : `+₹${opt.price.toLocaleString("en-IN")}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
