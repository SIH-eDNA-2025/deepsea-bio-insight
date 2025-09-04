import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Settings,
  Award,
  BarChart3,
  FolderOpen
} from "lucide-react";

const Profile = () => {
  const userStats = [
    { label: 'Total Projects', value: 12, icon: FolderOpen },
    { label: 'Samples Analyzed', value: 347, icon: BarChart3 },
    { label: 'Novel Taxa Found', value: 48, icon: Award },
    { label: 'Publications', value: 7, icon: Award }
  ];

  const recentActivity = [
    { action: 'Completed analysis', project: 'Mariana Trench Survey', date: '2024-01-15' },
    { action: 'Started new project', project: 'Arctic Deep Sea Study', date: '2024-01-14' },
    { action: 'Published results', project: 'Mid-Atlantic Ridge', date: '2024-01-12' },
    { action: 'Uploaded samples', project: 'Abyssal Plains Research', date: '2024-01-10' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and view your research activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    DR
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">Dr. Marina Rodriguez</h2>
                  <p className="text-muted-foreground">Senior Marine Biologist</p>
                  <Badge className="mt-1 bg-primary-light text-primary">CMLRE Research Team</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input id="email" value="m.rodriguez@cmlre.org" readOnly />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" value="Central Marine Living Resources & Ecology" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="location" value="Lisbon, Portugal" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joined">Member Since</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input id="joined" value="March 2023" readOnly />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>Save Changes</Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your latest research activities and project updates
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.project}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Research Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-light p-2 rounded-lg">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Research Focus */}
          <Card>
            <CardHeader>
              <CardTitle>Research Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant="outline" className="mr-2">Deep-Sea Biology</Badge>
              <Badge variant="outline" className="mr-2">Microbial Ecology</Badge>
              <Badge variant="outline" className="mr-2">eDNA Metabarcoding</Badge>
              <Badge variant="outline" className="mr-2">Biodiversity Assessment</Badge>
              <Badge variant="outline" className="mr-2">Marine Conservation</Badge>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="font-medium text-sm">Marine Bioinformatics Specialist</p>
                <p className="text-xs text-muted-foreground">International Marine Biology Consortium</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Deep-Sea Research Certification</p>
                <p className="text-xs text-muted-foreground">Ocean Research Institute</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Environmental DNA Analysis</p>
                <p className="text-xs text-muted-foreground">CMLRE Training Program</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;