"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "Improvement trend in time taken from change proposal → approval → successful deployment";

const chartData = [
  { quarter: "Q1", leadTime: 72 },
  { quarter: "Q2", leadTime: 65 },
  { quarter: "Q3", leadTime: 58 },
  { quarter: "Q4", leadTime: 50 },
];

const chartConfig = {
  leadTime: {
    label: "Lead Time (hours)",
    color: "#01bbd3",
  },
} satisfies ChartConfig;

export default function ChangeLeadTime() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Lead Time - Quarter-over-Quarter</CardTitle>
        <CardDescription>
          Improvement trend in time taken from change proposal → approval →
          successful deployment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="quarter"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="leadTime" fill="var(--color-leadTime)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
