export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  capacity: string;
  size: string;
  type: string;
  jets: number;
  electrical: string;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'XS SCYBA X SERIES 119',
    slug: 'xs-scyba-x-series-119',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'The Barrier Reef 158 Jet TV-Stereo Home Theater Super Spa offers an Extra Large and Deep 8 Person experience with its 158 Jet Supper Spa and TV-Home Theater Spa System. This is a premium portable spa designed for ultimate relaxation.',
    price: 500,
    originalPrice: 750,
    category: 'corner',
    capacity: '5-7',
    size: '6-7',
    type: 'tv-stereo',
    jets: 119,
    electrical: '220V, 50 amp/ETL Certificate',
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: 'XS SCYBA X SERIES 119',
    slug: 'xs-scyba-x-series-119-gold',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'Premium 5-7 person spa with advanced jet systems and stylish exterior finish.',
    price: 500,
    originalPrice: 700,
    category: 'portable',
    capacity: '5-7',
    size: '7-8',
    type: 'portable',
    jets: 119,
    electrical: '110V Plug and Play',
    inStock: true,
  },
  {
    id: 3,
    name: 'XS SCYBA X SERIES 119',
    slug: 'xs-scyba-x-series-119-platinum',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'Corner spa with deep seating and premium jets for an immersive hydrotherapy experience.',
    price: 500,
    category: '2-4',
    capacity: '2-4',
    size: '5-6',
    type: 'corner',
    jets: 119,
    electrical: '220V',
    inStock: true,
  },
  {
    id: 4,
    name: 'XS SCYBA X SET+ES 119',
    slug: 'xs-scyba-x-set-es-119',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'Blue crystal spa set with enhanced ES series jets. Perfect for 2-4 people.',
    price: 500,
    category: '8-plus',
    capacity: '8-plus',
    size: '8-large',
    type: 'deeper',
    jets: 119,
    electrical: '220V, 50 amp',
    inStock: true,
  },
  {
    id: 5,
    name: 'XS SCYBA X SERIES 119',
    slug: 'xs-scyba-x-series-119-v2',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'Classic XS Series with reliable performance and elegant design for everyday use.',
    price: 500,
    originalPrice: 650,
    category: 'portable',
    capacity: '5-7',
    size: '6-7',
    type: 'portable',
    jets: 119,
    electrical: '110V Plug and Play',
    inStock: true,
  },
  {
    id: 6,
    name: 'XS SCYBA X SERIES 119',
    slug: 'xs-scyba-x-series-119-v3',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'Upgraded XS Series featuring premium insulation and energy-efficient motor.',
    price: 500,
    category: 'corner',
    capacity: '5-7',
    size: '7-8',
    type: 'corner',
    jets: 119,
    electrical: '220V',
    inStock: true,
  },
  {
    id: 7,
    name: 'XS SCYBA X SERIES 119',
    slug: 'xs-scyba-x-series-119-v4',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'Spacious and deep spa model suited for 5-7 person capacity with advanced hydrotherapy.',
    price: 500,
    originalPrice: 800,
    category: 'deeper',
    capacity: '5-7',
    size: '7-8',
    type: 'deeper',
    jets: 119,
    electrical: '220V, 50 amp',
    inStock: true,
  },
  {
    id: 8,
    name: 'XS SCYBA X SERIES 119',
    slug: 'xs-scyba-x-series-119-blue',
    description: 'The goods of our stores are very reliable and we care about the customer.',
    longDescription: 'Crystal blue premium spa with entertainment features and luxurious interior.',
    price: 500,
    category: 'tv-stereo',
    capacity: '2-4',
    size: '5-6',
    type: 'tv-stereo',
    jets: 119,
    electrical: '220V',
    inStock: true,
  },
];

export const featuredProduct = {
  name: 'Barrier Reef 158 Jet TV-Stereo - Home Theater Super Spa',
  subtitle: 'Extra Large and Deep 8 Person | 158 Jet Supper Spa, TV-Home Theater Spa System',
  price: 4899,
  id: 1,
};
