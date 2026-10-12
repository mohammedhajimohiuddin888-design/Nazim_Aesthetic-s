'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedCollection, { PRODUCTS, ProductItem } from '@/components/FeaturedCollection';
import GallerySection from '@/components/GallerySection';
import BrandStory from '@/components/BrandStory';
import CustomerSupport from '@/components/CustomerSupport';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import Footer from '@/components/Footer';
import QuickViewModal from '@/components/QuickViewModal';
import WishlistDrawer from '@/components/WishlistDrawer';
import WhatsAppModal from '@/components/WhatsAppModal';
import AccountModal from '@/components/AccountModal';
import CartDrawer from '@/components/CartDrawer';
import { Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { wishlist, toggleWishlist, removeWishlist } = useWishlist();
  const { totalCount } = useCart();
  
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [quickViewColorIdx, setQuickViewColorIdx] = useState<number>(0);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppProduct, setWhatsAppProduct] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleWishlist = (productId: string) => {
    const added = toggleWishlist(productId);
    triggerToast(added ? 'Added to your favourites' : 'Removed from your favourites');
  };

  const handleOpenWhatsApp = (product?: ProductItem | null) => {
    if (product) {
      window.open(
        BUSINESS_CONFIG.getWhatsAppProductUrl(product.name, product.code, product.price),
        '_blank'
      );
    } else {
      window.open(BUSINESS_CONFIG.whatsappUrl, '_blank');
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#EAD7BA]">
      
      {/* 1. Premium Navigation Bar (Multi-page routing ready) */}
      <Navbar
        wishlistCount={wishlist.length}
        cartCount={totalCount}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Featured Categories */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* 4. Featured Collection Showcase */}
        <FeaturedCollection
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod, colorIdx) => {
            setQuickViewProduct(prod);
            setQuickViewColorIdx(colorIdx ?? 0);
          }}
          onWhatsAppInquire={(prod) => handleOpenWhatsApp(prod)}
        />

        {/* 5. Charminar Heritage Gallery (Different Photos & Live Colour Switching) */}
        <GallerySection onOpenToast={triggerToast} />

        {/* 6. Charminar Brand Story */}
        <BrandStory onWhatsAppClick={() => handleOpenWhatsApp(null)} />

        {/* 6. Customer Support & Concierge */}
        <CustomerSupport />

        {/* 7. WhatsApp CTA Section */}
        <WhatsAppCTA onOpenModal={() => handleOpenWhatsApp(null)} />

      </main>

      {/* 8. Footer Foundation */}
      <Footer onWhatsAppClick={() => handleOpenWhatsApp(null)} />

      {/* Interactive Overlays */}
      <QuickViewModal
        product={quickViewProduct}
        initialColorIndex={quickViewColorIdx}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
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

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        product={whatsAppProduct}
      />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-xs shadow-lg border border-[#C5A059]/40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
