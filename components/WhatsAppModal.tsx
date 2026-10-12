'use client';

import React, { useState } from 'react';
import { X, MessageCircle, Send, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { ProductItem } from './FeaturedCollection';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductItem | null;
}

export default function WhatsAppModal({ isOpen, onClose, product }: WhatsAppModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [inquiryType, setInquiryType] = useState('Stock Availability & Video');
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen) return null;

  const defaultMessage = product
    ? `Salam/Hello Nazimz 10, I am interested in "${product.name}" (Code: ${product.code}, ₹${product.price.toLocaleString('en-IN')}) from your Charminar stall.`
    : `Salam/Hello Nazimz 10, I would like to enquire about your jewellery collection at your Charminar stall.`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = BUSINESS_CONFIG.phoneNumber;
    const text = encodeURIComponent(
      `${defaultMessage}\n\nCustomer: ${customerName || 'Guest'}\nEnquiry: ${inquiryType}\nNote: ${customNotes || 'Please send live photo/video on WhatsApp'}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs max-w-lg w-full shadow-2xl p-6 sm:p-8 z-10 my-8">
        
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#1C523E]/10 flex items-center justify-center text-[#1C523E]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Enquire on WhatsApp
            </h3>
            <p className="text-xs text-[#8F6E2B] font-medium tracking-wide">
              Direct: {BUSINESS_CONFIG.phoneDisplay} · Stall No. 10
            </p>
          </div>
        </div>

        {/* Stall Info banner */}
        <div className="p-3 bg-[#F4EFE6] border border-[#E5DEC9] rounded-xs mb-5 flex items-start gap-2.5 text-xs text-stone-600">
          <MapPin className="w-4 h-4 text-[#8E2333] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-stone-800">Direct Stall Response:</span> We confirm live stock, share close-up video clips of the pieces, and arrange either stall pick-up or insured courier delivery across India.
          </div>
        </div>

        {product && (
          <div className="mb-5 p-3 bg-white border border-[#EAE3D2] rounded-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xs bg-stone-100 overflow-hidden relative shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="48px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-500">{product.code}</span>
              </div>
              <span className="block text-xs font-serif font-medium text-stone-900 truncate">
                {product.name}
              </span>
              <span className="text-xs font-semibold text-stone-700 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Fatima / Mohammed"
              className="w-full px-3 py-2 text-sm bg-white border border-[#DDD5C5] rounded-xs focus:outline-hidden focus:border-[#C5A059] text-stone-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Enquiry Type
            </label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#DDD5C5] rounded-xs focus:outline-hidden focus:border-[#C5A059] text-stone-800"
            >
              <option value="Stock Availability & Video">Check Stock & Request Video</option>
              <option value="Direct Purchase / Stall Pickup">Direct Purchase / Stall Pickup</option>
              <option value="Custom Size / Pearl Adjustment">Custom Size / Pearl Adjustment</option>
              <option value="General Question">General Question</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Special Request or Note
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Can you share a live video of this piece?"
              className="w-full px-3 py-2 text-sm bg-white border border-[#DDD5C5] rounded-xs focus:outline-hidden focus:border-[#C5A059] text-stone-800 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Launch WhatsApp Chat (+91 81216 04194)</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
