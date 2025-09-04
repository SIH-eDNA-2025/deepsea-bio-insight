import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Activity,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects] = useState([
    {
      id: "proj-001",
      name: "Mariana Trench Biodiversity Survey",
      description: "Comprehensive eDNA analysis of the deepest oceanic trench to understand unique microbial communities and endemic species.",
      location: "11°22'N 142°35'E",
      samples: 24,
      status: "active",
      lastUpdated: "2024-01-15",
      progress: 75,
      novelTaxa: 12
    },
    {
      id: "proj-002", 
      name: "Mid-Atlantic Ridge Exploration",
      description: "Investigation of hydrothermal vent ecosystems and their associated biodiversity along the MAR.",
      location: "14°45'N 45°20'W",
      samples: 18,
      status: "completed",
      lastUpdated: "2024-01-10",
      progress: 100,
      novelTaxa: 8
    },
    {
      id: "proj-003",
      name: "Abyssal Plains Microbiome Study",
      description: "Characterization of sediment microbiomes in the abyssal plains of the North Atlantic.",
      location: "42°12'N 28°45'W",
      samples: 36,
      status: "planning",
      lastUpdated: "2024-01-12",
      progress: 15,
      novelTaxa: 0
    },
    {
      id: "proj-004",
      name: "Arctic Deep Sea Analysis",
      description: "Climate change impacts on Arctic deep-sea biodiversity through eDNA metabarcoding.",
      location: "79°55'N 15°30'E",
      samples: 15,
      status: "paused",
      lastUpdated: "2024-01-08",
      progress: 40,
      novelTaxa: 3
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary-light text-primary">Active</Badge>;
      case "completed":
        return <Badge className="bg-success-light text-success">Completed</Badge>;
      case "planning":
        return <Badge variant="outline">Planning</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Research Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your deep-sea biodiversity research projects and track analysis progress.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, locations, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  {getStatusBadge(project.status)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.samples} samples</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.novelTaxa} novel taxa</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm">
                  View Samples
                </Button>
                {project.status === "completed" && (
                  <Button size="sm">
                    View Results
                  </Button>
                )}
                {project.status === "active" && (
                  <Button size="sm">
                    Continue Analysis
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No projects found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "Create your first research project to get started"}
              </p>
            </div>
            {!searchTerm && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Projects;