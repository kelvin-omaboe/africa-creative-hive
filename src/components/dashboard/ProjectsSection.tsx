
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { GalleryHorizontal, Plus, Heart, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock projects data
const DEMO_PROJECTS = [
  {
    id: "p1",
    title: "Urban African Heritage Photography Project",
    description: "A collaborative photography project documenting urban African heritage sites across the continent.",
    coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1500&auto=format&fit=crop",
    creator: {
      id: "1",
      name: "Amara Okafor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    },
    collaborators: 5,
    maxCollaborators: 10,
    progress: 65,
    likes: 87,
    comments: 23,
    category: "Photography",
    status: "In Progress",
    featured: true,
    tags: ["Urban", "Heritage", "Documentary"]
  },
  {
    id: "p2",
    title: "AfroFuturism Mixed Media Exhibition",
    description: "A collaborative exhibition exploring AfroFuturism through various artistic mediums.",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1500&auto=format&fit=crop",
    creator: {
      id: "3",
      name: "Zainab Ahmed",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop",
    },
    collaborators: 8,
    maxCollaborators: 12,
    progress: 30,
    likes: 54,
    comments: 11,
    category: "Mixed Media",
    status: "Seeking Collaborators",
    featured: false,
    tags: ["AfroFuturism", "Exhibition", "Collaborative"]
  },
  {
    id: "p3",
    title: "Pan-African Music Compilation",
    description: "A collaborative music project bringing together artists from across Africa to create a unique compilation album.",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1500&auto=format&fit=crop",
    creator: {
      id: "2",
      name: "Kofi Mensah",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    },
    collaborators: 12,
    maxCollaborators: 15,
    progress: 80,
    likes: 126,
    comments: 34,
    category: "Music",
    status: "Nearly Complete",
    featured: true,
    tags: ["Music", "Collaboration", "Pan-African"]
  }
];

const ProjectsSection: React.FC = () => {
  const joinProject = (projectId: string) => {
    toast.success("Project collaboration request sent!");
    // Would handle actual project joining process here
  };
  
  const likeProject = (projectId: string) => {
    toast.success("Project liked!");
    // Would handle actual project liking process here
  };
  
  const createProject = () => {
    toast.success("Project creation modal would open here!");
    // Would open project creation modal here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Collaborative Projects</h2>
        <Button 
          onClick={createProject}
          className="bg-crib-terracotta hover:bg-crib-coral"
        >
          Create Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_PROJECTS.map(project => (
          <Card key={project.id} className={`overflow-hidden hover:shadow-md transition-shadow duration-300 ${project.featured ? 'border-t-4 border-crib-terracotta' : ''}`}>
            <div className="relative">
              <img 
                src={project.coverImage} 
                alt={project.title}
                className="h-40 w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className={`
                  ${project.category === "Photography" ? "bg-blue-500 hover:bg-blue-600" : ""}
                  ${project.category === "Mixed Media" ? "bg-purple-500 hover:bg-purple-600" : ""}
                  ${project.category === "Music" ? "bg-green-500 hover:bg-green-600" : ""}
                `}>
                  {project.category}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    {project.creator.avatar ? (
                      <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                    ) : (
                      <AvatarFallback className="bg-crib-terracotta text-white">
                        {project.creator.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-white text-xs font-medium">{project.creator.name}</span>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">{project.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Project Status:</span>
                  <Badge variant="outline" className={`
                    ${project.status === "In Progress" ? "border-amber-500 text-amber-500" : ""}
                    ${project.status === "Seeking Collaborators" ? "border-blue-500 text-blue-500" : ""}
                    ${project.status === "Nearly Complete" ? "border-green-500 text-green-500" : ""}
                  `}>
                    {project.status}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress:</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm">
                      <GalleryHorizontal className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {project.collaborators}/{project.maxCollaborators} collaborators
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/50 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1.5 text-sm font-normal" 
                  onClick={() => likeProject(project.id)}
                >
                  <Heart className="h-4 w-4" />
                  {project.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1.5 text-sm font-normal"
                >
                  <MessageSquare className="h-4 w-4" />
                  {project.comments}
                </Button>
              </div>
              
              <Button 
                onClick={() => joinProject(project.id)}
                size="sm"
                className="bg-crib-terracotta hover:bg-crib-coral"
                disabled={project.collaborators >= project.maxCollaborators}
              >
                <Plus className="h-4 w-4 mr-1" />
                Join Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
