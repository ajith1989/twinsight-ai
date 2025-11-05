import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
import { Incident } from "@/config/type";

export function IncidentHeader({incident}: {incident: Incident}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Item variant="outline">
        <Link href="/">
          <ItemMedia variant="icon">
            <ChevronLeft />
          </ItemMedia>
        </Link>
        <ItemContent>
          <ItemTitle>{incident.incidentNo}</ItemTitle>
          <ItemDescription>
            {incident.incidentTitle}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            {incident?.incidentStatus}
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
