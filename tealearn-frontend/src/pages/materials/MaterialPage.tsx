import {
  BookOpen,
  FileText,
  Sparkles,
  Search,
} from "lucide-react";

import { useNavigate }
from "react-router-dom";

import { useEffect, useState } from "react";

import { CreateMaterialModal } from "@/components/materials/CreateMaterialModal";
import { UploadPdfModal } from "@/components/materials/UploadPdfModal";
import { getMaterials } from "@/services/modules/material.service";
import type { Material } from "@/types/material";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export function MaterialPage() {
 const [materials, setMaterials] =
  useState<Material[]>([]);

const [search, setSearch] =
  useState("");

const navigate =
  useNavigate();

const [loading, setLoading] =
  useState(true);
  async function loadMaterials() {
  try {
    setLoading(true);

    const response =
      await getMaterials();

    setMaterials(
      response.content
    );
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  loadMaterials();
}, []);

const filteredMaterials =
  materials.filter(
    (material) =>
      material.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
     {/* Header */}
<div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-4xl font-bold text-slate-800">
      Materiais Didáticos
    </h1>

    <p className="mt-2 text-slate-500">
      Gerencie conteúdos para adaptação TEA
    </p>
  </div>

  <div className="flex gap-3">
    <UploadPdfModal
      onSuccess={
        loadMaterials
      }
    />

    <CreateMaterialModal
      onSuccess={
        loadMaterials
      }
    />
  </div>
</div>

      {/* Stats */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        <Card className="rounded-[28px] border-none p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Materiais
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {materials.length}
              </h2>
            </div>

            <div className="rounded-3xl bg-sky-100 p-4 text-sky-600">
              <BookOpen size={26} />
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border-none p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                PDFs enviados
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                --
              </h2>
            </div>

            <div className="rounded-3xl bg-violet-100 p-4 text-violet-600">
              <FileText size={26} />
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border-none p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Adaptados por IA
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                --
              </h2>
            </div>

            <div className="rounded-3xl bg-emerald-100 p-4 text-emerald-600">
              <Sparkles size={26} />
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="rounded-[32px] border-none p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Materiais
            </h2>

            <p className="text-sm text-slate-500">
              Conteúdos enviados pelo professor
            </p>
          </div>

          <div className="relative w-80">
            <Search
              className="
                absolute left-3 top-1/2
                h-4 w-4 -translate-y-1/2
                text-slate-400
              "
            />

           <Input
  placeholder="Buscar material..."
  className="rounded-2xl pl-10"
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
/>
          </div>
        </div>

        <div className="space-y-4">
         {loading ? (
  <div className="space-y-4">
    {Array.from({
      length: 5,
    }).map((_, index) => (
      <div
        key={index}
        className="
          rounded-3xl
          border
          border-slate-200
          bg-slate-50
          p-5
        "
      >
        <Skeleton className="mb-3 h-5 w-52 rounded-xl" />

        <Skeleton className="h-4 w-32 rounded-xl" />
      </div>
    ))}
  </div>
) : filteredMaterials.length === 0 ? (
            <p className="text-slate-500">
              Nenhum material encontrado
            </p>
          ) : (
            filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="
                  flex items-center
                  justify-between
                  rounded-3xl
                  border border-slate-200
                  bg-slate-50
                  p-5 transition
                  hover:border-sky-200
                  hover:bg-sky-50
                "
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {material.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Criado em{" "}
                    {new Date(
                      material.createdAt
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>

              <Button
          variant="outline"
          className="rounded-2xl"
          onClick={() =>
            navigate(
              `/materials/${material.id}`
            )
          }
        >
          Ver detalhes
        </Button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}