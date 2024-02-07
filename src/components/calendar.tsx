"use client"

import 'dayjs/locale/es'
import "@/styles/calendar.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, Event, dayjsLocalizer } from "react-big-calendar"
import { useCallback, useState } from "react"
import dayjs from "dayjs"
import FormUpdateModal from '@/components/form-update-turno'

export default function BigCalendar({ events }: { events: Event[] }) {

  // usar esto para al seleccionar un evento que abra un dialog poniendo 
  // el open a true,el dialog irá abajo del calendario y se mostrará el evento
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEvent, setselectedEvent] = useState<Event>({
    title: '',
    end: undefined,
    start: undefined,
    resource: {
      id: '',
      status: '',
      services: {
        id: '',
        name: '',
        price: 0,
      }
    }

  })

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

  const handleSelectEvent = (event: Event) => {
    setselectedEvent(event)
    setIsOpen(true)
  }

  const closeModal = useCallback(() => setIsOpen(false), [])

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
        onDoubleClickEvent={handleSelectEvent}
        formats={{
          dayHeaderFormat: date => dayjs(date).format("ddd - DD MMMM, YYYY")
        }}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 23, 0, 0)}
      />
      <FormUpdateModal
        closeModal={closeModal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedEvent={selectedEvent}
        id={selectedEvent.resource.id}
      />
    </div>
  )
}

