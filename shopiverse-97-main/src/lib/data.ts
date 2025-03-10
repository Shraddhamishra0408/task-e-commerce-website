
import { Product, Category } from "@/types";

export const categories: Category[] = [
  { id: "c1", name: "Headphones", slug: "headphones" },
  { id: "c2", name: "Speakers", slug: "speakers" },
  { id: "c3", name: "Watches", slug: "watches" },
  { id: "c4", name: "Accessories", slug: "accessories" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation technology and up to 30 hours of battery life.",
    price: 299.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c1",
    featured: true,
    rating: 4.8,
    stock: 15,
    variants: [
      { id: "v1", name: "Black", available: true },
      { id: "v2", name: "White", available: true },
      { id: "v3", name: "Blue", available: false },
    ],
    createdAt: "2023-01-15T12:00:00Z",
  },
  {
    id: "p2",
    name: "Smart Watch Series 5",
    description: "Stay connected with our latest smart watch featuring health monitoring, GPS, and water resistance up to 50 meters.",
    price: 349.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c3",
    featured: true,
    rating: 4.7,
    stock: 8,
    variants: [
      { id: "v4", name: "Small", available: true },
      { id: "v5", name: "Large", available: true },
    ],
    createdAt: "2023-02-10T12:00:00Z",
  },
  {
    id: "p3",
    name: "Portable Bluetooth Speaker",
    description: "Take your music anywhere with this portable, waterproof Bluetooth speaker with up to 24 hours of playback.",
    price: 129.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c2",
    featured: true,
    rating: 4.5,
    stock: 20,
    variants: [
      { id: "v6", name: "Black", available: true },
      { id: "v7", name: "Blue", available: true },
      { id: "v8", name: "Red", available: true },
    ],
    createdAt: "2023-03-05T12:00:00Z",
  },
  {
    id: "p4",
    name: "Wireless Charging Pad",
    description: "Effortlessly charge your compatible devices with this sleek, fast wireless charging pad.",
    price: 49.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c4",
    featured: false,
    rating: 4.3,
    stock: 30,
    variants: [
      { id: "v9", name: "Black", available: true },
      { id: "v10", name: "White", available: true },
    ],
    createdAt: "2023-04-20T12:00:00Z",
  },
  {
    id: "p5",
    name: "Noise-Cancelling Earbuds",
    description: "Immerse yourself in your music with these premium noise-cancelling wireless earbuds.",
    price: 199.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c1",
    featured: true,
    rating: 4.6,
    stock: 12,
    variants: [
      { id: "v11", name: "Black", available: true },
      { id: "v12", name: "White", available: true },
    ],
    createdAt: "2023-05-15T12:00:00Z",
  },
  {
    id: "p6",
    name: "Smart Home Speaker",
    description: "Control your smart home and enjoy high-quality audio with this voice-activated smart speaker.",
    price: 179.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c2",
    featured: false,
    rating: 4.4,
    stock: 18,
    variants: [
      { id: "v13", name: "Black", available: true },
      { id: "v14", name: "Gray", available: true },
    ],
    createdAt: "2023-06-10T12:00:00Z",
  },
  {
    id: "p7",
    name: "Fitness Tracker",
    description: "Monitor your health and fitness goals with our advanced fitness tracker featuring heart rate monitoring and sleep tracking.",
    price: 129.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c3",
    featured: false,
    rating: 4.2,
    stock: 25,
    variants: [
      { id: "v15", name: "Black", available: true },
      { id: "v16", name: "Blue", available: true },
      { id: "v17", name: "Pink", available: true },
    ],
    createdAt: "2023-07-05T12:00:00Z",
  },
  {
    id: "p8",
    name: "Premium Phone Case",
    description: "Protect your device in style with our premium, drop-tested phone case.",
    price: 39.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1541877944-ac82a091518a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "c4",
    featured: false,
    rating: 4.1,
    stock: 40,
    variants: [
      { id: "v18", name: "Clear", available: true },
      { id: "v19", name: "Black", available: true },
      { id: "v20", name: "Red", available: true },
    ],
    createdAt: "2023-08-15T12:00:00Z",
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const formatPrice = (price: number, currency: string = "INR"): string => {
  if (currency === "INR") {
    return `₹${price.toFixed(2)}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};
