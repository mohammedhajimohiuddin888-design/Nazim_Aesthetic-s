'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeliveryMapPicker from '@/components/DeliveryMapPicker';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import AccountModal from '@/components/AccountModal';
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { useCart } from '@/lib/useCart';
import { useWishlist } from '@/lib/useWishlist';
import { calculateDeliveryFee, getGoogleMapsLink, STORE_LOCATION } from '@/lib/delivery';
import { computeOrderTotals } from '@/lib/pricing';
import { BUSINESS_CONFIG } from '@/lib/constants';
import { PRODUCTS } from '@/components/FeaturedCollection';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    totalCount,
    originalSubtotal,
    totalDiscount,
    discountedSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { wishlist, removeWishlist } = useWishlist();

  // Navigation and overlay drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Customer Form state
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternateNumber, setAlternateNumber] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [areaLocality, setAreaLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');

  // Delivery Location coordinates state
  const [deliveryLat, setDeliveryLat] = useState<number | null>(null);
  const [deliveryLng, setDeliveryLng] = useState<number | null>(null);
  const [deliveryDistanceKm, setDeliveryDistanceKm] = useState<number>(0);

  // Validation & order review state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] = useState(false);

  // Calculate delivery fee
  const deliveryCalc = calculateDeliveryFee(deliveryDistanceKm);

  // Automated order calculations
  const orderTotals = computeOrderTotals(items, deliveryCalc);

  // Map coordinate selection callback
  const handleLocationSelect = (lat: number, lng: number, distanceKm: number) => {
    setDeliveryLat(lat);
    setDeliveryLng(lng);
    setDeliveryDistanceKm(distanceKm);
    if (errors.location) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.location;
        return next;
      });
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (items.length === 0) {
      errs.items = 'Your order bag is empty. Please add at least one jewellery piece.';
    }

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!addressLine.trim()) {
      errs.addressLine = 'Please enter your house/flat, building and street address.';
    }

    if (!areaLocality.trim()) {
      errs.areaLocality = 'Please enter your area or locality name.';
    }

    const cleanPin = pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      errs.pincode = 'Please enter a valid 6-digit postal pincode.';
    }

    if (!deliveryLat || !deliveryLng) {
      errs.location = 'Please select your delivery location on the map below (or click "Use My Current Location").';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleReviewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowOrderConfirmationModal(true);
    } else {
      // Scroll smoothly to top error
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  // Generate WhatsApp order message matching user specification exactly
  const handleSendWhatsAppOrder = () => {
    if (!deliveryLat || !deliveryLng) return;

    const mapsLink = getGoogleMapsLink(deliveryLat, deliveryLng);

    // Format products section
    const productsBlock = items
      .map(
        (item) =>
          `Product: ${item.name}\n` +
          `Product Code: ${item.code}\n` +
          `Option / Polish: ${item.selectedOption}\n` +
          (item.selectedColor ? `Shade / Colour: ${item.selectedColor}\n` : '') +
          `Quantity: ${item.quantity}\n\n` +
          `Original Price: ₹${(item.originalPrice * item.quantity).toLocaleString('en-IN')}\n` +
          `Discount: ₹${(item.discountAmount * item.quantity).toLocaleString('en-IN')}\n` +
          `Product Total: ₹${(item.finalPrice * item.quantity).toLocaleString('en-IN')}`
      )
      .join('\n\n------------------------\n\n');

    const messageText =
      `Hello Nazimz 10,\n` +
      `I would like to place an order.\n\n` +
      `ORDER DETAILS\n\n` +
      `${productsBlock}\n\n` +
      `========================\n` +
      `PRICING SUMMARY\n\n` +
      `Original Total: ₹${orderTotals.originalTotal.toLocaleString('en-IN')}\n` +
      `Total Discount: - ₹${orderTotals.totalDiscount.toLocaleString('en-IN')}\n` +
      `Product Subtotal: ₹${orderTotals.productTotal.toLocaleString('en-IN')}\n\n` +
      `DELIVERY\n\n` +
      `From: ${STORE_LOCATION.name} (${STORE_LOCATION.stall})\n` +
      `Distance: ${orderTotals.deliveryDistanceKm} km\n` +
      `Charged Distance: ${orderTotals.chargedDistanceKm} km\n` +
      `Delivery Rate: ₹${orderTotals.deliveryRatePerKm}/km\n` +
      `Delivery Charge: ₹${orderTotals.deliveryCharge.toLocaleString('en-IN')}\n\n` +
      `FINAL TOTAL: ₹${orderTotals.finalTotal.toLocaleString('en-IN')}\n\n` +
      `========================\n` +
      `CUSTOMER DETAILS\n\n` +
      `Name: ${fullName.trim()}\n` +
      `Phone: ${mobileNumber.trim()}${alternateNumber.trim() ? ` / ${alternateNumber.trim()}` : ''}\n` +
      `Address: ${addressLine.trim()}\n` +
      `Area: ${areaLocality.trim()}\n` +
      `Landmark: ${landmark.trim() || 'N/A'}\n` +
      `Pincode: ${pincode.trim()}\n\n` +
      `DELIVERY LOCATION:\n` +
      `${mapsLink}\n\n` +
      `Please confirm my order.`;

    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phoneNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
    setShowOrderConfirmationModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#EAD7BA]">
      
      {/* Top Navbar */}
      <Navbar
        wishlistCount={wishlist.length}
        cartCount={totalCount}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1 pb-24 md:pb-28">
        
        {/* Header Breadcrumbs */}
        <div className="bg-[#F7F3EA] border-b border-[#EAE3D2] py-8 md:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-[#8F6E2B] uppercase tracking-widest font-medium mb-2">
              <Link href="/" className="hover:text-stone-900 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/products" className="hover:text-stone-900 transition-colors">
                Products
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-stone-900 font-semibold">Checkout</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 font-normal tracking-tight">
                  Checkout & Delivery Setup
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-stone-600">
                  Direct order fulfillment from Nazimz 10 (Stall No. 10, Charminar, Hyderabad).
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto bg-white/80 border border-[#E0D5BE] px-3 py-1.5 rounded-xs text-xs text-[#1C523E] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Delivery Rate: ₹35 per km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Error Banner */}
        {errors.items && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="p-4 bg-[#FAF0F1] border border-[#F2CCD1] text-[#8E2333] text-xs rounded-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.items}</span>
              </div>
              <Link
                href="/products"
                className="underline font-semibold hover:text-stone-950 uppercase tracking-wider text-[11px]"
              >
                Browse Collection &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <form onSubmit={handleReviewOrder} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Customer Form & Interactive Map (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. Customer Information Card */}
                <div className="bg-[#FCFAF7] border border-[#EAE3D2] rounded-xs p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#EFE8D8]">
                    <User className="w-4 h-4 text-[#8F6E2B]" />
                    <h2 className="font-serif text-lg text-stone-900 font-medium">
                      1. Customer Contact Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Full Name <span className="text-[#8E2333]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ayesha Begum / Mohammed Ismail"
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xs text-stone-900 focus:outline-hidden transition-colors ${
                          errors.fullName ? 'border-[#8E2333] ring-1 ring-[#8E2333]' : 'border-[#DDD5C5] focus:border-[#C5A059]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-[#8E2333]">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Mobile Number <span className="text-[#8E2333]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-medium select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="98765 43210"
                          maxLength={12}
                          className={`w-full pl-11 pr-3.5 py-2.5 text-sm bg-white border rounded-xs text-stone-900 focus:outline-hidden transition-colors font-mono ${
                            errors.mobileNumber ? 'border-[#8E2333] ring-1 ring-[#8E2333]' : 'border-[#DDD5C5] focus:border-[#C5A059]'
                          }`}
                        />
                      </div>
                      {errors.mobileNumber && (
                        <p className="mt-1 text-[11px] text-[#8E2333]">{errors.mobileNumber}</p>
                      )}
                    </div>

                    {/* Alternate Number (Optional) */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Alternate Number <span className="text-stone-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-medium select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={alternateNumber}
                          onChange={(e) => setAlternateNumber(e.target.value)}
                          placeholder="Optional contact"
                          maxLength={12}
                          className="w-full pl-11 pr-3.5 py-2.5 text-sm bg-white border border-[#DDD5C5] focus:border-[#C5A059] rounded-xs text-stone-900 focus:outline-hidden transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address Card */}
                <div className="bg-[#FCFAF7] border border-[#EAE3D2] rounded-xs p-6 sm:p-7 shadow-xs space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#EFE8D8]">
                    <Building className="w-4 h-4 text-[#8F6E2B]" />
                    <h2 className="font-serif text-lg text-stone-900 font-medium">
                      2. Delivery Address
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Full Address */}
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        House / Flat No., Apartment / Building, Street <span className="text-[#8E2333]">*</span>
                      </label>
                      <input
                        type="text"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        placeholder="e.g. Flat 302, Gulshan Residency, Main Road"
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xs text-stone-900 focus:outline-hidden transition-colors ${
                          errors.addressLine ? 'border-[#8E2333] ring-1 ring-[#8E2333]' : 'border-[#DDD5C5] focus:border-[#C5A059]'
                        }`}
                      />
                      {errors.addressLine && (
                        <p className="mt-1 text-[11px] text-[#8E2333]">{errors.addressLine}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Area / Locality */}
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Area / Locality <span className="text-[#8E2333]">*</span>
                        </label>
                        <input
                          type="text"
                          value={areaLocality}
                          onChange={(e) => setAreaLocality(e.target.value)}
                          placeholder="e.g. Banjara Hills Road No. 10"
                          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xs text-stone-900 focus:outline-hidden transition-colors ${
                            errors.areaLocality ? 'border-[#8E2333] ring-1 ring-[#8E2333]' : 'border-[#DDD5C5] focus:border-[#C5A059]'
                          }`}
                        />
                        {errors.areaLocality && (
                          <p className="mt-1 text-[11px] text-[#8E2333]">{errors.areaLocality}</p>
                        )}
                      </div>

                      {/* Landmark */}
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Nearby Landmark
                        </label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="e.g. Opposite Masjid / Near Water Tank"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD5C5] focus:border-[#C5A059] rounded-xs text-stone-900 focus:outline-hidden transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Pincode */}
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Postal Pincode <span className="text-[#8E2333]">*</span>
                        </label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="e.g. 500034"
                          maxLength={6}
                          className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xs text-stone-900 focus:outline-hidden transition-colors font-mono ${
                            errors.pincode ? 'border-[#8E2333] ring-1 ring-[#8E2333]' : 'border-[#DDD5C5] focus:border-[#C5A059]'
                          }`}
                        />
                        {errors.pincode && (
                          <p className="mt-1 text-[11px] text-[#8E2333]">{errors.pincode}</p>
                        )}
                      </div>

                      {/* City (Auto-fixed) */}
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          City & State
                        </label>
                        <input
                          type="text"
                          value="Hyderabad, Telangana"
                          disabled
                          className="w-full px-3.5 py-2.5 text-sm bg-stone-100 border border-[#DDD5C5] rounded-xs text-stone-600 cursor-not-allowed select-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Interactive Delivery Location Map Picker */}
                <div className="bg-[#FCFAF7] border border-[#EAE3D2] rounded-xs p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EFE8D8]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8E2333]" />
                      <h2 className="font-serif text-lg text-stone-900 font-medium">
                        3. Set Pin for ₹35/km Distance Calculation <span className="text-[#8E2333]">*</span>
                      </h2>
                    </div>
                    <span className="text-[11px] text-[#8F6E2B] font-mono">
                      Origin: Charminar (Stall No. 10)
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    We deliver directly from our Charminar stall. Tap the map or use your current GPS location to accurately calculate distance and generate courier directions.
                  </p>

                  {errors.location && (
                    <div className="p-3 bg-[#FAF0F1] border border-[#F2CCD1] text-[#8E2333] text-xs rounded-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.location}</span>
                    </div>
                  )}

                  {/* Leaflet OpenStreetMap Interactive Component */}
                  <DeliveryMapPicker
                    latitude={deliveryLat}
                    longitude={deliveryLng}
                    addressArea={areaLocality}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>

              </div>

              {/* Right Column: Order Bag Summary & Pricing Calculations (5 cols) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                
                {/* Order Items Card */}
                <div className="bg-[#FCFAF7] border border-[#EAE3D2] rounded-xs p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EFE8D8]">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#1C523E]" />
                      <h2 className="font-serif text-lg text-stone-900 font-medium">
                        Order Bag ({totalCount})
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(true)}
                      className="text-xs text-[#8F6E2B] hover:text-stone-900 font-medium"
                    >
                      Edit Bag
                    </button>
                  </div>

                  {/* Items List */}
                  {items.length === 0 ? (
                    <div className="py-8 text-center text-xs text-stone-500 space-y-2">
                      <p>Your order bag is currently empty.</p>
                      <Link
                        href="/products"
                        className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1C523E] hover:underline"
                      >
                        Explore Collection &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 p-2.5 bg-white border border-[#EAE3D2] rounded-xs"
                        >
                          <div className="relative w-16 h-16 rounded-xs bg-[#F5EFE4] overflow-hidden shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-[#8F6E2B] font-semibold">
                                  {item.code}
                                </span>
                                <span className="text-[10px] text-stone-400">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                              <h3 className="font-serif text-xs font-medium text-stone-900 truncate">
                                {item.name}
                              </h3>
                              <span className="text-[10px] text-stone-500 block truncate">
                                {item.selectedColor ? `${item.selectedColor} · ` : ''}{item.selectedOption}
                              </span>
                            </div>

                            <div className="flex items-baseline justify-between pt-1">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xs font-bold text-stone-900 tabular-nums">
                                  ₹{(item.finalPrice * item.quantity).toLocaleString('en-IN')}
                                </span>
                                {item.discountAmount > 0 && (
                                  <span className="text-[10px] text-stone-400 line-through tabular-nums">
                                    ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-0.5 text-stone-500 hover:text-stone-900"
                                  title="Decrease"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-0.5 text-stone-500 hover:text-stone-900"
                                  title="Increase"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-0.5 text-stone-400 hover:text-[#8E2333] ml-1"
                                  title="Remove"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Automated Pricing Calculation Breakdown (Requirement 8) */}
                  <div className="pt-4 border-t border-[#EAE3D2] space-y-2.5 text-xs">
                    
                    {/* Original Total */}
                    <div className="flex justify-between text-stone-500">
                      <span>Original Product Total</span>
                      <span className="tabular-nums font-mono">
                        ₹{orderTotals.originalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Total Discount */}
                    <div className="flex justify-between text-[#8E2333] font-medium">
                      <span>Total Savings / Discount</span>
                      <span className="tabular-nums font-mono">
                        - ₹{orderTotals.totalDiscount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Discounted Product Subtotal */}
                    <div className="flex justify-between text-stone-800 font-semibold pt-1 border-t border-stone-200/60">
                      <span>Discounted Product Total</span>
                      <span className="tabular-nums font-mono">
                        ₹{orderTotals.productTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Delivery Calculation Line Items */}
                    <div className="pt-2 border-t border-stone-200/60 space-y-1.5 bg-[#FAF4EA] p-3 rounded-xs border border-[#E8DFC8]">
                      <div className="flex justify-between text-stone-700">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-[#8F6E2B]" />
                          <span>Delivery Distance:</span>
                        </span>
                        <span className="font-mono tabular-nums">
                          {deliveryLat ? `${orderTotals.deliveryDistanceKm} km` : 'Pin required'}
                        </span>
                      </div>

                      {deliveryLat && (
                        <>
                          <div className="flex justify-between text-stone-600 text-[11px]">
                            <span>Charged Distance (rounded up):</span>
                            <span className="font-mono tabular-nums font-semibold">
                              {orderTotals.chargedDistanceKm} km
                            </span>
                          </div>
                          <div className="flex justify-between text-stone-600 text-[11px]">
                            <span>Delivery Rate:</span>
                            <span className="font-mono tabular-nums">₹35 per km</span>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between text-stone-900 font-bold pt-1 border-t border-[#E0D5BE]">
                        <span>Delivery Charge</span>
                        <span className="tabular-nums font-mono text-stone-900">
                          {deliveryLat
                            ? `₹${orderTotals.deliveryCharge.toLocaleString('en-IN')}`
                            : 'Set map pin'}
                        </span>
                      </div>
                    </div>

                    {/* FINAL PAYABLE TOTAL (Requirement 8 & 9) */}
                    <div className="pt-3 border-t-2 border-stone-900 flex items-baseline justify-between">
                      <div>
                        <span className="block text-xs uppercase tracking-widest text-[#8F6E2B] font-bold">
                          Final Payable Amount
                        </span>
                        <span className="text-[11px] text-stone-400">
                          Includes All Items + Delivery
                        </span>
                      </div>
                      <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                        ₹{orderTotals.finalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>

                  {/* Review & WhatsApp Order Trigger Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={items.length === 0}
                      className="w-full py-4 px-4 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Review & Order on WhatsApp</span>
                    </button>
                    <p className="text-[11px] text-stone-500 text-center mt-2">
                      Order directly sent to official business WhatsApp: {BUSINESS_CONFIG.phoneDisplay}
                    </p>
                  </div>

                </div>

                {/* Assurance badge */}
                <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Nazimz 10 Stall Assurance</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Our team inspects each piece before dispatch, provides video verification on WhatsApp, and sends an insured courier straight to your doorstep.
                  </p>
                </div>

              </div>

            </div>
          </form>
        </div>

        {/* Mobile Sticky Checkout Bar (Requirement 12) */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E0D5BE] p-4 z-30 shadow-2xl flex items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-medium">
              Final Payable Amount
            </span>
            <span className="text-xl font-bold font-serif text-stone-900 tabular-nums">
              ₹{orderTotals.finalTotal.toLocaleString('en-IN')}
            </span>
            <span className="block text-[10px] text-stone-500">
              {deliveryLat ? `${orderTotals.chargedDistanceKm} km delivery included` : 'Set delivery pin'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleReviewOrder}
            disabled={items.length === 0}
            className="flex-1 py-3 px-4 rounded-xs bg-[#1C523E] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Review & Order</span>
          </button>
        </div>

      </main>

      <Footer />

      {/* 9. PREMIUM ORDER SUMMARY CONFIRMATION MODAL (Requirement 9 & 10) */}
      {showOrderConfirmationModal && deliveryLat && deliveryLng && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setShowOrderConfirmationModal(false)}
            aria-hidden="true"
          />

          <div className="relative bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs max-w-2xl w-full shadow-2xl p-6 sm:p-8 z-10 my-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D2]">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8F6E2B] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" />
                  <span>Final Order Confirmation</span>
                </div>
                <h3 className="font-serif text-2xl font-medium text-stone-900 mt-1">
                  Ready to Send to Nazimz 10
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowOrderConfirmationModal(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900"
              >
                ✕
              </button>
            </div>

            {/* Customer & Address Details Card */}
            <div className="p-4 bg-white border border-[#EAE3D2] rounded-xs space-y-2.5 text-xs text-stone-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900 text-sm">{fullName}</span>
                <span className="font-mono text-stone-600 font-semibold">{mobileNumber}</span>
              </div>
              <p className="text-stone-600">
                {addressLine}, {areaLocality}
                {landmark ? ` (Landmark: ${landmark})` : ''}, Pincode: {pincode}, Hyderabad
              </p>
              <div className="pt-2 border-t border-[#F5EFE4] flex items-center justify-between">
                <span className="text-[#8F6E2B] font-mono text-[11px]">
                  GPS Pin: {deliveryLat.toFixed(4)}, {deliveryLng.toFixed(4)}
                </span>
                <a
                  href={getGoogleMapsLink(deliveryLat, deliveryLng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1C523E] hover:underline font-medium text-[11px]"
                >
                  Verify on Google Maps &rarr;
                </a>
              </div>
            </div>

            {/* Products Table */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Ordered Jewellery Pieces
              </span>
              <div className="border border-[#EAE3D2] rounded-xs overflow-hidden divide-y divide-[#EAE3D2] bg-white text-xs">
                {items.map((item) => (
                  <div key={item.id} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-stone-100 rounded-xs overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="font-serif font-medium text-stone-900 block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono">
                          {item.code} {item.selectedColor ? `· ${item.selectedColor} ` : ''}· {item.selectedOption} · Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-stone-900 tabular-nums block">
                        ₹{(item.finalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.discountAmount > 0 && (
                        <span className="text-[10px] text-stone-400 line-through tabular-nums">
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Calculation Review */}
            <div className="p-4 bg-[#FAF4EA] border border-[#E8DFC8] rounded-xs space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({totalCount} items):</span>
                <span className="tabular-nums font-mono font-semibold">
                  ₹{orderTotals.productTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#8E2333]">
                <span>Total Discount Saved:</span>
                <span className="tabular-nums font-mono">
                  - ₹{orderTotals.totalDiscount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>
                  Delivery ({orderTotals.deliveryDistanceKm} km estimated → {orderTotals.chargedDistanceKm} km charged @ ₹35/km):
                </span>
                <span className="tabular-nums font-mono font-semibold">
                  ₹{orderTotals.deliveryCharge.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E0D5BE] flex items-baseline justify-between">
                <span className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Final Payable Amount:
                </span>
                <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                  ₹{orderTotals.finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* WhatsApp Confirmation Trigger (Requirement 10) */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                className="w-full py-4 px-6 rounded-xs bg-[#1C523E] hover:bg-[#164232] text-white text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm & Send Order on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setShowOrderConfirmationModal(false)}
                className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
              >
                Go Back & Adjust Details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Cart & Wishlist Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={PRODUCTS.filter((p) => wishlist.includes(p.id))}
        onRemove={removeWishlist}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

    </div>
  );
}
