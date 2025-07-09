/**
 * @returns "Calendar" Component
 * @description This component is meant to be the calendar page for the
 * business, with pre-loaded calendar events from the quarterly schedule.
 * Calendar events will have tags listing all consumed resources
 * during that time.
 *
 * @import
 * MaterialUI for styling
 * FullCalendar OSS
 *
 *
 *
 * TODO:
 * 1.) Database integration (PostgreSQL)
 * 2.)
 *
 * Nice To Have TODOs:
 * 1. Calendar lookup function detailing all resources consumed for a time
 * frame
 *
 */

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view
import timeGridPlugin from "@fullcalendar/timegrid"; // Week and Day views
import interactionPlugin from "@fullcalendar/interaction"; // Optional, for interactivity
import rrulePlugin from "@fullcalendar/rrule"; // For recurring events
/*
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid/index.js";
*/
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  fetchEvents,
  //fetchTest,
  //createEvent,
  //updateEvent,
  //deleteEvent,
} from "../api/events";

import EventDetailModal from "./EventDetailModal";
import "../App.css";

type CalendarEvent = {
  id: string;
  title: string;
  classNames: string[];
  groupId: string;
  daysOfWeek?: number;
  //startTime: string;
  //endTime: string;
  allDay: false;
  startStr: string;
  endStr: string;
  editable: boolean;
  startEditable: boolean;
  durationEditable: boolean;
  resourceEditable: boolean;
  display: string;
  overlap: boolean;
  constraint: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  rrule?: {
    freq: string;
    dtstart: string;
    until: string;
    byweekday: string[];
  };
  start?: string;
  end?: string;
  extendedProps: {
    instructor: string;
    RecurStartDate: string;
    RecurEndDate: string;
    Date: string;
  };
};

const Calendar = () => {
  /**
   * useStates
   */

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState({
    title: "",
    resources: [],
    start: "",
    end: "",
  });

  // fetch all events once and set them to render
  // TODO:need to specific events as an array of acceptable json input to
  // FullCalender
  // useEffects affect everyting outside of DOM, itself can't be async so must declare
  // another async funct inside
  useEffect(() => {
    const fetchData = async () => {
      const calendarEvents = await fetchEvents();
      console.log("⏰ Final Events sent to FullCalendar:", calendarEvents);
      setEvents(calendarEvents);
    };

    fetchData(); // Call the async function
  }, []);

  //const isSidebarOpen = selectedEvent.title !== "";
  const calendarRef = useRef<FullCalendar | null>(null);

  // dayjs
  dayjs.extend(utc);
  dayjs.extend(timezone);

  //const tz = "America/New_York";

  return (
    <div className="h-screen flex">
      {/* Main Calendar Area */}
      <div
        className={`flex-1 flex-col h-screen transition-all duration-300 ease-in-out`}
      >
        <FullCalendar
          timeZone="local" //makes it easy to develop for client's EST while not in EST
          height="100%"
          contentHeight="auto"
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00" // End the view at 6 PM
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            rrulePlugin,
          ]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventClick={(info) => {
            setSelectedEvent({
              title: info.event.title,
              resources: info.event.extendedProps.resources || [],
              start: info.event.startStr,
              end: info.event.endStr,
            });
          }}
          editable={true}
          selectable={true}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
        />
      </div>

      {/* Sidebar Modal */}
      {selectedEvent.title && (
        <div className="w-[22rem] shrink-0 border-l bg-white p-4 shadow-lg overflow-auto transition-all duration-300 ease-in-out">
          <EventDetailModal
            event={selectedEvent}
            onClose={() => {
              setSelectedEvent({
                title: "",
                resources: [],
                start: "",
                end: "",
              });
              setTimeout(() => {
                if (calendarRef.current) {
                  calendarRef.current.getApi().updateSize();
                }
              }, 300); // Match transition duration
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
