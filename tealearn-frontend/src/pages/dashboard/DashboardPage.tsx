import {
  BookOpen,
  Brain,
  TrendingUp,
  Sparkles,
  FileBarChart,
  FileText,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
  type DashboardResponse,
} from "@/services/modules/dashboard.service";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import {
  CreateMaterialModal,
} from "@/components/materials/CreateMaterialModal";

import {
  UploadPdfModal,
} from "@/components/materials/UploadPdfModal";

export function DashboardPage() {

const [dashboard, setDashboard] =
  useState<DashboardResponse | null>(
    null
  );

const navigate = useNavigate();

async function refreshDashboard() {
  setLoadingStats(true);

  try {
    const response = await getDashboardStats();
    setDashboard(response);
  } finally {
    setLoadingStats(false);
  }
}

  const [
    loadingStats,
    setLoadingStats,
  ] = useState(true);

  useEffect(() => {
    refreshDashboard();
}, []);

  const dashboardCards = [
    {
      title: "Materiais",
      value: loadingStats
        ? "..."
        : dashboard?.stats?.totalMaterials ?? "0",
      icon: BookOpen,
      color:
        "bg-sky-100 text-sky-600",
    },
    {
      title: "Adaptações",
      value: loadingStats
        ? "..."
        : dashboard?.stats?.totalAdaptations ?? "0",
      icon: Brain,
      color:
        "bg-violet-100 text-violet-600",
    },
    {
      title: "PDFs enviados",
      value: loadingStats
        ? "..."
        : dashboard?.stats?.pdfMaterials ?? "0",
      icon: FileText,
      color:
        "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Materiais adaptados",
      value: loadingStats
        ? "..."
        : dashboard?.stats?.adaptedMaterials ?? "0",
      icon: TrendingUp,
      color:
        "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen p-8">

      {/* Hero */}
      <div
        className="
          mb-8 overflow-hidden
          rounded-[32px]
          bg-gradient-to-r
          from-sky-100
          via-blue-50
          to-violet-100
          p-8
        "
      >
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-foreground">
            Bem-vindo, {dashboard?.user.name} 👋
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            Plataforma de
            aprendizagem adaptativa
            para estudantes com TEA.
          </p>

          <div className="mt-6 flex gap-4">
           <CreateMaterialModal
  onSuccess={refreshDashboard}
/>
<UploadPdfModal
  onSuccess={refreshDashboard}
/>

      <Button
variant="outline"
className="rounded-2xl"
onClick={() => navigate("/materials?generate=true")}
>
    <Sparkles className="mr-2 h-5 w-5"/>
    Gerar IA
</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map(
          (item) => {
            const Icon =
              item.icon;

            return (
             <Card key={item.title}
  className="
    rounded-[28px]
    p-6
    shadow-sm
    transition
    hover:-translate-y-1
    hover:shadow-md
  "
>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>

                  <h2 className="mt-2 text-3xl font-bold text-foreground">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className={`
                      rounded-3xl p-4
                      ${item.color}
                    `}
                  >
                    <Icon size={26} />
                  </div>
                </div>
              </Card>
            );
          }
        )}
      </div>

      {/* Bottom Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        {/* Recent Materials */}
        <Card className="rounded-[30px] p-6 shadow-sm lg:col-span-2">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Materiais recentes
              </h2>

              <p className="text-sm text-muted-foreground">
                Últimos conteúdos adicionados
              </p>
            </div>

           <Button
variant="outline"
className="rounded-2xl"
onClick={() => navigate("/materials")}
>
    Ver todos
</Button>
          </div>

          <div className="space-y-4">
            {dashboard?.recentMaterials?.map(
              (material) => (
                <div
key={material.id}
onClick={() =>
    navigate(`/materials/${material.id}`)
}
className="
group
cursor-pointer
flex
items-center
justify-between
rounded-3xl
border
border-border
bg-card
p-5
transition-all
duration-200
hover:-translate-y-0.5
hover:border-sky-300
hover:bg-sky-50/40
"
>
                  <div>
                   <p className="font-semibold text-foreground">
                      {material.title}
                    </p>

                    <span className="text-sm text-muted-foreground">
  {material.adapted
    ? "✓ Adaptado"
    : "Pendente de adaptação"}
</span>
                  </div>

                 <BookOpen
  className="
    text-slate-400
    transition-colors
    group-hover:text-sky-500
  "
/>
                </div>
              )
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-[30px] border-none p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-foreground">
              Ações rápidas
            </h2>

            <p className="text-sm text-muted-foreground">
              Acesse rapidamente
            </p>
          </div>

          <div className="flex flex-col gap-4">

           <UploadPdfModal
  onSuccess={refreshDashboard}
/>
           <Button
  variant="secondary"
  className="h-14 justify-start rounded-3xl"
  onClick={() => navigate("/materials")}
>
  <Sparkles className="mr-2 h-5 w-5" />
  Gerar Adaptação IA
</Button>

       <Button
  variant="outline"
  disabled
  className="h-14 justify-start rounded-3xl"
>
  <FileBarChart className="mr-2 h-5 w-5" />
  Relatórios
  <span className="ml-auto text-xs">
    Em breve
  </span>
</Button>

          </div>
        </Card>
      </div>
    </div>
  );
}