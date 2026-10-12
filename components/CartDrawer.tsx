'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    totalCount,
    originalSubtotal,
    totalDiscount,
    discountedSubtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-[#FAF8F5] border-l border-[#E5DEC9] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EAE3D2] flex items-center justify-between bg-[#F7F2E7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#1C523E]" />
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Your Order Bag
            </h3>
            <span className="text-xs text-stone-500 tabular-nums">
              ({totalCount} {totalCount === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close bag"
            className="p-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F4EFE6] border border-[#E0D5BE] mx-auto flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg text-stone-800 font-medium">
                Your order bag is empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                Add handcrafted Hyderabadi chandbalis, jhumkas, and bracelets to prepare your order directly with our Charminar stall.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
              >
                <span>Explore Jewellery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 bg-white border border-[#EAE3D2] rounded-xs relative group shadow-2xs"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 bg-[#F5EFE4] rounded-xs overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-stone-500 mb-0.5">
                      <span className="font-mono text-[#8F6E2B] font-semibold">{item.code}</span>
                      <span className="text-stone-500 truncate max-w-[140px]">
                        {item.selectedColor ? `${item.selectedColor} · ` : ''}{item.selectedOption}
                      </span>
                    </div>

                    <h5 className="font-serif text-sm font-medium text-stone-900 truncate">
                      {item.name}
                    </h5>

                    {/* Pricing breakdown */}
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xs font-bold text-stone-900 tabular-nums">
                        ₹{item.finalPrice.toLocaleString('en-IN')}
                      </span>
                      {item.discountAmount > 0 && (
                        <>
                          <span className="text-[11px] text-stone-400 line-through tabular-nums">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-[#8E2333] font-medium">
                            Save ₹{(item.discountAmount * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Delete Controls */}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#F5EFE4]">
                    <div className="flex items-center border border-[#DDD5C5] rounded-xs bg-[#FAF8F5]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-[#8E2333] p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D2] bg-[#FAF8F5] space-y-3 shadow-lg">
            
            {/* Calculation summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Original Total</span>
                <span className="tabular-nums">₹{originalSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-[#8E2333] font-medium">
                  <span>Savings / Discount</span>
                  <span className="tabular-nums">- ₹{totalDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Subtotal ({totalCount} items)</span>
                <span className="tabular-nums">₹{discountedSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-stone-400">
                * Delivery charge (₹35/km from Charminar Stall) calculated at checkout based on your exact pin.
              </p>
            </div>

            {/* Checkout Action Button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
