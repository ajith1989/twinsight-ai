import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemMedia,
} from "@/components/ui/item";
import { ShieldAlertIcon } from "lucide-react";

const feeds = [
  {
    heading: "Azure Outage",
    category: "External",
    description:
      "Cloud infrastructure instability detected in Azure services impacting deployment pipelines.",
  },
  {
    heading: "Node.js NPM Package Vulnerability",
    category: "Cyber Risk",
    description:
      "Security vulnerability found in a critical Node.js dependency requiring patch or mitigation.",
  },
  {
    heading: "High Booking Period",
    category: "Telemetry",
    description:
      "Increased user activity detected; high system load may elevate release risk.",
  },
  {
    heading: "Release of a Critical Application",
    category: "Internal Dependency",
    description:
      "Another high-priority application release scheduled simultaneously may cause environment contention.",
  },
  {
    heading: "Active Production Incident",
    category: "Operational Risk",
    description:
      "Ongoing production issue identified; new releases may complicate resolution or increase system instability.",
  },
  {
    heading: "Flight Disruption Due to Global Tension",
    category: "Environmental",
    description:
      "Worldwide travel disruptions affecting key operational teams and deployment readiness.",
  },
];

export default function ReleaseFeeds() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Risk Indicators</CardTitle>
        <CardDescription>
          Real-time monitoring of incidents and dependencies affecting release
          safety
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {feeds.map((feed, index) => (
          <div key={index} className="flex w-full flex-col gap-6">
            <Item variant="outline">
              <ItemMedia variant="icon">
                <ShieldAlertIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{feed.heading}</ItemTitle>
                <ItemDescription>{feed.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  {feed.category}
                </Button>
              </ItemActions>
            </Item>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
