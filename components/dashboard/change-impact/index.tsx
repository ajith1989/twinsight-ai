import CABTimeReductions from "./cab-time-reductions";
import ChangeLeadTime from "./change-lead-time";
import FailurePrevention from "./failure-prevention-rate";
import RiskPredictionAccuracy from "./risk-prediction-accuracy";

export default function ChangeImpact() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col space-y-4">
        <CABTimeReductions />
        <RiskPredictionAccuracy />
        <FailurePrevention />
      </div>
      <ChangeLeadTime />
    </div>
  );
}
