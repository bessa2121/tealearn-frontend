import { api }
from "@/services/api/axios";

export interface DashboardUser {
  name: string;
}

export interface DashboardStats {
  totalMaterials: number;
  pdfMaterials: number;
  totalAdaptations: number;
  adaptedMaterials: number;
}

export interface RecentMaterial {
  id: number;
  title: string;
  adapted: boolean;
  createdAt: string;
}

export interface DashboardResponse {
  user: DashboardUser;
  stats: DashboardStats;
  recentMaterials: RecentMaterial[];
}

interface DashboardFilters {
  search?: string;
  type?: string;
  status?: string;
  date?: string;
}

export async function getDashboardStats(
  filters?: DashboardFilters
) {
  const response =
    await api.get<DashboardResponse>(
      "/dashboard/stats",
      {
        params: filters,
      }
    );

  return response.data;
}