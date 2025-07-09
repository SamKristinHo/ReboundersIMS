/**
 * FRONTEND API FOR EVENTS
 * events.tsx links the frontend with the backend by sending http requests
 * to the backend at BASE_URL (api/events @ the specified localhost address)
 * using fetch()
 *
 * Each of these functions communicates with BASE_URL and gets results for the frontend
 * components to use after they import this file
 * i.e. createEvent returns a result for calendar component to use to render
 * events [all events + the newly created one]
 *
 *
 * @returns results for the frontend components to display
 */

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = "America/New_York";

const BASE_URL = "http://localhost:3001/api/events";
type RawEvent = {
  id: number;
  classTypeName: string;
  classNames: string[] | null;
  groupId: string;
  Date: string;
  daysOfWeek: number;
  startTime: string; // ISO string or date string
  endTime: string;
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
  RecurStartDate: string;
  RecurEndDate: string;
  RecurrenceFrequency: number;
  instructor: string;
  resources: string[];
};

type CalendarEvent = {
  id: string;
  title: string;
  classNames: string[];
  groupId: string;
  daysOfWeek?: number;
  //startTime: string;
  //endTime: string;
  startStr: string;
  allDay: false;
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

type testEvent = {
  classTypeName: string;
  date: string;
  id: number;
};

export const fetchTest = async () => {
  const data: testEvent[] = [
    {
      classTypeName: "TestClassName",
      date: "2025-07-12",
      id: 999,
    },
    {
      classTypeName: "TestClassName2",
      date: "2025-08-12",
      id: 998,
    },
  ];
  return data;
};

/**
 * TRANSFORMING DATA TO JSON OBJECTS USABLE BY FULLCALENDAR
 */
const transformData = (data: RawEvent[]): CalendarEvent[] => {
  // Helper to convert daysOfWeek numbers to rrule weekday strings
  const getDayofWeek = (idx: number) => {
    const days = ["su", "mo", "tu", "we", "th", "fr", "sa"];
    return days[idx];
  };

  // Helper to calculate duration in "HH:mm" format
  const calculateDuration = (startISO: string, endISO: string): string => {
    const [startHours, startMinutes] = startISO.split(":").map(Number);
    const [endHours, endMinutes] = endISO.split(":").map(Number);

    const start = startHours * 60 + startMinutes;
    const end = endHours * 60 + endMinutes;

    const diff = end - start;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  // Helper to translate resources to proper format for FullCalendar

  const translateResources = (resourceArr: string[]) => {
    return resourceArr.map((resource) => ({ id: resource }));
  };

  // Helper to translate start date and times for rrule plugin
  //function combineDateAndTime(date: string, time: string) {
  //  return new Date(`${date}T${time}`).toISOString();
  //}

  return data.map((event) => {
    const isRecurring = !!(
      event.RecurStartDate &&
      event.RecurEndDate &&
      event.daysOfWeek != -1
    );

    return {
      id: String(event.id),
      title: event.classTypeName,
      classNames: event.classNames ?? [],
      groupId: event.groupId ?? "",
      //startTime: event.startTime,
      //endTime: event.endTime,
      allDay: false,
      startStr: event.startTime,
      endStr: event.endTime,
      editable: !!event.editable,
      startEditable: !!event.startEditable,
      durationEditable: !!event.durationEditable,
      resourceEditable: !!event.resourceEditable,
      display: event.display || "auto",
      overlap: event.overlap ?? true,
      constraint: event.constraint || "",
      backgroundColor: event.backgroundColor || "",
      borderColor: event.borderColor || "",
      textColor: event.textColor || "",
      resources: translateResources(event.resources),
      ...(isRecurring
        ? {
            rrule: {
              freq: "weekly",
              dtstart: dayjs
                .tz(`${event.RecurStartDate}T${event.startTime}`, tz)
                .format("YYYY-MM-DDTHH:mm:ss"),
              until: dayjs
                .tz(`${event.RecurEndDate}T${event.endTime}`, tz)
                .format("YYYY-MM-DDTHH:mm:ss"),
              byweekday: [getDayofWeek(event.daysOfWeek)], //rrule is 0 for monday not 1
            },
            duration: calculateDuration(event.startTime, event.endTime),
          }
        : {
            daysOfWeek: event.daysOfWeek,
            start: new Date(event.startTime).toISOString(),
            end: new Date(event.endTime).toISOString(),
          }),
      extendedProps: {
        instructor: event.instructor,
        RecurStartDate: event.RecurStartDate,
        RecurEndDate: event.RecurEndDate,
        Date: event.Date,
      },
    };
  });
};

/**
 *
 * @returns all rows from current CalendarEvents db
 */
export const fetchEvents = async () => {
  console.log("in events.tsx fetch before fetching from ./api/events");
  const res = await fetch(BASE_URL);
  console.log(
    "in fetch from events.tsx frontend API, after fetching from base-url"
  );
  const data: RawEvent[] = await res.json();
  console.log(await res);
  return transformData(data);
};

/**
 *
 * @param classTypeName
 * @param DayOfWeek
 * @param StartTime
 * @param EndTime
 * @param instructor
 * @param RecurStartDate
 * @param RecurEndDate
 * @returns Newly created row from CalendarEvents db
 */
export const createEvent = async (
  classTypeName: string,
  DayOfWeek: string,
  StartTime: string,
  EndTime: string,
  instructor: string,
  RecurStartDate: Date,
  RecurEndDate: Date
) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      classTypeName,
      DayOfWeek,
      StartTime,
      EndTime,
      instructor,
      RecurStartDate,
      RecurEndDate,
    }),
  });
  return res.json(); // returns this to component where FullCalendar will render
};

/**
 * @param id
 * @param classTypeName
 * @param DayOfWeek
 * @param StartTime
 * @param EndTime
 * @param instructor
 * @param RecurStartDate
 * @param RecurEndDate
 * @returns
 */
export const updateEvent = async (
  id: number,
  classTypeName: string,
  DayOfWeek: string,
  StartTime: string,
  EndTime: string,
  instructor: string,
  RecurStartDate: Date,
  RecurEndDate: Date
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      classTypeName,
      DayOfWeek,
      StartTime,
      EndTime,
      instructor,
      RecurStartDate,
      RecurEndDate,
    }),
  });
  return res.json(); // returns this to component where FullCalendar will render
};

/**
 *
 * @param id: int, to locate correct row to delete
 * @returns
 */
export const deleteEvent = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
