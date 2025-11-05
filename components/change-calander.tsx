"use client";

import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChangeCalendar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual IT Change Calendar</CardTitle>
        <CardDescription>Select date range</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          className="w-full h-full rounded-lg border shadow-sm flex flex-col"
        />
      </CardContent>
    </Card>
  );
}
