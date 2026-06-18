import { useState } from "react";

import {
  Upload,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  uploadMaterialPdf,
} from "@/services/modules/material.service";

import {
  toast,
} from "sonner";

interface Props {
  onSuccess: () => void;
}

export function UploadPdfModal({
  onSuccess,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [file, setFile] =
    useState<File | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  async function handleUpload() {

    if (!file) return;

    try {

      setLoading(true);

      await uploadMaterialPdf(
        file
      );

      setFile(null);

      setOpen(false);

      toast.success(
        "PDF enviado com sucesso!"
      );

      onSuccess();

    } catch (error) {

      console.error(error);

      toast.error(
        "Erro ao enviar PDF"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <Button
        variant="outline"
        className="rounded-2xl"
        onClick={() =>
          setOpen(true)
        }
      >
        <Upload
          className="
            mr-2
            h-4
            w-4
          "
        />
        Enviar PDF
      </Button>

      <DialogContent className="rounded-[32px]">

        <DialogHeader>

          <DialogTitle>
            Upload de PDF
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ??
                null
              )
            }
            className="
              block
              w-full
              text-sm
              text-muted-foreground
            "
          />

          {
            file && (
              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                {file.name}
              </p>
            )
          }

          <Button
            className="
              w-full
              rounded-2xl
            "
            disabled={
              loading ||
              !file
            }
            onClick={
              handleUpload
            }
          >
            {
              loading
                ? "Enviando PDF..."
                : "Enviar PDF"
            }
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}