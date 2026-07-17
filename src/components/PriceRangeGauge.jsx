/**
 * PriceRangeGauge
 * Shows the exact estimated price first, then a supporting range of
 * ±rangePercent (default 20%) around it, with a gradient gauge and
 * trade-off callouts.
 *
 * Pass in the `estimate` object returned by the quote API
 * ({ price, miles, distance, pickupCity, pickupState, deliveryCity, deliveryState }).
 * No changes needed to the pricing API.
 */
export default function PriceRangeGauge({
  estimate,
  rangePercent = 0.2, // ±20% around the exact price
  onEditDetails,
}) {
  if (!estimate) return null;

  const price = estimate.price;

  // round to nearest $50 so the range reads as deliberate price points
  const roundTo50 = (n) => Math.round(n / 50) * 50;
  const low = roundTo50(Math.max(0, price * (1 - rangePercent)));
  const high = roundTo50(price * (1 + rangePercent));

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6 text-center">
      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        Your Estimated Price
      </div>

      {/* Exact price — the headline number */}
      <div className="text-5xl font-extrabold text-blue-700">
        ${price.toLocaleString()}
      </div>

      {/* Supporting range below it */}
      <div className="text-base font-semibold text-gray-600 mt-1">
        Typical range: ${low.toLocaleString()} – ${high.toLocaleString()}
      </div>

      <div className="text-sm text-gray-500 mt-1">
        {estimate.pickupCity}, {estimate.pickupState} → {estimate.deliveryCity}, {estimate.deliveryState}
        {" · "}{estimate.distance}
      </div>

      {/* Gauge bar */}
      <div className="relative px-6 mt-5 mb-2">
        <div
          className="h-2.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #ef4444 0%, #f59e0b 35%, #eab308 55%, #84cc16 75%, #22c55e 100%)",
          }}
        />
        {/* Marker showing the exact price at the center of the range */}
        <div
          className="absolute -top-1.5"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "9px solid #1d4ed8",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: 8,
            width: 0,
            height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderRight: "9px solid #ef4444",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            right: 8,
            width: 0,
            height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "9px solid #22c55e",
          }}
        />
      </div>

      <div className="flex justify-between px-2 text-sm font-bold text-gray-800 mb-4">
        <span>${low.toLocaleString()}</span>
        <span>${high.toLocaleString()}</span>
      </div>

      <div className="flex justify-between text-left text-xs sm:text-sm text-gray-500 leading-relaxed px-1">
        <div>
          <div>Patience required</div>
          <div>Longer wait times</div>
          <div>Fewer carriers</div>
        </div>
        <div className="text-right">
          <div>Many carrier options</div>
          <div>Faster pickup times</div>
          <div>More ability to pick dates</div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3 max-w-md mx-auto">
        This is an estimate. Your final price is confirmed when a carrier is
        assigned to your route — we'll explain every fee before you book.
      </p>

      {onEditDetails && (
        <button
          type="button"
          onClick={onEditDetails}
          className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          ← Edit shipment details
        </button>
      )}
    </div>
  );
}
