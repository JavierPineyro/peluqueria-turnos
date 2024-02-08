"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updatePrice(id: string, formData: FormData) {
  const nameData = formData.get("name") as string;
  const priceData = Number(formData.get("price"));

  if (!nameData || !priceData) {
    throw new Error("Invalid inputs at updatePrice action");
  }

  const services = {
    id: id.toString(),
    name: nameData.toString(),
    price: priceData,
  };

  const supabase = createServerActionClient({ cookies });
  const res = await supabase.from("services").update(services).eq("id", id);

  if (res.status === 204) {
    revalidatePath("/dashboard/precios");
    redirect("/dashboard/precios");
  }
  throw new Error("Error updating service at updatePrice action, server error");
}
