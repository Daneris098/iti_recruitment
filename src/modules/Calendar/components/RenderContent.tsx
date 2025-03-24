/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 21, 2025
 */

//-- Full Calendar
import { EventContentArg } from "@fullcalendar/core/index.js";
//--- Mantine Components
import { Container, Text } from "@mantine/core";

export default function renderEventContent(eventInfo: EventContentArg) {
  const eventDetails = eventInfo.event?._def;
  return (
    <Container bg={eventInfo.textColor} className={`flex flex-row overflow-hidden h-4 pl-3 hover:overflow-visible w-full rounded-md truncate cursor-pointer hover:scale-105`}>
      <Text c="white" size="12px" fw={500} py={2}>
        {eventDetails.title}
      </Text>
    </Container>
  );
}
