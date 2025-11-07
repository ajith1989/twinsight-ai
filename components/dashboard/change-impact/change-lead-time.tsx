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

export default function ChangeLeadTime() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Change Lead Time Trend</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-700">
          {numeral(".65").format("0%")}
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
                Improvement trend in time taken from change proposal → approval
                → successful deployment
              </p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        <div className="text-muted-foreground">QoQ Change</div>
      </CardFooter>
    </Card>
  );
}
