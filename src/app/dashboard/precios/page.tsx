import FormUpdatePriceModal from "@/components/form-update-price";
import { Service } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function PricePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: services } = await supabase.from("services").select("*") as { data: Service[] }

  return (
    <section className="px-16 grid justify-center items-center gap-4 pt-4 mx-auto">
      <h1 className="text-lg sm:text-2xl font-semibold">Precios</h1>
      <div className="grid gap-2 sm:gap-9 sm:grid-cols-3">
        {
          services.map(service => {
            return (
              <div key={service.id} className="bg-neutral-900 text-white py-1 px-1 sm:px-3 sm:py-4 rounded shadow-md shadow-gray-800/40 w-full h-36 sm:w-72 flex flex-col justify-between">
                <h2 className="text-white/80 text-lg font-normal  text-center">{service.name}</h2>
                <p className="text-xl sm:text-2xl text-center font-semibold text-[var(--button-agenda-active-bg)] mb-3">
                  {formatPrice(service.price)}
                </p>
                <FormUpdatePriceModal {...service} />
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
