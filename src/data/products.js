/**
 * Pirah Store — Curated Product Catalogue Data
 * 
 * Sourced directly from authentic product photography in public/images/:
 * - IMG-20261008-WA0001.jpg -> Signature Textured Knit Polo
 * - IMG-20261008-WA0002.jpg -> Heavyweight Boxy Crewneck Tee
 * - IMG-20261008-WA0004.jpg -> Curated Retro Low-Top Sneakers
 * - IMG-20261008-WA0000.jpg -> Chrome Split-Toe Leather Mules
 * - IMG-20261008-WA0008.jpg -> Suede Double-Strap Clog Slides
 * 
 * Note: Prices, exact stock counts, and dimensions are strictly withheld
 * until confirmed by the business owner. Enquiries are handled via WhatsApp.
 */

export const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'clothes', label: 'Clothes' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'slides', label: 'Palm Slippers & Slides' },
];

export const PRODUCTS = [
  {
    id: 'pirah-knit-polo',
    name: 'Signature Textured Knit Polo',
    categories: ['clothes'],
    categoryLabel: 'Clothes',
    image: '/images/IMG-20261008-WA0001.jpg',
    tagline: 'Collared knitwear in versatile tones',
    description:
      'Short-sleeve knit polo shirts with open collar styling and textured diamond weave. Available in black, heather grey, ivory, and wine.',
    specs: ['4 colourways', 'Textured knit weave', 'Open collared neckline'],
    enquiryHint: 'Enquire for size and pricing',
  },
  {
    id: 'pirah-heavyweight-tee',
    name: 'Heavyweight Boxy Crewneck Tee',
    categories: ['clothes'],
    categoryLabel: 'Clothes',
    image: '/images/IMG-20261008-WA0002.jpg',
    tagline: 'Structured cotton tee with clean drape',
    description:
      'Black cotton crewneck tee with reinforced ribbed collar and relaxed dropped shoulders.',
    specs: ['Heavyweight cotton', 'Reinforced ribbed collar', 'Relaxed fit'],
    enquiryHint: 'Enquire for size and pricing',
  },
  {
    id: 'pirah-retro-sneakers',
    name: 'Curated Retro Low-Top Sneakers',
    categories: ['shoes'],
    categoryLabel: 'Shoes',
    image: '/images/IMG-20261008-WA0004.jpg',
    tagline: 'Low-top court sneakers with gum soles',
    description:
      'Low-top leather and suede sneakers with contrast stripes and durable gum rubber outsoles.',
    specs: ['Low-profile court design', 'Gum rubber sole', 'Assorted colourways on request'],
    enquiryHint: 'Enquire for shoe size and colourways',
  },
  {
    id: 'pirah-split-toe-mules',
    name: 'Chrome Split-Toe Leather Mules',
    categories: ['shoes', 'slides'],
    categoryLabel: 'Shoes / Mules',
    image: '/images/IMG-20261008-WA0000.jpg',
    tagline: 'Matte leather slip-ons with silver cross hardware',
    description:
      'Matte black leather split-toe mules with adjustable midfoot strap, silver cross buckle, and low stacked heel.',
    specs: ['Matte leather with split toe', 'Silver cross buckle strap', 'Slip-on low heel'],
    enquiryHint: 'Enquire for shoe size and pricing',
  },
  {
    id: 'pirah-suede-clog-slides',
    name: 'Suede Double-Strap Clog Slides',
    categories: ['slides', 'shoes'],
    categoryLabel: 'Palm Slippers & Slides',
    image: '/images/IMG-20261008-WA0008.jpg',
    tagline: 'Camel suede slip-ons with cork footbed',
    description:
      'Closed-toe suede clogs in camel tan with two adjustable antiqued buckles and textured grip sole.',
    specs: ['Camel tan suede', 'Two adjustable buckle straps', 'Contoured cork footbed'],
    enquiryHint: 'Enquire for slide size and pricing',
  },
];
