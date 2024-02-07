import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PricePage() {
  return (
    <section className="px-16 grid justify-center items-center gap-4 pt-4 mx-auto">
      <h1 className="text-lg sm:text-2xl font-semibold">Precios</h1>
      <div className="grid gap-2 sm:gap-8 sm:grid-cols-3">
        <div className="bg-neutral-900 text-white py-1 px-1 sm:px-3 sm:py-4 rounded shadow-md shadow-gray-800/40 w-full h-32 sm:w-72 flex flex-col justify-between">
          <h2 className="text-md font-semibold text-center sm:text-2xl text-[var(--button-agenda-active-bg)]">Corte</h2>
          <Button className={cn("w-full")}>Editar</Button>
        </div>
        <div className="bg-neutral-900 text-white py-1 px-1 sm:px-3 sm:py-4 rounded shadow-md shadow-gray-800/40 w-full h-32 sm:w-72 flex flex-col justify-between">
          <h2 className="text-md font-semibold text-center sm:text-2xl text-[var(--button-agenda-active-bg)]">Barba</h2>
          <Button className={cn("w-full")}>Editar</Button>
        </div>
        <div className="bg-neutral-900 text-white py-1 px-1 sm:px-3 sm:py-4 rounded shadow-md shadow-gray-800/40 w-full h-32 sm:w-72 flex flex-col justify-between">
          <h2 className="text-md font-semibold text-center sm:text-2xl text-[var(--button-agenda-active-bg)]">Completo</h2>
          <Button className={cn("w-full")}>Editar</Button>
        </div>
      </div>
    </section>
  )
}

