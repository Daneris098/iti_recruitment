import { Button, Stack, Text } from "@mantine/core";
import Modal from "@shared/template/container/Modal";
import { IconCircleCheck } from "@tabler/icons-react";
import { useCalendarStore } from "../../store";

export default function SuccessAlert() {
  const { onViewUpdate, setOnViewUpdate } = useCalendarStore();
  return (
    <Modal centered opened={onViewUpdate} onClose={() => setOnViewUpdate(false)} buttonClose={() => setOnViewUpdate(false)} title="Update Status" size="lg">
      <Stack className="flex flex-col justify-center items-center px-8 py-3">
        <IconCircleCheck color="#559CDA" stroke={0.5} size={120} />
        <Text className="text-[#6D6D6D] font-semibold text-2xl text-center">You've successfully updated and sent the interview invitation!</Text>
        <Button variant="outline" className="w-44 rounded-lg mt-5" onClick={() => setOnViewUpdate(false)}>
          Close
        </Button>
      </Stack>
    </Modal>
  );
}
