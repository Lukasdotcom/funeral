"use client";
import { createMemorial } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function Create() {
  const [state, formAction] = useActionState(createMemorial, {});
  return (
    <section className="mt-16 text-center">
      <form
        action={formAction}
        className="max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6">
          Erstelle ein Gedenkblatt
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Namen der Person</Label>
            <Input
              id="name"
              name="name"
              placeholder="Geben Sie den Namen der Person ein"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beschreibung der Person</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Schreiben Sie eine Beschreibung der Person"
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Foto</Label>
            <Input
              id="photo"
              name="photo"
              placeholder="Geben Sie einen Link für ein Foto ein"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="album">Album</Label>
            <Input
              id="album"
              name="album"
              placeholder="Geben Sie einen Link für ein Fotoalbum ein"
            />
          </div>
          <div className="sm:flex sm:items-center sm:gap-3">
            <div className="sm:w-1/2">
              <Label htmlFor="birth">Geburtsdatum</Label>
              <Input id="birth" name="birth" type="date" required />
            </div>
            <div className="sm:w-1/2">
              <Label htmlFor="death">Sterbedatum</Label>
              <Input id="death" name="death" type="date" required />
            </div>
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
          {state.message && <p className="text-green-500">{state.message}</p>}
          <Button type="submit" className="w-full">
            Eine Gedenkseite erstellen
          </Button>
        </div>
      </form>
    </section>
  );
}
