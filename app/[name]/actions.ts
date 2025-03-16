"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function createCandle(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  const url = formData.get("url") as string;
  const color = formData.get("color") as string;
  const cookieStore = await cookies();
  let userid = cookieStore.get("userid")?.value;
  if (!userid) {
    userid = crypto.randomUUID();
    cookieStore.set("userid", userid);
  }
  await db
    .insertInto("candles")
    .values({ name, message, for_url: url, owner: userid, color })
    .onConflict((oc) => oc.doUpdateSet({ name, message, color }))
    .execute();
  console.log("Candle:", { name, message, url, userid, color });
  revalidatePath(`/${url}`);
}
