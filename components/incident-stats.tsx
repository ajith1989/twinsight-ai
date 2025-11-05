import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  {
    id: "total_engaged_incidents",
    title: "Total Engaged Incidents",
    description:
      "Number of incidents actively managed by response teams this quarter",
    value: 1284,
    unit: "incidents",
    trend: {
      direction: "up",
      percentage: 12.4,
      comparison: "vs previous quarter",
    },
  },
  {
    id: "cost_savings",
    title: "Cost Savings",
    description:
      "Estimated total cost savings from reduced downtime and optimized incident handling",
    value: 45230,
    unit: "AED",
    trend: {
      direction: "up",
      percentage: 8.1,
      comparison: "vs previous quarter",
    },
  },
  {
    id: "time_savings",
    title: "Time Savings",
    description:
      "Total incident resolution hours saved through automation and improved workflows",
    value: 184,
    unit: "hours",
    trend: {
      direction: "up",
      percentage: 15.6,
      comparison: "vs previous quarter",
    },
  },
  {
    id: "incident_resolution_rate",
    title: "Incident Resolution Rate",
    description: "Percentage of incidents resolved within SLA targets",
    value: 96.3,
    unit: "%",
    trend: {
      direction: "down",
      percentage: 1.2,
      comparison: "vs previous quarter",
    },
  },
];

export default function IncidentStats() {
  const formatValue = (value: string, unit: string) => {
    if (unit === "AED") {
      return `AED ${value.toLocaleString()}`;
    } else if (unit === "%") {
      return `${value}%`;
    } else if (unit === "hours") {
      return `${value} hrs`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const TrendIcon =
          stat.trend.direction === "up" ? TrendingUp : TrendingDown;
        const trendColor =
          stat.trend.direction === "up" ? "text-green-600" : "text-red-600";

        return (
          <Card key={stat.id} className="@container/card">
            <CardHeader>
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {formatValue(stat.value.toString(), stat.unit)}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className={trendColor}>
                  <TrendIcon className="w-3 h-3" />
                  {stat.trend.direction === "up" ? "+" : "-"}
                  {stat.trend.percentage}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending {stat.trend.direction} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                {stat.trend.comparison}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
