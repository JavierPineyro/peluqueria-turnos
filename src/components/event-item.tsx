import { cn, formatPrice } from "@/lib/utils";
import { Event } from "react-big-calendar";

export default function EventItem({ event }: { event: Event }) {
  return (
    <div className='flex item-center gap-4 ml-2'>
      <span className="flex items-center pb-[2px] font-semibold uppercase">{event.title}</span>
      <span className="text-sm rounded px-2 bg-gray-700">{event.resource.services.name} - {formatPrice(event.resource.services.price)}</span>
      <span className={cn({
        "bg-red-700": event.resource.status === "cancelado",
        "bg-green-800": event.resource.status === "completado",
        "bg-yellow-700": event.resource.status === "pendiente",
        "rounded px-2 text-sm": true,
      })}>
        {event.resource.status}
      </span>
    </div>
  )
}

