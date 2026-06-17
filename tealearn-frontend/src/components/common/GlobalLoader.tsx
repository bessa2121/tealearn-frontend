import {
  Loader2,
} from "lucide-react";

import {
  useLoading,
} from "@/contexts/LoadingContext";

export function GlobalLoader() {

  const {
    loading,
  } = useLoading();

  if (!loading)
    return null;

  return (
    <div
      className="
        fixed inset-0
        z-[9999]
        flex items-center
        justify-center

        bg-white/70
        backdrop-blur-sm

        dark:bg-slate-950/70
      "
    >
      <div
        className="
          flex flex-col
          items-center
          gap-4
        "
      >
        <Loader2
          className="
            h-14
            w-14
            animate-spin
            text-sky-600
          "
        />

        <span
          className="
            text-lg
            font-medium
          "
        >
          Carregando...
        </span>
      </div>
    </div>
  );
}