'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WishlistDrawer from '@/components/WishlistDrawer';
import AccountModal from '@/components/AccountModal';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { ArrowLeft, MapPin, Clock, Phone, ShieldCheck, Truck } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';
import { PRODUCTS } from '@/components/FeaturedCollection';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';

export default function InfoPage() {
  const { wishlist, removeWishlist } = useWishlist();
  const { totalCount } = useCart();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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
        {/* Header */}
        <div className="bg-[#F7F3EA] border-b border-[#EAE3D2] py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-[#8F6E2B] uppercase tracking-widest font-medium mb-3">
              <Link href="/" className="hover:text-stone-900 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-stone-900">Info</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight">
              Boutique & Stall Information
            </h1>
            
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              Everything you need to know about visiting Stall No. 10 at Charminar, placing bespoke WhatsApp orders, and our jewellery craft guarantees.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 bg-white border border-[#EAE3D2] rounded-xs shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3E5] flex items-center justify-center text-[#8E2333]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Stall Location
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {BUSINESS_CONFIG.location}
                </p>
                <span className="block text-[11px] text-[#8F6E2B] font-medium">
                  {BUSINESS_CONFIG.landmark}
                </span>
              </div>

              <div className="p-6 bg-white border border-[#EAE3D2] rounded-xs shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3E5] flex items-center justify-center text-[#8F6E2B]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Visiting Hours
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {BUSINESS_CONFIG.hours}
                </p>
                <span className="block text-[11px] text-[#1C523E] font-medium">
                  Open All 7 Days · Extended Festive Evenings
                </span>
              </div>

              <div className="p-6 bg-white border border-[#EAE3D2] rounded-xs shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3E5] flex items-center justify-center text-[#1C523E]">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Direct Contact
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Direct Call / WhatsApp Enquiries:
                </p>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneNumber}`}
                  className="block font-mono text-sm font-semibold text-stone-900 hover:text-[#B88E3E]"
                >
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>

            </div>

            {/* How to visit in person */}
            <div className="p-8 bg-[#FCFAF7] border border-[#E5DEC9] rounded-xs space-y-4">
              <h2 className="font-serif text-2xl font-medium text-stone-900">
                Finding Stall No. 10 at Charminar
              </h2>
              <div className="text-sm text-stone-600 space-y-2 leading-relaxed">
                <p>
                  Charminar is located in the heart of Old Hyderabad. When you approach the historic monument from the Gulzar Houz fountain or the pearl market walkway, look towards the western promenade leading towards Mecca Masjid.
                </p>
                <p>
                  Our stall, <strong className="text-stone-900">Nazimz 10</strong>, is prominently situated along the heritage shopping walkway at Stall No. 10. You can reach out on WhatsApp at{' '}
                  <a href={BUSINESS_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1C523E] hover:underline">
                    {BUSINESS_CONFIG.phoneDisplay}
                  </a>{' '}
                  when you are nearby, and our stall keeper will be happy to guide you right to us.
                </p>
              </div>
            </div>

            {/* Ordering from home & shipping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#EAE3D2] rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-serif text-lg font-medium">
                  <Truck className="w-5 h-5 text-[#8F6E2B]" />
                  <span>Doorstep Delivery (@ ₹35/km)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We securely package all jewellery pieces in padded velvet boxes and dispatch via insured express courier across Hyderabad and nationwide, with distance-based rates calculated from our Charminar stall.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#EAE3D2] rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-serif text-lg font-medium">
                  <ShieldCheck className="w-5 h-5 text-[#1C523E]" />
                  <span>Quality Guarantee & Service</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every ornament is crafted with 22K gold-finish standards, genuine freshwater pearls, and durable artisan stringing. We provide complimentary re-stringing and care advice.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* WhatsApp CTA */}
        <WhatsAppCTA />
      </main>

      <Footer />

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
    </div>
  );
}
