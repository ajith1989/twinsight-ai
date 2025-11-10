"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/page-header";
import ChangeRiskFilter from "@/components/change-risk-filter";

const incidentPredictionData = [
  { window: "now", forecast: 2 },
  { window: "+3hrs", forecast: 4 },
  { window: "+12hrs", forecast: 7 },
  { window: "+24hrs", forecast: 3 },
];

const anomalyScore = 59;

export default function AnomalyIncidentPreview() {
  return (
    <div className="flex flex-col space-y-4">
    <PageHeader breadcrumb={[{ title: "Incident Forecasts" }]} />
    <ChangeRiskFilter />
    <div className="flex flex-col gap-6 w-full">
      {/* top row */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* LEFT: anomaly score (1/4) */}
        <Card className="h-full lg:col-span-1">
          <CardHeader className="space-y-1">
            <CardTitle className="text-sm flex items-center gap-2">
              Anomaly Risk Score
              {anomalyScore > 70 ? (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  High
                </Badge>
              ) : anomalyScore > 40 ? (
                <Badge variant="secondary">Medium</Badge>
              ) : (
                <Badge variant="outline">Normal</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-xs">
              Real-time deviation from baseline telemetry
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-3xl font-bold leading-none">{anomalyScore}%</p>
            <Progress value={anomalyScore} />
            
            <p className="text-[0.65rem] text-muted-foreground">
              &gt;65% → pre-incident watchlist
            </p>
          </CardContent>
          <CardFooter className="text-[0.6rem] text-muted-foreground">
            Updated now • Splunk + APM
          </CardFooter>
        </Card>

        {/* RIGHT: incident prediction graph (3/4) */}
        <Card className="h-full lg:col-span-3">
          <CardHeader className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>Incident Forecast</CardTitle>
              <CardDescription className="text-xs">
                Next 24h incident likelihood (model output)
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incidentPredictionData} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis dataKey="window" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 10]} ticks={[0, 5, 10]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#ef4444"
                  strokeWidth={2.2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* bottom row small cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* top contributing factors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Top contributing factors</CardTitle>
            <CardDescription className="text-xs">Signals driving current anomaly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <a href="#infrastructure" className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 hover:bg-muted">
              <span>Infrastructure health</span>
              <Badge variant="outline">degraded</Badge>
            </a>
            <a href="#downstream" className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 hover:bg-muted">
              <span>Downstream availability</span>
              <Badge variant="outline">92%</Badge>
            </a>
            <a href="#traffic" className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 hover:bg-muted">
              <span>Traffic surge</span>
              <Badge variant="secondary">+38%</Badge>
            </a>
            <a href="#global-outage" className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 hover:bg-muted">
              <span>Global outage signal</span>
              <Badge variant="outline">ext</Badge>
            </a>
            <a href="#cyber" className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 hover:bg-muted">
              <span>Cyber threats</span>
              <Badge variant="destructive">monitor</Badge>
            </a>
          </CardContent>
        </Card>

        {/* impacted modules */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Impacted modules</CardTitle>
            <CardDescription className="text-xs">Based on dependency graph</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ImpactedRow name="Search & Offers" impact="High" />
            <ImpactedRow name="Booking flow (PAX)" impact="Medium" />
            <ImpactedRow name="Payment gateway adapter" impact="Low" />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Auto-tagged from recent anomalies
          </CardFooter>
        </Card>
      </div>
    </div>

    </div>
  );
}

function ImpactedRow({ name, impact }: { name: string; impact: "High" | "Medium" | "Low" }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
      <span>{name}</span>
      <Badge
        variant={impact === "High" ? "destructive" : impact === "Medium" ? "secondary" : "outline"}
      >
        {impact}
      </Badge>
    </div>
  );
}

function buildWavePoints(
  data: { window: string; predictedIncidents: number; anomalyScore: number }[],
  key: "predictedIncidents" | "anomalyScore",
  isPercent = false
) {
  const maxVal = isPercent ? 100 : Math.max(...data.map((d) => d[key]), 1);
  const step = 100 / Math.max(data.length - 1, 1);
  return data
    .map((d, idx) => {
      const x = idx * step;
      const norm = d[key] / maxVal;
      const y = 35 - norm * 25; // baseline 35, wave height 25
      return `${x},${y}`;
    })
    .join(" ");
}
