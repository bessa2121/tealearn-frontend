import { api } from "@/services/api/axios";

import type {
  MaterialDetails,
  MaterialsResponse,
} from "@/types/material";

interface CreateMaterialRequest {
  title: string;
  text: string;
}

interface GetMaterialsParams {
  page?: number;
  size?: number;
  search?: string;
  type?: string;
  status?: string;
  date?: string;
}

export async function getMaterials({
  page = 0,
  size = 10,
  search,
  type,
  status,
  date,
}: GetMaterialsParams) {

  const response =
    await api.get<MaterialsResponse>(
      "/materials",
      {
        params: {
          page,
          size,
          search,
          type,
          status,
          date,
        },
      }
    );

  return response.data;
}

export async function createMaterial(
  data: CreateMaterialRequest
) {

  const response =
    await api.post(
      "/materials/text",
      data
    );

  return response.data;
}

export async function uploadMaterialPdf(
  file: File
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await api.post(
      "/materials/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
}

export async function getMaterialById(
  materialId: number
) {

  const response =
    await api.get<MaterialDetails>(
      `/materials/${materialId}`
    );

  return response.data;
}

export async function adaptMaterial(
  materialId: number,
  supportLevel: number
) {

  const response =
    await api.post(
      `/materials/${materialId}/adapt`,
      null,
      {
        params: {
          supportLevel,
        },
      }
    );

  return response.data;
}

export async function generatePdf(
  materialId: number
) {

  const response =
    await api.post(
      `/materials/${materialId}/pdf`,
      null,
      {
        responseType: "blob",
      }
    );

  return response.data;
}

export async function getAdaptationHistory(
  materialId: number
) {

  const response =
    await api.get(
      `/materials/${materialId}/adaptations`
    );

  return response.data;
}

export async function getLatestAdaptation(
  materialId: number
) {

  const response =
    await api.get(
      `/materials/${materialId}/adaptation`
    );

  return response.data;
}