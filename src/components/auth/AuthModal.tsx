
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  defaultView?: "login" | "register";
  trigger?: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  defaultView = "login",
  trigger 
}) => {
  const [view, setView] = useState<"login" | "register">(defaultView);

  const toggleView = () => {
    setView(view === "login" ? "register" : "login");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-crib-terracotta hover:bg-crib-coral">
            {defaultView === "login" ? "Log In" : "Sign Up"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        {view === "login" ? (
          <LoginForm onToggleForm={toggleView} />
        ) : (
          <RegisterForm onToggleForm={toggleView} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
