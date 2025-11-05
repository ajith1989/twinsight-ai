import { ApplicationFilter } from "./application";
import { SeverityFilter } from "./severity";
import { DateRangeFilter } from "./date";

export default function DashboardFilter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <ApplicationFilter />
      <SeverityFilter />
      <DateRangeFilter />
    </div>
  );
}
