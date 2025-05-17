
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal, Heart, MessageSquare, Share2, BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userType?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <Card>
      <CardHeader className="p-4 pb-0 flex flex-row items-start space-y-0">
        <div className="flex items-start space-x-3 flex-1">
          <Avatar>
            {post.userAvatar ? (
              <AvatarImage src={post.userAvatar} alt={post.userName} />
            ) : (
              <AvatarFallback className="bg-crib-terracotta text-white">
                {post.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <Link to={`/profile/${post.userId}`}>
                <span className="font-semibold hover:underline">{post.userName}</span>
              </Link>
              {post.userType && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{post.userType}</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="mb-3 whitespace-pre-line">{post.content}</p>
        {post.image && (
          <div className="rounded-md overflow-hidden mt-2">
            <img
              src={post.image}
              alt="Post attachment"
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex items-center gap-1.5 text-sm font-normal",
              liked && "text-red-500 hover:text-red-600"
            )} 
            onClick={handleLike}
          >
            <Heart className={cn("h-4 w-4", liked && "fill-current")} />
            {likeCount}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1.5 text-sm font-normal"
          >
            <MessageSquare className="h-4 w-4" />
            {post.comments}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1.5 text-sm font-normal"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1.5 text-sm font-normal"
          onClick={handleSave}
        >
          <BookmarkPlus className={cn("h-4 w-4", saved && "fill-current text-crib-terracotta")} />
          {saved ? "Saved" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
