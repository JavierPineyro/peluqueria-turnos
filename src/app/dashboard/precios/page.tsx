import TableIncome from "@/components/income-table";
import Services from "@/components/services";

export default function PricePage() {

  return (
    <section className="px-4 sm:px-16 grid justify-center items-center gap-8 pt-4 mx-auto" >
      <h1 className="text-md sm:text-2xl font-semibold">Precios</h1>
      <section className="grid gap-2 sm:gap-9 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Services />
      </section>
      <section>
        <h2 className="text-white text-lg sm:text-2xl font-semibold">Recaudación</h2>
        <TableIncome />
      </section>
    </section >
  )
}
