
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { GalleryHorizontal, Users } from "lucide-react";

// Mock rooms data
const DEMO_ROOMS = [
  {
    id: "r1",
    title: "Creative Design Workshop",
    description: "Join us for a live workshop on creative design principles and practices.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1500&auto=format&fit=crop",
    participants: 24,
    maxParticipants: 50,
    hosts: [
      {
        id: "1",
        name: "Amara Okafor",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
      },
      {
        id: "2",
        name: "Kofi Mensah",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      }
    ],
    status: "live",
    timestamp: "Live now"
  },
  {
    id: "r2",
    title: "Music Production Masterclass",
    description: "Learn about advanced music production techniques with industry professionals.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1500&auto=format&fit=crop",
    participants: 78,
    maxParticipants: 100,
    hosts: [
      {
        id: "2",
        name: "Kofi Mensah",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      }
    ],
    status: "upcoming",
    timestamp: "Tomorrow, 3:00 PM"
  },
  {
    id: "r3",
    title: "Fashion Business Networking",
    description: "Connect with fashion industry professionals and discuss latest trends and business opportunities.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1500&auto=format&fit=crop",
    participants: 45,
    maxParticipants: 75,
    hosts: [
      {
        id: "3",
        name: "Zainab Ahmed",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop",
      }
    ],
    status: "upcoming",
    timestamp: "Friday, 6:00 PM"
  }
];

const RoomsSection: React.FC = () => {
  const joinRoom = (roomId: string) => {
    toast.success("Joined room successfully!");
    // Would handle actual room joining logic here
  };
  
  const createRoom = () => {
    toast.success("Room creation modal would open here!");
    // Would open room creation modal here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Creative Rooms</h2>
        <Button 
          onClick={createRoom}
          className="bg-crib-terracotta hover:bg-crib-coral"
        >
          Create Room
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {DEMO_ROOMS.map(room => (
          <Card key={room.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="sm:flex">
              <div className="sm:w-1/3 relative">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="h-48 sm:h-full w-full object-cover"
                />
                {room.status === "live" && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 rounded-full bg-white mr-1 animate-pulse"></span>
                    LIVE
                  </div>
                )}
              </div>
              
              <div className="sm:w-2/3">
                <CardHeader>
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {room.hosts.map((host, index) => (
                          <Avatar key={host.id} className={`border-2 border-white ${index > 2 ? 'hidden' : ''}`}>
                            {host.avatar ? (
                              <AvatarImage src={host.avatar} alt={host.name} />
                            ) : (
                              <AvatarFallback className="bg-crib-terracotta text-white">
                                {host.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Hosted by {room.hosts.map(host => host.name).join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {room.status === "live" ? "Live now" : room.timestamp}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {room.participants}/{room.maxParticipants}
                      </span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    onClick={() => joinRoom(room.id)}
                    className={room.status === "live" ? "bg-red-500 hover:bg-red-600" : "bg-crib-terracotta hover:bg-crib-coral"}
                    variant="default"
                  >
                    {room.status === "live" ? "Join Now" : "Remind Me"}
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
