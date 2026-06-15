import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginService } from "@/services/modules/auth.service";
import { useAuth } from "@/hooks/useAuth";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z
    .string()
    .email("Digite um e-mail válido"),

  password: z
    .string()
    .min(6, "Senha inválida"),
});

type LoginFormData =
  z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData
  ) {
    try {
      setLoading(true);

      const response =
        await loginService(data);

      login(response.token);

      toast.success(
        "Login realizado com sucesso!"
      );

      navigate("/");

    } catch {
      toast.error(
        "E-mail ou senha inválidos"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        bg-slate-50 px-4
      "
    >
      <Card className="w-full max-w-md rounded-3xl shadow-sm">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-800">
              Tea
              <span className="text-blue-400">
                Learn
              </span>
            </h1>

            <p className="mt-2 text-slate-500">
              Plataforma Adaptativa
            </p>
          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label>E-mail</Label>

              <Input
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />

              {errors.email && (
                <span className="text-sm text-red-500">
                  {
                    errors.email
                      .message
                  }
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Senha</Label>

              <Input
                type="password"
                placeholder="Digite sua senha"
                {...register(
                  "password"
                )}
              />

              {errors.password && (
                <span className="text-sm text-red-500">
                  {
                    errors.password
                      .message
                  }
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-2xl"
              disabled={loading}
            >
              {loading
                ? "Entrando..."
                : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}