'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Heart, MessageCircle, Sparkles, Plus, Minus, ShoppingBag, ArrowRight, Check, Palette } from 'lucide-react';
import Image from 'next/image';
import { ProductItem } from '@/lib/products';
import { BUSINESS_CONFIG } from '@/lib/constants';
import { computeProductPricing } from '@/lib/pricing';
import { useCart } from '@/lib/useCart';

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  initialColorIndex?: number;
}

export default function QuickViewModal({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  initialColorIndex = 0,
}: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [wasAdded, setWasAdded] = useState(false);

  // Reset states whenever product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedOption(product.options?.[0] || '22K Gold Finish');
      setSelectedColorIndex(
        initialColorIndex < (product.colorVariants?.length || 0) ? initialColorIndex : 0
      );
    }
  }, [product, initialColorIndex]);

  if (!product) return null;

  const pricing = computeProductPricing(product.originalPrice, product.discountPercent);
  const activeOption = selectedOption || product.options?.[0] || '22K Gold Finish';
  
  const currentColor =
    product.colorVariants && product.colorVariants.length > 0
      ? product.colorVariants[selectedColorIndex] || product.colorVariants[0]
      : null;

  const currentDisplayImage = currentColor?.image || product.image;

  const waProductText = encodeURIComponent(
    `Salam/Hello Nazimz 10, I am interested in "${product.name}"${
      currentColor ? ` in shade [${currentColor.name}]` : ''
    } (Code: ${product.code}, Finish: ${activeOption}, ₹${pricing.finalPrice.toLocaleString('en-IN')}) from your Charminar stall.`
  );
  const waUrl = `https://wa.me/918121604194?text=${waProductText}`;

  const handleAddToBag = () => {
    addToCart(
      product,
      quantity,
      activeOption,
      currentColor?.name,
      currentDisplayImage
    );
    setWasAdded(true);
    setTimeout(() => setWasAdded(false), 1500);
  };

  const handleOrderNow = () => {
    addToCart(
      product,
      quantity,
      activeOption,
      currentColor?.name,
      currentDisplayImage
    );
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Content */}
      <div className="relative bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs max-w-4xl w-full shadow-2xl overflow-hidden z-10 my-4 sm:my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Visual Image & Color Preview Thumbnails */}
          <div className="md:col-span-6 bg-[#F5EFE4] flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[#EAE3D2]">
            {/* Main Stage Image */}
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-xs overflow-hidden border border-[#E0D5BE] bg-white shadow-xs group">
              <Image
                src={currentDisplayImage}
                alt={`${product.name} - ${currentColor ? currentColor.name : ''}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Code badge */}
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#E8DFC8] text-[10px] tracking-wider text-stone-700 font-mono">
                {product.code}
              </div>

              {/* Discount tag */}
              {pricing.discountPercent > 0 && (
                <div className="absolute top-3 right-3 bg-[#8E2333] text-white px-2 py-0.5 rounded-xs text-[10px] font-bold tracking-wider uppercase shadow-xs">
                  {pricing.discountPercent}% OFF
                </div>
              )}

              {/* Active Color Name Pill on image */}
              {currentColor && (
                <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white px-2.5 py-1 rounded-xs text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
                  <span
                    className="w-2.5 h-2.5 rounded-full ring-1 ring-white/50 shrink-0"
                    style={{ backgroundColor: currentColor.colorHex }}
                  />
                  <span>{currentColor.name}</span>
                </div>
              )}
            </div>

            {/* Interactive Color Thumbnails ("Suggested in other colours") */}
            {product.colorVariants && product.colorVariants.length > 1 && (
              <div className="mt-4 pt-3 border-t border-[#E8DFC8]/70">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#B88E3E]" />
                    <span>View in other colours:</span>
                  </div>
                  <span className="text-[11px] text-[#8F6E2B] font-mono">
                    {product.colorVariants.length} shades available
                  </span>
                </div>

                {/* Thumbnails grid */}
                <div className="grid grid-cols-4 gap-2">
                  {product.colorVariants.map((variant, idx) => {
                    const isSelected = selectedColorIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`group relative rounded-xs overflow-hidden border-2 transition-all p-0.5 bg-white text-left ${
                          isSelected
                            ? 'border-[#B88E3E] ring-2 ring-[#B88E3E]/30 scale-[1.02]'
                            : 'border-[#DDD5C5] hover:border-stone-500 opacity-80 hover:opacity-100'
                        }`}
                        title={variant.name}
                      >
                        <div className="relative aspect-square w-full rounded-2xs overflow-hidden bg-[#FAF4EA]">
                          <Image
                            src={variant.image}
                            alt={variant.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {/* Color Dot indicator */}
                          <span
                            className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ring-1 ring-white shadow-xs"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        </div>
                        <span className="block text-[9px] text-stone-700 font-medium truncate mt-1 px-0.5 text-center leading-tight">
                          {variant.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Color Swatches */}
          <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Category & Badge */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#8F6E2B] font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" />
                  <span>{product.category}</span>
                </div>
                <span className="font-mono text-[10px] text-stone-500">Charminar Stall No. 10</span>
              </div>

              {/* Title & English Translation */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium leading-snug">
                  {product.name}
                </h3>
                {product.englishName && (
                  <p className="text-xs text-[#8F6E2B] font-medium mt-1">
                    <span className="font-semibold text-stone-600">English Translation/Name:</span> {product.englishName}
                  </p>
                )}
              </div>

              {/* Automated Pricing */}
              <div className="p-3 bg-white border border-[#EAE3D2] rounded-xs space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-bold text-stone-900 tabular-nums">
                    ₹{pricing.finalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ₹{pricing.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-semibold text-[#8E2333] ml-auto">
                    Save ₹{pricing.discountAmount.toLocaleString('en-IN')} ({pricing.discountPercent}% OFF)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Color Swatch Selection Pills */}
              {product.colorVariants && product.colorVariants.length > 0 && (
                <div className="pt-2">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-700 font-semibold mb-2">
                    Selected Colour: <span className="text-[#8E2333] font-bold">{currentColor?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colorVariants.map((variant, idx) => {
                      const isSelected = selectedColorIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`px-3 py-1.5 text-xs rounded-xs border flex items-center gap-2 transition-all ${
                            isSelected
                              ? 'bg-stone-900 text-white border-stone-900 font-medium shadow-xs'
                              : 'bg-white text-stone-700 border-[#DDD5C5] hover:border-stone-900'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full ring-1 ring-white/60 shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <span>{variant.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Polish / Option selection */}
              {product.options && product.options.length > 0 && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1.5 font-medium">
                    Finish / Metal Polish
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        className={`px-3 py-1.5 text-xs rounded-xs border transition-colors ${
                          activeOption === opt
                            ? 'bg-[#1C523E] text-white border-[#1C523E] font-medium'
                            : 'bg-white text-stone-700 border-[#DDD5C5] hover:border-stone-900'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-medium text-stone-700 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#DDD5C5] rounded-xs bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions: Add to Order, Order Now, and Wishlist */}
            <div className="pt-4 border-t border-[#EAE3D2] space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className={`py-3 px-3 rounded-xs border text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                    wasAdded
                      ? 'bg-[#1C523E] border-[#1C523E] text-white'
                      : 'bg-white border-[#C5A059] text-stone-900 hover:bg-[#FAF4EA]'
                  }`}
                >
                  {wasAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added in {currentColor ? currentColor.name.split(' ')[0] : 'Bag'}!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#B88E3E]" />
                      <span>Add to Order</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOrderNow}
                  className="py-3 px-3 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xs border border-[#DDD5C5] text-stone-700 hover:text-stone-950 text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-white"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#1C523E]" />
                  <span>Enquire {currentColor ? currentColor.name.split(' ')[0] : ''} on WhatsApp</span>
                </a>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  type="button"
                  aria-label={isWishlisted ? 'Remove from favourites' : 'Save to favourites'}
                  className={`p-2.5 rounded-xs border transition-colors ${
                    isWishlisted
                      ? 'border-[#8E2333] bg-[#8E2333] text-white'
                      : 'border-[#E2D8C3] bg-white text-stone-700 hover:text-[#8E2333]'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
