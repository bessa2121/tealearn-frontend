import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export function AdaptationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          IA Adaptativa
        </h1>

        <p className="text-slate-500">
          Gere materiais adaptados para
          alunos com TEA.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuração */}
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>
              Configurar adaptação
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Material */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Material
              </label>

              <Select>
                <SelectTrigger className="h-12 rounded-2xl">
                  <SelectValue placeholder="Selecione um material" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">
                    Matemática Básica.pdf
                  </SelectItem>

                  <SelectItem value="2">
                    História do Brasil.docx
                  </SelectItem>

                  <SelectItem value="3">
                    Ciências - Sistema Solar
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tipo de adaptação
              </label>

              <Select>
                <SelectTrigger className="h-12 rounded-2xl">
                  <SelectValue placeholder="Escolha uma adaptação" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="simple">
                    Simplificar linguagem
                  </SelectItem>

                  <SelectItem value="visual">
                    Mais suporte visual
                  </SelectItem>

                  <SelectItem value="structured">
                    Estruturar conteúdo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Observações pedagógicas
              </label>

              <Textarea
                placeholder="
Ex: aluno possui dificuldade
com excesso de informação
e responde melhor a textos
mais curtos e objetivos.
                "
                className="min-h-36 rounded-2xl"
              />
            </div>

            {/* Botão */}
            <Button className="h-12 w-full rounded-2xl">
              <BrainCircuit className="mr-2 h-5 w-5" />
              Gerar adaptação com IA
            </Button>
          </CardContent>
        </Card>

        {/* Resultado */}
        <Card className="rounded-3xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>
              Resultado da IA
            </CardTitle>
          </CardHeader>

          <CardContent className="flex h-full flex-col justify-center text-center">
            <div className="mx-auto rounded-full bg-blue-100 p-6 text-blue-600">
              <Sparkles size={42} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-800">
              Nenhuma adaptação gerada
            </h3>

            <p className="mt-2 text-slate-500">
              Configure os parâmetros
              e clique em gerar para
              visualizar o resultado.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}