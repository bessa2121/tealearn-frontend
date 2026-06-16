import {
  BookOpen,
  FileText,
  Sparkles,
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ThemeToggle,
} from "@/components/theme/ThemeToggle";

import {
  useEffect,
  useState,
} from "react";

import {
  CreateMaterialModal,
} from "@/components/materials/CreateMaterialModal";

import {
  UploadPdfModal,
} from "@/components/materials/UploadPdfModal";

import {
  getMaterials,
} from "@/services/modules/material.service";

import {
  getDashboardStats,
} from "@/services/modules/dashboard.service";

import type {
  DashboardStats,
} from "@/services/modules/dashboard.service";

import type {
  Material,
} from "@/types/material";

import {
  Card,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Skeleton,
} from "@/components/ui/skeleton";

export function MaterialPage() {

  const navigate =
    useNavigate();

  const [materials,
    setMaterials] =
    useState<Material[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [stats,
    setStats] =
    useState<DashboardStats | null>(
      null
    );

  const [search,
    setSearch] =
    useState("");
  
    const [debouncedSearch,
  setDebouncedSearch] =
  useState("");

  const [typeFilter,
    setTypeFilter] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  const [dateFilter,
    setDateFilter] =
    useState("");

  async function loadMaterials() {

    try {

      setLoading(true);

      const response =
await getMaterials({
  search:
    debouncedSearch || undefined,

  type:
    typeFilter || undefined,

  status:
    statusFilter || undefined,

  date:
    dateFilter || undefined,
});

      setMaterials(
        response.content
      );

    } catch (error) {

      console.error(
        "Erro ao carregar materiais:",
        error
      );

    } finally {

      setLoading(false);
    }
  }

  async function loadStats() {

  try {

   const response =
await getDashboardStats({
  search:
    debouncedSearch || undefined,

  type:
    typeFilter || undefined,

  status:
    statusFilter || undefined,

  date:
    dateFilter || undefined,
});

    setStats(response);

  } catch (error) {

    console.error(error);
  }
}

  function refreshPageData() {
    loadMaterials();
    loadStats();
  }

  useEffect(() => {

  loadMaterials();
  loadStats();

}, [
  debouncedSearch,
  typeFilter,
  statusFilter,
  dateFilter
]);

useEffect(() => {

  const timeout =
    setTimeout(() => {

      setDebouncedSearch(
        search
      );

    }, 400);

  return () =>
    clearTimeout(timeout);

}, [search]);

  return (
  <div
  className="
    min-h-screen
    bg-slate-50
    dark:bg-slate-900
    p-8
    transition-colors
  "
>
{/* Header */}
<div className="mb-8 flex items-center justify-between">

  <div>
    <h1
      className="
        text-4xl font-bold
        text-slate-800
        dark:text-slate-100
      "
    >
      Materiais Didáticos
    </h1>

    <p
      className="
        mt-2 text-slate-500
        dark:text-slate-400
      "
    >
      Gerencie conteúdos para adaptação TEA
    </p>
  </div>

  <div className="flex items-center gap-3">

    <ThemeToggle />

    <UploadPdfModal
      onSuccess={refreshPageData}
    />

    <CreateMaterialModal
      onSuccess={refreshPageData}
    />

  </div>

</div>

   {/* Filtros */}
<div
  className="
    mb-8 rounded-[32px]
    border border-slate-200
    bg-white p-5
    shadow-sm
    dark:border-slate-800
    dark:bg-slate-900
  "
>

  <div
   className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-[1.5fr_auto_auto_auto_auto]
  gap-4
"
  >

    {/* Busca */}
    <div
      className="
        relative flex-1
      "
    >

      <Search
        className="
          absolute left-4 top-1/2
          h-4 w-4
          -translate-y-1/2
          text-slate-400
        "
      />

      <Input
        placeholder="Buscar material..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
    className="
  h-12
  rounded-2xl
  pl-11
"
      />
    </div>

   {/* Tipo */}
<select
  value={typeFilter}
  onChange={(e) =>
    setTypeFilter(
      e.target.value
    )
  }
  className="
    h-12 min-w-[170px]
    rounded-2xl
    border border-slate-200
    bg-white px-4
    text-sm font-medium
    dark:border-slate-700
    dark:bg-slate-950
  "
>
  <option value="">
    Todos tipos
  </option>

  <option value="pdf">
    PDF
  </option>

  <option value="text">
    Texto
  </option>
</select>

{/* Status */}
<select
  value={statusFilter}
  onChange={(e) =>
    setStatusFilter(
      e.target.value
    )
  }
  className="
    h-12 min-w-[170px]
    rounded-2xl
    border border-slate-200
    bg-white px-4
    text-sm font-medium
    dark:border-slate-700
    dark:bg-slate-950
  "
>
  <option value="">
    Todos status
  </option>

  <option value="adapted">
    Adaptados
  </option>

  <option value="notAdapted">
    Não adaptados
  </option>
</select>

{/* Data */}
<select
  value={dateFilter}
  onChange={(e) =>
    setDateFilter(
      e.target.value
    )
  }
  className="
    h-12 min-w-[170px]
    rounded-2xl
    border border-slate-200
    bg-white px-4
    text-sm font-medium
    dark:border-slate-700
    dark:bg-slate-950
  "
>
  <option value="">
    Qualquer data
  </option>

  <option value="today">
    Hoje
  </option>

  <option value="week">
    Última semana
  </option>

  <option value="month">
    Último mês
  </option>
</select>

<Button
  variant="outline"
  className="
    h-12 min-w-[120px]
    rounded-2xl
  "
  onClick={() => {

    setSearch("");
    setTypeFilter("");
    setStatusFilter("");
    setDateFilter("");

  }}
>
  Limpar
</Button>

</div>
   
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* Total Materiais */}
        <Card className="rounded-[28px] border-none p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Materiais
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {stats ? (
                  stats.totalMaterials
                ) : (
                  <Skeleton className="h-8 w-16 rounded-xl" />
                )}
              </h2>

            </div>

            <div className="rounded-3xl bg-sky-100 p-4 text-sky-600">
              <BookOpen size={26} />
            </div>

          </div>
        </Card>

        {/* PDFs */}
        <Card className="rounded-[28px] border-none p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                PDFs enviados
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {stats ? (
                  stats.pdfMaterials
                ) : (
                  <Skeleton className="h-8 w-16 rounded-xl" />
                )}
              </h2>

            </div>

            <div className="rounded-3xl bg-violet-100 p-4 text-violet-600">
              <FileText size={26} />
            </div>

          </div>
        </Card>

        {/* Adaptados */}
        <Card className="rounded-[28px] border-none p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Materiais adaptados
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {stats ? (
                  stats.adaptedMaterials
                ) : (
                  <Skeleton className="h-8 w-16 rounded-xl" />
                )}
              </h2>

            </div>

            <div className="rounded-3xl bg-emerald-100 p-4 text-emerald-600">
              <Sparkles size={26} />
            </div>

          </div>
        </Card>

        {/* Total adaptações */}
        <Card className="rounded-[28px] border-none p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total adaptações
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {stats ? (
                  stats.totalAdaptations
                ) : (
                  <Skeleton className="h-8 w-16 rounded-xl" />
                )}
              </h2>

            </div>

            <div className="rounded-3xl bg-amber-100 p-4 text-amber-600">
              <Sparkles size={26} />
            </div>

          </div>
        </Card>

      </div>

      {/* Lista */}
      <Card className="rounded-[32px] border-none p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-2xl font-semibold text-slate-800">
            Materiais
          </h2>

          <p className="text-sm text-slate-500">
            Conteúdos enviados pelo professor
          </p>

        </div>

        <div className="space-y-4">

          {loading ? (

            Array.from({
              length: 5,
            }).map((_, index) => (

              <div
                key={index}
                className="
  rounded-3xl
  border border-slate-200
  bg-slate-50
  dark:bg-slate-950
  p-5
"
              >
                <Skeleton className="mb-3 h-5 w-52 rounded-xl" />
                <Skeleton className="h-4 w-32 rounded-xl" />
              </div>
            ))

          ) : materials.length === 0 ? (

            <p className="text-slate-500">
              Nenhum material encontrado
            </p>

          ) : (

            materials.map(
              (material) => (

                <div
                  key={material.id}
                  className="
                    flex items-center
                    justify-between
                    rounded-3xl
                    border border-slate-200
                    bg-slate-50 p-5
                    transition
                    hover:border-sky-200
                    hover:bg-sky-50
                  "
                >

                  <div>

                    <h3 className="
  font-semibold
  text-slate-800
  dark:text-slate-100
">
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
              )
            )
          )}

        </div>
      </Card>
    </div>
  );
}