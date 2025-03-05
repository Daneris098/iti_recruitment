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
import renderEventContent from "./components/RenderContent";
import DrawerFilter from "./components/DrawerFilter";
//--- Calendar Modals
import ViewApplicant from "./components/modals/ModalViewApplicant";
import ViewEvent from "./components/modals/ModalEvent";
import Reschedule from "./components/modals/ModalReschedule";
import MonthYear from "./components/modals/ModalMonthYear";

//--- Dummy Data
import { INITIAL_EVENTS, createEventId } from "./assets/Events";
import SuccessAlert from "./components/alerts/SuccessAlert";

export default function index() {
  const { interviewer, date } = useRescheduleStore();
  const { setOnViewEvent, setOnViewResched, setEventInfo, eventInfo, checkedItems, setOnViewFilter, setOnMonthYear } = useCalendarStore();
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
    const api = calendarRef!.current?.getApi() as CalendarApi;
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
    setOnViewEvent(false);
  };

  const filteredEvents: EventInput[] = checkedItems.length === 0 ? INITIAL_EVENTS : INITIAL_EVENTS.filter((event) => checkedItems.includes(event.extendedProps?.department));
  const [monthTitle, setMonthTitle] = React.useState<string>("");

  const [type, setType] = React.useState<string>();
  const handleViewChange = () => {
    const api = calendarRef!.current?.getApi() as CalendarApi;
    if (api) {
      setMonthTitle(api.view.title);
      setType(api.view.type);
    }
  };

  return (
    <Stack flex={1} bg="white" w="100%" h="100%">
      <title>Calendar</title>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: " prev,next, today, filter",
          center: "title-label",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        themeSystem="bootstrap5"
        customButtons={{
          filter: {
            click: () => setOnViewFilter(true),
            text: "☰",
          },
          "title-label": {
            click: () => setOnMonthYear(true),
            text: monthTitle,
          },
        }}
        datesSet={handleViewChange}
        dayHeaderFormat={{ weekday: "long" }}
        dayHeaderClassNames="custom-header"
        allDayClassNames="custom-all-day"
        eventClassNames="custom-event"
        initialView="dayGridMonth"
        dayMaxEvents={true}
        initialEvents={filteredEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      {/* Drawer Filter */}
      <DrawerFilter />
      {/* Modal View Event */}
      <ViewEvent eventInfo={eventInfo} />
      {/* Modal Reschedule */}
      <Reschedule updateBtn={handleSubmitUpdate} />
      {/* Modal View Applicant */}
      <ViewApplicant downloadBtn={undefined} />
      {/* Modal Year and Month */}
      <MonthYear calendarRef={calendarRef} viewType={type} />
      {/* Modal Succes Update */}
      <SuccessAlert />
    </Stack>
  );
}
