import CABTimeReductions from "./cab-time-reductions";
import ChangeLeadTime from "./change-lead-time";
import FailurePrevention from "./failure-prevention-rate";
import RiskPredictionAccuracy from "./risk-prediction-accuracy";

export default function ChangeImpact() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <CABTimeReductions />
      <RiskPredictionAccuracy />
      <FailurePrevention />
      <ChangeLeadTime />
    </div>
  );
}
