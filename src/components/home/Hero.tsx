
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

const Hero: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-crib-terracotta to-crib-ochre">
      <div className="absolute inset-0 pattern-dot"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
          Your Creative Home in Africa
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
          Connect, showcase, and collaborate with Africa's most vibrant creative community. 
          From musicians to visual artists, poets to designers — this is where creativity thrives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {user ? (
            <>
              <Button 
                asChild
                size="lg" 
                className="bg-white text-crib-terracotta hover:bg-white/90"
              >
                <Link to="/discover">Explore Creatives</Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/portfolio">My Portfolio</Link>
              </Button>
            </>
          ) : (
            <>
              <AuthModal 
                defaultView="register"
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-white text-crib-terracotta hover:bg-white/90"
                  >
                    Join The Crib
                  </Button>
                }
              />
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-white bg-crib-earth/30 text-white hover:bg-crib-earth/40"
              >
                <Link to="/discover">Explore First</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
