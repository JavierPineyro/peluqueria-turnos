import { Service } from "@/lib/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { formatPrice } from "@/lib/utils";
import FormUpdatePriceModal from "@/components/form-update-price";

export default async function Services() {

  const supabase = createServerComponentClient({ cookies })

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order('price', { ascending: true }) as { data: Service[] }

  return (
    <>
      {
        services.map(service => (
          <article key={service.id} className="bg-neutral-900 text-white py-1 px-1 sm:px-3 sm:py-4 rounded shadow-md shadow-gray-800/40 w-full h-36 sm:w-72 flex flex-col justify-between">
            <h2 className="text-white/80 text-lg font-normal text-pretty text-center">
              {service.name}
            </h2>
            <p className="text-xl sm:text-2xl text-center font-semibold text-[var(--button-agenda-active-bg)] mb-3">
              {formatPrice(service.price)}
            </p>
            <FormUpdatePriceModal {...service} />
          </article>
        ))
      }
    </>
  )
}
