import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";

export default function NoiseReduced() {
  const direction: "up" | "down" = "up";
  const TrendIcon = direction === "up" ? TrendingUp : TrendingDown;
  const trendColor = direction === "up" ? "text-green-600" : "text-red-600";
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Noise Reduced</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {numeral(".72").format("0%")}
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className={trendColor}>
            <TrendIcon className="w-3 h-3" />
            {direction === "up" ? "+" : "-"}
            7%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        <div className="text-muted-foreground">% Alert Reduction</div>
      </CardFooter>
    </Card>
  );
}
