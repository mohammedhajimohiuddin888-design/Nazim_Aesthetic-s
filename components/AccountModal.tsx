'use client';

import React from 'react';
import { X, User, MapPin, Clock, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick?: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs max-w-md w-full shadow-2xl p-6 sm:p-7 z-10 my-8">
        
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-5 border-b border-[#EAE3D2]">
          <div className="w-12 h-12 rounded-full bg-[#FAF3E5] border border-[#C5A059]/40 mx-auto flex items-center justify-center text-[#8F6E2B] mb-3">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-stone-900">
            {BUSINESS_CONFIG.name} Boutique
          </h3>
          <p className="text-xs text-[#8F6E2B] font-medium tracking-wider uppercase mt-1">
            Charminar Guest Desk
          </p>
        </div>

        {/* Information sections */}
        <div className="py-5 space-y-4 text-xs text-stone-600">
          
          <div className="p-3 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
            <span className="font-semibold text-stone-900 block text-xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8E2333]" />
              <span>Stall Location & Verification</span>
            </span>
            <p className="text-stone-600 leading-relaxed">
              {BUSINESS_CONFIG.location}. Direct walkway access from the main entrance facing Mecca Masjid.
            </p>
          </div>

          <div className="p-3 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
            <span className="font-semibold text-stone-900 block text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8F6E2B]" />
              <span>Stall Working Hours</span>
            </span>
            <p className="text-stone-600 leading-relaxed">
              {BUSINESS_CONFIG.hours}. Open every day for in-person customer visits and video inquiries.
            </p>
          </div>

          <div className="p-3 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
            <span className="font-semibold text-stone-900 block text-xs flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#1C523E]" />
              <span>Direct Phone & WhatsApp</span>
            </span>
            <p className="text-stone-600 leading-relaxed font-mono font-medium">
              {BUSINESS_CONFIG.phoneDisplay}
            </p>
          </div>

          <div className="p-3 bg-white border border-[#EAE3D2] rounded-xs space-y-2">
            <span className="font-semibold text-stone-900 block text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1C523E]" />
              <span>Craftsmanship Guarantee</span>
            </span>
            <p className="text-stone-600 leading-relaxed">
              All pieces come with 22K micro-gold finish standards and natural pearl cluster guarantees. Free re-stringing service at our Charminar stall.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="pt-2">
          <a
            href={BUSINESS_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp: {BUSINESS_CONFIG.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
