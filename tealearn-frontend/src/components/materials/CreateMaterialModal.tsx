import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createMaterial } from "@/services/modules/material.service";

import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

export function CreateMaterialModal({
  onSuccess,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {

    if (!title.trim()) {
      toast.error(
        "Digite um título"
      );
      return;
    }

    if (!text.trim()) {
      toast.error(
        "Digite o conteúdo"
      );
      return;
    }

    try {

      setLoading(true);

      await createMaterial({
        title,
        text,
      });

      setTitle("");
      setText("");

      setOpen(false);

      toast.success(
        "Material criado!"
      );

      onSuccess();

    } catch (error) {

      console.error(error);

      toast.error(
        "Erro ao criar material"
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

      <DialogTrigger asChild>

        <Button className="rounded-2xl">
          Novo Material
        </Button>

      </DialogTrigger>

      <DialogContent className="rounded-[32px]">

        <DialogHeader>

          <DialogTitle>
            Criar Material
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Título"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <Textarea
            placeholder="Digite o conteúdo do material..."
            rows={8}
            value={text}
            onChange={(e) =>
              setText(
                e.target.value
              )
            }
          />

          <Button
            className="w-full rounded-2xl"
            onClick={handleSubmit}
            disabled={loading}
          >
            {
              loading
                ? "Criando..."
                : "Criar material"
            }
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}