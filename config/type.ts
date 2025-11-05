export type Incident = {
  incidentNo: string,
  incidentTitle: string,
  incidentPriority: string,
  incidentStatus: string,
  incidentAssignee: string,
  incidentCreatedDate: string,
  ciName: string,
  ciDescription: string,
  incidentClosureNotes: string,
  incidentClosureDate: string,
  recommendationSummary: string,
  recommendationStatus: string,
  recommendationUpdatedDate: string,
  recommendationAccuracy: string,
  type: string,
  createdDate: string,
  updatedDate: string,
  id: string
};

export interface Recommendation {
  incidentNo: string;
  agentId: string;
  agentType: string;
  recommendation: string;
  status: string;
  type: string;
  createdDate: string;
  updatedDate: string;
  id: string;
}

export type BreadcrumbType = {
  title: string;
  href?: string;
};

