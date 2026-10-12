'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface BrandStoryProps {
  onWhatsAppClick?: () => void;
}

export default function BrandStory({ onWhatsAppClick }: BrandStoryProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#F4EFE6] border-t border-[#E7DFCE] relative overflow-hidden">
      
      {/* Subtle background arabesque line motif */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heritage-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#C5A059" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="1.5" fill="#8F6E2B" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heritage-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Side: Curated heritage composition */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer decorative border offset */}
              <div className="absolute -inset-3 rounded-xs border border-[#C5A059]/40 pointer-events-none transform -rotate-1" />

              <div className="relative rounded-xs overflow-hidden bg-[#EAE2D2] aspect-4/5 shadow-md">
                <Image
                  src="/images/brand/artisan-craftsmanship.jpg"
                  alt="Historic Charminar monument and master artisan jewellery craftsmanship of Hyderabad"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/20 to-transparent" />

                {/* Stall landmark badge */}
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-xs bg-[#FAF8F5]/95 backdrop-blur-xs border border-[#E0D5BE]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-[#8F6E2B] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8E2333]" />
                    <span>The Physical Stall</span>
                  </div>
                  <p className="text-sm font-serif font-medium text-stone-900">
                    Stall No. 10 · Charminar Heritage Circle
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Steps away from Mecca Masjid & Laad Bazaar, Hyderabad
                  </p>
                </div>
              </div>

              {/* Floating artisan seal */}
              <div className="absolute -top-4 -right-4 bg-white border border-[#E8DFC8] px-3.5 py-2 rounded-xs shadow-xs hidden sm:flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[11px] font-medium text-stone-800">Authentic Karigar Craft</span>
              </div>
            </motion.div>
          </div>

          {/* Text & Narrative Side: Brief, elegant editorial copy as requested */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" aria-hidden="true" />
              <span>Charminar Heritage</span>
              <span aria-hidden="true">·</span>
              <span>The Nazimz 10 Story</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight leading-[1.15]">
              Jewellery Born in the <br />
              <span className="italic text-[#B88E3E]">Shadow of the Minarets</span>
            </h2>

            {/* Brief elegant prose */}
            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Nestled within the timeless jewellery lanes surrounding Charminar, <strong className="text-stone-900 font-medium">Nazimz 10</strong> curates the rich splendour of Hyderabadi goldsmithing: royal bell jhumkas, delicate kundan chandbalis, and hand-strung freshwater pearls.
              </p>
              <p>
                Operating from our physical stall in Old Hyderabad, we unite historic artisan mastery with a modern boutique standard—bringing authentic Nizami elegance directly to you.
              </p>
            </div>

            {/* Three Brand Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E3DAC7]">
              <div>
                <span className="block text-xs font-semibold text-stone-900 mb-1">
                  01. Charminar Stall
                </span>
                <p className="text-xs text-stone-500 leading-normal">
                  Located right in Old Hyderabad’s heritage quarter.
                </p>
              </div>

              <div>
                <span className="block text-xs font-semibold text-stone-900 mb-1">
                  02. Master Karigars
                </span>
                <p className="text-xs text-stone-500 leading-normal">
                  Hand-set uncut stones and lustrous Basra-style pearls.
                </p>
              </div>

              <div>
                <span className="block text-xs font-semibold text-stone-900 mb-1">
                  03. Direct WhatsApp
                </span>
                <p className="text-xs text-stone-500 leading-normal">
                  Real-time video views and courier dispatch nationwide.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#FCFAF7] border border-[#C5A059] text-stone-900 text-xs font-semibold tracking-wider uppercase hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-200"
              >
                <span>Connect with Stall Keeper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
