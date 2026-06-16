import { api }
from "@/services/api/axios";

export interface DashboardStats {
  totalMaterials: number;
  pdfMaterials: number;
  totalAdaptations: number;
  adaptedMaterials: number;
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
    await api.get<DashboardStats>(
      "/dashboard/stats",
      {
        params: filters,
      }
    );

  return response.data;
}