import { ApplicationFilter } from "./application";
import { DateRangeFilter } from "./date";

export default function ChangeRiskFilter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <ApplicationFilter />
      <DateRangeFilter />
    </div>
  );
}
