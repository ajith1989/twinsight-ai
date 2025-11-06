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

export default function CostSaved() {
  const direction: "up" | "down" = "up";
  const TrendIcon = direction === "up" ? TrendingUp : TrendingDown;
  const trendColor = direction === "up" ? "text-green-600" : "text-red-600";
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Cost Saved</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {numeral("12000").format("0 a")}
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className={trendColor}>
            <TrendIcon className="w-3 h-3" />
            {direction === "up" ? "+" : "-"}
            4%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-sm">
        <div className="text-muted-foreground">AED</div>
      </CardFooter>
    </Card>
  );
}
