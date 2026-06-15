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

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white px-5 py-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Tea<span className="text-blue-400">Learn</span>
        </h1>

        <p className="mt-1 text-sm text-slate-500">
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
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
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
          text-red-500 transition hover:bg-red-50
        "
      >
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  );
}