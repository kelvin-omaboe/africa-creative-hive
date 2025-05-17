
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import FeaturedCreatives from "@/components/home/FeaturedCreatives";
import CollaborationSection from "@/components/home/CollaborationSection";
import EventsSection from "@/components/home/EventsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/layout/Footer";

const Index: React.FC = () => {
  // Update document title
  useEffect(() => {
    document.title = "The Crib | Africa's Creative Community";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <FeatureHighlights />
        <FeaturedCreatives />
        <CollaborationSection />
        <EventsSection />
        <TestimonialsSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
