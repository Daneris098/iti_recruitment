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
import { applicantsByIdService } from "@src/modules/Shared/components/api/UserService";
import { ApplicantStore } from "@modules/Vacancies/store/index";
import { useApplicantIdStore } from "@modules/Applicants/store";
import { useSharedApplicantStore } from "@src/modules/Shared/store";


export default function ModalViewEvent(_: ModalViewEventProps) {
  const { onViewEvent, setOnViewEvent, setOnViewResched, details } = useCalendarStore();
  const { setIsViewApplicant } = ApplicantStore();
  const { setSelectedApplicant } = useSharedApplicantStore();

  const setApplicantId = useApplicantIdStore((state) => state.setApplicantId);

  const propsFunc = {
    opened: onViewEvent,
    onClose: () => setOnViewEvent(false),
    buttonClose: () => setOnViewEvent(false),
  };

  const handleOpenResched = () => {
    setOnViewEvent(false);
    setOnViewResched(true);
  };

  const handleOpenApplicant = async () => {
    const { data: applicantDetails } = await applicantsByIdService.getById(details.applicant.id);
    console.log('applicantDetails: ', applicantDetails)
    setApplicantId(details.applicant.id);
    setSelectedApplicant(applicantDetails)
    setIsViewApplicant(true)
    // setOnViewEvent(false);
    // setOnViewApplicant(true);
  };

  return (
    <Modal centered {...propsFunc} title="View Event" size="lg">
      <Stack className="text-center" align="center" justify="center">
        <IconPhoneCall color="#559cda" size={100} stroke={1} />
        <Text c="#559cda" fw={700} size="25px">
          {details.interviewStage.name}
        </Text>
        {/* <Text mb={10}>Face-to-face</Text> */}

        <Flex w="100%" display="flex" dir="row" mb={30}>
          <Container w="50%">
            <Text c="#6d6d6d" fw={700} size="18px">
              {details.date}
            </Text>
            <Text c="#424242" size="16px">
              {details.time}
            </Text>
          </Container>
          <Container w="50%">
            <Text c="#6d6d6d" fw={700} size="18px">
              {details.applicant.name}
            </Text>
            <Text c="#424242" size="16px">
              {details.applicant.position.name}
            </Text>
          </Container>
        </Flex>
        <Text c="#6d6d6d" fw={700} size="18px">Interviewer: {details.interviewer.name}</Text>

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
