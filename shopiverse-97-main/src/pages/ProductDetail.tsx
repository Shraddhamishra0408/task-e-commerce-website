import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Star, Truck, Package, ShieldCheck, ChevronRight, Heart, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { ProductVariant } from "@/types";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Get product data
  const product = id ? getProductById(id) : undefined;
  
  // Redirect if product not found
  useEffect(() => {
    if (!product && id) {
      navigate("/products");
    } else if (product && product.variants && product.variants.length > 0) {
      // Set first available variant as default selected
      const firstAvailableVariant = product.variants.find(v => v.available);
      setSelectedVariant(firstAvailableVariant);
    }
    
    // Check if product is in wishlist (we would normally fetch this from an API)
    if (product) {
      // For demo purposes, we'll just use localStorage to store the wishlist
      const storedWishlist = localStorage.getItem('wishlist');
      const wishlistArr = storedWishlist ? JSON.parse(storedWishlist) : [];
      setIsInWishlist(wishlistArr.includes(product.id));
    }
  }, [product, id, navigate]);
  
  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedVariant);
    }
  };
  
  // Handle wishlist toggle
  const handleToggleWishlist = () => {
    if (!product) return;
    
    const newWishlistState = !isInWishlist;
    setIsInWishlist(newWishlistState);
    
    // For demo purposes, we'll just use localStorage
    const storedWishlist = localStorage.getItem('wishlist');
    let wishlistArr = storedWishlist ? JSON.parse(storedWishlist) : [];
    
    if (newWishlistState) {
      wishlistArr.push(product.id);
      toast.success(`${product.name} added to wishlist`);
    } else {
      wishlistArr = wishlistArr.filter((id: string) => id !== product.id);
      toast.success(`${product.name} removed from wishlist`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlistArr));
    console.log(`${newWishlistState ? 'Added to' : 'Removed from'} wishlist: ${product.name}`);
  };
  
  // Generate additional images for gallery (in a real app, these would come from the product data)
  const additionalImages = product ? [
    product.image,
    "https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ] : [];
  
  if (!product) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Shopiverse</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm">
            <a href="/" className="text-shop-dark/60 hover:text-shop-accent">Home</a>
            <ChevronRight className="h-4 w-4 mx-2 text-shop-dark/40" />
            <a href="/products" className="text-shop-dark/60 hover:text-shop-accent">Products</a>
            <ChevronRight className="h-4 w-4 mx-2 text-shop-dark/40" />
            <span className="text-shop-dark font-medium truncate">{product.name}</span>
          </nav>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-fade-up">
            {/* Product Images */}
            <div className="lg:w-1/2 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 subtle-shadow">
                {isImageLoading && (
                  <div className="absolute inset-0 image-loading" />
                )}
                <img
                  src={additionalImages[currentImageIndex]}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  onLoad={() => setIsImageLoading(false)}
                />
                
                {/* Wishlist button */}
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant={isInWishlist ? "primary" : "outline"}
                    size="sm"
                    onClick={handleToggleWishlist}
                    className="rounded-full h-10 w-10 p-0 flex items-center justify-center shadow-sm bg-white hover:bg-white"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      className={`h-5 w-5 ${isInWishlist ? 'text-white fill-shop-accent' : 'text-shop-dark/70'}`}
                    />
                  </Button>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {additionalImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative overflow-hidden rounded-lg aspect-square w-20 border-2 transition-all ${
                      currentImageIndex === index 
                        ? "border-shop-accent" 
                        : "border-transparent hover:border-gray-200"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-6">
                {/* Product Title and Rating */}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(product.rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-shop-dark/70">{product.rating} ({Math.floor(product.rating * 10)} reviews)</span>
                    </div>
                    
                    {/* Wishlist status indicator */}
                    {isInWishlist && (
                      <div className="flex items-center text-shop-accent">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleToggleWishlist}
                          className="flex items-center gap-1 h-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Remove from wishlist</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Price */}
                <div>
                  <h2 className="text-2xl font-bold">
                    ₹{product.price.toFixed(2)}
                  </h2>
                  <p className="text-sm text-green-600 mt-1">In stock ({product.stock} available)</p>
                </div>
                
                {/* Description */}
                <p className="text-shop-dark/80 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Available Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                            selectedVariant?.id === variant.id
                              ? "border-shop-accent text-shop-accent bg-shop-accent/5"
                              : "border-gray-200 text-shop-dark/70 hover:border-gray-300"
                          } ${!variant.available ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => variant.available && setSelectedVariant(variant)}
                          disabled={!variant.available}
                        >
                          {variant.name}
                          {!variant.available && " (Out of stock)"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity and Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <div className="flex rounded-lg border border-gray-200">
                    <button
                      className="w-10 h-12 flex items-center justify-center text-shop-dark/70 hover:text-shop-dark border-r border-gray-200"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={product.stock}
                      className="w-14 h-12 text-center focus:outline-none text-shop-dark"
                    />
                    <button
                      className="w-10 h-12 flex items-center justify-center text-shop-dark/70 hover:text-shop-dark border-l border-gray-200"
                      onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 h-12"
                  >
                    Add to Cart
                  </Button>
                </div>
                
                {/* Shipping and Returns */}
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h3 className="font-medium mb-4">Shipping & Returns</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Truck className="h-5 w-5 mr-2 text-shop-accent flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">Free Shipping</h4>
                        <p className="text-xs text-shop-dark/60 mt-1">On all orders over ₹5000</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Package className="h-5 w-5 mr-2 text-shop-accent flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">Easy Returns</h4>
                        <p className="text-xs text-shop-dark/60 mt-1">30 day return policy</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ShieldCheck className="h-5 w-5 mr-2 text-shop-accent flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">Warranty</h4>
                        <p className="text-xs text-shop-dark/60 mt-1">1 year warranty included</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;
