import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

const Hero = ({
  title = "Premium Tech For Premium Experience",
  subtitle = "Discover our collection of premium tech products designed to elevate your daily life.",
  image = "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
}: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-shop-light">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/90 via-white/80 to-transparent" />
      
      <div className="container mx-auto px-4 z-20 relative">
        <div 
          ref={containerRef} 
          className="flex flex-col justify-center min-h-[90vh] max-w-2xl opacity-0 transition-opacity duration-1000"
        >
          <div className="py-12 space-y-8">
            <span className="inline-block bg-shop-accent/10 text-shop-accent px-3 py-1 rounded-full text-sm font-medium animate-fade-down">
              New Collection
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-up" 
              style={{ animationDelay: "0.1s" }}
            >
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-shop-dark/70 max-w-xl animate-fade-up" 
              style={{ animationDelay: "0.2s" }}
            >
              {subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-up" 
              style={{ animationDelay: "0.3s" }}
            >
              <Button size="lg">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/products">
                <Button variant="outline" size="lg">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-80">
        <div className="w-8 h-12 rounded-full border-2 border-shop-dark/30 flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-shop-dark/30 rounded-full animate-fade-down" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
