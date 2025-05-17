
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BadgeDollarSign, Briefcase, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock jobs data
const DEMO_JOBS = [
  {
    id: "j1",
    title: "Senior Visual Artist",
    company: "Creative Hub Africa",
    description: "Looking for an experienced visual artist to join our team for various commercial and artistic projects.",
    location: "Lagos, Nigeria (Remote Option)",
    salary: "$2,500 - $3,500 / month",
    type: "Full-time",
    postedDate: "2 days ago",
    deadline: "June 30, 2025",
    skills: ["Illustration", "Digital Art", "Animation"],
    featured: true
  },
  {
    id: "j2",
    title: "Music Producer",
    company: "AfroBeats Studio",
    description: "Seeking a talented music producer with experience in African rhythms and contemporary production techniques.",
    location: "Accra, Ghana",
    salary: "$50 - $100 / hour",
    type: "Contract",
    postedDate: "1 week ago",
    deadline: "July 15, 2025",
    skills: ["Sound Engineering", "Music Composition", "DAW Proficiency"],
    featured: false
  },
  {
    id: "j3",
    title: "Fashion Designer Assistant",
    company: "Zara Designs",
    description: "Assistant designer needed for upcoming fashion collection inspired by West African textiles.",
    location: "Dakar, Senegal",
    salary: "$1,800 - $2,200 / month",
    type: "Part-time",
    postedDate: "3 days ago",
    deadline: "June 20, 2025",
    skills: ["Pattern Making", "Sketching", "Textile Knowledge"],
    featured: false
  },
  {
    id: "j4",
    title: "Cultural Event Coordinator",
    company: "Pan-African Arts Council",
    description: "Coordinate cultural events and exhibitions across major African cities.",
    location: "Multiple Locations",
    salary: "Competitive",
    type: "Full-time",
    postedDate: "5 days ago",
    deadline: "July 5, 2025",
    skills: ["Event Planning", "Budget Management", "Multilingual"],
    featured: true
  }
];

const JobsSection: React.FC = () => {
  const applyForJob = (jobId: string) => {
    toast.success("Job application process initiated!");
    // Would handle actual job application process here
  };
  
  const postJob = () => {
    toast.success("Job posting modal would open here!");
    // Would open job posting modal here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Creative Opportunities</h2>
        <Button 
          onClick={postJob}
          className="bg-crib-terracotta hover:bg-crib-coral"
        >
          Post a Job
        </Button>
      </div>
      
      <div className="space-y-4">
        {DEMO_JOBS.map(job => (
          <Card key={job.id} className={`overflow-hidden hover:shadow-md transition-shadow duration-300 ${job.featured ? 'border-l-4 border-crib-terracotta' : ''}`}>
            <div className="md:flex">
              <CardHeader className="md:w-2/3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      {job.title}
                      {job.featured && (
                        <Badge variant="outline" className="ml-2 bg-crib-terracotta/10 text-crib-terracotta border-crib-terracotta">
                          Featured
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <span>{job.company}</span>
                      <span className="mx-2">•</span>
                      <Badge variant="secondary" className="font-normal">
                        {job.type}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                
                <div className="mt-2 text-sm">{job.description}</div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="md:w-1/3 pt-0 md:pt-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BadgeDollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Posted {job.postedDate}
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    <span className="text-red-500">Deadline:</span>
                    <span className="ml-2">{job.deadline}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => applyForJob(job.id)}
                  className="w-full mt-4 bg-crib-terracotta hover:bg-crib-coral"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsSection;
