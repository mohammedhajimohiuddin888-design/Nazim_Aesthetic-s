export interface ColorVariant {
  name: string;
  colorHex: string;
  image: string;
  badge?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  englishName: string;
  code: string;
  category: string;
  categoryId: string;
  originalPrice: number;
  discountPercent: number;
  price: number;
  options: string[];
  image: string;
  colorVariants: ColorVariant[];
  material: string;
  accent: 'gold' | 'ruby' | 'emerald' | 'sapphire';
  badge?: string;
  description: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'nz-01',
    name: 'Chandbali (Crescent Moon Earrings)',
    englishName: 'Crescent Moon Earrings',
    code: 'NZ-CB-01',
    category: 'Earrings',
    categoryId: 'earrings',
    originalPrice: 150,
    discountPercent: 10,
    price: 135,
    options: ['22K Gold Finish', 'Antique Nizam Finish', 'Rose Gold Tone'],
    image: '/images/products/chandbali-emerald.jpg',
    colorVariants: [
      {
        name: 'Emerald Green (Panna Drops)',
        colorHex: '#1C523E',
        image: '/images/products/chandbali-emerald.jpg',
        badge: 'Bestseller',
      },
      {
        name: 'Nizam Ruby Red (Manik Drops)',
        colorHex: '#8E2333',
        image: '/images/products/chandbali-ruby.jpg',
        badge: 'Festive Favorite',
      },
      {
        name: 'Royal Pearl & Gold (Basra Moti)',
        colorHex: '#C5A059',
        image: '/images/products/chandbali-pearl.jpg',
        badge: 'Charminar Classic',
      },
      {
        name: 'Sapphire Midnight Blue (Neelam)',
        colorHex: '#1B365D',
        image: '/images/products/chandbali-sapphire.jpg',
        badge: 'Royal Edition',
      },
    ],
    material: '22K Gold Finish · Hand-cut Polki & Basra Seed Pearl Fringe',
    accent: 'emerald',
    badge: 'Heritage Classic',
    description:
      'Iconic Hyderabadi crescent moon earrings (Chandbali) adorned with micro-pearl tassels, bezel-set Kundan polki, and cascading teardrop gemstone beads. Distinctively handcrafted by Old City jewel smiths.',
  },
  {
    id: 'nz-02',
    name: 'Karan Phool (Ear-Flower Ornaments)',
    englishName: 'Ear-Flower Ornaments or Floral Ear-Covers',
    code: 'NZ-KP-02',
    category: 'Earrings',
    categoryId: 'earrings',
    originalPrice: 160,
    discountPercent: 10,
    price: 144,
    options: ['22K Gold Plated', 'Antique Nizam Brass Polish'],
    image: '/images/products/karan-phool-ruby.jpg',
    colorVariants: [
      {
        name: 'Nizam Ruby Red (Crimson Floral)',
        colorHex: '#8E2333',
        image: '/images/products/karan-phool-ruby.jpg',
        badge: 'Royal Heirloom',
      },
      {
        name: 'Emerald Green (Zamarud Leaf)',
        colorHex: '#1C523E',
        image: '/images/products/karan-phool-emerald.jpg',
        badge: 'Stall Signature',
      },
      {
        name: 'Champagne Polki & Gold',
        colorHex: '#C5A059',
        image: '/images/products/karan-phool-gold.jpg',
        badge: 'Bridal Choice',
      },
      {
        name: 'Turquoise Enamel (Firoza Shade)',
        colorHex: '#028482',
        image: '/images/products/karan-phool-turquoise.jpg',
        badge: 'Exquisite Shade',
      },
    ],
    material: '22K Gold Finish · Sunburst Floral Petals with Pearl Jhumkies',
    accent: 'ruby',
    badge: 'Stall Special',
    description:
      'The majestic Karan Phool ("Ear-Flower") is a traditional Deccan earring engineered to cover the earlobe like a blossoming lotus, suspended with delicate filigree bell jhumkies and cluster pearls.',
  },
  {
    id: 'nz-03',
    name: 'Nizam Royal Pearl Jhumka',
    englishName: 'Royal Bell Dome Jhumkas',
    code: 'NZ-JHM-03',
    category: 'Jhumkas',
    categoryId: 'jhumkas',
    originalPrice: 180,
    discountPercent: 10,
    price: 162,
    options: ['22K Gold Finish', 'Rose Gold Tone', 'Vintage Oxidized Polish'],
    image: '/images/products/jhumka-royal-pearl.jpg',
    colorVariants: [
      {
        name: 'Basra Pearl & 22K Gold',
        colorHex: '#C5A059',
        image: '/images/products/jhumka-royal-pearl.jpg',
        badge: 'All-Time Favorite',
      },
      {
        name: 'Ruby Meenakari Inset',
        colorHex: '#8E2333',
        image: '/images/products/jhumka-royal-ruby.jpg',
        badge: 'Rich Crimson',
      },
      {
        name: 'Emerald Green Filigree',
        colorHex: '#1C523E',
        image: '/images/products/jhumka-royal-emerald.jpg',
        badge: 'Emerald Glow',
      },
    ],
    material: '22K Gold Finish · Luminous Pearl Bell with Micro Jhumka Fringe',
    accent: 'gold',
    badge: 'Stall Favourite',
    description:
      'Grand three-tier royal bell jhumkas with hanging micro-pearl clusters and traditional filigree dome design reminiscent of the royal courts of Hyderabad.',
  },
  {
    id: 'nz-04',
    name: 'Jadau Filigree Kada',
    englishName: 'Imperial Openable Kada Bracelet',
    code: 'NZ-KAD-04',
    category: 'Bracelets',
    categoryId: 'bracelets',
    originalPrice: 190,
    discountPercent: 10,
    price: 171,
    options: ['Antique Brass & 22K', 'Bright 22K Gold Finish', 'Matte Nizam Gold'],
    image: '/images/products/kada-jadau-ruby.jpg',
    colorVariants: [
      {
        name: 'Ruby Cabochon Inset',
        colorHex: '#8E2333',
        image: '/images/products/kada-jadau-ruby.jpg',
        badge: 'Antique Finish',
      },
      {
        name: 'Emerald Polki Centerpiece',
        colorHex: '#1C523E',
        image: '/images/products/kada-jadau-emerald.jpg',
        badge: 'Imperial Edition',
      },
      {
        name: 'Pearl Beaded Rim',
        colorHex: '#C5A059',
        image: '/images/products/kada-jadau-pearl.jpg',
        badge: 'Classic Nizam',
      },
    ],
    material: 'Antique Brass & 22K Gold · Floral Meenakari Detailing',
    accent: 'ruby',
    badge: 'Handcrafted',
    description:
      'A regal bangle bracelet crafted with openable screw clasp, floral meenakari detailing, and ruby or emerald center cabochons. Built to fit comfortably on all wrist sizes.',
  },
  {
    id: 'nz-05',
    name: 'Gulzar Bridal Choker & Satlada',
    englishName: 'Royal Nizami Pearl Choker',
    code: 'NZ-CHK-05',
    category: 'New Arrivals',
    categoryId: 'new-arrivals',
    originalPrice: 200,
    discountPercent: 10,
    price: 180,
    options: ['Hand-strung Basra Pearls', 'Festive Multi-strand Tiered'],
    image: '/images/products/choker-gulzar-emerald.jpg',
    colorVariants: [
      {
        name: 'Emerald Medallion & Pearls',
        colorHex: '#1C523E',
        image: '/images/products/choker-gulzar-emerald.jpg',
        badge: 'Grand Bridal',
      },
      {
        name: 'Crimson Ruby Medallion',
        colorHex: '#8E2333',
        image: '/images/products/choker-gulzar-ruby.jpg',
        badge: 'Kemp Majesty',
      },
      {
        name: 'Champagne Basra Pure White',
        colorHex: '#C5A059',
        image: '/images/products/choker-gulzar-pearl.jpg',
        badge: 'Pure Pearl',
      },
    ],
    material: 'Hand-strung Hyderabadi Pearls · Polki Centerpiece',
    accent: 'emerald',
    badge: 'New Arrival',
    description:
      'Five-string natural pearl collar anchored by an ornate emerald or ruby polki medallion, ideal for festive celebrations and royal wedding ceremonies.',
  },
  {
    id: 'nz-06',
    name: 'Deccan Ruby Blossom Studs',
    englishName: 'Floral Ear Studs with Gemstone Drops',
    code: 'NZ-STU-06',
    category: 'Earrings',
    categoryId: 'earrings',
    originalPrice: 90,
    discountPercent: 11,
    price: 80,
    options: ['22K Gold Plated', 'Antique Silver Finish'],
    image: '/images/products/studs-ruby-blossom.jpg',
    colorVariants: [
      {
        name: 'Deep Ruby Crimson',
        colorHex: '#8E2333',
        image: '/images/products/studs-ruby-blossom.jpg',
        badge: 'Everyday Luxury',
      },
      {
        name: 'Emerald Green Petals',
        colorHex: '#1C523E',
        image: '/images/products/studs-emerald-blossom.jpg',
        badge: 'Fresh Tone',
      },
      {
        name: 'Sapphire Midnight Inset',
        colorHex: '#1B365D',
        image: '/images/products/studs-sapphire-blossom.jpg',
        badge: 'Regal Hue',
      },
    ],
    material: '22K Gold Plated · Deep Faceted Glass Inset with Pearl Border',
    accent: 'ruby',
    description:
      'Subtle daily luxury floral tops with miniature gemstone petals surrounded by champagne kundan stones and dainty pearl accents.',
  },
  {
    id: 'nz-07',
    name: 'Laad Bazaar Pearl Bangles (Set of 2)',
    englishName: 'Laad Bazaar Artisan Lac Bangles',
    code: 'NZ-BNG-07',
    category: 'Bracelets',
    categoryId: 'bracelets',
    originalPrice: 140,
    discountPercent: 10,
    price: 126,
    options: ['Standard Size 2.4', 'Medium Size 2.6', 'Large Size 2.8'],
    image: '/images/products/bangles-laad-bazaar-gold.jpg',
    colorVariants: [
      {
        name: 'Royal Gold & Pearl',
        colorHex: '#C5A059',
        image: '/images/products/bangles-laad-bazaar-gold.jpg',
        badge: 'Laad Bazaar Classic',
      },
      {
        name: 'Ruby Lac & Gold Rim',
        colorHex: '#8E2333',
        image: '/images/products/bangles-laad-bazaar-ruby.jpg',
        badge: 'Crimson Velvet',
      },
      {
        name: 'Emerald Lac & Seed Pearls',
        colorHex: '#1C523E',
        image: '/images/products/bangles-laad-bazaar-emerald.jpg',
        badge: 'Deccan Emerald',
      },
    ],
    material: 'Lacquered Core · 22K Gold Leaf & Seed Pearls',
    accent: 'gold',
    badge: 'Laad Bazaar Spec',
    description:
      'Traditional Charminar style twin bangles enveloped in rows of shimmering white seed pearls and hand-set crystals from the historic Laad Bazaar artisans.',
  },
  {
    id: 'nz-08',
    name: 'Tirmaan Royal Pearl Bridal Set',
    englishName: 'Basra Pearl Choker & Chandbali Pair',
    code: 'NZ-SET-08',
    category: 'New Arrivals',
    categoryId: 'new-arrivals',
    originalPrice: 200,
    discountPercent: 5,
    price: 190,
    options: ['Complete Bridal Set', 'Choker Only', 'Earrings Pair Only'],
    image: '/images/categories/category-bridal.jpg',
    colorVariants: [
      {
        name: 'Nizam Heritage Bridal Set',
        colorHex: '#C5A059',
        image: '/images/categories/category-bridal.jpg',
        badge: 'Complete Set',
      },
      {
        name: 'Emerald & Pearl Ensemble',
        colorHex: '#1C523E',
        image: '/images/products/choker-gulzar-emerald.jpg',
        badge: 'Emerald Bridal',
      },
      {
        name: 'Ruby Polki Ensemble',
        colorHex: '#8E2333',
        image: '/images/products/choker-gulzar-ruby.jpg',
        badge: 'Kemp Bridal',
      },
    ],
    material: '22K Gold Finish · Hand-strung Basra Pearls & Polki Centerpiece',
    accent: 'emerald',
    badge: 'Bridal Grandeur',
    description:
      'A majestic bridal ensemble comprising a multi-strand Hyderabadi pearl choker collar, matching crescent Chandbali earrings, and complimentary velvet bridal keepsake box.',
  },
  {
    id: 'nz-09',
    name: 'Almas Royal Jadau Diamond Ring',
    englishName: 'Heritage Solitaire & Polki Ring',
    code: 'NZ-RNG-09',
    category: 'New Arrivals',
    categoryId: 'new-arrivals',
    originalPrice: 110,
    discountPercent: 10,
    price: 99,
    options: ['Standard Adjustable Size', 'Size 12', 'Size 14', 'Size 16'],
    image: '/images/categories/category-rings.jpg',
    colorVariants: [
      {
        name: 'Champagne Polki Solitaire',
        colorHex: '#C5A059',
        image: '/images/categories/category-rings.jpg',
        badge: 'Royal Ring',
      },
      {
        name: 'Imperial Emerald Inset',
        colorHex: '#1C523E',
        image: '/images/products/kada-jadau-emerald.jpg',
        badge: 'Emerald Crest',
      },
    ],
    material: '22K Antique Yellow Gold · Uncut Polki Diamonds & Open Filigree',
    accent: 'gold',
    badge: 'New Ring',
    description:
      'Grand traditional Hyderabadi cocktail ring crafted with bezel-set uncut polki glass stones, delicate filigree band, and openable adjustable shank.',
  },
];
