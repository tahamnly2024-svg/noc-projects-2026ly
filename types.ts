export interface Project {
  id: number;
  name: string;
  value: number | null;
  municipality: string;
  region: string;
  sector: string;
  beneficiary: string;
  notes: string;
}

export interface FilterState {
  region: string;
  sector: string;
  municipality: string;
  searchNotes: string;
  searchName: string;
  valueFilter: string;
}

export interface DashboardStats {
  totalValue: number;
  totalProjects: number;
  withValue: number;
  withoutValue: number;
  totalSectors: number;
}