
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal, Heart, MessageSquare, Share2, BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userType?: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    toast.success(saved ? "Post removed from saved items" : "Post saved successfully");
  };
  
  const handleComment = () => {
    setShowComments(!showComments);
  };

  const submitComment = () => {
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newComment = {
        id: `c${Date.now()}`,
        userId: user?.id || "",
        userName: user?.name || "Anonymous",
        userAvatar: user?.avatar,
        content: commentText,
        timestamp: "Just now"
      };
      
      setComments([newComment, ...comments]);
      setCommentText("");
      setIsSubmitting(false);
      toast.success("Comment added successfully");
    }, 500);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
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
      
      <CardFooter className="p-4 pt-0 flex flex-col">
        <div className="flex justify-between w-full">
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
              onClick={handleComment}
            >
              <MessageSquare className="h-4 w-4" />
              {comments.length}
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
        </div>
        
        {showComments && (
          <div className="mt-4 w-full">
            <div className="flex space-x-2 mb-4">
              <Avatar className="h-8 w-8">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} />
                ) : (
                  <AvatarFallback className="bg-crib-terracotta text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 flex items-center gap-2">
                <Textarea 
                  placeholder="Add a comment..."
                  className="min-h-8 p-2 resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  size="sm"
                  onClick={submitComment}
                  disabled={!commentText.trim() || isSubmitting}
                  className="bg-crib-terracotta hover:bg-crib-coral self-end"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
            
            {comments.length > 0 ? (
              <div className="space-y-3 ml-10 border-l-2 pl-4 border-gray-100">
                {comments.map(comment => (
                  <div key={comment.id} className="flex space-x-2">
                    <Avatar className="h-6 w-6">
                      {comment.userAvatar ? (
                        <AvatarImage src={comment.userAvatar} />
                      ) : (
                        <AvatarFallback className="bg-crib-terracotta text-white text-xs">
                          {comment.userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/profile/${comment.userId}`}>
                          <span className="font-medium text-sm hover:underline">{comment.userName}</span>
                        </Link>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-center text-muted-foreground mt-2">No comments yet. Be the first to comment!</p>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
