import FormUpdatePriceModal from "@/components/form-update-price";
import { IncomeResponse, Service } from "@/lib/types";
import { formatIncomeResponse, formatPrice, getTotal } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import dayjs from "dayjs";
import "dayjs/locale/es"

export default async function PricePage() {

  dayjs.locale("es")
  const supabase = createServerComponentClient({ cookies })

  const { data: services } = await supabase.from("services").select("*").order('price', { ascending: true }) as { data: Service[] }

  // Agregar filtro por que este completado el estatus de id_turno
  const { data } = await supabase.from("incomes").select("id, revenue, date, id_service(name), turno:id_turno(status)").eq("date", dayjs(new Date()).format("YYYY-MM-DD")) as { data: IncomeResponse[] }

  const incomes = formatIncomeResponse(data)

  return (
    <section className="px-16 grid justify-center items-center gap-8 pt-4 mx-auto" >
      <h1 className="text-lg sm:text-2xl font-semibold">Precios</h1>
      <section className="grid gap-2 sm:gap-9 sm:grid-cols-3">
        {
          services.map(service => (
            <div key={service.id} className="bg-neutral-900 text-white py-1 px-1 sm:px-3 sm:py-4 rounded shadow-md shadow-gray-800/40 w-full h-36 sm:w-72 flex flex-col justify-between">
              <h2 className="text-white/80 text-lg font-normal  text-center">{service.name}</h2>
              <p className="text-xl sm:text-2xl text-center font-semibold text-[var(--button-agenda-active-bg)] mb-3">
                {formatPrice(service.price)}
              </p>
              <FormUpdatePriceModal {...service} />
            </div>
          ))
        }
      </section>
      <section>
        <h2 className="text-white text-lg sm:text-2xl font-semibold">Recaudación</h2>
        <Table>
          <TableCaption>Recaudación del mes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>fecha</TableHead>
              <TableHead>servicio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomes.map((income) => (
              <TableRow key={income.id}>
                <TableCell className="font-medium">{income.id}</TableCell>
                <TableCell>{dayjs(income.date).format("DD/MM/YY")}</TableCell>
                <TableCell>{income.service.name}</TableCell>
                <TableCell>{income.status}</TableCell>
                <TableCell className="text-right">{formatPrice(income.revenue)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">{formatPrice(getTotal(incomes))}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </section >
  )
}
