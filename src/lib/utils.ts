import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type IncomeResponse, type Events } from "./types";
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
      start: dayjs(new Date(start).toString()).locale("es").toDate(),
      end: dayjs(new Date(end).toString()).locale("es").toDate(),
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

export function getTotal(incomes: any): number {
  return incomes.reduce((acc: number, income: any) => acc + income.revenue, 0);
}

export function formatIncomeResponse(data: IncomeResponse[]) {
  const filteredData = data.filter((item) => {
    return item.turno.status === "completado";
  });

  return filteredData.map(({ id, revenue, date, id_service, turno }) => ({
    id,
    revenue,
    date,
    status: turno.status,
    service: id_service,
  }));
}

// Mocks
const invoices = [
  {
    id: 1,
    date: new Date("2024-02-01"),
    price: 1500,
    service: {
      name: "Corte de cabello",
    },
  },
  {
    id: 2,
    date: new Date("2024-02-02"),
    price: 1000,
    service: {
      name: "Barba",
    },
  },
  {
    id: 3,
    date: new Date("2024-02-02"),
    price: 2500,
    service: {
      name: "Corte de cabello",
    },
  },
];
