"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import noAccents from "@/lib/normalize";

export async function login(prev: unknown, formData: FormData) {
  const secret = formData.get("password") as string;
  if (secret !== process.env.SECRET) {
    return {
      error: "Ungültiges Passwort",
    };
  }
  const cookieStore = await cookies();
  cookieStore.set("secret", process.env.SECRET);
  revalidatePath("/create-edit");
  return {
    error: "",
  };
}

export async function createMemorial(
  prev: unknown,
  formData: FormData,
): Promise<{ message?: string; error?: string }> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const birth = formData.get("birth") as string;
  const death = formData.get("death") as string;
  const photo = formData.get("photo") as string;
  const album = formData.get("album") as string | null;
  const cookieStore = await cookies();
  if (cookieStore.get("secret")?.value !== process.env.SECRET) {
    return {
      error: "Nicht angemeldet",
    };
  }
  const baseurl = noAccents(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  let url = baseurl;
  let num = 0;
  while (
    (await db
      .selectFrom("people")
      .where("url", "=", url)
      .select("url")
      .executeTakeFirst()) !== undefined
  ) {
    num++;
    url = `${baseurl}${num}`;
  }
  console.log(`Creating memorial for ${name} (${url})`);
  await db
    .insertInto("people")
    .values({
      url,
      name,
      birth,
      death,
      description,
      photo,
      album,
    })
    .execute();
  revalidatePath("/");
  revalidatePath(`/${url}`);
  revalidatePath("/create-edit");
  return {
    message: "Gedenkseite erstellt",
  };
}

export async function updateMemorial(
  prev: unknown,
  formData: FormData,
): Promise<{ message?: string; error?: string }> {
  const url = formData.get("url") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const birth = formData.get("birth") as string;
  const death = formData.get("death") as string;
  const photo = formData.get("photo") as string;
  const album = formData.get("album") as string | null;
  const cookieStore = await cookies();
  if (cookieStore.get("secret")?.value !== process.env.SECRET) {
    return {
      error: "Nicht angemeldet",
    };
  }
  if (
    (await db
      .selectFrom("people")
      .where("url", "=", url)
      .select("url")
      .executeTakeFirst()) === undefined
  ) {
    return {
      error: "Gedenkseite nicht gefunden",
    };
  }
  console.log(`Edited memorial for ${name} (${url})`);
  await db
    .updateTable("people")
    .set({
      name,
      birth,
      death,
      description,
      photo,
      album,
    })
    .where("url", "=", url)
    .execute();
  revalidatePath("/");
  revalidatePath(`/${url}`);
  revalidatePath("/create-edit");
  return {
    message: "Gedenkseite bearbeitet",
  };
}

export async function deleteMemorial(
  prev: unknown,
  formData: FormData,
): Promise<{ message?: string; error?: string }> {
  const url = formData.get("url") as string;
  const cookieStore = await cookies();
  if (cookieStore.get("secret")?.value !== process.env.SECRET) {
    return {
      error: "Nicht angemeldet",
    };
  }
  if (
    (await db
      .selectFrom("people")
      .where("url", "=", url)
      .select("url")
      .executeTakeFirst()) === undefined
  ) {
    return {
      error: "Gedenkseite nicht gefunden",
    };
  }
  console.log(`Deleted memorial at url: (${url})`);
  await db.deleteFrom("people").where("url", "=", url).execute();
  await db.deleteFrom("candles").where("for_name", "=", url).execute();
  revalidatePath("/");
  revalidatePath(`/${url}`);
  revalidatePath("/create-edit");
  return {
    message: "Gedenkseite gelöscht",
  };
}
