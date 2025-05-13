
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Sample events for the MVP
const sampleEvents = [
  {
    id: "1",
    title: "Lagos Creative Arts Exhibition",
    description: "A showcase of contemporary Nigerian art featuring emerging and established artists.",
    date: "June 15-18, 2025",
    location: "Lagos, Nigeria",
    type: "In Person",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Pan-African Poetry Slam",
    description: "Virtual spoken word event featuring poets from across the continent.",
    date: "July 5, 2025",
    location: "Virtual Event",
    type: "Online",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Afrobeats Connect Workshop",
    description: "Music producers and artists collaborate on the future of Afrobeats sound.",
    date: "August 12, 2025",
    location: "Accra, Ghana",
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&auto=format&fit=crop"
  }
];

const EventsSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover exhibitions, performances, and workshops
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden card-hover">
              <div className="h-40 overflow-hidden">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge className={
                    event.type === "Online" 
                      ? "bg-crib-azure" 
                      : event.type === "Hybrid" 
                      ? "bg-crib-leaf" 
                      : "bg-crib-terracotta"
                  }>
                    {event.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center text-sm gap-2">
                  <Calendar className="h-4 w-4 text-crib-terracotta" />
                  <span>{event.date} • {event.location}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm">RSVP</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-3">Hosting an Event?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Reach Africa's creative community by listing your exhibition, workshop, or performance.
          </p>
          <Button asChild className="bg-crib-leaf hover:bg-crib-leaf/90">
            <Link to="/events/create">Add Your Event</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
