"use client"

import dayjs from "dayjs"
import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

export default function BigCalendar() {
  return (
    <div className="text-white" style={{ height: "80vh" }}>
      <Calendar
        style={{ color: "white" }}
        length={1}
        localizer={dayjsLocalizer(dayjs)}
        events={[
          {
            title: "Turno Dario Javier Pinero",
            start: dayjs("2024-02-02T19:30:00").toDate(),
            end: dayjs("2024-02-02T20:00:00").toDate(),
          },
        ]}
        views={["day", "agenda"]}
        defaultView="day"
        messages={{
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
          showMore: total => `+ Ver mas (${total})`,
        }}
      />
    </div>
  )
}

