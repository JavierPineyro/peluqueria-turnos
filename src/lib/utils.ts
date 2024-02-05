import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Events } from "./types";
import { type Event } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

dayjs.locale("es");
export function mapEventResponse(data: Events): Event[] {
  return data?.map(({ title, start, end, id, status, services }) => {
    return {
      title,
      start: new Date(start),
      end: new Date(end),
      resource: {
        id,
        status,
        services: {
          id: services.id,
          name: services.name,
          price: services.price,
        },
      },
    };
  });
}

export function formatPrice(price: number) {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumSignificantDigits: 4,
  });
}
