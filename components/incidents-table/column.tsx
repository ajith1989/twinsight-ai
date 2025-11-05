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
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${incidentNo}`}
        >
          <strong className="px-4">{incidentNo}</strong>
        </Link>
      );
    },
  },
  {
    accessorKey: "incidentTitle",
    header: "Title",
    cell: ({ row }) => {
      const incidentTitle = row.getValue<string>("incidentTitle") || "";
      const incidentNo = row.getValue<string>("incidentNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${incidentNo}`}
        >
          <strong>{incidentTitle}</strong>
        </Link>
      );
    },
  },
  {
    accessorKey: "ciName",
    header: "Configuration Item",
    cell: ({ row }) => {
      const ciName = row.getValue<string>("ciName") || "";
      const incidentNo = row.getValue<string>("incidentNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${incidentNo}`}
        >
          <Button variant="outline">
            <MonitorIcon className="opacity-50" />
            {ciName}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "incidentPriority",
    header: "Severity",
    cell: ({ row }) => {
      const incidentPriority = (
        row.getValue<string>("incidentPriority") || ""
      ).toUpperCase();
      const incidentNo = row.getValue<string>("incidentNo") || "";

      // Determine color based on priority
      let colorClass = "bg-gray-500";
      if (incidentPriority === "P1") colorClass = "bg-red-500/60 text-white";
      else if (incidentPriority === "P2") colorClass = "bg-orange-500/80";
      else if (incidentPriority === "P3") colorClass = "bg-yellow-400/80";

      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${incidentNo}`}
        >
          <Badge
            className={`h-10 w-10 rounded-full px-1 font-mono tabular-nums ${colorClass}`}
          >
            {incidentPriority}
          </Badge>
        </Link>
      );
    },
  },
  {
    accessorKey: "incidentStatus",
    header: "Status",
    cell: ({ row }) => {
      const incidentStatus = (
        row.getValue<string>("incidentStatus") || ""
      ).toLowerCase();
      const incidentNo = row.getValue<string>("incidentNo") || "";

      // Determine color based on status
      let bgClass = "bg-gray-500";
      if (incidentStatus === "open") bgClass = "bg-blue-500 text-white";
      else if (incidentStatus === "done") bgClass = "bg-green-700 text-white";
      else if (incidentStatus === "onhold")
        bgClass = "bg-orange-500 text-white";

      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${incidentNo}`}
        >
          <Badge
            variant="secondary"
            className={`flex items-center gap-1 px-4 py-3 ${bgClass}`}
          >
            <BadgeCheckIcon size={14} />
            {incidentStatus.charAt(0).toUpperCase() + incidentStatus.slice(1)}
          </Badge>
        </Link>
      );
    },
  },
  {
    accessorKey: "incidentAssignee",
    header: "Assignee",
    cell: ({ row }) => {
      const incidentAssignee = row.getValue<string>("incidentAssignee") || "";
      const incidentNo = row.getValue<string>("incidentNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${incidentNo}`}
        >
          <Button variant="outline">
            <UserIcon className="opacity-50" />
            {incidentAssignee}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "recommendationAccuracy",
    header: "Accuracy (%)",
    cell: ({ row }) => {
      const recommendationAccuracy =
        row.getValue<string>("recommendationAccuracy") || "0";
      const incidentNo = row.getValue<string>("incidentNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${incidentNo}`}
        >
          <Progress value={parseInt(recommendationAccuracy)} />
        </Link>
      );
    },
  },
];
