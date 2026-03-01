import { useState } from "react";

interface PricingCalculatorProps {
  pricePerSqft: number;
  serviceName: string;
  onCalculate: (sqft: number, total: number) => void;
}

export default function PricingCalculator({
  pricePerSqft,
  serviceName,
  onCalculate,
}: PricingCalculatorProps) {
  const [sqft, setSqft] = useState<string>("");

  const numericSqft = parseFloat(sqft) || 0;
  const total = numericSqft * pricePerSqft;

  const handleChange = (val: string) => {
    // Allow only numbers
    if (val === "" || /^\d+(\.\d{0,2})?$/.test(val)) {
      setSqft(val);
      const n = parseFloat(val) || 0;
      onCalculate(n, n * pricePerSqft);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-2">
      <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">
        Square Feet Calculator
      </p>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-blue-600 mb-1 block">
            Enter area (sq.ft)
          </label>
          <input
            type="number"
            value={sqft}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="e.g. 800"
            min="1"
            className="w-full border border-blue-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div className="text-center">
          <span className="text-blue-400 text-lg font-bold">×</span>
        </div>
        <div className="text-center">
          <p className="text-xs text-blue-600 mb-1">Rate</p>
          <p className="font-bold text-blue-800 text-sm">₹{pricePerSqft}/sqft</p>
        </div>
        <div className="text-center">
          <span className="text-blue-400 text-lg font-bold">=</span>
        </div>
        <div className="text-center min-w-[80px]">
          <p className="text-xs text-blue-600 mb-1">Total</p>
          <p className="font-bold text-green-700 text-base">
            {numericSqft > 0 ? `₹${total.toLocaleString("en-IN")}` : "—"}
          </p>
        </div>
      </div>
      {numericSqft > 0 && (
        <p className="text-xs text-blue-600 mt-2 text-center">
          {numericSqft} sq.ft × ₹{pricePerSqft} = ₹{total.toLocaleString("en-IN")} for {serviceName}
        </p>
      )}
    </div>
  );
}
