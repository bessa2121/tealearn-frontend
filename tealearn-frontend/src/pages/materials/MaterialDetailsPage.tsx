import {
  ArrowLeft,
  FileText,
  Sparkles,
  Wand2,
  File,
  Loader2
} from "lucide-react";

import {
  useLoading,
} from "@/contexts/LoadingContext";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getMaterialById,
  adaptMaterial,
  generatePdf,
  getAdaptationHistory,
  getLatestAdaptation,
} from "@/services/modules/material.service";

import type {
  MaterialDetails,
  AdaptationHistory,
} from "@/types/material";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export function MaterialDetailsPage() {
  const { id } = useParams();

const [generatingPdf,
  setGeneratingPdf] =
  useState(false);
  
  const [previewingPdf,
  setPreviewingPdf] =
  useState(false);

  const {
  hideLoader,
} = useLoading();

  const navigate =
    useNavigate();

  const [material, setMaterial] =
    useState<MaterialDetails | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [supportLevel,
    setSupportLevel] =
    useState(1);

  const [adapting,
    setAdapting] =
    useState(false);

  const [adaptedText,
    setAdaptedText] =
    useState("");

    const [selectedAdaptationId,
  setSelectedAdaptationId] =
  useState<number | null>(
    null
  );

  const [history,
    setHistory] =
    useState<
      AdaptationHistory[]
    >([]);

  useEffect(() => {
    async function loadMaterial() {
  try {
    if (!id) return;

    const materialResponse =
      await getMaterialById(
        Number(id)
      );

    setMaterial(
      materialResponse
    );

    const historyResponse =
      await getAdaptationHistory(
        Number(id)
      );

    setHistory(
      historyResponse
    );

    // carregar última adaptação
    try {
      const adaptation =
        await getLatestAdaptation(
          Number(id)
        );

      setAdaptedText(
        adaptation.adaptedText
      );
    } catch {
      // sem adaptação ainda
      setAdaptedText("");
    }

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
      hideLoader();
  }
}

    loadMaterial();
  }, [id]);

  async function handleAdapt() {
    try {
      if (!id) return;

      setAdapting(true);

      const response =
        await adaptMaterial(
          Number(id),
          supportLevel
        );

      setAdaptedText(
  response.adaptedText
);

const historyResponse =
  await getAdaptationHistory(
    Number(id)
  );

setHistory(
  historyResponse
);

const latest =
  historyResponse[0];

if (latest) {
  setSelectedAdaptationId(
    latest.id
  );
}

toast.success(
  "Material adaptado com sucesso!"
);
    } catch (error) {
      console.error(error);

    toast.error(
  "Erro ao adaptar material"
);
    } finally {
      setAdapting(false);
    }
  }

  async function handleGeneratePdf() {
  try {
    if (!id) return;

    setGeneratingPdf(true);

    const blob =
      await generatePdf(
        Number(id)
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `${material?.title}.pdf`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    toast.success(
      "PDF gerado com sucesso!"
    );
  } catch (error) {
    console.error(error);

    toast.error(
      "Erro ao gerar PDF"
    );
  } finally {
    setGeneratingPdf(false);
  }
}

async function handlePreviewPdf() {
  try {
    if (!id) return;

    setPreviewingPdf(
      true
    );

    const blob =
      await generatePdf(
        Number(id)
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const newWindow =
window.open();

if (newWindow) {
    newWindow.location.href = url;
} else {
    toast.error(
        "O navegador bloqueou a abertura do PDF."
    );
}

    toast.success(
      "PDF aberto!"
    );

    setTimeout(() => {
      window.URL.revokeObjectURL(
        url
      );
    }, 5000);

  } catch (error) {
    console.error(error);

    toast.error(
      "Erro ao abrir PDF"
    );
  } finally {
    setPreviewingPdf(
      false
    );
  }
}

if (loading) {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Skeleton className="mb-6 h-10 w-40 rounded-2xl" />

      <Skeleton className="mb-3 h-12 w-96 rounded-2xl" />

      <Skeleton className="mb-8 h-5 w-52 rounded-2xl" />

      <div className="mb-8 grid gap-5 md:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-40 rounded-[28px]"
          />
        ))}
      </div>

      <Skeleton className="h-[500px] rounded-[32px]" />
    </div>
  );
}
  if (!material) {
    return (
      <div className="p-8">
        Material não encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Button
            variant="outline"
            className="mb-5 rounded-2xl"
            onClick={() =>
              navigate("/materials")
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <h1 className="text-4xl font-bold text-slate-800">
            {material.title}
          </h1>

          <p className="mt-2 text-slate-500">
            Criado em{" "}
            {new Date(
              material.createdAt
            ).toLocaleDateString(
              "pt-BR"
            )}
          </p>

          {material.fileName && (
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <File className="h-4 w-4" />
              {material.fileName}
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-3">

          <select
            value={supportLevel}
            onChange={(e) =>
              setSupportLevel(
                Number(
                  e.target.value
                )
              )
            }
            className="
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-4 py-2
              text-slate-700
            "
          >
            <option value={1}>
              TEA Nível 1
            </option>

            <option value={2}>
              TEA Nível 2
            </option>

            <option value={3}>
              TEA Nível 3
            </option>
          </select>

          <Button
  className="rounded-2xl px-6 py-6"
  onClick={handleAdapt}
  disabled={adapting}
>
  {adapting ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Adaptando...
    </>
  ) : (
    <>
      <Wand2 className="mr-2 h-5 w-5" />
      Adaptar Material
    </>
  )}
</Button>

<Button
  variant="secondary"
  className="rounded-2xl px-6 py-6"
  onClick={
    handlePreviewPdf
  }
  disabled={
    previewingPdf
  }
>
  {previewingPdf ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Abrindo...
    </>
  ) : (
    <>
      Visualizar PDF
    </>
  )}
</Button>
          <Button
  variant="outline"
  className="rounded-2xl px-6 py-6"
  onClick={
    handleGeneratePdf
  }
  disabled={
    generatingPdf
  }
>
  {generatingPdf ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Gerando...
    </>
  ) : (
    <>PDF</>
  )}
</Button>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-8 grid gap-5 md:grid-cols-4">

        <Card className="rounded-[28px] border-none p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Texto
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {material.textLength}
              </h2>
            </div>

            <div className="rounded-3xl bg-sky-100 p-4 text-sky-600">
              <FileText />
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border-none p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Adaptações
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {
                  material.adaptationsCount
                }
              </h2>
            </div>

            <div className="rounded-3xl bg-violet-100 p-4 text-violet-600">
              <Sparkles />
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border-none p-6 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-800">
              {material.hasAdaptation
                ? "Adaptado"
                : "Sem adaptação"}
            </h2>
          </div>
        </Card>

        <Card className="rounded-[28px] border-none p-6 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">
              Última adaptação
            </p>

            <p className="mt-2 line-clamp-3 text-sm text-slate-700">
              {material
                .latestAdaptationPreview ??
                "Nenhuma adaptação ainda"}
            </p>
          </div>
        </Card>
      </div>

      {/* Conteúdo Original */}
      <Card className="rounded-[32px] border-none p-8 shadow-sm">
        <h2 className="mb-5 text-2xl font-semibold text-slate-800">
          Conteúdo Original
        </h2>

        <div
          className="
            max-h-[600px]
            overflow-y-auto
            whitespace-pre-wrap
            rounded-[28px]
            bg-slate-100
            p-6
            text-slate-700
          "
        >
          {material.originalText}
        </div>
      </Card>

      {/* Histórico */}
      <Card className="mt-8 rounded-[32px] border-none p-8 shadow-sm">
        <h2 className="mb-5 text-2xl font-semibold text-slate-800">
          Histórico de Adaptações
        </h2>

        {history.length === 0 ? (
          <p className="text-slate-500">
            Nenhuma adaptação ainda
          </p>
        ) : (
          <div className="space-y-4">
            {history.map(
              (item) => (
                <div
                  key={item.id}
             onClick={() => {
  setAdaptedText(
    item.adaptedText
  );

  setSelectedAdaptationId(
    item.id
  );
}}
                 className={`
  cursor-pointer
  rounded-3xl
  border
  p-5
  transition
  ${
    selectedAdaptationId ===
    item.id
      ? `
        border-sky-400
        bg-sky-50
        ring-2
        ring-sky-200
      `
      : `
        border-slate-200
        bg-slate-50
        hover:border-sky-200
        hover:bg-sky-50
      `
  }
`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {
                          item.promptVersion
                        }
                      </h3>

                      <p className="text-sm text-slate-500">
                        {new Date(
                          item.createdAt
                        ).toLocaleString(
                          "pt-BR"
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm text-slate-700">
                    {
                      item.preview
                    }
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </Card>

      {/* Conteúdo Adaptado */}
      {adaptedText && (
        <Card className="mt-8 rounded-[32px] border-none p-8 shadow-sm">
          <h2 className="mb-5 text-2xl font-semibold text-slate-800">
            Conteúdo Adaptado
          </h2>

          <div
            className="
              whitespace-pre-wrap
              rounded-[28px]
              bg-emerald-50
              p-6
              text-slate-700
            "
          >
            {adaptedText}
          </div>
        </Card>
      )}
    </div>
  );
}