"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheckIcon, MonitorIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Incident } from "@/config/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const incidentsColumns: ColumnDef<Incident>[] = [
  {
    accessorKey: "incidentNo",
    header: "ID",
    cell: ({ row }) => {
      const incidentNo = row.getValue<string>("incidentNo") || "";
      return (
        <Link href={`operational-resilience/${incidentNo}`}>
          <strong className="px-4">{incidentNo}</strong>
        </Link>
      );
    },
  },
  {
    accessorKey: "incidentTitle",
    header: "Title",
  },
  {
    accessorKey: "ciName",
    header: "Configuration Item",
    cell: ({ row }) => {
      const ciName = row.getValue<string>("ciName") || "";
      return (
        <Button variant="outline">
          <MonitorIcon className="opacity-50" />
          {ciName}
        </Button>
      );
    },
  },
  {
    accessorKey: "incidentPriority",
    header: "Severity",
    cell: ({ row }) => {
      const incidentPriority = row.getValue<string>("incidentPriority") || "";
      return (
        <Badge
          variant="destructive"
          className="h-10 w-10 rounded-full px-1 font-mono tabular-nums"
        >
          {incidentPriority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "incidentStatus",
    header: "Status",
    cell: ({ row }) => {
      const incidentStatus = row.getValue<string>("incidentStatus") || "";
      return (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 bg-blue-500 text-white dark:bg-blue-600 px-4 py-3"
        >
          <BadgeCheckIcon size={14} />
          {incidentStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: "incidentAssignee",
    header: "Assignee",
    cell: ({ row }) => {
      const incidentAssignee = row.getValue<string>("incidentAssignee") || "";
      return (
        <Button variant="outline">
          <UserIcon className="opacity-50" />
          {incidentAssignee}
        </Button>
      );
    },
  },
  {
    accessorKey: "recommendationAccuracy",
    header: "Accuracy (%)",
    cell: ({ row }) => {
      const recommendationAccuracy =
        row.getValue<string>("recommendationAccuracy") || "0";
      return <Progress value={parseInt(recommendationAccuracy)} />;
    },
  },
];
