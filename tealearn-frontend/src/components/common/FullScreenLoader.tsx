import { Loader2 } from "lucide-react";

export function FullScreenLoader() {
  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        gap-4
        bg-slate-50
        dark:bg-slate-900
      "
    >
      <div
        className="
          rounded-3xl
          bg-sky-100
          p-5
        "
      >
        <Loader2
          className="
            h-10
            w-10
            animate-spin
            text-sky-600
          "
        />
      </div>

      <h2
        className="
          text-xl
          font-semibold
          text-slate-800
          dark:text-slate-100
        "
      >
        TeaLearn
      </h2>

      <p
        className="
          text-slate-500
        "
      >
        Carregando...
      </p>
    </div>
  );
}