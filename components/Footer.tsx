'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Clock, Instagram, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface FooterProps {
  onWhatsAppClick?: () => void;
}

export default function Footer({ onWhatsAppClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Support', href: '/#support' },
    { name: 'Info', href: '/info' },
  ];

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EAE3D2] text-stone-700">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Info (Zone 1) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5 focus:outline-hidden">
              <span className="font-serif text-3xl font-medium tracking-tight text-stone-900 hover:text-[#B88E3E] transition-colors">
                {BUSINESS_CONFIG.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" aria-hidden="true" />
            </Link>
            
            <p className="text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium">
              Fine Jewellery from Charminar · Hyderabad
            </p>
            
            <p className="text-sm text-stone-600 max-w-sm leading-relaxed">
              Curating authentic Nizami bridal ornaments, Basra-style pearls, and handcrafted jewellery directly from our heritage stall at Charminar.
            </p>
            
            {/* Social & WhatsApp Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xs bg-[#1C523E] text-white text-xs font-medium tracking-wide flex items-center gap-2 hover:bg-[#164232] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {BUSINESS_CONFIG.phoneDisplay}</span>
              </a>

              {/* Instagram placeholder as requested */}
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="p-2 rounded-xs border border-[#DDD5C5] bg-white text-stone-700 hover:text-[#8E2333] hover:border-[#8E2333] transition-colors flex items-center gap-1.5 text-xs"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-mono text-[11px]">{BUSINESS_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Navigation Links (Zone 2) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-900">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-600">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-stone-950 hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products?category=earrings"
                  className="text-stone-500 hover:text-stone-900 transition-colors text-xs"
                >
                  · Hyderabadi Chandbalis
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=jhumkas"
                  className="text-stone-500 hover:text-stone-900 transition-colors text-xs"
                >
                  · Royal Bell Jhumkas
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=bracelets"
                  className="text-stone-500 hover:text-stone-900 transition-colors text-xs"
                >
                  · Jadau Filigree Kadas
                </Link>
              </li>
            </ul>
          </div>

          {/* Stall Location, Hours & Official Contact Number (Zone 3) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-900">
              Charminar Stall & Contact
            </h4>
            
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8E2333] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800 block">Stall No. 10</span>
                  <span>{BUSINESS_CONFIG.location}</span>
                  <span className="block text-stone-500 mt-0.5">{BUSINESS_CONFIG.landmark}</span>
                </div>
              </div>

              {/* Business Hours Placeholder */}
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8F6E2B] shrink-0" />
                <span>{BUSINESS_CONFIG.hours}</span>
              </div>

              {/* Contact Number */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1C523E] shrink-0" />
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneNumber}`}
                  className="hover:text-stone-900 font-semibold text-stone-800 transition-colors"
                >
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="p-3 bg-[#F4EFE6] border border-[#E5DEC9] rounded-xs text-[11px] text-stone-600 leading-normal">
              <span className="font-semibold text-stone-900">Visiting Tip:</span> Walk through the famous Charminar pearl arcade towards Mecca Masjid Gate to find Stall No. 10.
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Guarantee Bar */}
      <div className="border-t border-[#EAE3D2] bg-[#F5F0E6]/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            <span>© {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Authentic Hyderabad Craft</span>
            <span aria-hidden="true">·</span>
            <span>Direct WhatsApp: {BUSINESS_CONFIG.phoneDisplay}</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Courier</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
