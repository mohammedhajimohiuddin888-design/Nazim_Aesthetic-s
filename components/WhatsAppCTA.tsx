'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Phone, Video, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface WhatsAppCTAProps {
  onOpenModal?: () => void;
}

export default function WhatsAppCTA({ onOpenModal }: WhatsAppCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury CTA Container */}
        <div className="relative rounded-xs overflow-hidden bg-gradient-to-br from-[#FCFAF7] via-[#F8F3EA] to-[#F3ECE0] border border-[#E2D8C3] shadow-md p-8 sm:p-12 lg:p-16">
          
          {/* Subtle Islamic arch motif in the background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
            <svg viewBox="0 0 400 600" fill="none" className="w-full h-full object-cover">
              <path
                d="M200 50 C 280 50, 380 150, 380 350 L 380 600 L 20 600 L 20 350 C 20 150, 120 50, 200 50 Z"
                stroke="#C5A059"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            {/* Unboxed Metadata */}
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" aria-hidden="true" />
              <span>Direct Stall Service</span>
              <span aria-hidden="true">·</span>
              <span>Shop from Anywhere</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E2333]" aria-hidden="true" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight text-balance leading-tight">
              Order or Enquire Directly from <br />
              <span className="italic text-[#B88E3E]">Our Charminar Stall</span>
            </h2>

            {/* Supporting line */}
            <p className="text-base sm:text-lg text-stone-600 font-normal max-w-xl mx-auto leading-relaxed">
              Cannot visit Hyderabad in person? Connect directly with our stall keeper on WhatsApp for live video showings, custom pearl fittings, and doorstep insured delivery.
            </p>

            {/* Contact Information & Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              
              {/* Primary WhatsApp Button to https://wa.me/918121604194 */}
              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-200 shadow-md group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Message on WhatsApp</span>
              </a>

              {/* Call Directly button */}
              <a
                href={`tel:${BUSINESS_CONFIG.phoneNumber}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xs bg-white border border-[#C5A059]/50 hover:bg-[#FAF4EA] text-stone-800 text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#B88E3E]" />
                <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
              </a>

            </div>

            {/* Reassuring Pillars */}
            <div className="pt-8 border-t border-[#E6DDCA] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center justify-center gap-2">
                <Video className="w-4 h-4 text-[#8F6E2B]" />
                <span>Live Video Call Inspection</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1C523E]" />
                <span>22K Gold Finish Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#8E2333]" />
                <span>Insured Courier across India</span>
              </div>
            </div>

            {/* Explicit Number Display */}
            <div className="text-[12px] text-stone-500 pt-1">
              Official WhatsApp & Calling Line:{' '}
              <strong className="text-stone-800 font-mono font-semibold">
                {BUSINESS_CONFIG.phoneDisplay}
              </strong>{' '}
              · Stall No. 10, Charminar, Hyderabad
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
