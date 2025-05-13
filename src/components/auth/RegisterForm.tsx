
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const RegisterForm: React.FC<{ onToggleForm: () => void }> = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"artist" | "viewer">("artist");
  const [artistType, setArtistType] = useState("");
  
  const { register, isLoading, error } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name, role, artistType);
      toast({
        title: "Welcome to The Crib!",
        description: "Your account has been created successfully.",
      });
    } catch (err) {
      // Error is handled in auth context
    }
  };

  return (
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
            <div className="p-3 text-sm rounded bg-red-50 text-red-600">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
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
          <Button
            type="submit"
            className="w-full bg-crib-terracotta hover:bg-crib-coral"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-crib-leaf hover:underline font-medium"
          >
            Log in
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
