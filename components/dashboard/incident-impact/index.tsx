import CostSaved from "./cost-saved";
import MTTR from "./mttr";
import NoiseReduced from "./noise-reduced";
import TimeSaved from "./time-saved";

export default function IncidentImpact() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MTTR />
      <div className="flex flex-col space-y-4">
        <CostSaved />
        <TimeSaved />
        <NoiseReduced />
      </div>
    </div>
  );
}
