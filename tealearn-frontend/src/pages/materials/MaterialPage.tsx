import {
  BookOpen,
  FileText,
  Sparkles,
  Search,
  Loader2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

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
  DashboardResponse,
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

    const [openingMaterial,
setOpeningMaterial] =
useState<number | null>(
  null
);

  const [loading,
    setLoading] =
    useState(true);

const [dashboard, setDashboard] =
useState<DashboardResponse | null>(null);

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

    setDashboard(response);

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
    p-8
  "
>
{/* Header */}
<div className="mb-8 flex items-center justify-between">

  <div>
    <h1
      className="
        text-4xl font-bold
        text-foreground
      "
    >
      Materiais Didáticos
    </h1>

    <p
      className="
        mt-2 text-muted-foreground
      "
    >
      Gerencie conteúdos para adaptação TEA
    </p>
  </div>

  <div className="flex items-center gap-3">

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
    border p-5
    shadow-sm
    bg-card
border-border
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
          text-muted-foreground
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
  border border-border
  bg-card px-4
  text-sm font-medium
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
  border border-border
  bg-card px-4
  text-sm font-medium
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
  border border-border
  bg-card px-4
  text-sm font-medium
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

              <p className="text-sm text-muted-foreground">
                Total Materiais
              </p>

              <h2 className="mt-2 text-3xl font-bold text-foreground">
                {dashboard ? (
                  dashboard?.stats?.totalMaterials
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

              <p className="text-sm text-muted-foreground">
                PDFs enviados
              </p>

              <h2 className="mt-2 text-3xl font-bold text-foreground">
                {dashboard ? (
                  dashboard?.stats?.pdfMaterials
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

              <p className="text-sm text-muted-foreground">
                Materiais adaptados
              </p>

              <h2 className="mt-2 text-3xl font-bold text-foreground">
                {dashboard ? (
                  dashboard?.stats?.adaptedMaterials
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

              <p className="text-sm text-muted-foreground">
                Total adaptações
              </p>

              <h2 className="mt-2 text-3xl font-bold text-foreground">
                {dashboard ? (
                  dashboard?.stats?.totalAdaptations
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

          <h2 className="text-2xl font-semibold text-foreground">
            Materiais
          </h2>

          <p className="text-sm text-muted-foreground">
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
  border border-border
  bg-card
  p-5
"
              >
                <Skeleton className="mb-3 h-5 w-52 rounded-xl" />
                <Skeleton className="h-4 w-32 rounded-xl" />
              </div>
            ))

          ) : materials.length === 0 ? (

            <p className="text-muted-foreground">
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
  border border-border
  bg-card
  p-5
  transition
  hover:border-sky-200
  hover:bg-accent
"
                >

                  <div>

                    <h3 className="
  font-semibold
  text-foreground
">
                      {material.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
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
  disabled={
    openingMaterial === material.id
  }
  onClick={() => {

    setOpeningMaterial(
      material.id
    );

    navigate(
      `/materials/${material.id}`
    );
  }}
>
  {
    openingMaterial === material.id
      ? (
        <>
          <Loader2
            className="
              mr-2
              h-4
              w-4
              animate-spin
            "
          />
          Abrindo...
        </>
      )
      : "Ver detalhes"
  }
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