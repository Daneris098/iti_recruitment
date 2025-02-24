/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 21, 2025
 */

//--- React
import React from "react";
//--- Mantine
import { Stack } from "@mantine/core";
//--- Full Calendar
import { CalendarApi, EventClickArg, EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

//--- Calendar Assets
import "./assets/index.css";
//--- Calendar Store
import { useCalendarStore, useRescheduleStore } from "./store";
//--- Calendar Components
import ButtonFilter from "./components/ButtonFilter";
import renderEventContent from "./components/RenderContent";
//--- Calendar Modals
import ViewApplicant from "./components/modals/ModalViewApplicant";
import ViewEvent from "./components/modals/ModalEvent";
import Reschedule from "./components/modals/ModalReschedule";

//--- Dummy Data
import { INITIAL_EVENTS, createEventId } from "./assets/Events";

export default function index() {
  const { interviewer, date } = useRescheduleStore();
  const {
    setOnViewEvent,
    setOnViewResched,
    setEventInfo,
    eventInfo,
    checkedItems,
  } = useCalendarStore();

  const calendarRef = React.useRef<FullCalendar>(null);
  const [publicId, setPublicId] = React.useState<string>();
  const [dateStart, setDateStart] = React.useState<Date>();

  const handleEventClick = (clickInfo: EventClickArg) => {
    setEventInfo({ ...clickInfo.event._def });
    setPublicId(clickInfo.event.id);
    setDateStart(clickInfo.event.start!);
    setOnViewEvent(true);
  };

  const handleSubmitUpdate = () => {
    // Ref API from FullCalendar
    const api = calendarRef.current?.getApi() as CalendarApi;

    api.unselect();

    // Adding Event
    api.addEvent({
      id: createEventId(),
      title: interviewer,
      start: date,
      textColor: "#fec001",
      backgroundColor: "#fff0c0",
    });

    // Delete Event
    if (date != dateStart) {
      const event = api.getEventById(publicId!);
      if (event) event.remove();
    }

    // Closing Reschedule Modal
    setOnViewResched(false);
  };

  const filteredEvents: EventInput[] =
    checkedItems.length === 0
      ? INITIAL_EVENTS
      : INITIAL_EVENTS.filter((event) =>
          checkedItems.includes(event.extendedProps?.department)
        );

  return (
    <Stack bg="white" w="100%" h="100%" justify="between">
      <title>Calendar</title>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: " prev,next, today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        dayHeaderFormat={{ weekday: "long" }}
        allDayClassNames="custom-all-day"
        eventClassNames="custom-event"
        initialView="dayGridMonth"
        dayMaxEvents={true}
        initialEvents={filteredEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      {/* Filter Buttons */}
      <ButtonFilter />

      {/* Modal View Event */}
      <ViewEvent eventInfo={eventInfo} />

      {/* Modal Reschedule */}
      <Reschedule updateBtn={handleSubmitUpdate} />

      {/* Modal View Applicant */}
      <ViewApplicant downloadBtn={undefined} />
    </Stack>
  );
}
