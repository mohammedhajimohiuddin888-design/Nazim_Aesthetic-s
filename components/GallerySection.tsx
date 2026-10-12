'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Eye, Palette, Sparkles, ArrowRight, ShoppingBag, MessageCircle, X, Check } from 'lucide-react';
import { PRODUCTS, ProductItem, ColorVariant } from '@/lib/products';
import { BUSINESS_CONFIG } from '@/lib/constants';
import { useCart } from '@/lib/useCart';

export interface GalleryItem {
  id: string;
  title: string;
  englishName: string;
  tag: string;
  image: string; // Distinct dedicated gallery photography
  description: string;
  productId?: string; // Links to product for interactive colour variants
}

export const FEATURED_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-01',
    title: 'Chandbali (Crescent Moon Earrings)',
    englishName: 'Crescent Moon Earrings',
    tag: 'Hyderabadi Earring',
    image: '/images/gallery/gallery-chandbali-craft.jpg',
    description:
      'Classic Nizami crescent arch earrings flanked by woven pearl fringes and hanging gemstone drops. Handcrafted at Stall No. 10.',
    productId: 'nz-01',
  },
  {
    id: 'g-02',
    title: 'Karan Phool (Ear-Flower Ornaments)',
    englishName: 'Ear-Flower Ornaments or Floral Ear-Covers',
    tag: 'Floral Ear-Cover',
    image: '/images/gallery/gallery-karan-phool-macro.jpg',
    description:
      'Traditional sunburst flower ornaments that elegantly sit over the earlobe with ruby centers and delicate pearl bells.',
    productId: 'nz-02',
  },
  {
    id: 'g-03',
    title: 'Nizam Royal Pearl Jhumka',
    englishName: 'Royal Bell Dome Jhumkas',
    tag: 'Three-Tier Bell',
    image: '/images/gallery/gallery-jhumka-display.jpg',
    description:
      'Ornate multi-tier royal bells with natural seed pearls that sway gently with every movement.',
    productId: 'nz-03',
  },
  {
    id: 'g-04',
    title: 'Jadau Filigree Kada & Bangles',
    englishName: 'Imperial Openable Kada Bracelet',
    tag: 'Artisanal Bangle',
    image: '/images/gallery/gallery-kada-close-up.jpg',
    description:
      'Screw-lock openable kada hand-embossed with traditional floral motifs and ruby cabochon stones.',
    productId: 'nz-04',
  },
  {
    id: 'g-05',
    title: 'Gulzar Bridal Choker & Polki Collar',
    englishName: 'Royal Nizami Pearl Choker',
    tag: 'Bridal Heirloom',
    image: '/images/gallery/gallery-pearl-collar.jpg',
    description:
      'Hand-woven multiple strands of Basra-style pearls anchored by an intricate polki Kundan medallion.',
    productId: 'nz-05',
  },
  {
    id: 'g-06',
    title: 'Deccan Ruby Blossom Tops',
    englishName: 'Floral Ear Studs with Gemstone Drops',
    tag: 'Everyday Luxury',
    image: '/images/gallery/gallery-ruby-studs.jpg',
    description:
      'Dainty floral tops handset with faceted ruby glass petals and micro pearl borders.',
    productId: 'nz-06',
  },
  {
    id: 'g-07',
    title: 'Almas Royal Jadau Diamond Ring',
    englishName: 'Heritage Solitaire & Polki Ring',
    tag: 'Cocktail Solitaire',
    image: '/images/gallery/gallery-polki-ring-cushion.jpg',
    description:
      'Grand traditional Hyderabadi cocktail ring crafted with bezel-set uncut polki glass stones on open filigree shank.',
    productId: 'nz-09',
  },
  {
    id: 'g-08',
    title: 'Laad Bazaar Pearl Bangles',
    englishName: 'Laad Bazaar Artisan Lac Bangles',
    tag: 'Laad Bazaar Classic',
    image: '/images/gallery/gallery-laad-bazaar.jpg',
    description:
      'Handcrafted lac bangles embellished with authentic Hyderabadi seed pearls and gold leaf work.',
    productId: 'nz-07',
  },
];

interface GallerySectionProps {
  onOpenToast?: (message: string) => void;
}

export default function GallerySection({ onOpenToast }: GallerySectionProps) {
  const { addToCart } = useCart();

  // Selected item modal state
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeColorIdx, setActiveColorIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'color'>('color');

  // Card-level active color state for instant preview on grid
  const [cardColorPreview, setCardColorPreview] = useState<Record<string, number>>({});

  const handleOpenItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setActiveColorIdx(cardColorPreview[item.id] ?? 0);
    setViewMode('color');
  };

  const linkedProduct = selectedItem?.productId
    ? PRODUCTS.find((p) => p.id === selectedItem.productId)
    : null;

  const currentVariant: ColorVariant | undefined =
    linkedProduct?.colorVariants?.[activeColorIdx] || linkedProduct?.colorVariants?.[0];

  const modalDisplayImage =
    viewMode === 'color' && currentVariant
      ? currentVariant.image
      : selectedItem?.image;

  const handleAddToCart = () => {
    if (!linkedProduct) return;
    addToCart(
      linkedProduct,
      1,
      linkedProduct.options[0],
      currentVariant?.name,
      currentVariant?.image || selectedItem?.image
    );
    const shadeName = currentVariant ? currentVariant.name.split(' ')[0] : 'Default';
    if (onOpenToast) {
      onOpenToast(`Added ${linkedProduct.name} (${shadeName}) - ₹${linkedProduct.price} to your bag!`);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#F7F3EA] border-t border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" aria-hidden="true" />
              <span>Visual Showcase & Colour Swatches</span>
              <span aria-hidden="true">·</span>
              <span>All Pieces ₹50 – ₹200</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight">
              Charminar Heritage Gallery
            </h2>
            <p className="text-stone-600 text-sm max-w-2xl">
              Authentic photography of Hyderabadi ornaments. Click any piece to see its handcrafted design and explore all available gemstone and pearl colour shades.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F6E2B] hover:text-stone-900 px-4 py-2.5 rounded-xs border border-[#C5A059]/40 bg-white hover:bg-[#FAF8F5] transition-all shadow-2xs"
            >
              <span>View Full Gallery (14 Pieces)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_GALLERY_ITEMS.map((item) => {
            const prod = item.productId ? PRODUCTS.find((p) => p.id === item.productId) : null;
            const previewIdx = cardColorPreview[item.id];
            const hasPreview = previewIdx !== undefined && prod?.colorVariants?.[previewIdx];
            const cardImg = hasPreview ? prod!.colorVariants[previewIdx].image : item.image;
            const shadeCount = prod?.colorVariants?.length || 0;

            return (
              <div
                key={item.id}
                className="group rounded-xs overflow-hidden bg-white border border-[#EAE3D2] shadow-2xs hover:border-[#C5A059] hover:shadow-md transition-all flex flex-col"
              >
                {/* Image Container */}
                <div
                  onClick={() => handleOpenItem(item)}
                  className="relative aspect-4/3 w-full bg-[#F5EFE4] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={cardImg}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Corner Provenance Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-0.5 rounded-xs border border-[#E8DFC8] text-[10px] uppercase tracking-wider text-[#8F6E2B] font-semibold">
                    {item.tag}
                  </div>

                  {/* Price Tag (Between ₹50 and ₹200) */}
                  {prod && (
                    <div className="absolute top-2.5 right-2.5 bg-stone-900/90 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 rounded-xs text-[11px] font-semibold tracking-wide shadow-xs">
                      ₹{prod.price}
                    </div>
                  )}

                  {/* Active Variant Indicator if switched on card */}
                  {hasPreview && (
                    <div className="absolute bottom-2.5 left-2.5 bg-stone-900/90 text-white px-2 py-0.5 rounded-xs text-[10px] font-medium flex items-center gap-1 shadow-sm">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: prod!.colorVariants[previewIdx].colorHex }}
                      />
                      <span>{prod!.colorVariants[previewIdx].name.split(' ')[0]}</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-stone-900 text-xs font-semibold py-1.5 px-3 rounded-xs shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#B88E3E]" />
                      <span>Inspect & Colours</span>
                    </span>
                  </div>
                </div>

                {/* Card Content & Interactive Colour Swatches */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3
                      onClick={() => handleOpenItem(item)}
                      className="font-serif text-base font-medium text-stone-900 hover:text-[#B88E3E] transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.title}
                    </h3>
                    {item.englishName && (
                      <p className="text-[11px] text-[#8F6E2B] mt-0.5 line-clamp-1">
                        • {item.englishName}
                      </p>
                    )}
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Live Card Swatches for Colour Switching */}
                  {prod?.colorVariants && prod.colorVariants.length > 0 && (
                    <div className="pt-2 border-t border-[#F5EFE4]">
                      <div className="flex items-center justify-between text-[11px] text-stone-600 mb-1.5">
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-stone-500 font-medium">
                          <Palette className="w-3 h-3 text-[#B88E3E]" />
                          <span>{shadeCount} Colours:</span>
                        </span>
                        <span className="text-[10px] font-semibold text-[#8F6E2B]">
                          ₹{prod.price}
                        </span>
                      </div>

                      {/* Swatch Pill Buttons */}
                      <div className="flex items-center gap-1.5">
                        {prod.colorVariants.map((v, idx) => {
                          const isCur = (cardColorPreview[item.id] ?? 0) === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCardColorPreview((prev) => ({ ...prev, [item.id]: idx }));
                              }}
                              title={v.name}
                              className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                                isCur
                                  ? 'border-stone-900 scale-110 shadow-xs ring-1 ring-[#B88E3E]'
                                  : 'border-white/80 hover:scale-105 opacity-85 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: v.colorHex }}
                            >
                              {isCur && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                            </button>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => handleOpenItem(item)}
                          className="ml-auto text-[10px] font-semibold text-[#8F6E2B] hover:text-stone-900 underline underline-offset-2"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom CTA */}
                  <div className="pt-2 border-t border-[#F5EFE4] flex items-center justify-between">
                    <span className="text-[11px] text-[#8E2333] font-medium">
                      Stall No. 10
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenItem(item)}
                      className="text-xs font-semibold text-[#8F6E2B] hover:text-stone-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Select Shades</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal: Shows Product In Different Colours */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setSelectedItem(null)} />

          <div className="relative bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs max-w-3xl w-full shadow-2xl overflow-hidden z-10 my-4">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              type="button"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-700 hover:bg-white shadow-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Image Preview with Live Colour Switcher */}
              <div className="relative aspect-4/3 md:aspect-auto min-h-[320px] md:min-h-[440px] bg-[#F5EFE4] overflow-hidden">
                <Image
                  src={modalDisplayImage || selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Tag */}
                <div className="absolute top-3.5 left-3.5 bg-[#FAF8F5]/92 px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-wider text-[#8F6E2B] font-semibold border border-[#E8DFC8]">
                  {selectedItem.tag}
                </div>

                {/* View Mode Switcher Pill */}
                {linkedProduct?.colorVariants && (
                  <div className="absolute top-3.5 right-12 z-10 bg-white/90 backdrop-blur-xs p-0.5 rounded-xs border border-[#E8DFC8] flex items-center text-[10px] font-semibold shadow-xs">
                    <button
                      type="button"
                      onClick={() => setViewMode('gallery')}
                      className={`px-2 py-0.5 rounded-2xs transition-colors ${
                        viewMode === 'gallery'
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Gallery Shot
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('color')}
                      className={`px-2 py-0.5 rounded-2xs transition-colors ${
                        viewMode === 'color'
                          ? 'bg-[#B88E3E] text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Colour View
                    </button>
                  </div>
                )}

                {/* Active Colour Badge Overlay */}
                {viewMode === 'color' && currentVariant && (
                  <div className="absolute bottom-3.5 left-3.5 bg-stone-900/90 text-white px-3 py-1.5 rounded-xs text-xs font-medium flex items-center gap-2 shadow-md">
                    <span
                      className="w-3 h-3 rounded-full ring-2 ring-white"
                      style={{ backgroundColor: currentVariant.colorHex }}
                    />
                    <span>{currentVariant.name}</span>
                    {currentVariant.badge && (
                      <span className="text-[10px] bg-[#C5A059]/40 text-[#FAF8F5] px-1.5 py-0.2 rounded-2xs ml-1">
                        {currentVariant.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Title, Price (₹50-₹200), Colour Variants Grid & CTAs */}
              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#8F6E2B] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" />
                    <span>Nazimz 10 · Stall No. 10 Charminar</span>
                  </div>

                  <h3 className="font-serif text-2xl text-stone-900 font-medium">
                    {selectedItem.title}
                  </h3>

                  {selectedItem.englishName && (
                    <p className="text-xs text-[#8F6E2B] font-medium">
                      <span className="text-stone-500 font-normal">English Name:</span> {selectedItem.englishName}
                    </p>
                  )}

                  {/* Guaranteed Price Between ₹50 and ₹200 */}
                  {linkedProduct && (
                    <div className="flex items-baseline gap-2.5 py-1">
                      <span className="text-2xl font-serif font-semibold text-stone-900">
                        ₹{linkedProduct.price}
                      </span>
                      <span className="text-sm text-stone-400 line-through">
                        ₹{linkedProduct.originalPrice}
                      </span>
                      <span className="text-xs font-semibold text-[#1C523E] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs">
                        {linkedProduct.discountPercent}% OFF
                      </span>
                      <span className="text-[11px] text-[#8F6E2B] font-mono">
                        (Special Rate ₹50–₹200)
                      </span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {/* Interactive Colour Selector */}
                  {linkedProduct?.colorVariants && linkedProduct.colorVariants.length > 0 && (
                    <div className="pt-3 border-t border-[#EAE3D2]">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2.5">
                        <span className="flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-[#B88E3E]" />
                          <span>Choose Colour & Gemstone Shade:</span>
                        </span>
                        <span className="text-[11px] text-[#8E2333] font-medium">
                          {linkedProduct.colorVariants.length} shades available
                        </span>
                      </div>

                      {/* Variant Thumbnails Grid */}
                      <div className="grid grid-cols-4 gap-2">
                        {linkedProduct.colorVariants.map((variant, idx) => {
                          const isSelected = viewMode === 'color' && activeColorIdx === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setActiveColorIdx(idx);
                                setViewMode('color');
                              }}
                              className={`relative rounded-xs border-2 p-1 transition-all text-left bg-white ${
                                isSelected
                                  ? 'border-[#B88E3E] ring-2 ring-[#B88E3E]/30 scale-102 shadow-xs'
                                  : 'border-[#DDD5C5] hover:border-stone-500 opacity-80 hover:opacity-100'
                              }`}
                            >
                              <div className="relative aspect-square w-full rounded-2xs overflow-hidden bg-[#F5EFE4]">
                                <Image
                                  src={variant.image}
                                  alt={variant.name}
                                  fill
                                  sizes="70px"
                                  className="object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <span
                                  className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full ring-1 ring-white"
                                  style={{ backgroundColor: variant.colorHex }}
                                />
                              </div>
                              <span className="block text-[9px] font-semibold text-stone-800 truncate mt-1 text-center">
                                {variant.name.split(' ')[0]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 border-t border-[#EAE3D2] space-y-2">
                  {linkedProduct ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="py-2.5 px-3 rounded-xs border border-[#C5A059] bg-white text-stone-900 text-xs font-semibold uppercase flex items-center justify-center gap-1.5 hover:bg-[#FAF4EA] transition-colors shadow-2xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#B88E3E]" />
                        <span>Add to Order (₹{linkedProduct.price})</span>
                      </button>

                      <a
                        href={BUSINESS_CONFIG.getWhatsAppProductUrl(
                          `${linkedProduct.name} - ${currentVariant ? currentVariant.name : ''}`,
                          linkedProduct.code,
                          linkedProduct.price
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold uppercase flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Order on WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <a
                      href={BUSINESS_CONFIG.getWhatsAppGeneralUrl(`I am enquiring about "${selectedItem.title}" seen in your gallery.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xs bg-[#1C523E] text-white text-xs font-semibold uppercase flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  )}

                  <div className="text-center">
                    <Link
                      href="/gallery"
                      className="text-[11px] text-stone-500 hover:text-stone-900 underline underline-offset-2"
                    >
                      Browse all 14 Charminar Gallery pieces →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
