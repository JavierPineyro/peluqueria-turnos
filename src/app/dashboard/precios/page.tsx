import FormUpdatePriceModal from "@/components/form-update-price";
import { Service } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
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

export default async function PricePage() {

  const supabase = createServerComponentClient({ cookies })
  const { data: services } = await supabase.from("services").select("*").order('price', { ascending: true }) as { data: Service[] }
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  return (
    <section className="px-16 grid justify-center items-center gap-8 pt-4 mx-auto">
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
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>fecha</TableHead>
              <TableHead>servicio</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </section>
  )
}
