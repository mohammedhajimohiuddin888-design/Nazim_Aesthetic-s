'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag, Plus, Minus, ArrowRight, Check, Palette } from 'lucide-react';
import { ProductItem, PRODUCTS } from '@/lib/products';
import { computeProductPricing } from '@/lib/pricing';
import { useCart } from '@/lib/useCart';

export type { ProductItem } from '@/lib/products';
export { PRODUCTS } from '@/lib/products';

interface FeaturedCollectionProps {
  products?: ProductItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: ProductItem, initialColorIndex?: number) => void;
  onWhatsAppInquire?: (product: ProductItem) => void;
}

export default function FeaturedCollection({
  selectedCategory,
  onSelectCategory,
  wishlist,
  onToggleWishlist,
  onQuickView,
}: FeaturedCollectionProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  // Local card state for quantities, options, and active color
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categoryId === selectedCategory);

  const filterTabs = [
    { id: 'all', label: 'All Pieces' },
    { id: 'earrings', label: 'Earrings & Chandbali' },
    { id: 'jhumkas', label: 'Royal Jhumkas' },
    { id: 'bracelets', label: 'Kadas & Bangles' },
    { id: 'new-arrivals', label: 'Chokers & Sets' },
  ];

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleOptionChange = (productId: string, opt: string) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: opt }));
  };

  const handleColorChange = (productId: string, colorIndex: number) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorIndex }));
  };

  const handleAddToOrder = (product: ProductItem) => {
    const qty = quantities[product.id] || 1;
    const option = selectedOptions[product.id] || product.options[0];
    const colorIdx = selectedColors[product.id] || 0;
    const colorVariant = product.colorVariants?.[colorIdx];

    addToCart(
      product,
      qty,
      option,
      colorVariant?.name,
      colorVariant?.image || product.image
    );

    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleOrderNow = (product: ProductItem) => {
    const qty = quantities[product.id] || 1;
    const option = selectedOptions[product.id] || product.options[0];
    const colorIdx = selectedColors[product.id] || 0;
    const colorVariant = product.colorVariants?.[colorIdx];

    addToCart(
      product,
      qty,
      option,
      colorVariant?.name,
      colorVariant?.image || product.image
    );
    router.push('/checkout');
  };

  return (
    <section id="collection" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E2333]" aria-hidden="true" />
            <span>Master Craftsman Selection</span>
            <span aria-hidden="true">·</span>
            <span>Charminar Stall No. 10</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight text-balance">
            Hyderabadi Jewellery Collection
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Signature Crescent Chandbalis, Floral Karan Phool, and Nizam bell jhumkas. Choose your favorite gemstone color shade with real-time picture previews.
          </p>

          {/* Filter Bar (Segmented tab control) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-[#F2EDE2]/80 border border-[#E5DEC9] rounded-xs max-w-2xl mx-auto">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  type="button"
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-all whitespace-nowrap ${
                    active
                      ? 'bg-white text-stone-950 shadow-xs border border-[#C5A059]/40 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, idx) => {
            const isFav = wishlist.includes(product.id);
            const pricing = computeProductPricing(product.originalPrice, product.discountPercent);
            const currentQty = quantities[product.id] || 1;
            const currentOption = selectedOptions[product.id] || product.options[0];
            const wasJustAdded = addedAnimation[product.id] || false;

            // Current active color variant
            const activeColorIdx = selectedColors[product.id] || 0;
            const activeVariant = product.colorVariants?.[activeColorIdx] || product.colorVariants?.[0];
            const currentCardImage = activeVariant?.image || product.image;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group bg-[#FCFAF7] border border-[#EAE3D2] rounded-xs overflow-hidden flex flex-col hover:border-[#C5A059]/70 hover:shadow-md transition-all duration-300"
              >
                {/* Visual Imagery Box */}
                <div className="relative aspect-4/3 w-full bg-[#F5EFE4] overflow-hidden">
                  <Image
                    src={currentCardImage}
                    alt={`${product.name} - ${activeVariant?.name || ''}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-106"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gentle hover vignette */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300 pointer-events-none" />

                  {/* Product Code Badge */}
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#E8DFC8] text-[10px] tracking-wider text-stone-700 font-mono">
                    {product.code}
                  </div>

                  {/* Discount percentage tag */}
                  {pricing.discountPercent > 0 && (
                    <div className="absolute bottom-3 left-3 bg-[#8E2333] text-white px-2 py-0.5 rounded-xs text-[10px] font-bold tracking-wider uppercase shadow-xs">
                      {pricing.discountPercent}% OFF · Save ₹{pricing.discountAmount.toLocaleString('en-IN')}
                    </div>
                  )}

                  {/* Top Right: Wishlist / Favourite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    type="button"
                    aria-label={isFav ? `Remove ${product.name} from favourites` : `Add ${product.name} to favourites`}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                      isFav
                        ? 'bg-[#8E2333] text-white shadow-sm'
                        : 'bg-white/85 text-stone-700 hover:text-[#8E2333] hover:bg-white'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} strokeWidth={1.8} />
                  </button>

                  {/* Hover Quick View Trigger */}
                  <button
                    onClick={() => onQuickView(product, activeColorIdx)}
                    type="button"
                    className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 py-2 px-3 bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-medium rounded-xs shadow-xs hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B88E3E]" />
                    <span>Quick View (All {product.colorVariants?.length || 1} Colours)</span>
                  </button>
                </div>

                {/* Product Metadata & Automated Price Breakdown */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-500 mb-1.5">
                      <span>{product.category}</span>
                      <span className="text-[#8F6E2B] font-mono text-[10px]">Stall No. 10</span>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => onQuickView(product, activeColorIdx)}
                      className="font-serif text-lg text-stone-900 font-medium hover:text-[#B88E3E] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* English Translation subtitle */}
                    {product.englishName && (
                      <p className="text-[11px] text-[#8F6E2B] font-medium mt-0.5 line-clamp-1">
                        • {product.englishName}
                      </p>
                    )}

                    {/* Material descriptor */}
                    <p className="mt-1 text-xs text-stone-500 line-clamp-1 font-normal">
                      {product.material}
                    </p>

                    {/* Interactive Colour Variant Swatches */}
                    {product.colorVariants && product.colorVariants.length > 1 && (
                      <div className="mt-3 p-2 bg-[#F6F2EA] rounded-xs border border-[#E8DFC8]">
                        <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium mb-1.5">
                          <span className="flex items-center gap-1">
                            <Palette className="w-3 h-3 text-[#B88E3E]" />
                            <span>Colours:</span>
                          </span>
                          <span className="text-[#8E2333] font-semibold truncate max-w-[130px]">
                            {activeVariant?.name.split(' ')[0]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {product.colorVariants.map((variant, cIdx) => {
                            const isChosen = activeColorIdx === cIdx;
                            return (
                              <button
                                key={cIdx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleColorChange(product.id, cIdx);
                                }}
                                title={variant.name}
                                className={`w-5 h-5 rounded-full border transition-transform flex items-center justify-center ${
                                  isChosen
                                    ? 'ring-2 ring-[#B88E3E] scale-110 shadow-xs'
                                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: variant.colorHex }}
                              />
                            );
                          })}
                          <button
                            type="button"
                            onClick={() => onQuickView(product, activeColorIdx)}
                            className="text-[10px] text-stone-500 hover:text-stone-900 ml-auto underline"
                          >
                            +{product.colorVariants.length} shades
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Design / Polish Option Selector */}
                    {product.options && product.options.length > 1 && (
                      <div className="mt-3">
                        <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                          Available Finish / Polish
                        </label>
                        <select
                          value={currentOption}
                          onChange={(e) => handleOptionChange(product.id, e.target.value)}
                          className="w-full text-xs py-1.5 px-2 bg-white border border-[#DDD5C5] rounded-xs text-stone-800 focus:outline-hidden focus:border-[#C5A059]"
                        >
                          {product.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Price Calculation Display */}
                  <div className="pt-3 border-t border-[#EFE8D8] space-y-2">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-stone-900 tabular-nums">
                            ₹{pricing.finalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-stone-400 line-through tabular-nums">
                            ₹{pricing.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#8E2333] font-medium block">
                          Discount: ₹{pricing.discountAmount.toLocaleString('en-IN')} ({pricing.discountPercent}%)
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#DDD5C5] rounded-xs bg-white">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums text-stone-900">
                          {currentQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToOrder(product)}
                        className={`py-2 px-3 rounded-xs border text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-all ${
                          wasJustAdded
                            ? 'bg-[#1C523E] border-[#1C523E] text-white'
                            : 'bg-white border-[#C5A059]/60 text-stone-900 hover:bg-[#FAF4EA]'
                        }`}
                      >
                        {wasJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#B88E3E]" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOrderNow(product)}
                        className="py-2 px-3 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-1 shadow-xs transition-colors"
                      >
                        <span>Order Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stall note footer */}
        <div className="mt-14 p-4 rounded-xs bg-[#F5EFE4]/60 border border-[#E5DEC9] max-w-2xl mx-auto text-center">
          <p className="text-xs text-stone-600">
            <span className="font-semibold text-stone-800">Visiting Charminar?</span> Inspect all Chandbali and Karan Phool shade variants in person at Stall No. 10, or order online with express delivery calculated at ₹35/km.
          </p>
        </div>

      </div>
    </section>
  );
}
