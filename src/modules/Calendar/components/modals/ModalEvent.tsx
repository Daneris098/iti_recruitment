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

export default function ModalViewEvent(props: ModalViewEventProps) {
  const { eventInfo } = props;

  const { onViewEvent, setOnViewEvent, setOnViewApplicant, setOnViewResched } =
    useCalendarStore();

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

  return (
    <Modal centered {...propsFunc} title="View Event" size="lg">
      <Stack className="text-center" align="center" justify="center">
        <IconPhoneCall color="#559cda" size={200} stroke={1} />
        <Text c="#559cda" fw={700} size="25px">
          Initial Interview
        </Text>
        <Text mb={10}>Face-to-face</Text>

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
