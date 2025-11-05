"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const applications = [
  {
    value: "DB-Server-01",
    label: "DB-Server-01",
  },
  {
    value: "API-Gateway-02",
    label: "API-Gateway-02",
  },
  {
    value: "Mail-Service",
    label: "Mail-Service",
  },
  {
    value: "File-Server-03",
    label: "File-Server-03",
  },
  {
    value: "Auth-Service",
    label: "Auth-Service",
  },
];

export function ApplicationFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? applications.find((application) => application.value === value)
                ?.label
            : "Select Application"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Select Application" />
          <CommandList>
            <CommandEmpty>No application found.</CommandEmpty>
            <CommandGroup>
              {applications.map((application) => (
                <CommandItem
                  key={application.value}
                  value={application.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === application.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {application.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
