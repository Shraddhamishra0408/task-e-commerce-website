
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Star, Plus, Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
  onToggleWishlist?: (productId: string, isInWishlist: boolean) => void;
}

const ProductCard = ({ product, index = 0, onToggleWishlist }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(product.inWishlist || false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newWishlistState = !isInWishlist;
    setIsInWishlist(newWishlistState);
    
    // Call the parent component's handler if provided
    if (onToggleWishlist) {
      onToggleWishlist(product.id, newWishlistState);
    }
    
    // Show toast message for wishlist actions
    if (newWishlistState) {
      toast.success(`${product.name} added to wishlist`);
    } else {
      toast.success(`${product.name} removed from wishlist`);
    }
    
    console.log(`${newWishlistState ? 'Added to' : 'Removed from'} wishlist: ${product.name}`);
  };

  const animationDelay = index * 0.1;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-white subtle-shadow transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md animate-fade-up"
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 image-loading" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover w-full h-full transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
        
        {/* Quick add to cart button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Wishlist button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant={isInWishlist ? "primary" : "outline"}
            size="sm"
            onClick={handleToggleWishlist}
            className="rounded-full h-9 w-9 p-0 flex items-center justify-center shadow-sm bg-white hover:bg-white"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={`h-5 w-5 ${isInWishlist ? 'text-white fill-shop-accent' : 'text-shop-dark/70'}`} 
            />
          </Button>
        </div>
        
        {/* Featured badge */}
        {product.featured && (
          <span className="absolute top-4 left-4 bg-shop-accent text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-shop-dark truncate">
            {product.name}
          </h3>
          
          {/* Product rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
            <span className="text-sm text-shop-dark/70">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-shop-dark/60 text-sm line-clamp-2 mb-3 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="font-semibold text-lg">
            ₹{product.price.toFixed(2)}
          </span>
          
          {isInWishlist && (
            <Button 
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToggleWishlist(e);
              }}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 h-auto"
              aria-label="Remove from wishlist"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
