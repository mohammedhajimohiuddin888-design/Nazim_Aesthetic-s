'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Heart, User, Menu, X, MapPin, MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface NavbarProps {
  wishlistCount: number;
  cartCount?: number;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenCart?: () => void;
}

export default function Navbar({
  wishlistCount,
  cartCount = 0,
  onOpenWishlist,
  onOpenAccount,
  onOpenCart,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Support', href: '/#support' },
    { name: 'Info', href: '/info' },
  ];

  return (
    <>
      {/* Top subtle announcement bar */}
      <div className="bg-[#F3EFE6] border-b border-[#E8DFC8]/60 text-[#735A2C] text-[11px] sm:text-[12px] tracking-wider py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-3 font-medium">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1C523E]" aria-hidden="true" />
            <span className="truncate">Stall No. 10, Charminar Heritage Walkway, Hyderabad</span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#8E2333]" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneNumber}`}
              className="hidden sm:inline-flex items-center gap-1 hover:text-stone-900 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#B88E3E]" />
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#1C523E] hover:underline"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Orders</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering to 3-Zone Top Bar Contract & Multi-Page Routing */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'header-glass shadow-xs border-b border-[#EAD7BA]/50 py-3 sm:py-3.5'
            : 'bg-[#FAF8F5]/95 border-b border-[#EAD7BA]/30 py-3.5 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Zone 1: Single element Brand Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-hidden"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C5A059]/60 shadow-xs shrink-0 bg-[#14120F]">
              <Image
                src="/favicon.png"
                alt="NAZIM"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-[#B88E3E] transition-colors">
                  NAZIM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" aria-hidden="true" />
              </div>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#8F6E2B] font-medium -mt-0.5">
                Charminar · Stall No. 10
              </span>
            </div>
          </Link>

          {/* Zone 2: Clean 4–6 text navigation links for true multi-page routing */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[14px] font-medium tracking-wide transition-colors py-1 group ${
                    isActive ? 'text-stone-950 font-semibold' : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions (Wishlist + Account + Mobile toggle) */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Quick WhatsApp Action Button on Desktop */}
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#C5A059]/40 bg-[#FCFAF7] hover:bg-[#F5EFE4] text-xs font-medium text-stone-800 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#1C523E]" />
              <span>+91 81216 04194</span>
            </a>

            {/* Wishlist / Favourite Icon */}
            <button
              onClick={onOpenWishlist}
              type="button"
              aria-label="View favourites"
              className="relative p-2.5 rounded-full text-stone-700 hover:text-[#8E2333] hover:bg-[#F4ECE1] transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#C5A059]"
            >
              <Heart className="w-5 h-5" strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[#8E2333] text-white text-[10px] font-bold tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart Icon */}
            <button
              onClick={onOpenCart}
              type="button"
              aria-label="View order bag"
              className="relative p-2.5 rounded-full text-stone-700 hover:text-[#1C523E] hover:bg-[#F4ECE1] transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#C5A059]"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[#1C523E] text-white text-[10px] font-bold tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <button
              onClick={onOpenAccount}
              type="button"
              aria-label="Account details and stall info"
              className="p-2.5 rounded-full text-stone-700 hover:text-stone-950 hover:bg-[#F4ECE1] transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#C5A059]"
            >
              <User className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 rounded-full text-stone-700 hover:text-stone-950 hover:bg-[#F4ECE1] transition-colors focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[88px] z-30 bg-[#FAF8F5]/98 border-b border-[#EAD7BA]/60 shadow-xl md:hidden px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              <div className="pb-3 border-b border-stone-200/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8F6E2B]">
                  Nazimz 10 Navigation
                </span>
                <span className="text-[11px] text-stone-500">Charminar Stall</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-serif py-1.5 flex items-center justify-between transition-colors ${
                        isActive ? 'text-[#B88E3E] font-medium' : 'text-stone-800 hover:text-[#B88E3E]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-stone-400">
                        {isActive ? '●' : '→'}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-stone-200/60 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <MapPin className="w-4 h-4 text-[#8E2333] shrink-0" />
                  <span>Stall No. 10, Charminar Heritage Walkway, Hyderabad</span>
                </div>
                
                {/* Official WhatsApp CTA in mobile menu */}
                <a
                  href={BUSINESS_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xs bg-[#1C523E] text-white text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {BUSINESS_CONFIG.phoneDisplay}</span>
                </a>

                {/* Mobile Cart Action */}
                {onOpenCart && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCart();
                    }}
                    className="w-full py-2.5 px-3 rounded-xs bg-stone-900 text-white text-xs font-medium tracking-wide flex items-center justify-center gap-2 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                    <span>View Order Bag ({cartCount})</span>
                  </button>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenWishlist();
                    }}
                    className="flex-1 py-2 px-3 text-xs font-medium border border-stone-300 rounded-xs text-stone-700 flex items-center justify-center gap-1.5 bg-white"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#8E2333]" />
                    <span>Favourites ({wishlistCount})</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAccount();
                    }}
                    className="flex-1 py-2 px-3 text-xs font-medium border border-[#C5A059]/40 rounded-xs text-[#8F6E2B] flex items-center justify-center gap-1.5 bg-[#FAF4EA]"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Stall Info</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
