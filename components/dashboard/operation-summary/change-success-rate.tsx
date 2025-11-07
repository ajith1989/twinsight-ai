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
import numeral from "numeral";

export default function ChangeSuccessRate() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold">
          Change Success Rate
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-700">
          {numeral(".87").format("0%")}
        </CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="opacity-50 cursor-pointer" size="16" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Percentage of changes deployed without causing incidents,
                rollbacks, or service instability
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
