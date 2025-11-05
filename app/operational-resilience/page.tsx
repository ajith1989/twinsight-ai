import Filter from "@/components/filter";
import { IncidentsTable } from "@/components/incidents-table";
import { incidentsColumns } from "@/components/incidents-table/column";
import PageHeader from "@/components/page-header";
import { FETCH_ALL_INCIDENTS } from "@/config/endpoints";

export default async function HomePage() {
  const incidentsResponse = await fetch(FETCH_ALL_INCIDENTS, {
    cache: "no-store",
  });

  if (!incidentsResponse.ok) {
    throw new Error("Failed to fetch incidents data");
  }

  const incidentsData = await incidentsResponse.json();

  return (
    <>
      <PageHeader breadcrumb={[{ title: "Operational Resilience" }]} />
      <div className="flex flex-col space-y-4">
        <Filter />
        <IncidentsTable
          data={incidentsData?.incidents}
          columns={incidentsColumns}
        />
      </div>
    </>
  );
}
