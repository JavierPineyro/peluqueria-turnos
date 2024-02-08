"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateAppointment(id: string, formData: FormData) {
  let titleData = formData.get("title");
  let startData = formData.get("start") as string;
  let endData = formData.get("end") as string;
  let serviceData = formData.get("service");
  let statusData = formData.get("status");

  if (
    !id ||
    !titleData ||
    !statusData ||
    !startData ||
    !endData ||
    !serviceData
  ) {
    throw new Error("Missing appointment data at updateAppointment");
  }

  const appointment = {
    title: titleData.toString(),
    start: dayjs(startData).format(),
    status: statusData.toString(),
    end: dayjs(endData).format(),
    service: serviceData.toString(),
  };

  const supabase = createServerActionClient({ cookies });
  const res = await supabase.from("turnos").update(appointment).eq("id", id);

  if (res.status === 204) {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
  throw new Error(
    "Error creating new appointment at updateAppointment action, server error"
  );
}
