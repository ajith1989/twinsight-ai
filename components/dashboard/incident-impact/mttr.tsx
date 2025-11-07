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

export const description = "MTTR - Quarter-over-quarter trend";

const chartData = [
  { quarter: "Q1", mttr: 48 },
  { quarter: "Q2", mttr: 42 },
  { quarter: "Q3", mttr: 35 },
  { quarter: "Q4", mttr: 30 },
];

const chartConfig = {
  mttr: {
    label: "MTTR (hours)",
    color: "#fc6266",
  },
} satisfies ChartConfig;

export default function MTTR() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MTTR - Quarter-over-Quarter</CardTitle>
        <CardDescription>
          Average resolution time is improving with proactive guidance
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
              <Bar dataKey="mttr" fill="var(--color-mttr)" radius={8}>
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
