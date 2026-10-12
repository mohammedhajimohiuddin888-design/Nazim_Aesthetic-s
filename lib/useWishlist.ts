'use client';

import { useSyncExternalStore, useCallback } from 'react';

const STORAGE_KEY = 'nazimz10_wishlist';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('storage', callback);
  window.addEventListener('wishlist-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('wishlist-update', callback);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getServerSnapshot(): string {
  return '[]';
}

export function useWishlist() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  let wishlist: string[] = [];
  try {
    wishlist = JSON.parse(raw);
  } catch {
    wishlist = [];
  }

  const toggleWishlist = useCallback((productId: string): boolean => {
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY) || '[]';
      const currentList: string[] = JSON.parse(currentRaw);
      let updated: string[];
      let added = false;
      if (currentList.includes(productId)) {
        updated = currentList.filter((id) => id !== productId);
        added = false;
      } else {
        updated = [...currentList, productId];
        added = true;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlist-update'));
      return added;
    } catch {
      return false;
    }
  }, []);

  const removeWishlist = useCallback((productId: string) => {
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY) || '[]';
      const currentList: string[] = JSON.parse(currentRaw);
      const updated = currentList.filter((id) => id !== productId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlist-update'));
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    wishlist,
    toggleWishlist,
    removeWishlist,
  };
}
