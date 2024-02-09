"use client"

import 'dayjs/locale/es'
import "@/styles/calendar.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, Event, dayjsLocalizer } from "react-big-calendar"
import { useCallback, useState } from "react"
import dayjs from "dayjs"
import FormUpdateModal from '@/components/form-update-turno'
import EventItem from './event-item'
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/es"
import { Events } from '@/lib/types'

export default function BigCalendar({ eventsList }: { eventsList: Events }) {

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

  dayjs.locale("es")
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault("America/Argentina/Buenos_Aires")
  const localizer = dayjsLocalizer(dayjs)

  const events = eventsList.map(event => {
    return {
      title: event.title?.toString(),
      start: new Date(dayjs.tz(event.start).toString()),
      end: new Date(dayjs.tz(event.end).toString()),
      createdAt: new Date(dayjs.tz(event.createdAt).toString()),
      resource: {
        status: event.status.toString(),
        id: event.id.toString(),
        services: {
          id: event.services.id.toString(),
          name: event.services.name.toString(),
          price: event.services.price,
        }
      }
    }
  })

  const eventPropGetter = useCallback(
    (event: Event, start: Date, end: Date, isSelected: boolean) => {
      return {
        ...(isSelected && {
          style: {
            backgroundColor: '#074880',
            transition: 'colors 0.3s ease-in-out',
          }
        }),
      }
    },
    []
  )
  const handleSelectEvent = (event: Event) => {
    setselectedEvent(event)
    setIsOpen(true)
  }
  const closeModal = useCallback(() => setIsOpen(false), [])

  const components = {
    event: EventItem
  }
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

  return (
    <div className="text-white" style={{ height: "80vh" }}>
      <Calendar
        defaultView="day"
        eventPropGetter={eventPropGetter}
        events={events}
        length={1}
        localizer={localizer}
        max={new Date(0, 0, 0, 23, 0, 0)}
        messages={labels}
        min={new Date(0, 0, 0, 6, 0, 0)}
        onDoubleClickEvent={handleSelectEvent}
        startAccessor="start"
        views={["day", "agenda"]}
        formats={{
          dayHeaderFormat: date => dayjs(date).format("ddd - DD MMMM, YYYY")
        }}
        components={components}
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

