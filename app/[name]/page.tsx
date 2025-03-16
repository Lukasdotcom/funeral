import { Heart, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCandle } from "@/app/actions";
import { Candle } from "@/components/candle";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> => {
  const { name } = await params;
  const person = await db
    .selectFrom("people")
    .selectAll()
    .where("url", "=", name)
    .executeTakeFirst();
  if (!person) {
    return {
      title: "Gedenkseite nicht gefunden",
      description: "Die Gedenkseite, die Sie suchen, wurde nicht gefunden.",
    };
  }
  return {
    title: `Liebevolle Erinnerung - ${person.name}`,
    description: person.description,
  };
};

export async function generateStaticParams() {
  const people = await db.selectFrom("people").selectAll().execute();
  return people.map((person) => ({ name: person.url }));
}

export default async function MemorialPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const person = await db
    .selectFrom("people")
    .selectAll()
    .where("url", "=", name)
    .executeTakeFirst();
  if (!person) {
    notFound();
  }
  return (
    <>
      <header className="flex flex-col items-center justify-center text-center mb-12">
        <div className="relative w-40 h-40 mb-6 overflow-hidden rounded-full border-4 border-neutral-700 dark:border-neutral-200 shadow-lg">
          <Image
            src={person.photo}
            alt="Memorial Photo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">In Liebevolle Erinnerung</h1>
        <h2 className="text-2xl mb-4">{person.name}</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
          {new Date(person.birth + " ").toDateString()} -{" "}
          {new Date(person.death + " ").toDateString()}
        </p>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          {person.description}
        </p>
      </header>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
          <Candle className="h-6 w-6" />
          <span>Eine Kerze Anzünden</span>
        </h3>

        <form
          action={createCandle}
          className="max-w-md mx-auto p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md"
        >
          <input type="hidden" name="url" value={name} />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Dein Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Geben Sie Ihren Namen ein"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Deine Nachricht</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Erzählen Sie eine Erinnerung oder eine Nachricht des Mitgefühls"
                className="min-h-[100px]"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Candle className="mr-2 h-4 w-4" />
              Zünde eine Kerze
            </Button>
          </div>
        </form>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
          <Heart className="h-6 w-6" />
          <span>Kerzen & Tributnachrichten</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Candles name={person.url} />
        </div>
      </section>
      {person.album && (
        <section className="mb-12 h-[100vh]">
          <h3 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
            <ImageIcon className="h-6 w-6" />
            <span>Bilder</span>
          </h3>

          <iframe src={person.album} className="w-full h-[100vh]"></iframe>
        </section>
      )}
    </>
  );
}

async function Candles({ name }: { name: string }) {
  const candles = await db
    .selectFrom("candles")
    .selectAll()
    .where("for_name", "=", name)
    .orderBy("id")
    .execute();
  return (
    <>
      {candles.map((candle) => (
        <Card key={candle.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-16 h-24">
                <Candle
                  className="w-16 h-24 text-amber-500 dark:text-amber-400"
                  pulse={true}
                />
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 text-center">
              {candle.message}
            </p>
            <p className="text-sm text-center text-neutral-600 dark:text-neutral-300">
              Mit liebe, {candle.name}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-2">
              {new Date(candle.date + " ").toDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
