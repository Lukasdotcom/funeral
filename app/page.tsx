import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Candle } from "@/components/candle";
import { db } from "@/lib/db";
import Link from "next/link";
import { createMemorial } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gedenkseite",
  description:
    "Ein Gedenkseite, um diejenigen zu ehren und zu erinnern, die unser Leben berührt haben",
};

export default function MemorialPage() {
  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Gedenkseiten
          <Candle className="h-10 w-10 " />
        </h1>
        <div className="flex justify-center mb-6"></div>
        <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400">
          Ein Ort, um diejenigen zu ehren und zu erinnern, die unser Leben
          berührt haben. Jede Gedenkseite bietet Raum für das Teilen von
          Erinnerungen, das Anzünden von Kerzen und das Feiern des Lebens
          unserer Lieben.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-center mb-8">
          In Liebevolle Erinnerung
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <People />
        </div>
      </section>

      <section className="mt-16 text-center">
        <form
          action={createMemorial}
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
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Sicherheits Passwort eingeben"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Eine Gedenkseite erstellen
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

async function People() {
  const people = await db.selectFrom("people").selectAll().execute();
  return (
    <>
      {people.map((person) => (
        <Link
          key={person.url}
          href={`/${person.url}`}
          className="transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
        >
          <Card className="h-full overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-neutral-200">
                  <Image
                    src={person.photo}
                    alt={`Foto von ${person.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{person.name}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  {new Date(person.birth).toLocaleDateString()} -{" "}
                  {new Date(person.death).toLocaleDateString()}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {person.description}
                </p>
                <div className="mt-3 flex items-center justify-center">
                  <Candle className="h-4 w-4 text-amber-500 dark:text-amber-400 mr-1" />
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Gedenkseite besuchen
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
