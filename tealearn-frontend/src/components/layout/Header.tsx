import { Bell } from "lucide-react";

import {
  ThemeToggle,
} from "@/components/theme/ThemeToggle";

export function Header() {
  return (
    <header
      className="
        flex h-20 items-center justify-between
        border-b border-slate-200
        bg-white
        px-8

        dark:border-slate-800
        dark:bg-slate-950

        transition-colors
      "
    >
      <div>
        <h2
          className="
            text-2xl font-semibold
            text-slate-800
            dark:text-slate-100
          "
        >
          Bem-vindo 👋
        </h2>

        <p
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Gerencie seus materiais adaptativos
        </p>
      </div>

      <div className="flex items-center gap-4">

        <ThemeToggle />

        <button
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full

            bg-slate-100
            text-slate-700

            transition

            hover:bg-slate-200

            dark:bg-slate-800
            dark:text-slate-200
            dark:hover:bg-slate-700
          "
        >
          <Bell size={20} />
        </button>

        <div
          className="
            flex items-center gap-3
            rounded-2xl

            bg-slate-100
            px-4 py-2

            dark:bg-slate-800
          "
        >
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full

              bg-blue-400
              font-semibold
              text-white
            "
          >
            P
          </div>

          <div>
            <p
              className="
                text-sm font-medium
                text-slate-800
                dark:text-slate-100
              "
            >
              Professor
            </p>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Educador
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}