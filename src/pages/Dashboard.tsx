import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import { 
  FolderOpen, 
  Upload, 
  Activity, 
  Users,
  Play,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [recentJobs] = useState([
    {
      id: "job-001",
      name: "Deep Sea Sample A1",
      status: "completed",
      progress: 100,
      startTime: "2024-01-15 09:30",
      endTime: "2024-01-15 11:45",
      taxa: 147
    },
    {
      id: "job-002", 
      name: "Abyssal Plain B2",
      status: "running",
      progress: 65,
      startTime: "2024-01-15 14:20",
      endTime: null,
      taxa: null
    },
    {
      id: "job-003",
      name: "Hydrothermal Vent C1",
      status: "queued",
      progress: 0,
      startTime: "2024-01-15 16:00",
      endTime: null,
      taxa: null
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-success-light text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case "running":
        return <Badge variant="secondary" className="bg-primary-light text-primary"><Activity className="h-3 w-3 mr-1" />Running</Badge>;
      case "queued":
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Queued</Badge>;
      case "failed":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the CMLRE eDNA Analysis Platform. Monitor your biodiversity analysis projects and explore deep-sea ecosystems.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={12}
          change="+2 this month"
          icon={FolderOpen}
          variant="default"
        />
        <StatsCard
          title="Active Analyses"
          value={3}
          change="2 running now"
          icon={Activity}
          variant="success"
        />
        <StatsCard
          title="Samples Processed"
          value={47}
          change="+8 this week"
          icon={Upload}
          variant="default"
        />
        <StatsCard
          title="Taxa Discovered"
          value={423}
          change="15 novel species"
          icon={Users}
          variant="warning"
        />
      </div>

      {/* Recent Jobs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Analysis Jobs</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track the progress of your eDNA analysis pipeline
            </p>
          </div>
          <Link to="/upload">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-light rounded-lg">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{job.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Started: {job.startTime}
                      {job.endTime && ` • Completed: ${job.endTime}`}
                      {job.taxa && ` • ${job.taxa} taxa identified`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {job.status === "running" && (
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{job.progress}%</span>
                    </div>
                  )}
                  {getStatusBadge(job.status)}
                  {job.status === "completed" && (
                    <Link to={`/results/${job.id}`}>
                      <Button variant="outline" size="sm">View Results</Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-light p-3 rounded-lg">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Upload New Sample</h3>
                <p className="text-sm text-muted-foreground">Start a new eDNA analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-accent p-3 rounded-lg">
                <FolderOpen className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Manage Projects</h3>
                <p className="text-sm text-muted-foreground">Organize your research</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-success-light p-3 rounded-lg">
                <Activity className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">View Analytics</h3>
                <p className="text-sm text-muted-foreground">Explore biodiversity insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;