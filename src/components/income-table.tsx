import { IncomeResponse } from "@/lib/types";
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

export default async function TableIncome() {

  dayjs.locale("es")
  const supabase = createServerComponentClient({ cookies })

  // Agregar filtro por que este completado el estatus de id_turno
  const { data } = await supabase
    .from("incomes")
    .select("id, revenue, date, id_service(name), turno:id_turno(status)")
    .eq("date", dayjs.tz(new Date()).format("YYYY-MM-DD")) as unknown as { data: IncomeResponse[] }

  const incomes = formatIncomeResponse(data)

  return (
    <Table>
      <TableCaption>Recaudación del día.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] sm:w-[100px]">Id</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Servicio</TableHead>
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
  )
}