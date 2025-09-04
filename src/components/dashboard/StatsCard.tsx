import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning";
}

const StatsCard = ({ title, value, change, icon: Icon, variant = "default" }: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success-light/30";
      case "warning":
        return "border-warning/20 bg-warning/10";
      default:
        return "border-primary/20 bg-primary-light/30";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md ${getVariantStyles()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${getIconStyles()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground mt-1">
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;