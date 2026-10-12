'use client';

import React from 'react';
import { X, Trash2, MessageCircle, Heart } from 'lucide-react';
import Image from 'next/image';
import { ProductItem } from './FeaturedCollection';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: ProductItem[];
  onRemove: (productId: string) => void;
  onInquire?: (product: ProductItem) => void;
  onInquireAll?: () => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemove,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const handleInquireAll = () => {
    const listSummary = wishlistProducts
      .map((p) => `• ${p.name} (${p.code}) - ₹${p.price.toLocaleString('en-IN')}`)
      .join('\n');
    const text = encodeURIComponent(
      `Salam/Hello Nazimz 10, I am interested in these items from my favourites list:\n\n${listSummary}\n\nPlease let me know their current availability at your Charminar stall.`
    );
    window.open(`https://wa.me/${BUSINESS_CONFIG.phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-[#FAF8F5] border-l border-[#E5DEC9] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D2] flex items-center justify-between bg-[#F7F2E7]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#8E2333]" fill="currentColor" />
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Your Favourites
            </h3>
            <span className="text-xs text-stone-500 tabular-nums">
              ({wishlistProducts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close favourites"
            className="p-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F4EFE6] border border-[#E0D5BE] mx-auto flex items-center justify-center text-stone-400">
                <Heart className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-lg text-stone-800 font-medium">
                Your wishlist is empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our Hyderabadi chandbalis, jhumkas, and bracelets to save your favourite pieces for your next Charminar visit.
              </p>
            </div>
          ) : (
            wishlistProducts.map((item) => {
              const waUrl = BUSINESS_CONFIG.getWhatsAppProductUrl(item.name, item.code, item.price);

              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-[#EAE3D2] rounded-xs relative group"
                >
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

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-stone-500">{item.code}</span>
                      </div>
                      <h5 className="font-serif text-sm font-medium text-stone-900 truncate">
                        {item.name}
                      </h5>
                      <span className="text-xs font-semibold text-stone-900 mt-1 block tabular-nums">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-medium text-[#1C523E] hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Order on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => onRemove(item.id)}
                        type="button"
                        aria-label="Remove item"
                        className="text-[11px] text-stone-400 hover:text-[#8E2333] transition-colors ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-[#EAE3D2] bg-[#FAF8F5] space-y-3">
            <button
              onClick={handleInquireAll}
              type="button"
              className="w-full py-3 px-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire All on WhatsApp ({BUSINESS_CONFIG.phoneDisplay})</span>
            </button>
            <p className="text-[11px] text-stone-500 text-center">
              Our stall keeper at Charminar will confirm availability & send live videos.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
