
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/contexts/AuthContext";
import { Home, Users, MessageSquare, Bell, User as UserIcon, Settings, Grid, Image } from "lucide-react";

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const { logout } = useAuth();
  
  const navigationItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/dashboard" },
    { icon: <Grid className="w-5 h-5" />, label: "Discover", path: "/discover" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", path: "/messages" },
    { icon: <Users className="w-5 h-5" />, label: "Collaborate", path: "/collaborate" },
    { icon: <Bell className="w-5 h-5" />, label: "Notifications", path: "/notifications" },
    { icon: <UserIcon className="w-5 h-5" />, label: "Profile", path: "/profile" },
    { icon: <Image className="w-5 h-5" />, label: "My Works", path: "/works" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/settings" },
  ];

  return (
    <Card className="p-4 sticky top-24">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 overflow-hidden bg-crib-terracotta rounded-full flex items-center justify-center text-white font-bold">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-xs text-muted-foreground">{user.artistType || "Art Enthusiast"}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link key={item.label} to={item.path}>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-normal" 
                size="sm"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-start text-left font-normal text-crib-terracotta hover:bg-crib-terracotta/10" 
            size="sm"
            onClick={logout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
