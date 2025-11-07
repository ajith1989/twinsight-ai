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
import { Info, TrendingUp } from "lucide-react";
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
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">Last 30 days</div>
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
