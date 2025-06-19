/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 21, 2025
 */

//--- Mantine
import { Skeleton, Stack } from "@mantine/core";
//--- Full Calendar
import { CalendarApi, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
//--- Calendar Assets
import "./assets/index.css";
//--- Calendar Store
import { useCalendarStore, useRescheduleStore } from "./store";
//--- Calendar Components
import renderEventContent from "./components/RenderContent";
import DrawerFilter from "./components/DrawerFilter";
//--- Calendar Modals
import ViewApplicant from "./components/modals/ModalViewApplicant";
import ViewApplicantShared from "@modules/Shared/components/viewApplicants/index";

import ViewEvent from "./components/modals/ModalEvent";
import Reschedule from "./components/modals/ModalReschedule";
import MonthYear from "./components/modals/ModalMonthYear";

//--- Dummy Data
import { createEventId } from "./assets/Events";
import SuccessAlert from "./components/alerts/SuccessAlert";
import { ResponsiveContainer } from "recharts";
import { useCalendar } from "@modules/Calendar/hooks/useCalendar";
import { ApplicantStore } from "@modules/Vacancies/store/index";
import { useSharedApplicantStore } from "../Shared/store";
import React, { useEffect } from "react";

export default function index() {
  const { interviewer, date } = useRescheduleStore();
  const { setIsViewApplicant, isViewApplicant } = ApplicantStore();
  const { selectedApplicant } = useSharedApplicantStore();

  const { setOnViewEvent, setOnViewResched, setEventInfo, eventInfo, setOnViewFilter, setOnMonthYear, currentDate, setCurrentDate, setDetails } = useCalendarStore();
  const calendarRef = React.useRef<FullCalendar>(null);
  const [publicId, setPublicId] = React.useState<string>();
  const [dateStart, setDateStart] = React.useState<Date>();
  const { data, isError, isLoading, refetch } = useCalendar();

  const handleEventClick = (clickInfo: EventClickArg) => {
    const ev = clickInfo.event._def;
    if (ev.title != "") {
      const date = new Date((ev.extendedProps as any).entry.date);
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      };
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      // Format the date and time
      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      const formattedTime = date.toLocaleTimeString("en-US", timeOptions).toLowerCase();
      setDetails({ ...(ev.extendedProps as any)?.entry, date: formattedDate, time: `${formattedTime}` });
    }

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

  // const filteredEvents: EventInput[] = checkedItems.length === 0 ? INITIAL_EVENTS : INITIAL_EVENTS.filter((event) => checkedItems.includes(event.extendedProps?.department));

  const [type, setType] = React.useState<string>();
  const handleViewChange = () => {
    const api = calendarRef!.current?.getApi() as CalendarApi;
    if (api) {
      setType(api.view.type);
      const date = new Date(api.getDate());
      const formatter = new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const parts = formatter.formatToParts(date);
      const year = parts.find((p) => p.type === "year")?.value;
      const month = parts.find((p) => p.type === "month")?.value;
      const day = parts.find((p) => p.type === "day")?.value;
      const formattedDate = `${year}${month}${day}`;
      setCurrentDate(formattedDate);
    }
  };

  useEffect(() => {
    if (!currentDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;
      setCurrentDate(formattedDate);
    }
  }, [currentDate]);

  useEffect(() => {
    if (isError) {
      const retryTimeout = setTimeout(() => {
        refetch();
      }, 3000); // retry after 3 seconds

      return () => clearTimeout(retryTimeout);
    }
  }, [isError]);

  if (!currentDate || isLoading) {
    return <Skeleton height={400} />;
  }

  return (
    <Stack flex={1} bg="white" w="100%" h="100%">
      <title>Calendar</title>
      <ResponsiveContainer width="100%" height="100%">
        <FullCalendar
          events={isLoading ? data : []}
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: " prev,next, today, filter",
            center: "title, test",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          themeSystem="bootstrap5"
          customButtons={{
            filter: {
              click: () => setOnViewFilter(true),
              text: "☰",
            },
            // "title-label": {
            //   click: () => setOnMonthYear(true),
            //   text: monthTitle,
            // },
            test: {
              click: () => setOnMonthYear(true),
              text: "▼",
            },
          }}
          datesSet={handleViewChange}
          dayHeaderFormat={{ weekday: "long" }}
          dayHeaderClassNames="custom-header"
          allDayClassNames="custom-all-day"
          eventClassNames="custom-event"
          initialView="dayGridMonth"
          dayMaxEvents={true}
          initialEvents={data}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
      </ResponsiveContainer>
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

      <ModalWrapper isOpen={isViewApplicant} overlayClassName="modal-overlay" contentClassName="modal-content" onClose={() => setIsViewApplicant(false)}>
        <ViewApplicantShared
          applicantName={selectedApplicant?.nameResponse?.normalName}
          position={selectedApplicant?.positionsApplied[0].name}
          status={selectedApplicant?.applicationMovements[selectedApplicant?.applicationMovements.length - 1]?.status?.name}
          email={selectedApplicant?.contact?.email}
          phone={selectedApplicant?.contact?.mobileNo}
          skills={selectedApplicant?.skills}
          remarks={selectedApplicant?.applicationMovements}
          applicationDate={selectedApplicant?.applicationDate}
          IsJobOffer={selectedApplicant?.isJobOffer}
          onClose={() => setIsViewApplicant(false)}
        />
      </ModalWrapper>

      <SuccessAlert />
    </Stack>
  );
}
