"use client"

import 'dayjs/locale/es'
import "@/styles/calendar.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, Event, dayjsLocalizer } from "react-big-calendar"
import { useCallback } from "react"
import dayjs from "dayjs"

export default function BigCalendar({ events }: { events: Event[] }) {
  dayjs.locale('es')
  const labels = {
    today: "Hoy",
    previous: "Anterior",
    next: "Siguiente",
    month: "Mes",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango",
    showMore: (total: number) => `+ Ver mas (${total})`,
  }

  const eventPropGetter = useCallback(
    (event: Event, start: Date, end: Date, isSelected: boolean) => ({
      ...(isSelected && {
        style: {
          backgroundColor: '#74ad31',
          fontWeight: 'bold',
        },
      }),
    }),
    []
  )

  return (
    <div className="text-white" style={{ height: "80vh" }}>
      <Calendar
        length={1}
        events={events}
        startAccessor="start"
        localizer={dayjsLocalizer(dayjs)}
        eventPropGetter={eventPropGetter}
        views={["day", "agenda"]}
        defaultView="day"
        messages={labels}
        formats={{
          dayHeaderFormat: date => dayjs(date).format("ddd - DD MMMM, YYYY")
        }}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 23, 0, 0)}
      />
    </div>
  )
}

