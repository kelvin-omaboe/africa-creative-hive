
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Lock, LogIn } from "lucide-react";

const LoginForm: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputActive, setIsInputActive] = useState<"email" | "password" | null>(null);
  const { login, isLoading, error } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Success is handled in the AuthContext
    } catch (err) {
      // Error is handled in AuthContext
      console.error("Login failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-crib-terracotta/90 to-crib-coral pb-8 pt-10">
          <CardTitle className="text-2xl font-display text-center text-white">
            Welcome Back to The Crib
          </CardTitle>
          <CardDescription className="text-center text-white/90">
            Log in to your creative home
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-8 -mt-4 bg-white rounded-t-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 text-sm rounded bg-red-50 text-red-600 border border-red-200"
              >
                {error}
              </motion.div>
            )}
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className={`transition-colors ${isInputActive === "email" ? "text-crib-terracotta" : ""}`}
              >
                Email
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18} className={`transition-colors ${isInputActive === "email" ? "text-crib-terracotta" : ""}`} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsInputActive("email")}
                  onBlur={() => setIsInputActive(null)}
                  className={`pl-10 transition-all border-2 ${
                    isInputActive === "email" 
                      ? "border-crib-terracotta shadow-sm shadow-crib-terracotta/20" 
                      : "border-input"
                  }`}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label 
                  htmlFor="password" 
                  className={`transition-colors ${isInputActive === "password" ? "text-crib-terracotta" : ""}`}
                >
                  Password
                </Label>
                <a 
                  href="#" 
                  className="text-xs text-crib-leaf hover:underline transition-colors hover:text-crib-terracotta"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={18} className={`transition-colors ${isInputActive === "password" ? "text-crib-terracotta" : ""}`} />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsInputActive("password")}
                  onBlur={() => setIsInputActive(null)}
                  className={`pl-10 transition-all border-2 ${
                    isInputActive === "password" 
                      ? "border-crib-terracotta shadow-sm shadow-crib-terracotta/20" 
                      : "border-input"
                  }`}
                  required
                />
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full bg-crib-terracotta hover:bg-crib-coral py-6 group relative overflow-hidden"
                disabled={isLoading}
              >
                <span className="absolute right-full group-hover:right-0 top-0 h-full bg-crib-coral/30 w-1/4 transform skew-x-[30deg] transition-all duration-500 ease-in-out" />
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Log In <LogIn size={18} />
                  </span>
                )}
                <span className="absolute left-full group-hover:left-0 top-0 h-full bg-crib-coral/30 w-1/4 transform skew-x-[30deg] transition-all duration-500 ease-in-out delay-100" />
              </Button>
            </motion.div>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="hover:bg-[#4267B2]/10" type="button">
              <svg className="w-5 h-5 mr-2" fill="#4267B2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.94474914,22 L9.94474914,13.1657526 L7,13.1657526 L7,9.48481614 L9.94474914,9.48481614 L9.94474914,6.54006699 C9.94474914,3.49740494 11.8714634,2 14.5856738,2 C15.8857805,2 17.0033128,2.09717672 17.3287076,2.13987558 L17.3287076,5.32020466 L15.4462767,5.32094085 C13.9702212,5.32094085 13.6256856,6.02252733 13.6256856,7.05171716 L13.6256856,9.48481614 L17.306622,9.48481614 L16.5704347,13.1657526 L13.6256856,13.1657526 L13.6256856,22" />
              </svg>
              Facebook
            </Button>
            <Button variant="outline" className="hover:bg-[#4285F4]/10" type="button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z"/>
                <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.6-1.26 3.4-1.26 5.38s.46 3.78 1.26 5.38l3.98-3.09z"/>
                <path fill="#EA4335" d="M12.255 5.04c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center p-6 pt-0">
          <motion.p 
            className="text-sm text-center"
            whileHover={{ scale: 1.03 }}
          >
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-crib-terracotta hover:underline font-medium transition-colors"
            >
              Sign up
            </button>
          </motion.p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
