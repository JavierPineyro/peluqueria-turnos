"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createAppointment(formData: FormData) {
  try {
    let titleData = formData.get("title");
    let startData = formData.get("start") as string;
    let endData = formData.get("end") as string;
    let serviceData = formData.get("service");

    if (!titleData || !startData || !endData || !serviceData) {
      throw new Error("Faltan datos del turno");
    }

    const appointment = {
      title: titleData.toString(),
      start: dayjs(startData).format(),
      end: dayjs(endData).format(),
      service: serviceData.toString(),
    };

    const supabase = createServerActionClient({ cookies });
    const res = await supabase.from("turnos").insert(appointment);

    if (res.status === 201) {
      revalidatePath("/dashboard");
      // I think this is not necessary
      // redirect("/dashboard")
    }

    throw new Error("Error creando nuevo turno, inténtalo más tarde");
  } catch (error) {}
}
