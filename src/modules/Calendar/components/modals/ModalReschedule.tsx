/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

//--- Mantine Components
import { Button, Flex, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
//--- Shared Template
import Modal from "@shared/template/container/Modal";
//--- Calendar Store
import { useCalendarStore, useRescheduleStore } from "../../store";

export default function ModalReschedule({ updateBtn }: { updateBtn(): void }) {
  const { date, interviewer, setDate, setInterviewer } = useRescheduleStore();
  const { onViewResched, setOnViewResched, setOnViewEvent } =
    useCalendarStore();

  const handleCloseSched = () => {
    setOnViewResched(false);
    setOnViewEvent(true);
    setInterviewer("");
  };

  return (
    <Modal
      centered
      opened={onViewResched}
      onClose={() => setOnViewResched(false)}
      buttonClose={() => setOnViewResched(false)}
      title="Reschedule"
      size="lg">
      <Flex gap={20} direction="column">
        <DateTimePicker
          required
          label="Date and Time"
          placeholder="hh:mm"
          value={date}
          classNames={{
            input: "h-12 border-[#6d6d6d] border-1",
            root: "text-gray-800",
          }}
          className="w-full"
          onChange={(value) => setDate(value!)}
          valueFormat="MMMM DD, YYYY HH:mm:ss"
        />
        <TextInput
          label="Interviewer"
          value={interviewer}
          onChange={(event) => setInterviewer(event?.target.value)}
          placeholder="Select Interviewer "
          required
          classNames={{
            input: "h-12 border-[#6d6d6d] border-1",
            root: "text-gray-800",
          }}
          className="w-full"
        />
      </Flex>
      <Flex direction="row" mt={150} justify="space-between">
        <Button
          variant="outline"
          radius={10}
          px={20}
          onClick={handleCloseSched}
          w="auto">
          CANCEL
        </Button>
        <Button
          variant="transparent"
          onClick={updateBtn}
          w="auto"
          px={20}
          className="custom-gradient border-none hover:text-white text-white"
          radius={10}>
          UPDATE SCHEDULE
        </Button>
      </Flex>
    </Modal>
  );
}
