
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { toggleCart, totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log(`Searching for: ${searchQuery}`);
    // Could redirect to /products?search=${searchQuery}
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          Shopiverse
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-shop-dark/80 hover:text-shop-dark transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-shop-dark/80 hover:text-shop-dark transition-colors"
          >
            All Products
          </Link>
          {categories.slice(0, 3).map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="text-shop-dark/80 hover:text-shop-dark transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Form - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm w-[180px] focus:w-[220px] transition-all focus:outline-none focus:ring-2 focus:ring-shop-accent/30"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </form>

          {/* Cart Icon with Counter */}
          <button 
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-shop-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-up">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-down">
          <div className="p-4 space-y-3">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-100 rounded-full pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-shop-accent/30"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </form>
            
            <Link 
              to="/"
              className="block py-2 text-shop-dark hover:text-shop-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products"
              className="block py-2 text-shop-dark hover:text-shop-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="block py-2 text-shop-dark hover:text-shop-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
