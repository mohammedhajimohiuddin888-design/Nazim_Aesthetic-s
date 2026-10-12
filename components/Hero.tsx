'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight, Sparkles, ShieldCheck, Gem } from 'lucide-react';
import Image from 'next/image';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-32 bg-[#FAF8F5]">
      {/* Subtle architectural Charminar arched background tracery */}
      <div className="absolute top-0 right-0 w-full md:w-3/5 h-full opacity-35 pointer-events-none select-none">
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover transform translate-x-12 -translate-y-8"
        >
          <path
            d="M400 100 C 500 100, 650 220, 650 450 L 650 750 L 150 750 L 150 450 C 150 220, 300 100, 400 100 Z"
            stroke="#C5A059"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            className="opacity-40"
          />
          <path
            d="M400 160 C 470 160, 580 260, 580 460 L 580 750 L 220 750 L 220 460 C 220 260, 330 160, 400 160 Z"
            stroke="#C5A059"
            strokeWidth="0.5"
            className="opacity-25"
          />
          <circle cx="400" cy="100" r="4" fill="#C5A059" className="opacity-60" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand copy, regal typography and direct CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Subtle editorial kicker (Clean unboxed metadata) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" aria-hidden="true" />
              <span>Heritage Boutique</span>
              <span aria-hidden="true">·</span>
              <span>Charminar, Hyderabad</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E2333]" aria-hidden="true" />
            </motion.div>

            {/* Main Heading as requested */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 leading-[1.12] tracking-tight text-balance"
            >
              Jewellery from the <br className="hidden sm:inline" />
              <span className="italic font-light text-[#B88E3E]">Heart of Charminar</span>
            </motion.h1>

            {/* Short elegant supporting line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Handcrafted polki, luminous Basra pearls, and regal Nizam ornaments curated with generations of Old City craftsmanship from our Charminar stall.
            </motion.p>

            {/* Action Buttons: Explore Collection & Order on WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <Link
                href="/products"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xs bg-stone-900 text-[#FAF8F5] text-sm font-medium tracking-wide hover:bg-stone-800 transition-all duration-200 flex items-center justify-center gap-2 group shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xs bg-[#FCFAF7] border border-[#C5A059]/50 text-stone-800 text-sm font-medium tracking-wide hover:bg-[#F7F2E7] hover:border-[#C5A059] transition-all duration-200 flex items-center justify-center gap-2.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                <MessageCircle className="w-4 h-4 text-[#1C523E]" />
                <span>Order on WhatsApp</span>
              </a>
            </motion.div>

            {/* Subtle Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-4 border-t border-stone-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-stone-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Direct Stall No. 10</span>
              </div>
              <span className="hidden sm:inline text-stone-300" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Gem className="w-3.5 h-3.5 text-[#8E2333]" />
                <span>22K Gold Finish & Pearls</span>
              </div>
              <span className="hidden sm:inline text-stone-300" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1C523E]" />
                <span>WhatsApp: {BUSINESS_CONFIG.phoneDisplay}</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Outer decorative hairline frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-t-[120px] rounded-b-xs border border-[#C5A059]/30 pointer-events-none" />

              {/* Main Image Container with arched architectural top */}
              <div className="relative rounded-t-[110px] rounded-b-xs overflow-hidden bg-[#F6F2EB] border border-[#E8DFC8] shadow-md group aspect-4/5 sm:aspect-16/14 lg:aspect-4/5">
                
                {/* Visual Artwork: Founder Portrait */}
                <div className="relative w-full h-full">
                  <Image
                    src="/images/hero-portrait.jpg"
                    alt="Founder & Curator of Nazimz 10 - Fine Jewellery Stall No. 10 Charminar Hyderabad"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                    priority
                  />

                  {/* Gentle warm champagne tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/15 to-transparent pointer-events-none" />

                  {/* Corner ornamental accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#FAF8F5]/80 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#FAF8F5]/80 pointer-events-none" />

                  {/* Floating Luxury Detail Card */}
                  <div className="absolute bottom-5 inset-x-5 p-4 rounded-xs bg-[#FAF8F5]/94 backdrop-blur-md border border-[#EAD7BA]/80 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#8F6E2B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8E2333]" />
                        <span>Founder & Master Curator</span>
                      </div>
                      <h2 className="text-base font-serif text-stone-900 font-medium">
                        Nazimz 10 · Charminar
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="block text-[11px] text-stone-500 uppercase tracking-widest">
                        Heritage Atelier
                      </span>
                      <span className="text-xs font-semibold text-stone-800">
                        Stall No. 10
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative side accent pill */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white border border-[#E8DFC8] px-4 py-2.5 rounded-xs shadow-sm items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF4EA] flex items-center justify-center border border-[#C5A059]/40">
                  <Sparkles className="w-4 h-4 text-[#B88E3E]" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-stone-900">
                    Curated by Nazimz
                  </span>
                  <span className="block text-[11px] text-stone-500">
                    Charminar Hyderabad Legacy
                  </span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
