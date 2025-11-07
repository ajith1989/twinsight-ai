import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IncidentsPredictedAlerted() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold">
          Predicted & Alerted Incidents
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          93
        </CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="opacity-50 cursor-pointer" size="16" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Incidents identified before customer or system impact, based on
                early signals and predictive telemetry.
              </p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        <div className="text-muted-foreground">Count</div>
      </CardFooter>
    </Card>
  );
}
