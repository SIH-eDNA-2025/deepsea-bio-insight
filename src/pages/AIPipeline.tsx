import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dna, Brain, Search, Microscope, TreePine, Settings, RotateCcw, Pause, Play, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
// Force refresh

const AIPipeline = () => {
  const [currentProgress, setCurrentProgress] = useState(67);
  const [isRunning, setIsRunning] = useState(true);

  // Simulate progress updates
  useEffect(() => {
    if (isRunning && currentProgress < 100) {
      const timer = setInterval(() => {
        setCurrentProgress(prev => Math.min(prev + 1, 100));
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isRunning, currentProgress]);

  const pipelineSteps = [
    {
      id: 1,
      name: "Sequence Embedding",
      description: "Transform DNA sequences into high-dimensional vector representations",
      icon: Dna,
      status: "completed",
      progress: 100,
      duration: "2.3 min",
      color: "bg-success"
    },
    {
      id: 2,
      name: "Unsupervised Clustering",
      description: "Group similar sequences using advanced clustering algorithms",
      icon: Brain,
      status: "running",
      progress: 67,
      duration: "5.2 min remaining",
      color: "bg-primary"
    },
    {
      id: 3,
      name: "Taxonomic Assignment",
      description: "Assign taxonomic classifications to sequence clusters",
      icon: Search,
      status: "pending",
      progress: 0,
      duration: "Est. 8 min",
      color: "bg-muted"
    },
    {
      id: 4,
      name: "Novelty Detection",
      description: "Identify potentially novel taxa and genetic variants",
      icon: Microscope,
      status: "pending",
      progress: 0,
      duration: "Est. 12 min",
      color: "bg-muted"
    }
  ];

  const optionalModules = [
    {
      name: "Phylogenetic Placement",
      description: "Place sequences in evolutionary context",
      icon: TreePine,
      status: "ready",
      enabled: true
    },
    {
      name: "Functional Annotation",
      description: "Predict gene functions and metabolic pathways",
      icon: Settings,
      status: "disabled",
      enabled: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/20 text-success border-success/30">completed</Badge>;
      case "running":
        return <Badge className="bg-primary/20 text-primary border-primary/30">running</Badge>;
      case "pending":
        return <Badge className="bg-muted/50 text-muted-foreground border-muted">pending</Badge>;
      case "ready":
        return <Badge className="bg-accent/20 text-accent border-accent/30">ready</Badge>;
      case "disabled":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">disabled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AI Analysis Pipeline
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring of eDNA sequence processing workflow
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button size="sm">
            <Play className="w-4 h-4 mr-2" />
            Start New Job
          </Button>
        </div>
      </div>

      {/* Current Job Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Dna className="w-6 h-6 text-primary" />
            <CardTitle className="text-xl">Current Job: Deep Trench Sample Batch #847</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">2,847</div>
              <div className="text-sm text-muted-foreground">Sequences Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">14:23</div>
              <div className="text-sm text-muted-foreground">Started At</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">15:45</div>
              <div className="text-sm text-muted-foreground">ETA Completion</div>
            </div>
            <div className="text-center">
              <Badge className="text-lg px-4 py-2 bg-primary/20 text-primary border-primary/30">
                {currentProgress}% Complete
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Pipeline Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Core Pipeline Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pipelineSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="relative">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full ${step.status === 'completed' ? 'bg-success/20' : step.status === 'running' ? 'bg-primary/20' : 'bg-muted/30'} flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${step.status === 'completed' ? 'text-success' : step.status === 'running' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{step.name}</h3>
                          <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(step.status)}
                          {step.status === 'completed' && (
                            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                              <div className="w-3 h-3 text-white">✓</div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{step.progress}%</span>
                        </div>
                        <Progress 
                          value={step.progress} 
                          className="h-2"
                        />
                        <div className="text-sm text-muted-foreground">
                          {step.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < pipelineSteps.length - 1 && (
                    <div className="flex justify-center mt-4">
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Optional Analysis Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Optional Analysis Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optionalModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <div 
                  key={module.name} 
                  className={`p-4 rounded-lg border transition-all ${
                    module.enabled 
                      ? 'border-accent/30 bg-accent/5 hover:bg-accent/10' 
                      : 'border-muted bg-muted/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${module.enabled ? 'bg-accent/20' : 'bg-muted/30'} flex items-center justify-center`}>
                      <IconComponent className={`w-4 h-4 ${module.enabled ? 'text-accent' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{module.name}</h4>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    {getStatusBadge(module.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPipeline;