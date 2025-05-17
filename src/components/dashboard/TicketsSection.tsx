
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock tickets data
const DEMO_TICKETS = [
  {
    id: "t1",
    title: "AfroBeats Night Festival",
    description: "Experience the best of AfroBeats music with top artists performing live.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1500&auto=format&fit=crop",
    date: "June 15, 2025",
    location: "Lagos, Nigeria",
    price: "50",
    currency: "USD",
    category: "Music",
    availableTickets: 120,
    soldOut: false,
    featured: true
  },
  {
    id: "t2",
    title: "African Contemporary Art Exhibition",
    description: "Showcasing the finest contemporary artworks from across the African continent.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1500&auto=format&fit=crop",
    date: "July 5-10, 2025",
    location: "Nairobi, Kenya",
    price: "25",
    currency: "USD",
    category: "Art",
    availableTickets: 200,
    soldOut: false,
    featured: false
  },
  {
    id: "t3",
    title: "Fashion Design Workshop",
    description: "Learn fashion design techniques with an emphasis on African textiles and patterns.",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1500&auto=format&fit=crop",
    date: "August 2, 2025",
    location: "Accra, Ghana",
    price: "75",
    currency: "USD",
    category: "Fashion",
    availableTickets: 0,
    soldOut: true,
    featured: false
  }
];

const TicketsSection: React.FC = () => {
  const buyTicket = (ticketId: string) => {
    toast.success("Ticket purchase process initiated!");
    // Would handle actual ticket purchase flow here
  };
  
  const createEvent = () => {
    toast.success("Event creation modal would open here!");
    // Would open event creation modal here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <Button 
          onClick={createEvent}
          className="bg-crib-terracotta hover:bg-crib-coral"
        >
          Create Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_TICKETS.map(ticket => (
          <Card key={ticket.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
            <div className="relative">
              <img 
                src={ticket.image} 
                alt={ticket.title}
                className="h-48 w-full object-cover"
              />
              {ticket.featured && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-yellow-400 text-black font-medium hover:bg-yellow-500">
                    Featured
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Badge className={`
                  ${ticket.category === "Music" ? "bg-purple-500 hover:bg-purple-600" : ""}
                  ${ticket.category === "Art" ? "bg-blue-500 hover:bg-blue-600" : ""}
                  ${ticket.category === "Fashion" ? "bg-pink-500 hover:bg-pink-600" : ""}
                `}>
                  {ticket.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{ticket.title}</CardTitle>
              <CardDescription className="line-clamp-2">{ticket.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2 flex-grow">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{ticket.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{ticket.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">{ticket.price} {ticket.currency}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <div className="w-full">
                <Button 
                  onClick={() => buyTicket(ticket.id)}
                  className="w-full bg-crib-terracotta hover:bg-crib-coral"
                  disabled={ticket.soldOut}
                  variant="default"
                >
                  {ticket.soldOut ? 'Sold Out' : 
                    <>
                      <Ticket className="h-4 w-4 mr-2" />
                      Buy Ticket
                    </>
                  }
                </Button>
                
                {!ticket.soldOut && (
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    {ticket.availableTickets} tickets remaining
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TicketsSection;
