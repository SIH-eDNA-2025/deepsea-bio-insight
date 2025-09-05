import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  Plus,
  MapPin,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "uploaded" | "error";
  progress: number;
}

const Upload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => 
      file.name.endsWith('.fastq') || 
      file.name.endsWith('.fastq.gz') ||
      file.name.endsWith('.fq') ||
      file.name.endsWith('.fq.gz')
    );

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid files detected",
        description: "Only FASTQ files (.fastq, .fq, .fastq.gz, .fq.gz) are supported",
        variant: "destructive"
      });
    }

    const uploadFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0
    }));

    setFiles(prev => [...prev, ...uploadFiles]);

    // Simulate upload progress
    uploadFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId && file.status === "uploading") {
          const newProgress = Math.min(file.progress + Math.random() * 15, 100);
          const newStatus = newProgress === 100 ? "uploaded" : "uploading";
          
          if (newStatus === "uploaded") {
            clearInterval(interval);
            toast({
              title: "File uploaded successfully",
              description: `${file.name} is ready for analysis`
            });
          }
          
          return { ...file, progress: newProgress, status: newStatus };
        }
        return file;
      }));
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleStartAnalysis = () => {
    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload FASTQ files before starting analysis",
        variant: "destructive"
      });
      return;
    }

    if (!projectName.trim()) {
      toast({
        title: "Missing project name",
        description: "Please provide a name for your analysis project",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Analysis started",
      description: "Redirecting to AI Pipeline for processing..."
    });

    // Navigate to AI Pipeline
    setTimeout(() => {
      navigate("/ai-pipeline");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload eDNA Data</h1>
        <p className="text-muted-foreground mt-2">
          Upload your FASTQ files and configure analysis parameters for biodiversity assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Data Upload</CardTitle>
            <p className="text-sm text-muted-foreground">
              Drag and drop your FASTQ files or click to browse
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging 
                  ? "border-primary bg-primary-light/20" 
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Drop FASTQ files here</p>
                <p className="text-sm text-muted-foreground">
                  Supports .fastq, .fq, .fastq.gz, .fq.gz files
                </p>
                <div className="pt-2">
                  <Button variant="outline" onClick={() => document.getElementById('file-input')?.click()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".fastq,.fq,.fastq.gz,.fq.gz"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Uploaded Files ({files.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.status === "uploading" && (
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{Math.round(file.progress)}%</span>
                          </div>
                        )}
                        {file.status === "uploaded" && (
                          <Badge className="bg-success-light text-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Uploaded
                          </Badge>
                        )}
                        {file.status === "error" && (
                          <Badge variant="destructive">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Error
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configuration Section */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Configuration</CardTitle>
            <p className="text-sm text-muted-foreground">
              Provide metadata and analysis parameters
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="e.g., Mariana Trench Survey 2024"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the sampling location and objectives..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="GPS coordinates or site name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collection-date">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Collection Date
                </Label>
                <Input
                  id="collection-date"
                  type="date"
                  value={collectionDate}
                  onChange={(e) => setCollectionDate(e.target.value)}
                />
              </div>
            </div>

            {/* Analysis Parameters */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium mb-3">Analysis Parameters</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Genes:</span>
                  <span>16S rRNA, 18S rRNA, COI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference Database:</span>
                  <span>SILVA + GenBank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Clustering Method:</span>
                  <span>AI-Enhanced Clustering</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality Threshold:</span>
                  <span>Q30 (99.9% accuracy)</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleStartAnalysis}
                className="w-full"
                disabled={files.length === 0 || !projectName.trim()}
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Start eDNA Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;