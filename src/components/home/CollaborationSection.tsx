
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

// Sample projects for the MVP
const sampleProjects = [
  {
    id: "1",
    title: "Music Video for 'African Sunrise'",
    description: "Looking for a videographer and visual effects artist for my upcoming afrobeats single.",
    creator: {
      name: "Kofi Mensah",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      role: "Musician"
    },
    tags: ["Music", "Video", "Production"],
    interested: 4
  },
  {
    id: "2",
    title: "Fashion Collection Lookbook",
    description: "Seeking photographers and models for a photoshoot of my new traditional-inspired fashion collection.",
    creator: {
      name: "Amara Okafor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
      role: "Fashion Designer"
    },
    tags: ["Fashion", "Photography", "Modeling"],
    interested: 7
  }
];

const CollaborationSection: React.FC = () => {
  return (
    <section className="py-16 bg-crib-sand">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Collaboration Opportunities
            </h2>
            <p className="text-muted-foreground mt-2">
              Connect with other creators and bring new projects to life
            </p>
          </div>
          <Button asChild>
            <Link to="/collaborate">View All Projects</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleProjects.map((project) => (
            <Card key={project.id} className="card-hover">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">{project.interested}</span>
                    <span className="text-xs text-muted-foreground">interested</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={project.creator.avatar} />
                    <AvatarFallback>
                      {project.creator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{project.creator.name}</p>
                    <p className="text-xs text-muted-foreground">{project.creator.role}</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm">Learn More</Button>
                <Button size="sm" className="bg-crib-terracotta hover:bg-crib-coral">Express Interest</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-3">Have a Project Idea?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Create a collaboration opportunity and find the perfect creative partners for your next project.
          </p>
          <Button asChild className="bg-crib-azure hover:bg-crib-azure/90">
            <Link to="/collaborate/create">Post a Collaboration</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
