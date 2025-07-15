import {
  Calendar,
  CalendarCurrentDate,
  CalendarDayView,
  CalendarEvent,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarViewTrigger,
  CalendarWeekView,
  CalendarYearView,
  useCalendar,
} from '@/components/ui/full-calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';

interface MedicalCheckupCalendarProps {
  events: CalendarEvent[];
}

export default function MedicalCheckupCalendar({
  events,
}: MedicalCheckupCalendarProps) {
  const { setEvents } = useCalendar();

  useEffect(() => setEvents(events), [events]);
  return (
    <div className="h-dvh py-6 flex flex-col">
      <div className="flex px-6 items-center gap-2 mb-6">
        <CalendarViewTrigger
          className="aria-[current=true]:bg-accent"
          view="day"
        >
          Day
        </CalendarViewTrigger>
        <CalendarViewTrigger
          view="week"
          className="aria-[current=true]:bg-accent"
        >
          Week
        </CalendarViewTrigger>
        <CalendarViewTrigger
          view="month"
          className="aria-[current=true]:bg-accent"
        >
          Month
        </CalendarViewTrigger>
        <CalendarViewTrigger
          view="year"
          className="aria-[current=true]:bg-accent"
        >
          Year
        </CalendarViewTrigger>

        <span className="flex-1" />

        <CalendarCurrentDate />

        <CalendarPrevTrigger>
          <ChevronLeft size={20} />
          <span className="sr-only">Previous</span>
        </CalendarPrevTrigger>

        <CalendarTodayTrigger>Today</CalendarTodayTrigger>

        <CalendarNextTrigger>
          <ChevronRight size={20} />
          <span className="sr-only">Next</span>
        </CalendarNextTrigger>

        {/* <ModeToggle /> */}
      </div>

      <div className="flex-1 overflow-auto px-6 relative">
        <CalendarDayView />
        <CalendarWeekView />
        <CalendarMonthView />
        <CalendarYearView />
      </div>
    </div>
  );
}
