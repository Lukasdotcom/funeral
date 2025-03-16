"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import noAccents from "@/lib/normalize";

export async function createCandle(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  const url = formData.get("url") as string;
  await db
    .insertInto("candles")
    .values({ name, message, for_name: url })
    .execute();
  console.log("New candle:", { name, message, url });
  revalidatePath(`/${url}`);
}

export async function createMemorial(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const birth = formData.get("birth") as string;
  const death = formData.get("death") as string;
  const photo = formData.get("photo") as string;
  const album = formData.get("album") as string | null;
  const password = formData.get("password") as string;
  if (process.env.SECRET !== undefined && password !== process.env.SECRET) {
    return;
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
}
