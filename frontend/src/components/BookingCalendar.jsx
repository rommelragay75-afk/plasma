import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function BookingCalendar({ onDateClick }){
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        dateClick={(info)=>onDateClick?.(info.dateStr)}
      />
    </div>
  )
}
