import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TotalChangeRequests() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold">
          Total Engaged Change Requests
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          55
        </CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="opacity-50 cursor-pointer" size="16" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Number of change requests tracked, assessed, or influenced by
                TwinSight intelligence
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
