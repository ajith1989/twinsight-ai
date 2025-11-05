"use client";

import { AlertTriangle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";

const chartData = [
  { category: "External", count: 12 },
  { category: "Telemetry", count: 8 },
  { category: "Cyber Risk", count: 15 },
  { category: "Internal Dependency", count: 6 },
  { category: "Operational Risk", count: 10 },
  { category: "Environmental", count: 4 },
];

const chartConfig = {
  count: {
    label: "High Risk Dependencies",
    color: "hsl(0, 84%, 60%)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function ReleaseFactors() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>High Risk Dependencies</CardTitle>
        <CardDescription>Count by Risk Category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-count)"
              radius={4}
            >
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-red-600">
          15 Cyber Risk dependencies identified{" "}
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Critical vulnerabilities require immediate attention before release
        </div>
      </CardFooter>
    </Card>
  );
}
