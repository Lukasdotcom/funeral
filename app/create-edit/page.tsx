import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Login from "@/app/create-edit/login";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import Create from "./create";
import EditDelete from "./EditDelete";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Erstellen und Bearbeiten",
  description: "Erstelle oder Bearbeiten Sie eine Gedenkseite.",
};

export default async function CreateEdit() {
  const cookieStore = await cookies();
  const loggedIn = cookieStore.get("secret")?.value === process.env.SECRET;
  const people = await db.selectFrom("people").selectAll().execute();
  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Erstellen und Bearbeiten</h1>
      </header>
      {loggedIn ? (
        <>
          <Logout />
          <Create />
          <EditDelete people={people} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        const cookieStore = await cookies();
        cookieStore.delete("secret");
        revalidatePath("/create-edit");
      }}
    >
      <div className="flex items-center justify-center">
        <Button type="submit">Logout</Button>
      </div>
    </form>
  );
}
