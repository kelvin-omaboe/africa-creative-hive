
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileSectionProps {
  user: User;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  const { allUsers } = useAuth();
  
  // Get 3 random users as suggestions (excluding current user)
  const suggestedUsers = allUsers
    .filter(u => u.id !== user.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* User Stats Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20 overflow-hidden bg-crib-terracotta rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{user.artistType || "Art Enthusiast"}</p>
            
            <div className="grid grid-cols-3 w-full border-t pt-3">
              <div className="text-center">
                <p className="font-semibold">{user.works}</p>
                <p className="text-xs text-muted-foreground">Works</p>
              </div>
              <div className="text-center border-x">
                <p className="font-semibold">{user.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{user.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Link to="/profile">
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Suggested Connections */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Suggested Connections</h4>
          <div className="space-y-4">
            {suggestedUsers.map(suggestedUser => (
              <div key={suggestedUser.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 overflow-hidden bg-crib-terracotta rounded-full flex items-center justify-center text-white font-bold">
                    {suggestedUser.avatar ? (
                      <img src={suggestedUser.avatar} alt={suggestedUser.name} className="w-full h-full object-cover" />
                    ) : (
                      suggestedUser.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{suggestedUser.name}</p>
                    <p className="text-xs text-muted-foreground">{suggestedUser.artistType || "Art Enthusiast"}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  Connect
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/discover">
              <Button variant="ghost" size="sm" className="w-full text-crib-terracotta">
                View More
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <div className="text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/help" className="hover:underline">Help</Link>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} The Crib</p>
      </div>
    </div>
  );
};

export default ProfileSection;
