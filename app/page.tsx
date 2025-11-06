import IncidentStats from "@/components/incident-stats";
import PageHeader from "@/components/page-header";

export default async function OperationalResiliencePage() {
  return (
    <>
      <PageHeader breadcrumb={[{ title: "Dashboard" }]} />
      <div className="flex flex-col space-y-4">
        <IncidentStats />
      </div>
    </>
  );
}
