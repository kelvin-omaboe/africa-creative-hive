
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const FeaturedCreatives: React.FC = () => {
  const { allUsers } = useAuth();

  // Get artists from the sample users (in a real app, you'd fetch featured artists)
  const featuredArtists = allUsers.filter(user => user.role === 'artist');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Featured Creatives
          </h2>
          <Button variant="link" asChild>
            <Link to="/discover">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArtists.map((artist) => (
            <Card key={artist.id} className="overflow-hidden card-hover">
              <div className="relative h-40 bg-gradient-to-r from-crib-terracotta to-crib-ochre">
                <div className="absolute inset-0 pattern-dot"></div>
              </div>
              <CardContent className="-mt-10 relative">
                <div className="flex justify-between">
                  <Avatar className="h-20 w-20 border-4 border-white">
                    {artist.avatar ? (
                      <AvatarImage src={artist.avatar} alt={artist.name} />
                    ) : (
                      <AvatarFallback className="bg-crib-terracotta text-white text-xl">
                        {artist.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Badge className="bg-crib-leaf hover:bg-crib-leaf/80">
                    {artist.artistType || "Creator"}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mt-4">{artist.name}</h3>
                <p className="text-muted-foreground mt-1 line-clamp-2">
                  {artist.bio || "African creative exploring new artistic frontiers."}
                </p>
                <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                  <span>{artist.followers} Followers</span>
                  <span>{artist.works} Works</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 flex justify-between">
                <Button variant="ghost" size="sm">Follow</Button>
                <Button variant="outline" size="sm" className="text-crib-terracotta hover:text-crib-terracotta hover:bg-crib-terracotta/10">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Add empty state if needed */}
          {featuredArtists.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No featured creatives yet</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreatives;
