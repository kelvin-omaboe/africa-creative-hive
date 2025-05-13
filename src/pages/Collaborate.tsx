
import React, { useEffect, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample projects for the MVP
const collaborationProjects = [
  {
    id: "1",
    title: "Music Video for 'African Sunrise'",
    description: "Looking for a videographer and visual effects artist for my upcoming afrobeats single. The concept includes sunrise scenes across various iconic African landscapes.",
    creator: {
      name: "Kofi Mensah",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      role: "Musician"
    },
    tags: ["Music", "Video", "Production"],
    interested: 4,
    deadline: "2023-06-30",
    location: "Accra, Ghana",
    remote: true
  },
  {
    id: "2",
    title: "Fashion Collection Lookbook",
    description: "Seeking photographers and models for a photoshoot of my new traditional-inspired fashion collection. The collection blends contemporary styles with Ankara prints.",
    creator: {
      name: "Amara Okafor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
      role: "Fashion Designer"
    },
    tags: ["Fashion", "Photography", "Modeling"],
    interested: 7,
    deadline: "2023-07-15",
    location: "Lagos, Nigeria",
    remote: false
  },
  {
    id: "3",
    title: "Illustrated Children's Book",
    description: "Writer looking for an illustrator to bring African folktales to life in a children's book series. First book will feature 15 illustrations based on West African stories.",
    creator: {
      name: "Thabo Ndlovu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      role: "Author"
    },
    tags: ["Illustration", "Publishing", "Children"],
    interested: 2,
    deadline: "2023-08-01",
    location: "Johannesburg, South Africa",
    remote: true
  },
  {
    id: "4",
    title: "Documentary Film Score",
    description: "Seeking a composer to create an original soundtrack for a documentary about East African conservation efforts. Looking for authentic sounds that blend traditional and modern elements.",
    creator: {
      name: "Nala Kamau",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&h=200&auto=format&fit=crop",
      role: "Filmmaker"
    },
    tags: ["Music", "Film", "Composition"],
    interested: 5,
    deadline: "2023-09-15",
    location: "Nairobi, Kenya",
    remote: true
  }
];

const CollaboratePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(collaborationProjects);
  
  // Update document title
  useEffect(() => {
    document.title = "Collaborate | The Crib";
  }, []);

  // Filter projects based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProjects(collaborationProjects);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = collaborationProjects.filter(
        project =>
          project.title.toLowerCase().includes(lowercaseQuery) ||
          project.description.toLowerCase().includes(lowercaseQuery) ||
          project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery]);

  const handleExpressInterest = (projectId: string) => {
    toast({
      title: "Interest Expressed!",
      description: "The project creator has been notified of your interest.",
      variant: "success",
    });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4">
            <section className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                    Collaboration Opportunities
                  </h1>
                  <p className="text-muted-foreground max-w-2xl">
                    Connect with other African creatives and bring new projects to life. Find the perfect partners for your next creative endeavor.
                  </p>
                </div>
                <Button className="bg-crib-terracotta hover:bg-crib-terracotta/90 flex items-center gap-2">
                  <Plus size={16} />
                  <span>Post New Project</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle className="text-lg">Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">Music</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">Visual Arts</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">Fashion</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">Film</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">Writing</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Location</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">Remote</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">West Africa</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">East Africa</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">Southern Africa</Badge>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent">North Africa</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Project Type</h4>
                        <div className="flex flex-col space-y-1">
                          <label className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span>Paid opportunities</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span>Portfolio building</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span>Skill exchange</span>
                          </label>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">Clear All Filters</Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Search projects..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2 shrink-0">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Sort</span>
                    </Button>
                  </div>
                  
                  <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All Projects</TabsTrigger>
                      <TabsTrigger value="new">Newest</TabsTrigger>
                      <TabsTrigger value="popular">Most Popular</TabsTrigger>
                      <TabsTrigger value="closing">Closing Soon</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-6">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <Card key={project.id} className="card-hover overflow-hidden border-muted">
                            <CardHeader>
                              <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
                                <div>
                                  <CardTitle className="text-xl">{project.title}</CardTitle>
                                  <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap gap-2">
                                    <span>{project.location}</span>
                                    <span>•</span>
                                    <span>{project.remote ? "Remote possible" : "In-person only"}</span>
                                    <span>•</span>
                                    <span>Deadline: {new Date(project.deadline).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs">
                                  <span className="font-semibold">{project.interested}</span>
                                  <span className="text-muted-foreground">interested</span>
                                </div>
                              </div>
                            </CardHeader>
                            
                            <CardContent>
                              <CardDescription className="text-sm mb-4 line-clamp-2">
                                {project.description}
                              </CardDescription>
                              
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
                            
                            <CardFooter className="flex justify-between border-t pt-4 flex-wrap gap-2">
                              <Button variant="outline" size="sm">View Details</Button>
                              <Button 
                                size="sm" 
                                className="bg-crib-terracotta hover:bg-crib-coral"
                                onClick={() => handleExpressInterest(project.id)}
                              >
                                Express Interest
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground mb-4">No projects match your search criteria</p>
                          <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="new">
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Coming soon!</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="popular">
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Coming soon!</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="closing">
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Coming soon!</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </section>
            
            <section className="mb-12 bg-crib-sand p-6 md:p-10 rounded-lg">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Have a Project Idea?</h2>
                <p className="text-muted-foreground mb-6">
                  Create a collaboration opportunity and find the perfect creative partners for your next project.
                  Share your vision and connect with talented creatives from across Africa.
                </p>
                <Button className="bg-crib-azure hover:bg-crib-azure/90">Post a Collaboration</Button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default CollaboratePage;
