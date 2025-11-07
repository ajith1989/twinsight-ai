import ChangeRiskFilter from "@/components/change-risk-filter";
import ChangeImpact from "@/components/dashboard/change-impact";
import IncidentImpact from "@/components/dashboard/incident-impact";
import OperationalSummary from "@/components/dashboard/operation-summary";
import PageHeader from "@/components/page-header";

export default async function OperationalResiliencePage() {
  return (
    <>
      <PageHeader breadcrumb={[{ title: "Dashboard" }]} />
      <ChangeRiskFilter />
      <div className="flex flex-col space-y-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pt-4 pl-4">
          Operational Health Overview
        </h4>
        <OperationalSummary />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pt-4 pl-4">
          Incident Efficiency & Recovery Impact
        </h4>
        <IncidentImpact />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pt-4 pl-4">
          Change Reliability & Risk Reduction
        </h4>
        <ChangeImpact />
      </div>
    </>
  );
}
