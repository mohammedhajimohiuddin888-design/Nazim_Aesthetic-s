'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  itemCount: string;
  image: string;
  accent: 'gold' | 'ruby' | 'emerald';
}

interface CategoriesSectionProps {
  onSelectCategory?: (categoryId: string) => void;
  selectedCategory?: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'earrings',
    name: 'Earrings',
    subtitle: 'Chandbali & Karan Phool Designs',
    itemCount: '24 Designs',
    image: '/images/categories/category-earrings.jpg',
    accent: 'emerald',
  },
  {
    id: 'jhumkas',
    name: 'Jhumkas',
    subtitle: 'Royal Bell Drops with Seed Pearls',
    itemCount: '19 Designs',
    image: '/images/categories/category-jhumkas.jpg',
    accent: 'gold',
  },
  {
    id: 'bracelets',
    name: 'Bracelets & Kadas',
    subtitle: 'Jadau Kadas & Heritage Bangles',
    itemCount: '16 Designs',
    image: '/images/categories/category-bracelets.jpg',
    accent: 'ruby',
  },
  {
    id: 'new-arrivals',
    name: 'Bridal & Chokers',
    subtitle: 'Nizam Bridal & Festive Edit',
    itemCount: '14 Exclusive',
    image: '/images/categories/category-new-arrivals.jpg',
    accent: 'gold',
  },
];

export default function CategoriesSection({ onSelectCategory, selectedCategory }: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-16 md:py-24 bg-[#F7F4EE] border-y border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8F6E2B] font-medium mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C523E]" aria-hidden="true" />
              <span>Curated Departments</span>
              <span aria-hidden="true">·</span>
              <span>Charminar Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Featured Categories
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-stone-600 max-w-md font-normal leading-relaxed">
              From imperial bell jhumkas to handcrafted jadau bracelets, explore the distinct ornaments celebrated across Hyderabad.
            </p>
            <Link
              href="/products"
              className="text-xs font-semibold uppercase tracking-wider text-[#8F6E2B] hover:text-[#735821] whitespace-nowrap self-start sm:self-auto"
            >
              All Categories &rarr;
            </Link>
          </div>
        </div>

        {/* Categories Grid: 4 items linking to products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group rounded-xs overflow-hidden bg-[#FAF8F5] border transition-all duration-300 relative flex flex-col ${
                  isSelected
                    ? 'border-[#B88E3E] ring-1 ring-[#B88E3E]/60 shadow-md'
                    : 'border-[#E5DEC9] hover:border-[#C5A059] hover:shadow-sm'
                }`}
              >
                <Link
                  href={`/products?category=${cat.id}`}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className="flex-1 flex flex-col focus:outline-hidden"
                >
                  {/* Visual Image container (4:3 aspect ratio) */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DC]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle scrim for clarity */}
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-300" />

                    {/* Corner arrow icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 opacity-80 group-hover:opacity-100 group-hover:bg-[#FAF8F5] group-hover:text-[#B88E3E] transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Gemstone accent dot in corner */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-[#E8DFC8]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          cat.accent === 'ruby'
                            ? 'bg-[#8E2333]'
                            : cat.accent === 'emerald'
                            ? 'bg-[#1C523E]'
                            : 'bg-[#C5A059]'
                        }`}
                      />
                      <span className="text-[10px] uppercase tracking-wider text-stone-700 font-medium">
                        {cat.accent === 'ruby' ? 'Ruby Accents' : cat.accent === 'emerald' ? 'Emerald Drops' : 'Pure Gold Finish'}
                      </span>
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-stone-900 font-medium group-hover:text-[#B88E3E] transition-colors mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-normal leading-relaxed line-clamp-1">
                        {cat.subtitle}
                      </p>
                    </div>

                    {/* Unboxed Metadata (Zero-Pill discipline) */}
                    <div className="mt-4 pt-3 border-t border-[#EFE8D8] flex items-center justify-between text-xs text-stone-600">
                      <span className="font-medium text-[#8F6E2B]">{cat.itemCount}</span>
                      <span className="text-[11px] text-stone-400 group-hover:text-stone-800 transition-colors">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
