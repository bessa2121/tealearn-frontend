import {
  BookOpen,
  Brain,
  TrendingUp,
  PlusCircle,
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
  type DashboardStats,
} from "@/services/modules/dashboard.service";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const recentMaterials = [
  {
    name: "Matemática Básica",
    type: "Exercícios adaptados",
  },
  {
    name: "Leitura Interativa",
    type: "Conteúdo visual",
  },
  {
    name: "Atividades Sensoriais",
    type: "Aprendizagem TEA",
  },
];

export function DashboardPage() {

  const [stats, setStats] =
    useState<DashboardStats | null>(
      null
    );

  const [
    loadingStats,
    setLoadingStats,
  ] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response =
          await getDashboardStats();

        setStats(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStats(false);
      }
    }

    loadStats();
  }, []);

  const dashboardCards = [
    {
      title: "Materiais",
      value: loadingStats
        ? "..."
        : stats?.totalMaterials ?? "0",
      icon: BookOpen,
      color:
        "bg-sky-100 text-sky-600",
    },
    {
      title: "Adaptações",
      value: loadingStats
        ? "..."
        : stats?.totalAdaptations ?? "0",
      icon: Brain,
      color:
        "bg-violet-100 text-violet-600",
    },
    {
      title: "PDFs enviados",
      value: loadingStats
        ? "..."
        : stats?.pdfMaterials ?? "0",
      icon: FileText,
      color:
        "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Materiais adaptados",
      value: loadingStats
        ? "..."
        : stats?.adaptedMaterials ?? "0",
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
            Bem-vindo ao
            TeaLearn 👋
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            Plataforma de
            aprendizagem adaptativa
            para estudantes com TEA.
          </p>

          <div className="mt-6 flex gap-4">
            <Button className="rounded-2xl">
              <PlusCircle className="mr-2 h-5 w-5" />
              Novo Material
            </Button>

           <Button
  variant="outline"
  className="rounded-2xl"
>
              <Sparkles className="mr-2 h-5 w-5" />
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
             <Card
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
            >
              Ver todos
            </Button>
          </div>

          <div className="space-y-4">
            {recentMaterials.map(
              (material) => (
                <div
                  key={material.name}
                className="
  flex items-center
  justify-between
  rounded-3xl
  border border-border
  bg-card
  p-5
  transition
  hover:bg-muted
"
                >
                  <div>
                   <p className="font-semibold text-foreground">
                      {material.name}
                    </p>

                    <span className="text-sm text-muted-foreground">
                      {material.type}
                    </span>
                  </div>

                  <BookOpen
                    className="text-slate-400"
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

            <Button className="h-14 justify-start rounded-3xl">
              <PlusCircle className="mr-2 h-5 w-5" />
              Novo Material
            </Button>

            <Button
              variant="secondary"
              className="h-14 justify-start rounded-3xl"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar Adaptação IA
            </Button>

            <Button
              variant="outline"
              className="h-14 justify-start rounded-3xl"
            >
              <FileBarChart className="mr-2 h-5 w-5" />
              Relatórios
            </Button>

          </div>
        </Card>
      </div>
    </div>
  );
}