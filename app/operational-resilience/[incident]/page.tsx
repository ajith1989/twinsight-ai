import { IncidentHeader } from "./header";
import AgentFeedbackList from "./agent-feedback-list";
import {
  FETCH_INCIDENT_BY_ID,
  FETCH_INCIDENT_RECOMMENDATIONS,
} from "@/config/endpoints";
import { Recommendation } from "@/config/type";
import PageHeader from "@/components/page-header";

export default async function IncidentDetailsPage({
  params,
}: {
  params: Promise<{ incident: string }>;
}) {
  const { incident } = await params;

  const [incidentRecommendationResponse, incidentDetailsResponse] =
    await Promise.all([
      fetch(FETCH_INCIDENT_RECOMMENDATIONS(incident), { cache: "no-store" }),
      fetch(FETCH_INCIDENT_BY_ID(incident), { cache: "no-store" }),
    ]);

  if (!incidentRecommendationResponse.ok || !incidentDetailsResponse.ok) {
    throw new Error("Failed to fetch incidents data");
  }

  const incidentRecommendationData: { recommendations: Recommendation[] } =
    await incidentRecommendationResponse.json();
  const incidentDetailsData = await incidentDetailsResponse.json();

  return (
    <>
      <PageHeader
        breadcrumb={[
          { title: "Operational Resilience", href: "/operational-resilience" },
          { title: incidentDetailsData?.incidentNo },
        ]}
      />
      <div className="flex flex-col space-y-2 w-full max-w-2xl mx-auto">
        <IncidentHeader incident={incidentDetailsData} />
        <AgentFeedbackList
          recommendations={incidentRecommendationData?.recommendations || []}
          suggestion={incidentDetailsData?.recommendationSummary}
        />
      </div>
    </>
  );
}
