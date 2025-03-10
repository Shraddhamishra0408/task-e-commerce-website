
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-shop-light py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Shopiverse</h3>
            <p className="text-shop-dark/70 leading-relaxed">
              Premium tech products designed to elevate your daily life.
              Quality, innovation, and excellence in every product.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-shop-dark/60 hover:text-shop-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-shop-dark/60 hover:text-shop-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-shop-dark/60 hover:text-shop-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products?category=headphones" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Headphones
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=speakers" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=watches" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Watches
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=accessories" 
                  className="text-shop-dark/70 hover:text-shop-accent transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-shop-accent" />
                <span className="text-shop-dark/70">
                  123 Tech Avenue, San Francisco, CA 94107, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-shop-accent" />
                <span className="text-shop-dark/70">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-shop-accent" />
                <span className="text-shop-dark/70">contact@shopiverse.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-shop-dark/60 text-sm">
              © {currentYear} Shopiverse. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-shop-dark/60 text-sm hover:text-shop-accent transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-shop-dark/60 text-sm hover:text-shop-accent transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-shop-dark/60 text-sm hover:text-shop-accent transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
