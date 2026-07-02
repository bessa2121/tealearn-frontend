import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: BookOpen,
    label: "Materiais",
    path: "/materials",
  },
  {
    icon: Sparkles,
    label: "IA Adaptativa",
    path: "/adaptations",
  },
  {
    icon: User,
    label: "Perfil",
    path: "/profile",
  },
];

// Cores inspiradas no espectro autista (as mesmas do "Learn" original)
const puzzleLetters = [
  { char: "L", color: "#3B82F6" },
  { char: "e", color: "#EF4444" },
  { char: "a", color: "#EAB308" },
  { char: "r", color: "#22C55E" },
  { char: "n", color: "#8B5CF6" },
];

// Silhueta de peça de quebra-cabeça (4 encaixes arredondados)
const PUZZLE_PATH =
  "M20,20 L40,20 C40,10 45,5 50,5 C55,5 60,10 60,20 L80,20 L80,40 C90,40 95,45 95,50 C95,55 90,60 80,60 L80,80 L60,80 C60,90 55,95 50,95 C45,95 40,90 40,80 L20,80 L20,60 C10,60 5,55 5,50 C5,45 10,40 20,40 Z";

function PuzzleLetter({ char, color }: { char: string; color: string }) {
  return (
    <span
      className="
        relative -ml-1.5 first:ml-0
        inline-flex h-8 w-8
        items-center justify-center
      "
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-sm"
        aria-hidden="true"
      >
        <path d={PUZZLE_PATH} fill={color} />
      </svg>
      <span className="relative z-10 text-base font-extrabold text-white">
        {char}
      </span>
    </span>
  );
}

export function Sidebar() {
  const { logout } = useAuth();

  return (
   <aside
  className="
    flex h-screen w-72 flex-col
    border-r border-slate-200
    bg-white
    px-5 py-6

    dark:border-slate-800
    dark:bg-slate-950
  "
>
      {/* Logo */}
      <div className="mb-10">
        <h1
  className="
    flex items-center
    text-3xl font-bold tracking-tight
    text-slate-800
    dark:text-slate-100
  "
>

          TEA
          <span className="ml-1 flex items-center">
            {puzzleLetters.map((l) => (
              <PuzzleLetter key={l.char} char={l.char} color={l.color} />
            ))}
          </span>
        </h1>

      <p
  className="
    mt-1 text-sm
    text-slate-500
    dark:text-slate-400
  "
>
          Plataforma Adaptativa
        </p>
      </div>

      {/* Menu */}
      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
             className={({ isActive }) =>
  `
  flex items-center gap-3 rounded-2xl px-4 py-3
  text-sm font-medium transition-all

  ${
    isActive
      ? `
        bg-blue-100
        text-blue-700

        dark:bg-blue-900/30
        dark:text-blue-300
      `
      : `
        text-slate-600
        hover:bg-slate-100

        dark:text-slate-300
        dark:hover:bg-slate-800
      `
  }
`
}
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="
  flex items-center gap-3 rounded-2xl
  px-4 py-3 text-sm font-medium

  text-red-500
  transition

  hover:bg-red-50

  dark:hover:bg-red-900/20
"
      >
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  );
}