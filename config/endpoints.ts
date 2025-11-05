const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const FETCH_ALL_INCIDENTS = `${baseUrl}/api/v1/twinsightai/incidents`;
export const FETCH_INCIDENT_BY_ID = (incidentNo: string) =>
  `${baseUrl}/api/v1/twinsightai/incidents?incidentNo=${incidentNo}`;
export const FETCH_INCIDENT_RECOMMENDATIONS = (incidentNo: string) =>
  `${baseUrl}/api/v1/twinsightai/incidents/recommendations?incidentNo=${incidentNo}`;
