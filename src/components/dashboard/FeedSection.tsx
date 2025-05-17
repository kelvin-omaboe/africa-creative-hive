
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import PostCard from "@/components/dashboard/PostCard";
import CreatePost from "@/components/dashboard/CreatePost";
import { Heart, MessageSquare, Share2 } from "lucide-react";

// Mock post data for demonstration
const DEMO_POSTS = [
  {
    id: "p1",
    userId: "1",
    userName: "Amara Okafor",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    userType: "Visual Art",
    content: "Just finished my latest mixed media piece exploring African cultural identity. Can't wait to showcase this at next month's exhibition!",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    likes: 24,
    comments: 7,
    timestamp: "2 hours ago"
  },
  {
    id: "p2",
    userId: "2",
    userName: "Kofi Mensah",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    userType: "Music",
    content: "Just dropped my new track 'African Rhythms Fusion'. Check it out and let me know what you think!",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    likes: 56,
    comments: 13,
    timestamp: "5 hours ago"
  },
  {
    id: "p3",
    userId: "3",
    userName: "Zainab Ahmed",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop",
    userType: "Fashion Design",
    content: "New collection inspired by traditional West African textiles with a modern twist. The show was amazing!",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1974&auto=format&fit=crop",
    likes: 89,
    comments: 21,
    timestamp: "1 day ago"
  }
];

const FeedSection: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(DEMO_POSTS);
  
  const handleNewPost = (content: string, image?: string) => {
    const newPost = {
      id: `p${Date.now()}`,
      userId: user?.id || "",
      userName: user?.name || "Anonymous",
      userAvatar: user?.avatar,
      userType: user?.artistType || "Art Enthusiast",
      content,
      image,
      likes: 0,
      comments: 0,
      timestamp: "Just now"
    };
    
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <CreatePost onPostCreate={handleNewPost} />
      
      {/* Feed Tabs */}
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="for-you" className="flex-1">For You</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
          <TabsTrigger value="trending" className="flex-1">Trending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="for-you" className="space-y-4 mt-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="following" className="space-y-4 mt-4">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-3">Follow more creators to see their content here</p>
            <Button variant="outline">Discover Creators</Button>
          </Card>
        </TabsContent>
        
        <TabsContent value="trending" className="space-y-4 mt-4">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-3">Trending content from across The Crib will appear here</p>
            <Button variant="outline">Explore Content</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedSection;
