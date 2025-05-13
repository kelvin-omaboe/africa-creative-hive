
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gallery, Users, Calendar, Wallet } from "lucide-react";

const features = [
  {
    title: "Showcase Your Work",
    description: "Upload your portfolio and get discovered by fans, collaborators, and clients across Africa.",
    icon: <Gallery className="h-8 w-8 text-crib-terracotta" />,
  },
  {
    title: "Collaborate",
    description: "Connect with other creatives and bring new cross-disciplinary projects to life.",
    icon: <Users className="h-8 w-8 text-crib-terracotta" />,
  },
  {
    title: "Events & Exhibitions",
    description: "Discover and share physical and virtual events in the African creative scene.",
    icon: <Calendar className="h-8 w-8 text-crib-terracotta" />,
  },
  {
    title: "Get Paid",
    description: "Accept commissions, bookings, and sell your work directly to your audience.",
    icon: <Wallet className="h-8 w-8 text-crib-terracotta" />,
  },
];

const FeatureHighlights: React.FC = () => {
  return (
    <section className="py-16 bg-crib-sand">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
          A Platform Built for African Creatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm card-hover">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
