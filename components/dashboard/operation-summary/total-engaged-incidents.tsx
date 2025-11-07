import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function TotalEngagedIncidents() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Engaged Incidents</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          114
        </CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Number of incidents TwinSight analyzed or enriched with
                insights, recommendations, or early
              </p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        <div className="text-muted-foreground">Previous Month</div>
      </CardFooter>
    </Card>
  );
}
