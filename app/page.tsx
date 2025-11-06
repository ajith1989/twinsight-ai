import ChangeImpact from "@/components/dashboard/change-impact";
import IncidentImpact from "@/components/dashboard/incident-impact";
import OperationalSummary from "@/components/dashboard/operation-summary";
import PageHeader from "@/components/page-header";

export default async function OperationalResiliencePage() {
  return (
    <>
      <PageHeader breadcrumb={[{ title: "Dashboard" }]} />
      <div className="flex flex-col space-y-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-4 pl-4">
          Operational Summary
        </h4>
        <OperationalSummary />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-4 pl-4">
          Incident Impact
        </h4>
        <IncidentImpact />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-4 pl-4">
          Change Request Impact
        </h4>
        <ChangeImpact />
      </div>
    </>
  );
}
