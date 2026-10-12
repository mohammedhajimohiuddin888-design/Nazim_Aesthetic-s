'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedCollection, { PRODUCTS, ProductItem } from '@/components/FeaturedCollection';
import QuickViewModal from '@/components/QuickViewModal';
import WishlistDrawer from '@/components/WishlistDrawer';
import AccountModal from '@/components/AccountModal';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { wishlist, toggleWishlist, removeWishlist } = useWishlist();
  const { totalCount } = useCart();

  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [quickViewColorIdx, setQuickViewColorIdx] = useState<number>(0);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleToggleWishlist = (productId: string) => {
    const added = toggleWishlist(productId);
    triggerToast(added ? 'Added to your favourites' : 'Removed from your favourites');
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

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
        {/* Breadcrumb & Header */}
        <div className="bg-[#F7F3EA] border-b border-[#EAE3D2] py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-[#8F6E2B] uppercase tracking-widest font-medium mb-3">
              <Link href="/" className="hover:text-stone-900 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-stone-900">Products</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight">
              Jewellery Collection
            </h1>
            
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              Authentic Nizami jewellery handcrafted in Old Hyderabad. Direct from Stall No. 10 at Charminar.
            </p>
          </div>
        </div>

        {/* Collection Grid */}
        <FeaturedCollection
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(prod, cIdx) => {
            setQuickViewProduct(prod);
            setQuickViewColorIdx(cIdx ?? 0);
          }}
        />

        {/* WhatsApp CTA */}
        <WhatsAppCTA />
      </main>

      <Footer />

      {/* Modals & Drawers */}
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

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-xs shadow-lg border border-[#C5A059]/40 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
