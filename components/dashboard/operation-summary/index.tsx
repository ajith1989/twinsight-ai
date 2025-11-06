import ChangeSuccessRate from "./change-success-rate";
import IncidentResolutionRate from "./incident-resolution-rate";
import TotalChangeRequests from "./total-change-requests";
import TotalEngagedIncidents from "./total-engaged-incidents";

export default function OperationalSummary() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <TotalEngagedIncidents />
      <TotalChangeRequests />
      <IncidentResolutionRate />
      <ChangeSuccessRate />
    </div>
  );
}
