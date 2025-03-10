import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const Cart = () => {
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity,
    totalItems,
    totalPrice
  } = useCart();
  
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Cart Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />
      
      {/* Cart Panel */}
      <div 
        ref={cartRef}
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out flex flex-col",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Your Cart ({totalItems})</h2>
          <button 
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto py-4">
          {items.length > 0 ? (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.product.id} className="flex py-4 px-4 animate-fade-down">
                  {/* Product Image */}
                  <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-shop-dark">
                        {item.product.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-shop-dark/60 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {item.variant && (
                      <p className="mt-1 text-xs text-shop-dark/60">
                        Variant: {item.variant.name}
                      </p>
                    )}
                    
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-shop-dark">
                        {formatPrice(item.product.price, item.product.currency)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-shop-dark/60 hover:text-shop-dark transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-shop-dark/60 hover:text-shop-dark transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <ShoppingBag className="h-16 w-16 text-shop-dark/20 mb-4" />
              <h3 className="text-lg font-medium text-shop-dark mb-2">Your cart is empty</h3>
              <p className="text-shop-dark/60 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button onClick={toggleCart}>Continue Shopping</Button>
            </div>
          )}
        </div>
        
        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-shop-dark/70">Subtotal</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-shop-dark/70">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between text-base pt-2 border-t">
              <span className="font-medium">Total</span>
              <span className="font-bold">{formatPrice(totalPrice)}</span>
            </div>
            
            <Button fullWidth>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
