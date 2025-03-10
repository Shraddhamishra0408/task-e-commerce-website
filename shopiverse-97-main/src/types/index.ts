
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  featured: boolean;
  rating: number;
  stock: number;
  variants?: ProductVariant[];
  createdAt: string;
  inWishlist?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number; // Optional price adjustment
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
