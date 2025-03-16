"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Selectable } from "kysely";
import { People } from "@/lib/types";
import { TrashIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { updateMemorial, deleteMemorial } from "@/app/create-edit/actions";

export default function EditDelete({
  people,
}: {
  people: Selectable<People>[];
}) {
  const [updateState, update] = useActionState(updateMemorial, {});
  const [deleteState, deleteAction] = useActionState(deleteMemorial, {});
  const [data, setData] = useState({
    url: "",
    name: "",
    birth: "",
    death: "",
    description: "",
    photo: "",
    album: "",
  });
  const changePerson = (url: string) => {
    const person = people.find((p) => p.url === url);
    if (person) {
      setData({
        url: person.url,
        name: person.name,
        birth: person.birth,
        death: person.death,
        description: person.description,
        photo: person.photo,
        album: person.album || "",
      });
    }
  };
  return (
    <section className="mt-16 text-center">
      <form className="max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">
          Eine Gedenkseite bearbeiten
        </h2>
        <div className="space-y-2">
          <Label htmlFor="url">Gedenkseite</Label>
          <select
            id="url"
            name="url"
            className="block w-full px-3 py-2 border border-input"
            value={data.url}
            onChange={(e) => changePerson(e.target.value)}
          >
            <option value="">Wähle eine Gedenkseite</option>
            {people.map(({ url }) => (
              <option key={url} value={url}>
                {url}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Namen der Person</Label>
            <Input
              value={data.name}
              id="name"
              name="name"
              placeholder="Geben Sie den Namen der Person ein"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beschreibung der Person</Label>
            <Textarea
              value={data.description}
              id="description"
              name="description"
              placeholder="Schreiben Sie eine Beschreibung der Person"
              className="min-h-[100px]"
              onChange={(e) =>
                setData({
                  ...data,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Foto</Label>
            <Input
              value={data.photo}
              id="photo"
              name="photo"
              placeholder="Geben Sie einen Link für ein Foto ein"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  photo: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="album">Album</Label>
            <Input
              value={data.album}
              id="album"
              name="album"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  album: e.target.value,
                })
              }
              placeholder="Geben Sie einen Link für ein Fotoalbum ein"
            />
          </div>
          <div className="sm:flex sm:items-center sm:gap-3">
            <div className="sm:w-1/2">
              <Label htmlFor="birth">Geburtsdatum</Label>
              <Input
                id="birth"
                name="birth"
                type="date"
                value={data.birth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    birth: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="sm:w-1/2">
              <Label htmlFor="death">Sterbedatum</Label>
              <Input
                id="death"
                name="death"
                type="date"
                value={data.death}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    death: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          {updateState.error && (
            <p className="text-red-500">{updateState.error}</p>
          )}
          {updateState.message && (
            <p className="text-green-500">{updateState.message}</p>
          )}
          <Button type="submit" className="w-full" formAction={update}>
            Save Changes
          </Button>
          {deleteState.error && (
            <p className="text-red-500">{deleteState.error}</p>
          )}
          {deleteState.message && (
            <p className="text-green-500">{deleteState.message}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600"
            formAction={deleteAction}
          >
            Löschen <TrashIcon />
          </Button>
        </div>
      </form>
    </section>
  );
}
