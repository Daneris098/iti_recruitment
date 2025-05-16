/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

//--- Tabler Icons
import { IconPhoneCall } from "@tabler/icons-react";
//--- Mantine Components
import { Stack, Text, Flex, Container, Button } from "@mantine/core";
//--- Shared Template
import Modal from "@shared/template/container/Modal";
//--- Calendar Assets
import { ModalViewEventProps } from "../../assets/Types";
//--- Calendar Store
import { useCalendarStore } from "../../store";
import { useEffect, useState } from "react";

interface Position {
  [key: string]: any; // Adjust if specific fields are known
}

interface Person {
  id: number;
  name: string;
}

interface Applicant extends Person {
  position: Position;
}

interface InterviewStage {
  id: number;
  name: string;
}

export interface InterviewDetails {
  scheduleId: number;
  date: string;
  time: string;
  applicant: Applicant;
  interviewer: Person;
  interviewStage: InterviewStage;
}

// Initial empty value
const initialDetails: InterviewDetails = {
  scheduleId: 0,
  date: '',
  time: '',
  applicant: {
    id: 0,
    name: '',
    position: {},
  },
  interviewer: {
    id: 0,
    name: '',
  },
  interviewStage: {
    id: 0,
    name: '',
  },
};



export default function ModalViewEvent(props: ModalViewEventProps) {
  const { eventInfo } = props;
  const [details, setDetails] = useState<InterviewDetails>(initialDetails);
  const { onViewEvent, setOnViewEvent, setOnViewApplicant, setOnViewResched } = useCalendarStore();

  const propsFunc = {
    opened: onViewEvent,
    onClose: () => setOnViewEvent(false),
    buttonClose: () => setOnViewEvent(false),
  };

  const handleOpenResched = () => {
    setOnViewEvent(false);
    setOnViewResched(true);
  };

  const handleOpenApplicant = () => {
    setOnViewEvent(false);
    setOnViewApplicant(true);
  };

  useEffect(() => { 
    console.log('eventInfo: ', eventInfo)
    if (eventInfo.title != '') {
      const time = new Date(details.date).toTimeString().split(' ')[0];
      console.log('time: ',time)
      setDetails({...(eventInfo.extendedProps as any)?.entry, time:`${time}`})
      // setDetails((eventInfo.extendedProps as any)?.entry)
    }
  }, [eventInfo])

  useEffect(() => {
    console.log('details: ', details)
    console.log('details date: ', details.date)
  }, [details])

  return (
    <Modal centered {...propsFunc} title="View Event" size="lg">
      <Stack className="text-center" align="center" justify="center">
        <IconPhoneCall color="#559cda" size={200} stroke={1} />
        <Text c="#559cda" fw={700} size="25px">
          Initial Interview
        </Text>
        {/* <Text mb={10}>Face-to-face</Text> */}

        <Flex w="100%" display="flex" dir="row" mb={30}>
          <Container w="50%">
            <Text c="#6d6d6d" fw={700} size="18px">
              September 1, 2024, Sunday 
            </Text>
            <Text c="#424242" size="16px">
              3:00pm
            </Text>
          </Container>
          <Container w="50%">
            <Text c="#6d6d6d" fw={700} size="18px">
              {eventInfo.title}
            </Text>
            <Text c="#424242" size="16px">
              Web Developer
            </Text>
          </Container>
        </Flex>

        <Flex w="100%" justify="space-around">
          <Button variant="outline" radius={10} onClick={handleOpenResched}>
            RESCHEDULE
          </Button>
          <Button
            variant="transparent"
            className="custom-gradient border-none text-white hover:text-white"
            radius={10}
            onClick={handleOpenApplicant}>
            VIEW APPLICANT PROFILE
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
