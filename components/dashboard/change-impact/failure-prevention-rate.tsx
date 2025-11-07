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

export default function FailurePrevention() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Failure Prevention Rate</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-700">
          {numeral(".81").format("0%")}
        </CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="opacity-50" size="16" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Percentage of high-risk changes adjusted or stopped before
                causing incidents
              </p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        <div className="text-muted-foreground">Percentage</div>
      </CardFooter>
    </Card>
  );
}
