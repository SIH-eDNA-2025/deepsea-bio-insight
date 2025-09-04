import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  BarChart3, 
  Users, 
  Dna, 
  Microscope,
  TrendingUp,
  FileText
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Results = () => {
  // Mock data for demonstration
  const taxonomicData = [
    { name: 'Bacteria', count: 145, percentage: 42 },
    { name: 'Archaea', count: 87, percentage: 25 },
    { name: 'Eukaryotes', count: 63, percentage: 18 },
    { name: 'Viruses', count: 32, percentage: 9 },
    { name: 'Unclassified', count: 21, percentage: 6 }
  ];

  const biodiversityMetrics = [
    { metric: 'Species Richness', value: 347, description: 'Total number of unique taxa identified' },
    { metric: "Shannon's Diversity", value: 4.23, description: 'Species diversity index (H\')' },
    { metric: 'Simpson\'s Index', value: 0.87, description: 'Probability of species evenness' },
    { metric: 'Novel Taxa', value: 15, description: 'Previously unidentified species' }
  ];

  const topSpecies = [
    { name: 'Pyrococcus furiosus', abundance: 12.4, status: 'Known' },
    { name: 'Thermotoga maritima', abundance: 8.7, status: 'Known' },
    { name: 'Novel Archaeon sp.', abundance: 6.2, status: 'Novel' },
    { name: 'Methanocaldococcus jannaschii', abundance: 5.9, status: 'Known' },
    { name: 'Unknown Bacterium A', abundance: 4.8, status: 'Novel' }
  ];

  const COLORS = [
    'hsl(var(--primary))', 
    'hsl(var(--success))', 
    'hsl(var(--warning))', 
    'hsl(var(--accent))', 
    'hsl(var(--destructive))'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analysis Results</h1>
          <p className="text-muted-foreground mt-2">
            Deep Sea Sample A1 • Mariana Trench • Completed Jan 15, 2024
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Report
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {biodiversityMetrics.map((metric, index) => (
          <Card key={metric.metric} className={`border-l-4 ${
            index === 0 ? 'border-l-primary' :
            index === 1 ? 'border-l-success' :
            index === 2 ? 'border-l-warning' : 'border-l-accent'
          }`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Taxonomic Composition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Taxonomic Composition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taxonomicData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-success" />
              Community Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taxonomicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {taxonomicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Species */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-accent" />
            Most Abundant Taxa
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Top species ranked by relative abundance in the sample
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSpecies.map((species, index) => (
              <div key={species.name} className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                species.status === 'Novel' 
                  ? 'bg-gradient-to-r from-warning/10 to-accent/10 border border-warning/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)] transform hover:-translate-y-0.5' 
                  : 'bg-muted/30 hover:bg-muted/40'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground italic">{species.name}</h3>
                    <p className="text-sm text-muted-foreground">Relative abundance: {species.abundance}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">{species.abundance}%</div>
                  </div>
                  <Badge 
                    variant={species.status === 'Novel' ? 'default' : 'secondary'}
                    className={species.status === 'Novel' ? 'bg-warning/20 text-warning-foreground' : ''}
                  >
                    {species.status === 'Novel' && <Dna className="h-3 w-3 mr-1" />}
                    {species.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Novel Taxa Discovery */}
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning-foreground">
            <TrendingUp className="h-5 w-5" />
            Novel Taxa Discovery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">15</div>
              <div className="text-sm text-muted-foreground">Novel species identified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">3</div>
              <div className="text-sm text-muted-foreground">Potentially new genera</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">23.4%</div>
              <div className="text-sm text-muted-foreground">Unclassified sequences</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-card rounded-lg border border-warning/20">
            <h4 className="font-semibold mb-2">Key Findings</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• High proportion of novel archaeal sequences suggest unique deep-sea adaptations</li>
              <li>• Several bacterial lineages show no close matches in current databases</li>
              <li>• Potential chemosynthetic symbionts discovered in association with unknown hosts</li>
              <li>• Rare biosphere components indicate unexplored metabolic pathways</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;