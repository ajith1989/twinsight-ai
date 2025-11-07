"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BadgeCheckIcon, MonitorIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { ChangeRequest } from "@/config/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUpDown } from "lucide-react";

export const changeRequestsColumns: ColumnDef<ChangeRequest>[] = [
  {
    accessorKey: "changeRequestNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const changeRequestNo = row.getValue<string>("changeRequestNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${changeRequestNo}`}
        >
          <strong className="px-4">{changeRequestNo}</strong>
        </Link>
      );
    },
  },
  {
    accessorKey: "changeRequestTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const changeRequestTitle =
        row.getValue<string>("changeRequestTitle") || "";
      const changeRequestNo = row.getValue<string>("changeRequestNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${changeRequestNo}`}
        >
          <strong>{changeRequestTitle}</strong>
        </Link>
      );
    },
  },
  {
    accessorKey: "ciName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Configuration Item
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ciName = row.getValue<string>("ciName") || "";
      const changeRequestNo = row.getValue<string>("changeRequestNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${changeRequestNo}`}
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
    accessorKey: "changeRequestType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const changeRequestType = row.getValue<string>("changeRequestType") || "";
      const changeRequestNo = row.getValue<string>("changeRequestNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${changeRequestNo}`}
        >
          <strong className="px-4">{changeRequestType}</strong>
        </Link>
      );
    },
  },
  {
    accessorKey: "changeRequestStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const changeRequestStatus = (
        row.getValue<string>("changeRequestStatus") || ""
      ).toLowerCase();
      const changeRequestNo = row.getValue<string>("changeRequestNo") || "";

      // Determine color based on status
      let bgClass = "bg-gray-500";
      if (changeRequestStatus === "open") bgClass = "bg-blue-500 text-white";
      else if (changeRequestStatus === "done")
        bgClass = "bg-green-700 text-white";
      else if (changeRequestStatus === "onhold") bgClass = "bg-orange-500/80";

      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${changeRequestNo}`}
        >
          <Badge
            variant="secondary"
            className={`flex items-center gap-1 px-4 py-3 ${bgClass}`}
          >
            <BadgeCheckIcon size={14} />
            {changeRequestStatus.charAt(0).toUpperCase() +
              changeRequestStatus.slice(1)}
          </Badge>
        </Link>
      );
    },
  },
  {
    accessorKey: "changeRequestAssignee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const changeRequestAssignee =
        row.getValue<string>("changeRequestAssignee") || "";
      const changeRequestNo = row.getValue<string>("changeRequestNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${changeRequestNo}`}
        >
          <Button variant="outline">
            <UserIcon className="opacity-50" />
            {changeRequestAssignee}
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
      const changeRequestNo = row.getValue<string>("changeRequestNo") || "";
      return (
        <Link
          className="cursor-pointer"
          href={`operational-resilience/${changeRequestNo}`}
        >
          <Progress value={parseInt(recommendationAccuracy)} />
        </Link>
      );
    },
  },
];
