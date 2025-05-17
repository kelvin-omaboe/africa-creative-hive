
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Image, Smile, MapPin, BarChart, X } from "lucide-react";
import { toast } from "sonner";

interface CreatePostProps {
  onPostCreate: (content: string, image?: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreate }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const [expandedInput, setExpandedInput] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onPostCreate(content, image);
      setContent("");
      setImage(undefined);
      setIsSubmitting(false);
      setExpandedInput(false);
      toast.success("Post created successfully!");
    }, 1000);
  };

  // Mock image upload function
  const handleImageUpload = () => {
    setIsUploading(true);
    
    // This would be replaced with a real image upload
    const mockImages = [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
    ];
    
    // Simulate upload delay
    setTimeout(() => {
      setImage(mockImages[Math.floor(Math.random() * mockImages.length)]);
      setIsUploading(false);
      setExpandedInput(true);
      toast.success("Image uploaded successfully!");
    }, 1500);
  };

  const focusTextarea = () => {
    setExpandedInput(true);
  };

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <div className="relative w-10 h-10 overflow-hidden bg-crib-terracotta rounded-full flex items-center justify-center text-white font-bold">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
            ) : (
              user?.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your creative mind, ${user?.name.split(' ')[0]}?`}
              className={`resize-none border-0 focus-visible:ring-0 focus-visible:ring-transparent p-0 transition-all duration-200 ${
                expandedInput ? 'h-24' : 'h-10'
              }`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={focusTextarea}
            />
            
            {image && (
              <div className="mt-3 relative">
                <img 
                  src={image} 
                  alt="Upload preview" 
                  className="rounded-md max-h-64 w-auto object-cover" 
                />
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setImage(undefined)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {isUploading && (
              <div className="mt-3 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-crib-terracotta"></div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between px-4 pb-4 pt-0">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-crib-terracotta"
            onClick={handleImageUpload}
            disabled={isUploading}
          >
            <Image className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Photo</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-crib-terracotta">
            <MapPin className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Location</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-crib-terracotta">
            <Smile className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Feeling</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-crib-terracotta">
            <BarChart className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Poll</span>
          </Button>
        </div>
        <Button 
          className={`${
            expandedInput ? 'bg-crib-terracotta hover:bg-crib-coral' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
          } transition-colors duration-200`}
          size="sm"
          onClick={handleSubmit}
          disabled={(!content.trim() && !image) || isSubmitting || isUploading}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Posting...
            </>
          ) : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePost;
