'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WishlistDrawer from '@/components/WishlistDrawer';
import AccountModal from '@/components/AccountModal';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import QuickViewModal from '@/components/QuickViewModal';
import { ArrowLeft, Sparkles, Eye, Palette, ShoppingBag, MessageCircle, X, Check, Filter } from 'lucide-react';
import { PRODUCTS, ProductItem, ColorVariant } from '@/lib/products';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface GalleryItem {
  id: string;
  title: string;
  englishName: string;
  tag: string;
  category: 'earrings' | 'necklaces' | 'bangles' | 'rings' | 'heritage';
  image: string; // Distinct dedicated gallery photography
  description: string;
  productId?: string; // Links to product for colour suggestions and ordering
}

const GALLERY_PHOTOS: GalleryItem[] = [
  {
    id: 'g-01',
    title: 'Chandbali (Crescent Moon Earrings)',
    englishName: 'Crescent Moon Earrings',
    tag: 'Hyderabadi Earring',
    category: 'earrings',
    image: '/images/gallery/gallery-chandbali-craft.jpg',
    description:
      'Classic Nizami crescent arch earrings flanked by woven pearl fringes and hanging emerald drops. Handcrafted on antique gold alloy at Stall No. 10.',
    productId: 'nz-01',
  },
  {
    id: 'g-02',
    title: 'Karan Phool (Ear-Flower Ornaments)',
    englishName: 'Ear-Flower Ornaments or Floral Ear-Covers',
    tag: 'Floral Ear-Cover',
    category: 'earrings',
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
    category: 'earrings',
    image: '/images/gallery/gallery-jhumka-display.jpg',
    description:
      'Ornate multi-tier royal bells with natural seed pearls that sway gently with every movement.',
    productId: 'nz-03',
  },
  {
    id: 'g-04',
    title: 'Gulzar Bridal Choker & Polki Collar',
    englishName: 'Royal Nizami Pearl Choker',
    tag: 'Bridal Heirloom',
    category: 'necklaces',
    image: '/images/gallery/gallery-pearl-collar.jpg',
    description:
      'Hand-woven multiple strands of Basra-style pearls anchored by an intricate polki Kundan medallion.',
    productId: 'nz-05',
  },
  {
    id: 'g-05',
    title: 'Jadau Filigree Kada & Bangles',
    englishName: 'Imperial Openable Kada Bracelet',
    tag: 'Artisanal Bangle',
    category: 'bangles',
    image: '/images/gallery/gallery-kada-close-up.jpg',
    description:
      'Screw-lock openable kada hand-embossed with traditional floral motifs and ruby cabochon stones.',
    productId: 'nz-04',
  },
  {
    id: 'g-06',
    title: 'Deccan Ruby Blossom Tops',
    englishName: 'Floral Ear Studs with Gemstone Drops',
    tag: 'Everyday Luxury',
    category: 'earrings',
    image: '/images/gallery/gallery-ruby-studs.jpg',
    description:
      'Dainty floral tops handset with faceted ruby glass petals and micro pearl borders.',
    productId: 'nz-06',
  },
  {
    id: 'g-07',
    title: 'Laad Bazaar Pearl Bangles',
    englishName: 'Laad Bazaar Artisan Lac Bangles',
    tag: 'Laad Bazaar Classic',
    category: 'bangles',
    image: '/images/gallery/gallery-laad-bazaar.jpg',
    description:
      'Handcrafted lac bangles embellished with authentic Hyderabadi seed pearls and gold leaf work.',
    productId: 'nz-07',
  },
  {
    id: 'g-08',
    title: 'Nizami Royal Bridal Portrait',
    englishName: 'Traditional Hyderabad Bridal Styling',
    tag: 'Bridal Campaign',
    category: 'necklaces',
    image: '/images/gallery/gallery-bridal-portrait.jpg',
    description:
      'A bride adorned in royal Charminar jewelry: five-strand Basra pearl choker, matching Chandbali earrings, and jadau maang tikka.',
    productId: 'nz-08',
  },
  {
    id: 'g-09',
    title: 'Almas Royal Jadau Diamond Ring',
    englishName: 'Heritage Solitaire & Polki Ring',
    tag: 'Cocktail Solitaire',
    category: 'rings',
    image: '/images/gallery/gallery-polki-ring-cushion.jpg',
    description:
      'Grand traditional Hyderabadi cocktail ring crafted with bezel-set uncut polki glass stones on open filigree shank.',
    productId: 'nz-09',
  },
  {
    id: 'g-10',
    title: 'Charminar Emerald & Basra Pearl Haar',
    englishName: 'Long Multi-Strand Pearl & Emerald Necklace',
    tag: 'Regal Haar',
    category: 'necklaces',
    image: '/images/gallery/gallery-emerald-haar.jpg',
    description:
      'Elaborate tiered long necklace strung with calibrated emerald beads, natural baroque pearls, and antique gold separators.',
    productId: 'nz-05',
  },
  {
    id: 'g-11',
    title: 'Imperial Jadau Choker Set',
    englishName: 'Bridal Collar Choker with Teardrop Drops',
    tag: 'Grand Bridal',
    category: 'necklaces',
    image: '/images/gallery/gallery-jadau-choker-set.jpg',
    description:
      'A royal Deccani court bridal set featuring handset Kundan stones, emerald cabochons, and clustered seed pearl fringes.',
    productId: 'nz-08',
  },
  {
    id: 'g-12',
    title: 'Nizami Jhoomar Passa & Maang Tikka',
    englishName: 'Traditional Hyderabad Side-Hair Ornament',
    tag: 'Head Ornament',
    category: 'earrings',
    image: '/images/gallery/gallery-nizam-jhumar-passa.jpg',
    description:
      'Classic fan-shaped Nizami Jhoomar with cascading Basra pearl strings designed to grace the side of the bride’s hair.',
    productId: 'nz-01',
  },
  {
    id: 'g-13',
    title: 'Old City Karigar Goldsmithing Bench',
    englishName: 'Generations of Artisan Craftsmanship',
    tag: 'Atelier Heritage',
    category: 'heritage',
    image: '/images/gallery/gallery-antique-gold-craft.jpg',
    description:
      'Master goldsmiths in the alleys behind Charminar meticulously setting polki stones and hand-threading fine Basra pearls.',
  },
  {
    id: 'g-14',
    title: 'Charminar Promenade at Dusk',
    englishName: 'Historic Monument & Old City Walkway',
    tag: 'Monument Heritage',
    category: 'heritage',
    image: '/images/gallery/gallery-charminar-night.jpg',
    description:
      'The glowing arches of Charminar at dusk, adjacent to our heritage Stall No. 10 and the vibrant Laad Bazaar pearl ateliers.',
  },
];

export default function GalleryPage() {
  const { wishlist, removeWishlist, toggleWishlist } = useWishlist();
  const { totalCount, addToCart } = useCart();

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  // Active filter tab
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Selected item modal state
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [gallerySelectedColorIdx, setGallerySelectedColorIdx] = useState<number>(0);
  const [galleryViewMode, setGalleryViewMode] = useState<'gallery' | 'color'>('color');

  // Card-level instant color preview
  const [cardColorMap, setCardColorMap] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Find linked product for selected gallery item
  const linkedProduct = selectedGalleryItem?.productId
    ? PRODUCTS.find((p) => p.id === selectedGalleryItem.productId)
    : null;

  const currentVariant: ColorVariant | undefined =
    linkedProduct?.colorVariants?.[gallerySelectedColorIdx] || linkedProduct?.colorVariants?.[0];

  const modalDisplayImage =
    galleryViewMode === 'color' && currentVariant
      ? currentVariant.image
      : selectedGalleryItem?.image;

  const handleOpenGalleryModal = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
    setGallerySelectedColorIdx(cardColorMap[item.id] ?? 0);
    setGalleryViewMode('color');
  };

  const handleAddGalleryItemToCart = () => {
    if (!linkedProduct) return;
    addToCart(
      linkedProduct,
      1,
      linkedProduct.options[0],
      currentVariant?.name,
      currentVariant?.image || selectedGalleryItem?.image
    );
    const shadeName = currentVariant ? currentVariant.name.split(' ')[0] : 'Default';
    triggerToast(`Added ${linkedProduct.name} (${shadeName}) - ₹${linkedProduct.price} to your bag!`);
  };

  const filteredPhotos =
    activeCategory === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#EAD7BA]">
      <Navbar
        wishlistCount={wishlist.length}
        cartCount={totalCount}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* Header Banner */}
        <div className="bg-[#F7F3EA] border-b border-[#EAE3D2] py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-[#8F6E2B] uppercase tracking-widest font-medium mb-3">
              <Link href="/" className="hover:text-stone-900 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-stone-900">Gallery</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight">
                  Charminar Heritage Gallery
                </h1>
                <p className="mt-2 text-stone-600 text-sm max-w-2xl">
                  High-definition photography of 14 authentic Hyderabadi pieces. Click any piece to inspect its craftsmanship and select from different colours and gemstone shades. All pieces priced between ₹50 and ₹200.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-white border border-[#C5A059]/40 text-xs font-semibold text-[#8F6E2B] self-start md:self-auto shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B88E3E]" />
                <span>Special Rates: ₹50 – ₹200</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-[#EAE3D2]">
              {[
                { id: 'all', label: 'All Photos (14)' },
                { id: 'earrings', label: 'Earrings & Chandbali' },
                { id: 'necklaces', label: 'Chokers & Haars' },
                { id: 'bangles', label: 'Kadas & Bangles' },
                { id: 'rings', label: 'Cocktail Rings' },
                { id: 'heritage', label: 'Monument & Atelier' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xs text-xs font-medium tracking-wide transition-all ${
                    activeCategory === tab.id
                      ? 'bg-stone-900 text-[#FAF8F5] shadow-xs'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8DFC8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="py-16 md:py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhotos.map((item) => {
                const prod = item.productId ? PRODUCTS.find((p) => p.id === item.productId) : null;
                const previewIdx = cardColorMap[item.id];
                const hasPreview = previewIdx !== undefined && prod?.colorVariants?.[previewIdx];
                const cardImg = hasPreview ? prod!.colorVariants[previewIdx].image : item.image;
                const shadeCount = prod?.colorVariants?.length || 0;

                return (
                  <div
                    key={item.id}
                    className="group rounded-xs overflow-hidden bg-white border border-[#EAE3D2] shadow-2xs hover:border-[#C5A059] hover:shadow-md transition-all flex flex-col"
                  >
                    {/* Image Area */}
                    <div
                      onClick={() => handleOpenGalleryModal(item)}
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
                      
                      {/* Corner Tag */}
                      <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-0.5 rounded-xs border border-[#E8DFC8] text-[10px] uppercase tracking-wider text-[#8F6E2B] font-semibold">
                        {item.tag}
                      </div>

                      {/* Price Badge (₹50 - ₹200) */}
                      {prod && (
                        <div className="absolute top-2.5 right-2.5 bg-stone-900/90 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 rounded-xs text-[11px] font-semibold tracking-wide shadow-xs">
                          ₹{prod.price}
                        </div>
                      )}

                      {/* Switched Colour Badge if active */}
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
                          <span>View Details & Shades</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content & Interactive Swatches */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3
                          onClick={() => handleOpenGalleryModal(item)}
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

                      {/* Interactive Colour Swatches on Card */}
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

                          <div className="flex items-center gap-1.5">
                            {prod.colorVariants.map((v, idx) => {
                              const isCur = (cardColorMap[item.id] ?? 0) === idx;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCardColorMap((prev) => ({ ...prev, [item.id]: idx }));
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
                              onClick={() => handleOpenGalleryModal(item)}
                              className="ml-auto text-[10px] font-semibold text-[#8F6E2B] hover:text-stone-900 underline underline-offset-2"
                            >
                              Explore
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Card Bottom Provenance */}
                      <div className="pt-2 border-t border-[#F5EFE4] flex items-center justify-between text-xs text-stone-600">
                        <span className="text-[11px] text-[#8E2333] font-medium">Stall No. 10</span>
                        <button
                          type="button"
                          onClick={() => handleOpenGalleryModal(item)}
                          className="text-[11px] text-[#B88E3E] hover:text-stone-900 flex items-center gap-1 font-semibold"
                        >
                          <span>Select Shades</span>
                          <Sparkles className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WhatsApp Consultation Banner */}
        <WhatsAppCTA />
      </main>

      <Footer />

      {/* Interactive Gallery Detail Modal with Live Colour Switching */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setSelectedGalleryItem(null)} />

          <div className="relative bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs max-w-3xl w-full shadow-2xl overflow-hidden z-10 my-4">
            <button
              onClick={() => setSelectedGalleryItem(null)}
              type="button"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-700 hover:bg-white shadow-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Preview with Toggle between Gallery Shot and Colour View */}
              <div className="relative aspect-4/3 md:aspect-auto min-h-[320px] md:min-h-[440px] bg-[#F5EFE4] overflow-hidden">
                <Image
                  src={modalDisplayImage || selectedGalleryItem.image}
                  alt={selectedGalleryItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3.5 left-3.5 bg-[#FAF8F5]/92 px-2.5 py-1 rounded-xs text-[10px] uppercase tracking-wider text-[#8F6E2B] font-semibold border border-[#E8DFC8]">
                  {selectedGalleryItem.tag}
                </div>

                {/* View Mode Toggle Pill */}
                {linkedProduct?.colorVariants && (
                  <div className="absolute top-3.5 right-12 z-10 bg-white/90 backdrop-blur-xs p-0.5 rounded-xs border border-[#E8DFC8] flex items-center text-[10px] font-semibold shadow-xs">
                    <button
                      type="button"
                      onClick={() => setGalleryViewMode('gallery')}
                      className={`px-2 py-0.5 rounded-2xs transition-colors ${
                        galleryViewMode === 'gallery'
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Gallery Shot
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryViewMode('color')}
                      className={`px-2 py-0.5 rounded-2xs transition-colors ${
                        galleryViewMode === 'color'
                          ? 'bg-[#B88E3E] text-white'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Colour View
                    </button>
                  </div>
                )}

                {/* Current Active Variant Pill */}
                {galleryViewMode === 'color' && currentVariant && (
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

              {/* Information & Colour Variations */}
              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#8F6E2B] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" />
                    <span>Nazimz 10 · Stall No. 10 Charminar</span>
                  </div>

                  <h3 className="font-serif text-2xl text-stone-900 font-medium">
                    {selectedGalleryItem.title}
                  </h3>

                  {selectedGalleryItem.englishName && (
                    <p className="text-xs text-[#8F6E2B] font-medium">
                      <span className="text-stone-500 font-normal">English Name:</span> {selectedGalleryItem.englishName}
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
                    {selectedGalleryItem.description}
                  </p>

                  {/* Other Colour Suggestions */}
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

                      <div className="grid grid-cols-4 gap-2">
                        {linkedProduct.colorVariants.map((variant, idx) => {
                          const isSelected = galleryViewMode === 'color' && gallerySelectedColorIdx === idx;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setGallerySelectedColorIdx(idx);
                                setGalleryViewMode('color');
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

                {/* Actions */}
                <div className="pt-4 border-t border-[#EAE3D2] space-y-2">
                  {linkedProduct ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleAddGalleryItemToCart}
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
                      href={BUSINESS_CONFIG.getWhatsAppGeneralUrl(`I am enquiring about "${selectedGalleryItem.title}" seen in your Charminar gallery.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xs bg-[#1C523E] text-white text-xs font-semibold uppercase flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QuickView Modal for standard product views */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemove={removeWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-xs shadow-lg border border-[#C5A059]/40 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
