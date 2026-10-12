'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Share, PlusSquare, Sparkles, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if running in standalone mode (already installed)
    const checkStandalone = (): boolean => {
      if (typeof window === 'undefined') return false;
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      const isAndroidApp = document.referrer.includes('android-app://');
      return Boolean(isStandaloneMedia || isIOSStandalone || isAndroidApp);
    };

    const standalone = checkStandalone();
    setIsStandalone(standalone);
    if (standalone) return; // Never show inside the installed PWA

    // 2. Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[NAZIM PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[NAZIM PWA] Service Worker registration failed:', err);
          });
      });
    }

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // 4. Capture beforeinstallprompt (Android Chrome, Edge, Samsung Internet, Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Check if user dismissed in this session
      const dismissedThisSession = sessionStorage.getItem('nazim_pwa_dismissed');
      if (!dismissedThisSession) {
        // Show after a brief delay for optimal user experience
        setTimeout(() => {
          setShowModal(true);
        }, 1500);
      }
    };

    // 5. Handle app installed event
    const handleAppInstalled = () => {
      console.log('[NAZIM PWA] Application installed successfully!');
      setShowModal(false);
      setShowIOSGuide(false);
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For iOS users who visit without standalone mode, show after gentle delay
    if (isIOSDevice) {
      const dismissedThisSession = sessionStorage.getItem('nazim_pwa_dismissed');
      if (!dismissedThisSession) {
        setTimeout(() => {
          setShowModal(true);
        }, 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          console.log('[NAZIM PWA] User accepted installation');
          setShowModal(false);
        } else {
          console.log('[NAZIM PWA] User dismissed installation prompt');
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('[NAZIM PWA] Error triggering install prompt:', err);
      }
    } else if (isIOS) {
      // Guide iOS user with native steps
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowModal(false);
    setShowIOSGuide(false);
    sessionStorage.setItem('nazim_pwa_dismissed', 'true');
  };

  // If already running in installed standalone mode, render nothing
  if (isStandalone) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-end sm:items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs pointer-events-auto"
          />

          {/* Premium Installation Popup Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs shadow-2xl p-6 sm:p-7 pointer-events-auto overflow-hidden text-center"
          >
            {/* Top Ornamental Hairline Accents */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#C5A059]" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              type="button"
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors"
              aria-label="Close installation popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* NAZIM Application Icon Displayed Prominently Above Text */}
            <div className="relative mx-auto w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-b from-[#C5A059] to-[#8F6E2B] shadow-md mb-4.5">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#14120F] border-2 border-[#FAF8F5]">
                <Image
                  src="/icon-192.png"
                  alt="NAZIM Jewellery"
                  fill
                  sizes="88px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1C523E] border-2 border-white flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-3 h-3 text-[#E5C378]" />
              </div>
            </div>

            {/* Standard Android / Desktop View */}
            {!showIOSGuide ? (
              <>
                <div className="space-y-1.5 mb-5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[#8F6E2B] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E2333]" />
                    <span>Official Web Application</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-medium tracking-tight">
                    NAZIM
                  </h2>
                  <p className="text-sm font-serif italic text-[#8F6E2B]">
                    Your Favorite Jewelry, Just One Tap Away.
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1.5 max-w-sm mx-auto">
                    &ldquo;Install the NAZIM app for a faster and more convenient shopping experience.&rdquo;
                  </p>
                </div>

                {/* Features Pill Strip */}
                <div className="flex items-center justify-center gap-4 py-2 px-3 bg-[#F4EDE0]/60 rounded-xs border border-[#E8DFC8]/70 text-[11px] text-stone-600 mb-6">
                  <span>⚡ Instant Access</span>
                  <span>·</span>
                  <span>🔒 Secure Orders</span>
                  <span>·</span>
                  <span>📦 Live Tracking</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="flex-1 py-3 px-5 rounded-xs bg-stone-900 hover:bg-stone-800 text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#C5A059] group-hover:-translate-y-0.5 transition-transform" />
                    <span>Install App</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="py-3 px-5 rounded-xs bg-transparent border border-[#DDD5C5] text-stone-700 hover:bg-[#F2ECE1] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>
              </>
            ) : (
              /* Dedicated iOS Safari Step-by-Step Guidance */
              <div className="space-y-4 text-left">
                <div className="text-center space-y-1">
                  <h3 className="font-serif text-xl text-stone-900 font-medium">
                    Install NAZIM on your iPhone
                  </h3>
                  <p className="text-xs text-stone-600">
                    Follow these 2 simple steps in Safari:
                  </p>
                </div>

                <div className="space-y-3 bg-[#F5EFE4] p-3.5 rounded-xs border border-[#E5DAC6] text-xs text-stone-800">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#C5A059] text-stone-900 font-semibold">
                      1
                    </div>
                    <div className="leading-snug">
                      Tap the <strong className="text-stone-900">Share button</strong> (
                      <Share className="w-3.5 h-3.5 inline mx-0.5 text-blue-600" />
                      ) in the Safari toolbar at the bottom of your screen.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#C5A059] text-stone-900 font-semibold">
                      2
                    </div>
                    <div className="leading-snug">
                      Scroll down and tap <strong className="text-stone-900">Add to Home Screen</strong> (
                      <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-stone-700" />
                      ), then tap <strong>Add</strong> in the top right.
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="w-full py-3 rounded-xs bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Got It, Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
