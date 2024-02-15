"use server";

import { getErrorMessage } from "@/lib/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updatePrice(id: string, formData: FormData) {
  try {
    const nameData = formData.get("name") as string;
    const priceData = Number(formData.get("price"));

    if (!nameData || !priceData) {
      throw new Error("Datos inválidos para actualizar");
    }

    const services = {
      id: id.toString(),
      name: nameData.toString(),
      price: priceData,
    };

    const supabase = createServerActionClient({ cookies });
    const res = await supabase.from("services").update(services).eq("id", id);

    if (res.status !== 204) {
      throw new Error(
        "Error actualizando el servicio, inténtelo de nuevo más tarde"
      );
    }

    revalidatePath("/dashboard/precios");
    // redirect("/dashboard/precios");
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
}
