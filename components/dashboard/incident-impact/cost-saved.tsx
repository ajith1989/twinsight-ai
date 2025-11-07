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

export default function CostSaved() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Cost Saved</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {numeral("12000").format("0 a")}
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
                Operational cost avoided due to reduced incident handling effort
                and prevention of service degradation
              </p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        <div className="text-muted-foreground">AED</div>
      </CardFooter>
    </Card>
  );
}
