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

export default function NoiseReduced() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="font-semibold">
          Noise Reduced
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-700">
          {numeral(".72").format("0%")}
        </CardTitle>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="opacity-50 cursor-pointer" size="16" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Decrease in false alerts, redundant tickets, and unnecessary
                escalations
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
