'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { computeProductPricing, computeItemTotals } from './pricing';

const STORAGE_KEY = 'nazimz10_cart';

export interface CartItem {
  id: string; // unique item id: productId + option + color
  productId: string;
  name: string;
  code: string;
  image: string;
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  quantity: number;
  selectedOption: string;
  selectedColor?: string;
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('storage', callback);
  window.addEventListener('cart-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('cart-update', callback);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getServerSnapshot(): string {
  return '[]';
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cart-update'));
  } catch {
    // Ignore storage quota errors
  }
}

export function useCart() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let items: CartItem[] = [];
  try {
    items = JSON.parse(raw);
  } catch {
    items = [];
  }

  const addToCart = useCallback(
    (
      product: {
        id: string;
        name: string;
        code: string;
        image: string;
        originalPrice: number;
        discountPercent: number;
      },
      quantity = 1,
      selectedOption = '22K Gold Finish',
      selectedColor?: string,
      overrideImage?: string
    ) => {
      const pricing = computeProductPricing(product.originalPrice, product.discountPercent);
      const safeQty = Math.max(1, quantity);
      const colorKey = selectedColor ? `__${selectedColor}` : '';
      const cartItemId = `${product.id}__${selectedOption}${colorKey}`;

      const currentRaw = localStorage.getItem(STORAGE_KEY) || '[]';
      let currentList: CartItem[] = [];
      try {
        currentList = JSON.parse(currentRaw);
      } catch {
        currentList = [];
      }

      const existingIndex = currentList.findIndex((item) => item.id === cartItemId);

      if (existingIndex > -1) {
        currentList[existingIndex].quantity += safeQty;
      } else {
        currentList.push({
          id: cartItemId,
          productId: product.id,
          name: product.name,
          code: product.code,
          image: overrideImage || product.image,
          originalPrice: pricing.originalPrice,
          discountPercent: pricing.discountPercent,
          discountAmount: pricing.discountAmount,
          finalPrice: pricing.finalPrice,
          quantity: safeQty,
          selectedOption,
          selectedColor,
        });
      }

      saveCart(currentList);
    },
    []
  );

  const updateQuantity = useCallback((cartItemId: string, newQuantity: number) => {
    const currentRaw = localStorage.getItem(STORAGE_KEY) || '[]';
    let currentList: CartItem[] = [];
    try {
      currentList = JSON.parse(currentRaw);
    } catch {
      currentList = [];
    }

    if (newQuantity <= 0) {
      currentList = currentList.filter((item) => item.id !== cartItemId);
    } else {
      currentList = currentList.map((item) =>
        item.id === cartItemId ? { ...item, quantity: Math.max(1, Math.floor(newQuantity)) } : item
      );
    }

    saveCart(currentList);
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    const currentRaw = localStorage.getItem(STORAGE_KEY) || '[]';
    let currentList: CartItem[] = [];
    try {
      currentList = JSON.parse(currentRaw);
    } catch {
      currentList = [];
    }

    currentList = currentList.filter((item) => item.id !== cartItemId);
    saveCart(currentList);
  }, []);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  // Compute live aggregates automatically
  let totalCount = 0;
  let originalSubtotal = 0;
  let totalDiscount = 0;
  let discountedSubtotal = 0;

  for (const item of items) {
    const computed = computeItemTotals(
      item.originalPrice,
      item.discountAmount,
      item.finalPrice,
      item.quantity
    );
    totalCount += computed.quantity;
    originalSubtotal += computed.itemOriginalTotal;
    totalDiscount += computed.itemDiscountTotal;
    discountedSubtotal += computed.itemFinalTotal;
  }

  return {
    items,
    totalCount,
    originalSubtotal,
    totalDiscount,
    discountedSubtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}
