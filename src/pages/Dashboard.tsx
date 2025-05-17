
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileSection from "@/components/dashboard/ProfileSection";
import FeedSection from "@/components/dashboard/FeedSection";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/components/ui/use-toast";

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update document title
  useEffect(() => {
    document.title = "The Crib | Dashboard";
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Access Denied",
        description: "Please log in to view your dashboard",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, isLoading, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-crib-terracotta"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto pt-20 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar user={user} />
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-6">
            <FeedSection />
          </div>
          
          {/* Profile & Suggestions - Desktop Only */}
          <div className="hidden lg:block lg:col-span-3">
            <ProfileSection user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
