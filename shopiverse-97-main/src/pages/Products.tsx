
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { Product } from "@/types";
import { Sliders, X, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isViewingWishlist, setIsViewingWishlist] = useState(false);
  
  // Initialize wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Update filtered products based on category and wishlist
  useEffect(() => {
    let filtered: Product[];
    
    if (isViewingWishlist) {
      filtered = products.filter(p => wishlist.includes(p.id));
    } else if (categoryParam) {
      const categoryId = categories.find(c => c.slug === categoryParam)?.id;
      if (categoryId) {
        filtered = products.filter(p => p.category === categoryId);
      } else {
        filtered = [...products];
      }
    } else {
      filtered = [...products];
    }
    
    // Map products and set inWishlist property
    setFilteredProducts(filtered.map(p => ({
      ...p,
      inWishlist: wishlist.includes(p.id)
    })));
    
  }, [categoryParam, wishlist, isViewingWishlist]);

  const handleCategoryClick = (slug: string | null) => {
    setActiveCategory(slug);
    setIsViewingWishlist(false);
    
    // Reset category-based filtering
    if (slug === null) {
      setFilteredProducts(products.map(p => ({
        ...p,
        inWishlist: wishlist.includes(p.id)
      })));
    } else {
      const categoryId = categories.find(c => c.slug === slug)?.id;
      if (categoryId) {
        setFilteredProducts(products.filter(p => p.category === categoryId).map(p => ({
          ...p,
          inWishlist: wishlist.includes(p.id)
        })));
      }
    }
    
    setIsMobileFilterOpen(false);
  };

  const handleToggleWishlist = (productId: string, isInWishlist: boolean) => {
    let updatedWishlist: string[];
    
    if (isInWishlist) {
      updatedWishlist = [...wishlist, productId];
    } else {
      updatedWishlist = wishlist.filter(id => id !== productId);
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    // Update the filtered products
    setFilteredProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, inWishlist: isInWishlist } : p)
    );
    
    // If viewing wishlist and removing an item, refilter the list
    if (isViewingWishlist && !isInWishlist) {
      setFilteredProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleShowWishlist = () => {
    setIsViewingWishlist(true);
    setFilteredProducts(
      products.filter(p => wishlist.includes(p.id))
        .map(p => ({ ...p, inWishlist: true }))
    );
  };
  
  const handleClearWishlist = () => {
    setWishlist([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
    
    if (isViewingWishlist) {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(prev => 
        prev.map(p => ({ ...p, inWishlist: false }))
      );
    }
    
    toast.success("Wishlist cleared successfully");
  };

  return (
    <>
      <Helmet>
        <title>Shop All Products | Shopiverse</title>
        <meta name="description" content="Browse our complete collection of premium tech products." />
      </Helmet>
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col">
            <div className="mb-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                {isViewingWishlist ? "My Wishlist" : "Our Products"}
              </h1>
              <p className="text-shop-dark/70 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
                {isViewingWishlist 
                  ? "Items you've saved for later. Easily manage your favorite products."
                  : "Browse our collection of premium tech products designed to elevate your daily life."}
              </p>
            </div>
            
            <div className="md:hidden mb-6">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <Sliders className="h-4 w-4 mr-2" />
                Filter Products
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div 
                className={`
                  md:w-64 flex-shrink-0 bg-white rounded-lg overflow-hidden subtle-shadow
                  ${isMobileFilterOpen ? 'block' : 'hidden md:block'}
                  fixed md:relative inset-0 z-40 md:z-0 bg-white md:bg-transparent
                `}
              >
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-center md:hidden mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <button 
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Categories</h3>
                      <ul className="space-y-2">
                        <li>
                          <button
                            onClick={() => handleCategoryClick(null)}
                            className={`text-left w-full px-2 py-1.5 rounded text-sm ${
                              activeCategory === null && !isViewingWishlist
                                ? "bg-shop-accent/10 text-shop-accent font-medium"
                                : "text-shop-dark/70 hover:bg-gray-100"
                            }`}
                          >
                            All Products
                          </button>
                        </li>
                        {categories.map((category) => (
                          <li key={category.id}>
                            <button
                              onClick={() => handleCategoryClick(category.slug)}
                              className={`text-left w-full px-2 py-1.5 rounded text-sm ${
                                activeCategory === category.slug && !isViewingWishlist
                                  ? "bg-shop-accent/10 text-shop-accent font-medium"
                                  : "text-shop-dark/70 hover:bg-gray-100"
                              }`}
                            >
                              {category.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">My Lists</h3>
                      <div className="space-y-2">
                        <button
                          onClick={handleShowWishlist}
                          className={`flex items-center gap-2 text-left w-full px-2 py-1.5 rounded text-sm ${
                            isViewingWishlist 
                              ? "bg-shop-accent/10 text-shop-accent font-medium" 
                              : "text-shop-dark/70 hover:bg-gray-100"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isViewingWishlist ? 'text-shop-accent' : 'text-shop-dark/70'}`} />
                          My Wishlist ({wishlist.length})
                        </button>
                        
                        {wishlist.length > 0 && (
                          <button
                            onClick={handleClearWishlist}
                            className="flex items-center gap-2 text-left w-full px-2 py-1.5 rounded text-sm text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Clear Wishlist
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="px-2">
                        <div className="bg-gray-200 h-1 rounded-full relative">
                          <div className="absolute top-0 left-1/4 right-1/2 bg-shop-accent h-1 rounded-full"></div>
                          <div className="absolute top-0 left-1/4 h-4 w-4 -mt-1.5 -ml-2 rounded-full bg-white border-2 border-shop-accent"></div>
                          <div className="absolute top-0 right-1/2 h-4 w-4 -mt-1.5 -mr-2 rounded-full bg-white border-2 border-shop-accent"></div>
                        </div>
                        <div className="flex justify-between mt-4 text-sm text-shop-dark/70">
                          <span>₹0</span>
                          <span>₹50000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        index={index} 
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <h3 className="text-lg font-medium text-shop-dark mb-2">
                      {isViewingWishlist ? "Your wishlist is empty" : "No products found"}
                    </h3>
                    <p className="text-shop-dark/60 mb-6">
                      {isViewingWishlist 
                        ? "Add products to your wishlist to save them for later."
                        : "Try adjusting your filters or browsing all products."}
                    </p>
                    <Button onClick={() => {
                      if (isViewingWishlist) {
                        setIsViewingWishlist(false);
                        handleCategoryClick(null);
                      } else {
                        handleCategoryClick(null);
                      }
                    }}>
                      View All Products
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
