import { ApplicationFilter } from "./application";
import { SeverityFilter } from "./severity";
import { DateRangeFilter } from "./date";
import { SourceFilter } from "./source";

export default function Filter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <ApplicationFilter />
      <SeverityFilter />
      <SourceFilter />
      <DateRangeFilter />
    </div>
  );
}
