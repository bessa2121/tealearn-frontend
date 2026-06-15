import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Mail,
  School,
  User,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export function ProfilePage() {
  const { logout } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Perfil
        </h1>

        <p className="text-slate-500">
          Informações do professor.
        </p>
      </div>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardHeader>
          <CardTitle>
            Informações pessoais
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Top */}
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-blue-100 text-xl font-bold text-blue-700">
                PR
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-semibold text-slate-800">
                Professor Responsável
              </h2>

              <div className="mt-2 flex gap-2">
                <Badge>
                  Professor
                </Badge>

                <Badge variant="secondary">
                  TeaLearn
                </Badge>
              </div>
            </div>
          </div>

          {/* Infos */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-2xl border-slate-200 shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <User className="text-blue-500" />

                <div>
                  <p className="text-sm text-slate-500">
                    Nome
                  </p>

                  <p className="font-medium">
                    Professor Responsável
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <Mail className="text-blue-500" />

                <div>
                  <p className="text-sm text-slate-500">
                    E-mail
                  </p>

                  <p className="font-medium">
                    professor@tealearn.com
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <School className="text-blue-500" />

                <div>
                  <p className="text-sm text-slate-500">
                    Instituição
                  </p>

                  <p className="font-medium">
                    Escola Parceira
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Logout */}
          <Button
            onClick={logout}
            variant="destructive"
            className="h-12 rounded-2xl"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair da conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}