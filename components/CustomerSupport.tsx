'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Video,
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronDown,
  Sparkles,
  Send,
  HelpCircle,
  Headphones,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: 'How do I choose between different colours of Chandbali or Karan Phool?',
    answer:
      'Every piece in our collection is available in multiple royal shades—such as Emerald Green (Panna), Nizam Ruby Red (Manik), Royal Basra Pearl, and Sapphire Blue. You can click on any product card or gallery picture to preview the exact item in all shades, and select your preferred color before ordering.',
  },
  {
    question: 'Can I see the jewellery on a live WhatsApp video call before dispatch?',
    answer:
      'Yes, absolutely! We offer live video inspection directly from our Charminar stall. Our master jewelers will show you the exact Chandbali, Karan Phool, or necklace under natural light to inspect the pearl luster, stone settings, and finish before you make any payment.',
  },
  {
    question: 'How is the ₹35/km delivery charge calculated?',
    answer:
      'Doorstep delivery is calculated automatically at ₹35 per kilometer directly from Stall No. 10 at Charminar to your exact delivery location. Each package is insured, velvet-boxed, and delivered by express courier.',
  },
  {
    question: 'How do I find Stall No. 10 at Charminar in person?',
    answer:
      'Stall No. 10 is located on the Charminar Heritage Walkway, just steps away from the Mecca Masjid Gate and the entrance of the famous Laad Bazaar bangle arcade. We are open daily from 11:30 AM to 10:30 PM IST.',
  },
  {
    question: 'What is your guarantee and free restringing policy?',
    answer:
      'All our pieces come with a 22K gold-finish craft guarantee and genuine freshwater Basra-style pearls. We offer complimentary lifetime re-stringing and polish touch-ups directly at our Charminar stall.',
  },
];

export default function CustomerSupport() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Order Tracking');
  const [message, setMessage] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSendSupportQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const queryText = encodeURIComponent(
      `Salam/Hello Nazimz 10 Support Team,\n` +
      `Name: ${name || 'Customer'}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      `Topic: ${inquiryType}\n` +
      `Query: ${message || 'I need assistance regarding jewellery from your Charminar stall.'}`
    );
    window.open(`https://wa.me/918121604194?text=${queryText}`, '_blank');
  };

  return (
    <section id="support" className="py-16 md:py-24 bg-[#F7F3EA] border-t border-b border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium mb-3">
            <Headphones className="w-3.5 h-3.5 text-[#1C523E]" />
            <span>Dedicated Charminar Atelier Assistance</span>
            <span aria-hidden="true">·</span>
            <span>Stall No. 10</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 font-normal tracking-tight text-balance">
            Customer Support & Concierge
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Personalized support from our Hyderabad stall. Schedule live video viewing, request custom color shades, track orders, or consult directly with our master craftsmen.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {/* Card 1: Live Video Inspection */}
          <div className="p-6 bg-white border border-[#E8DFC8] rounded-xs shadow-xs flex flex-col justify-between hover:border-[#C5A059] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3E5] flex items-center justify-center text-[#B88E3E] mb-4 group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5 text-[#8E2333]" />
              </div>
              <h3 className="font-serif text-base font-medium text-stone-900 mb-2">
                Live Video Call Viewing
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                See any Chandbali, Karan Phool, or necklace live from our stall over WhatsApp video call before confirming your order.
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.getWhatsAppGeneralUrl('I would like to request a live video call to view your jewellery pieces.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-[#F5EFE4] text-xs font-semibold text-[#1C523E] hover:underline flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Book Video Call</span>
            </a>
          </div>

          {/* Card 2: Doorstep Express Courier */}
          <div className="p-6 bg-white border border-[#E8DFC8] rounded-xs shadow-xs flex flex-col justify-between hover:border-[#C5A059] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3E5] flex items-center justify-center text-[#B88E3E] mb-4 group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5 text-[#1C523E]" />
              </div>
              <h3 className="font-serif text-base font-medium text-stone-900 mb-2">
                Express Delivery & Tracking
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Doorstep dispatch at ₹35/km from Charminar with tamper-evident velvet packaging and real-time WhatsApp status updates.
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.getWhatsAppGeneralUrl('I would like to track my order status.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-[#F5EFE4] text-xs font-semibold text-[#1C523E] hover:underline flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Track My Delivery</span>
            </a>
          </div>

          {/* Card 3: Free Restringing & Care */}
          <div className="p-6 bg-white border border-[#E8DFC8] rounded-xs shadow-xs flex flex-col justify-between hover:border-[#C5A059] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3E5] flex items-center justify-center text-[#B88E3E] mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#8F6E2B]" />
              </div>
              <h3 className="font-serif text-base font-medium text-stone-900 mb-2">
                Lifetime Pearl Restringing
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every genuine Basra pearl strand comes with our lifetime restringing guarantee and cleaning advice directly at Stall No. 10.
              </p>
            </div>
            <span className="mt-4 pt-3 border-t border-[#F5EFE4] text-xs font-semibold text-[#8F6E2B] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Service</span>
            </span>
          </div>

          {/* Card 4: Stall Visit & In-person Assistance */}
          <div className="p-6 bg-white border border-[#E8DFC8] rounded-xs shadow-xs flex flex-col justify-between hover:border-[#C5A059] transition-all group">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#FAF3E5] flex items-center justify-center text-[#B88E3E] mb-4 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 text-[#8E2333]" />
              </div>
              <h3 className="font-serif text-base font-medium text-stone-900 mb-2">
                In-Person Stall Visit
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Visit Stall No. 10 on the Charminar Heritage Walkway daily between 11:30 AM and 10:30 PM for hands-on trial and fittings.
              </p>
            </div>
            <a
              href={`tel:${BUSINESS_CONFIG.phoneNumber}`}
              className="mt-4 pt-3 border-t border-[#F5EFE4] text-xs font-semibold text-stone-800 hover:text-[#B88E3E] flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#B88E3E]" />
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Two-Column Grid: Left = Quick Support Query Form, Right = FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct WhatsApp Support Form */}
          <div className="lg:col-span-5 bg-white border border-[#E8DFC8] rounded-xs p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#8F6E2B] text-xs uppercase tracking-widest font-semibold">
              <MessageCircle className="w-4 h-4 text-[#1C523E]" />
              <span>Instant WhatsApp Help Desk</span>
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium mb-1">
              Need Help with an Order?
            </h3>
            
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Send your inquiry directly to our Charminar team. We typically respond within 5–15 minutes during stall operating hours.
            </p>

            <form onSubmit={handleSendSupportQuery} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded-xs text-stone-900 focus:outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  WhatsApp / Contact Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded-xs text-stone-900 focus:outline-hidden focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Support Category
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded-xs text-stone-900 focus:outline-hidden focus:border-[#C5A059]"
                >
                  <option value="Order Tracking">Order Status & Delivery Tracking</option>
                  <option value="Live Video Call">Schedule Live Video Call (Stall View)</option>
                  <option value="Custom Colour/Design">Bespoke Colour / Custom Shade Inquiry</option>
                  <option value="Bangle/Ring Sizing">Sizing & Custom Fit Assistance</option>
                  <option value="Care & Restringing">Restringing & Polish Assistance</option>
                  <option value="General Query">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  How can we help you?
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention product name (e.g. Chandbali, Karan Phool) or order code..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#DDD5C5] rounded-xs text-stone-900 focus:outline-hidden focus:border-[#C5A059] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp (+91 81216 04194)</span>
              </button>
            </form>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-[#8F6E2B] text-xs uppercase tracking-widest font-semibold">
              <HelpCircle className="w-4 h-4 text-[#8E2333]" />
              <span>Frequently Asked Questions</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium mb-3">
              Helpful Answers & Ordering Policies
            </h3>

            <div className="space-y-3">
              {FAQ_LIST.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#E8DFC8] rounded-xs overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base text-stone-900 font-medium hover:text-[#B88E3E] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8F6E2B] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#F7F2E7]">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Stall Hotline Box */}
            <div className="p-4 bg-[#FAF4EA] border border-[#EAD7BA] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1C523E] border border-[#C5A059]/40 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-stone-900">
                    Prefer to speak directly?
                  </span>
                  <span className="block text-[11px] text-stone-600">
                    Call our Stall Manager: <strong className="text-[#1C523E]">{BUSINESS_CONFIG.phoneDisplay}</strong>
                  </span>
                </div>
              </div>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneNumber}`}
                className="w-full sm:w-auto px-4 py-2 rounded-xs bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider text-center transition-colors"
              >
                Call Now
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
