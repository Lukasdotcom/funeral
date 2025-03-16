"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

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
