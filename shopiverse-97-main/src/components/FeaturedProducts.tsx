import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, this would be a fetch request
    const featuredProducts = getFeaturedProducts();
    setProducts(featuredProducts);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-20 px-4 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block bg-shop-accent/10 text-shop-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
              Featured Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-shop-dark">
              Our Best Sellers
            </h2>
            <p className="mt-3 text-shop-dark/70 max-w-xl">
              Discover our most popular products that customers love and recommend.
            </p>
          </div>
          
          <Link to="/products" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
