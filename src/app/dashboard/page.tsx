import Calendar from "@/components/calendar";
import { Events } from "@/lib/types";
import { mapEventResponse } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DashboardPage() {

  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from("turnos").select("*, services(*)") as { data: Events }

  const events = mapEventResponse(data)

  // Pass the data into de Calendar component and put it in Event attribute
  console.log("dataaa", events)
  return (
    <section className="grid items-center p-4">
      <h1>Calendario</h1>
      <Calendar events={events} />
    </section>
  )
}