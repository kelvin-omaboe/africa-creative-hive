
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus } from "lucide-react";

const RegisterForm: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"artist" | "viewer">("artist");
  const [artistType, setArtistType] = useState("");
  const [isInputActive, setIsInputActive] = useState<"name" | "email" | "password" | null>(null);
  
  const { register, isLoading, error } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim() || (role === "artist" && !artistType)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await register(email, password, name, role, artistType);
      // Success is handled in AuthContext
    } catch (err) {
      // Error is handled in AuthContext
      console.error("Registration failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-display text-center text-crib-terracotta">Join The Crib</CardTitle>
          <CardDescription className="text-center">
            Create your account and showcase your creativity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                htmlFor="name"
                className={`transition-colors ${isInputActive === "name" ? "text-crib-terracotta" : ""}`}
              >
                Full Name
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User size={18} className={`transition-colors ${isInputActive === "name" ? "text-crib-terracotta" : ""}`} />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsInputActive("name")}
                  onBlur={() => setIsInputActive(null)}
                  className={`pl-10 transition-all border-2 ${
                    isInputActive === "name" 
                      ? "border-crib-terracotta shadow-sm shadow-crib-terracotta/20" 
                      : "border-input"
                  }`}
                  required
                />
              </div>
            </div>
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
              <Label 
                htmlFor="password"
                className={`transition-colors ${isInputActive === "password" ? "text-crib-terracotta" : ""}`}
              >
                Password
              </Label>
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
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select
                value={role}
                onValueChange={(value: "artist" | "viewer") => setRole(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artist">Creator/Artist</SelectItem>
                  <SelectItem value="viewer">Art Enthusiast</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {role === "artist" && (
              <div className="space-y-2">
                <Label htmlFor="artistType">Creative Discipline</Label>
                <Select
                  value={artistType}
                  onValueChange={(value) => setArtistType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visual Art">Visual Art</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Poetry">Poetry</SelectItem>
                    <SelectItem value="Fashion">Fashion Design</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Dance">Dance</SelectItem>
                    <SelectItem value="Film">Film</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className="w-full bg-crib-terracotta hover:bg-crib-coral py-6 group relative overflow-hidden"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <UserPlus size={18} />
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.p 
            className="text-sm text-center"
            whileHover={{ scale: 1.03 }}
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggleForm}
              className="text-crib-leaf hover:underline font-medium"
            >
              Log in
            </button>
          </motion.p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RegisterForm;
