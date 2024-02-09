import Calendar from "@/components/calendar";
import CrearTurno from "@/components/crear-turno";
import { Events, Service } from "@/lib/types";
import { mapEventResponse } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { cookies } from "next/headers";

export default async function DashboardPage(
  { searchParams }: { searchParams: { days: number } }
) {

  // Usado para que no se muestren los turnos anteriores a 60 dias.
  const DAYS = Number(searchParams.days || "60")
  const minDate = dayjs().subtract(DAYS, "day").format()

  const supabase = createServerComponentClient({ cookies })
  const { data: events } = await supabase
    .from("turnos")
    .select("*, services(*)")
    .gt("start", minDate) as { data: Events }

  const { data: services } = await supabase
    .from("services")
    .select("*").order("price", { ascending: true }) as { data: Service[] }

  // const events = mapEventResponse(data)

  return (
    <section className="grid items-center p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-semibold text-md">Calendario</h1>
        <CrearTurno services={services} />
      </div>
      <Calendar eventsList={events} />
    </section>
  )
}