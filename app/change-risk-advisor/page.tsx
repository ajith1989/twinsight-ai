import { ChangeCalendar } from "@/components/change-calander";
import { ReleaseFactors } from "@/components/charts/release-factors";
import { RiskScore } from "@/components/charts/risk-score";
import Filter from "@/components/filter";
import PageHeader from "@/components/page-header";
import { PendingRFC } from "@/components/pending-rfc";
import ReleaseFeeds from "@/components/release-feeds";

export default function ChangePage() {
  return (
    <div className="flex flex-col space-y-4">
      <PageHeader breadcrumb={[{ title: "Change Risk Advisor" }]} />
      <Filter />
      <PendingRFC />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RiskScore />
        <ChangeCalendar />
      </div>
      <ReleaseFactors />
      <ReleaseFeeds />
    </div>
  );
}
