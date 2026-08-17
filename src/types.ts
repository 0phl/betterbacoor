export type ResourceCategory =
  'service' | 'directory' | 'transparency' | 'official-system';

export type RiskLevel = 'ordinary' | 'high';

export interface CivicResource {
  id: string;
  title: string;
  summary: string;
  category: ResourceCategory;
  tags: string[];
  official_url: string;
  source_title: string;
  source_url: string;
  source_page: string;
  last_verified: string;
  reviewer: string;
  risk_level: RiskLevel;
  review_interval_days: number;
  correction_url: string;
}
