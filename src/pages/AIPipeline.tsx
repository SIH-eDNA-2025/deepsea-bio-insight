import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dna, Brain, Search, Microscope, TreePine, Settings, RotateCcw, Pause, Play, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
// Force refresh

const AIPipeline = () => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Predefined progress stages
  const progressStages = [
    { step: 0, progress: 0, duration: 2000 },    // Start
    { step: 0, progress: 100, duration: 3000 },  // Complete step 1
    { step: 1, progress: 0, duration: 1000 },    // Start step 2
    { step: 1, progress: 67, duration: 4000 },   // Current step 2 progress
    { step: 1, progress: 100, duration: 2000 },  // Complete step 2
    { step: 2, progress: 0, duration: 1000 },    // Start step 3
    { step: 2, progress: 100, duration: 8000 },  // Complete step 3
    { step: 3, progress: 0, duration: 1000 },    // Start step 4
    { step: 3, progress: 100, duration: 12000 }, // Complete step 4
  ];

  const [stageIndex, setStageIndex] = useState(3); // Start at step 2 with 67% progress

  // Simulate realistic pipeline progress
  useEffect(() => {
    if (isRunning && stageIndex < progressStages.length - 1) {
      const timer = setTimeout(() => {
        setStageIndex(prev => prev + 1);
        const nextStage = progressStages[stageIndex + 1];
        if (nextStage) {
          setCurrentStep(nextStage.step);
          setCurrentProgress(nextStage.progress);
        }
      }, progressStages[stageIndex].duration);
      return () => clearTimeout(timer);
    }
  }, [isRunning, stageIndex]);

  const pipelineSteps = [
    {
      id: 1,
      name: "Sequence Embedding",
      description: "Transform DNA sequences into high-dimensional vector representations",
      icon: Dna,
      status: currentStep >= 0 ? (currentStep > 0 ? "completed" : "running") : "pending",
      progress: currentStep === 0 ? currentProgress : (currentStep > 0 ? 100 : 0),
      duration: currentStep === 0 ? "2.3 min remaining" : (currentStep > 0 ? "2.3 min" : "Est. 3 min"),
      color: "bg-success"
    },
    {
      id: 2,
      name: "Unsupervised Clustering",
      description: "Group similar sequences using advanced clustering algorithms",
      icon: Brain,
      status: currentStep >= 1 ? (currentStep > 1 ? "completed" : "running") : "pending",
      progress: currentStep === 1 ? currentProgress : (currentStep > 1 ? 100 : 0),
      duration: currentStep === 1 ? "5.2 min remaining" : (currentStep > 1 ? "3.8 min" : "Est. 6 min"),
      color: "bg-primary"
    },
    {
      id: 3,
      name: "Taxonomic Assignment",
      description: "Assign taxonomic classifications to sequence clusters",
      icon: Search,
      status: currentStep >= 2 ? (currentStep > 2 ? "completed" : "running") : "pending",
      progress: currentStep === 2 ? currentProgress : (currentStep > 2 ? 100 : 0),
      duration: currentStep === 2 ? "8.4 min remaining" : (currentStep > 2 ? "8.4 min" : "Est. 8 min"),
      color: "bg-muted"
    },
    {
      id: 4,
      name: "Novelty Detection",
      description: "Identify potentially novel taxa and genetic variants",
      icon: Microscope,
      status: currentStep >= 3 ? (currentStep > 3 ? "completed" : "running") : "pending",
      progress: currentStep === 3 ? currentProgress : (currentStep > 3 ? 100 : 0),
      duration: currentStep === 3 ? "12.1 min remaining" : (currentStep > 3 ? "12.1 min" : "Est. 12 min"),
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