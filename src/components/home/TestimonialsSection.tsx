
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample testimonials for the MVP
const testimonials = [
  {
    id: "1",
    quote: "Through The Crib, I found collaborators for my album and got booked for three exhibitions. It's the platform African creatives have been waiting for.",
    author: {
      name: "Nala Tambwe",
      role: "Visual Artist & Musician",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: "2",
    quote: "As a poet from a small town, The Crib has connected me with a continental audience that appreciates my work. My following has grown tenfold.",
    author: {
      name: "Ibrahim Osei",
      role: "Spoken Word Artist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: "3",
    quote: "Finding the right photographer for my fashion line was impossible until I joined The Crib. Now I have a network of collaborators across Africa.",
    author: {
      name: "Zola Ndlovu",
      role: "Fashion Designer",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop"
    }
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-crib-terracotta to-crib-ochre">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white text-center mb-12">
          From Our Creative Community
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/90 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="pt-6 pb-6">
                <div className="relative mb-8">
                  <div className="text-6xl absolute top-0 left-0 text-crib-terracotta/20 -translate-x-2 -translate-y-4">"</div>
                  <p className="text-gray-700 relative z-10">
                    {testimonial.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.author.avatar} />
                    <AvatarFallback className="bg-crib-terracotta text-white">
                      {testimonial.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
