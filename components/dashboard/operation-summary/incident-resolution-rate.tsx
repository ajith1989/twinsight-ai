import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";
import numeral from "numeral";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function IncidentResolutionRate() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Incident Resolution Rate</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {numeral(".82").format("0%")}
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
                Percentage of incidents resolved within SLA or expected
                timeframe, improved through faster
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
