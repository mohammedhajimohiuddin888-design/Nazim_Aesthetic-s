/**
 * Centralized automated pricing calculations for Nazimz 10.
 * Automatically computes discounts, subtotal, delivery charges, and final totals.
 */

export interface ProductPricing {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
}

export function computeProductPricing(originalPrice: number, discountPercent: number): ProductPricing {
  const safeOriginal = Math.max(0, Math.round(originalPrice));
  const safePercent = Math.max(0, Math.min(100, discountPercent));
  const discountAmount = Math.round(safeOriginal * (safePercent / 100));
  const finalPrice = safeOriginal - discountAmount;

  return {
    originalPrice: safeOriginal,
    discountPercent: safePercent,
    discountAmount,
    finalPrice,
  };
}

export interface OrderItemComputation {
  quantity: number;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  itemOriginalTotal: number;
  itemDiscountTotal: number;
  itemFinalTotal: number;
}

export function computeItemTotals(
  originalPrice: number,
  discountAmount: number,
  finalPrice: number,
  quantity: number
): OrderItemComputation {
  const safeQty = Math.max(1, Math.floor(quantity));
  return {
    quantity: safeQty,
    originalPrice,
    discountAmount,
    finalPrice,
    itemOriginalTotal: originalPrice * safeQty,
    itemDiscountTotal: discountAmount * safeQty,
    itemFinalTotal: finalPrice * safeQty,
  };
}

export interface OrderTotals {
  originalTotal: number;
  totalDiscount: number;
  productTotal: number; // Discounted subtotal
  deliveryDistanceKm: number;
  chargedDistanceKm: number;
  deliveryRatePerKm: number;
  deliveryCharge: number;
  finalTotal: number;
}

export function computeOrderTotals(
  items: Array<{
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
    quantity: number;
  }>,
  delivery: {
    distanceKm: number;
    chargedDistanceKm: number;
    ratePerKm: number;
    deliveryCharge: number;
  }
): OrderTotals {
  let originalTotal = 0;
  let totalDiscount = 0;
  let productTotal = 0;

  for (const item of items) {
    const q = Math.max(1, item.quantity);
    originalTotal += item.originalPrice * q;
    totalDiscount += item.discountAmount * q;
    productTotal += item.finalPrice * q;
  }

  const finalTotal = productTotal + (items.length > 0 ? delivery.deliveryCharge : 0);

  return {
    originalTotal,
    totalDiscount,
    productTotal,
    deliveryDistanceKm: delivery.distanceKm,
    chargedDistanceKm: delivery.chargedDistanceKm,
    deliveryRatePerKm: delivery.ratePerKm,
    deliveryCharge: items.length > 0 ? delivery.deliveryCharge : 0,
    finalTotal,
  };
}
