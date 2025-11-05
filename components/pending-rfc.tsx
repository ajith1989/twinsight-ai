import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { CheckCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonGroup } from "@/components/ui/button-group";

export function PendingRFC() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Change Request</CardTitle>
        <CardDescription>
          Real-time monitoring of incidents and dependencies affecting release
          safety
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-6">
          <Item variant="outline">
            <ItemMedia variant="icon" className="bg-blue-500">
              <CheckCheckIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                Upgrade Application Database Server from PostgreSQL 13 to
                PostgreSQL 15
              </ItemTitle>
              <ItemDescription></ItemDescription>
            </ItemContent>
            <ItemActions>
              <ButtonGroup>
                <Button className="bg-green-700 text-white hover:bg-[#1800ad]">
                  Approve
                </Button>
                <Button variant="destructive">Reject</Button>
              </ButtonGroup>
            </ItemActions>
          </Item>
        </div>
      </CardContent>
      <CardFooter className="text-sm opacity-50">
        John Smith | DB-Server | Expires in 4 days
      </CardFooter>
    </Card>
  );
}
