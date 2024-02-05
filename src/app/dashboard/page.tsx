import Calendar from "@/components/calendar";
import CrearTurno from "@/components/crear-turno";
import { Events } from "@/lib/types";
import { mapEventResponse } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DashboardPage() {

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from("turnos").select("*, services(*)") as { data: Events }

  const events = mapEventResponse(data)

  return (
    <section className="grid items-center p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-semibold text-md">Calendario</h1>
        <CrearTurno />
      </div>
      <Calendar events={events} />
    </section>
  )
}