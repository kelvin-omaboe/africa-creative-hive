
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

const CallToAction: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <section className="py-20 crib-pattern">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6">
          Join Africa's Creative Revolution
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Whether you're an established artist or just starting out, The Crib provides the platform,
          community, and tools you need to thrive in the creative economy.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <>
              <Button 
                asChild
                size="lg" 
                className="bg-crib-terracotta hover:bg-crib-coral"
              >
                <Link to="/portfolio">Complete Your Profile</Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
              >
                <Link to="/discover">Discover Creatives</Link>
              </Button>
            </>
          ) : (
            <>
              <AuthModal 
                defaultView="register"
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-crib-terracotta hover:bg-crib-coral"
                  >
                    Create Your Account
                  </Button>
                }
              />
              <AuthModal 
                defaultView="login"
                trigger={
                  <Button 
                    size="lg" 
                    variant="outline"
                  >
                    Log In
                  </Button>
                }
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
