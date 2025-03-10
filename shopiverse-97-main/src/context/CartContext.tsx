
import React, { createContext, useState, useContext, useEffect } from "react";
import { CartItem, Product, ProductVariant } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate totals whenever cart items change
  useEffect(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && 
        (!variant || !item.variant || item.variant.id === variant.id)
      );

      let newItems;

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // Item doesn't exist, add new item
        newItems = [...prevItems, { product, quantity, variant }];
      }

      toast.success(`Added ${product.name} to your cart`);
      return newItems;
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.product.id !== productId);
      if (newItems.length !== prevItems.length) {
        toast.info("Item removed from cart");
      }
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
