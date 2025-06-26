/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

//--- Mantine Components
import { Button, Flex, Select, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
//--- Shared Template
import Modal from "@shared/template/container/Modal";
//--- Calendar Store
import { useCalendarStore, useRescheduleStore } from "../../store";
import axiosInstance from "@src/api";
import { useForm } from "@mantine/form";
import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetInterviewerService } from "@src/modules/Shared/api/useSharedUserService";

export default function ModalReschedule({ updateBtn }: { updateBtn(): void }) {
  const { setDate, setInterviewer } = useRescheduleStore();
  const { onViewResched, setOnViewResched, setOnViewEvent, setOnViewUpdate, details } = useCalendarStore();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const handleCloseSched = () => {
    setOnViewResched(false);
    setOnViewEvent(true);
    setInterviewer("");
    setDate(null!);
  };

  const submit = async (form: any) => {
    const date = new Date(form.dateAndTime);
    // Helper to zero-pad numbers
    const pad = (num: number) => String(num).padStart(2, "0");
    // Format date as YYYYMMDD
    const formattedDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
    // Format time as HH:mm:ss
    const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

    const payload = {
      date: formattedDate,
      time: formattedTime,
      location: form.location,
      interviewer: {
        id: 1,
        name: form.interviewer,
      },
    };
    await axiosInstance
      .post(`recruitment/calendar/${details.scheduleId}/reschedule`, payload)
      .then(() => {
        queryClient.refetchQueries({ queryKey: ["recruitment/calendar"], type: "active" });
        useRescheduleStore.getState().setDate(date);
        useRescheduleStore.getState().setReadyToUpdate(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const interviewers = useQuery({
    queryKey: ["interviewers"],
    queryFn: async () => {
      const result = await useGetInterviewerService.getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { dateAndTime: "", interviewer: "", location: "" },
    validate: {
      dateAndTime: (value: string) => (value.length === 0 ? "Date and Time is required" : null),
      interviewer: (value: string) => (value.length === 0 ? "Interviewer is required" : null),
      location: (value: string) => (value === null || value === "" ? "Location is required" : null),
    },
  });
  useEffect(() => {
    const { date, readyToUpdate, setReadyToUpdate } = useRescheduleStore.getState();

    if (readyToUpdate && date) {
      setOnViewUpdate(true);
      updateBtn();
      setReadyToUpdate(false);
    }
  }, [useRescheduleStore((state) => state.readyToUpdate)]);

  return (
    <form ref={formRef} onSubmit={form.onSubmit(submit)} className="flex flex-col gap-4 sm:h-[55%] sm:w-[55%] m-auto p-4 sm:p-0">
      <Modal centered opened={onViewResched} onClose={() => setOnViewResched(false)} buttonClose={() => setOnViewResched(false)} title="Reschedule" size="lg">
        <Flex gap={20} direction="column">
          <DateTimePicker
            {...form.getInputProps("dateAndTime")}
            key={form.key("dateAndTime")}
            required
            label="Date and Time"
            placeholder="hh:mm"
            classNames={{
              input: "h-12 border-[#6d6d6d] border-1",
              root: "text-gray-800",
            }}
            className="w-full"
            valueFormat="MMMM DD, YYYY HH:mm:ss"
          />
          <Select
            {...form.getInputProps("interviewer")}
            key={form.key("interviewer")}
            label="Interviewer"
            placeholder="Select Interviewer"
            required
            data={
              interviewers?.data?.items?.length
                ? interviewers.data.items
                    .filter((item: any) => item?.id && item?.name)
                    .map((item: any) => ({
                      value: item.name,
                      label: item.name,
                    }))
                : []
            }
            classNames={{
              input: "h-12 border-[#6d6d6d] border-1",
              root: "text-gray-800",
            }}
            className="w-full"
          />
          <TextInput
            {...form.getInputProps("location")}
            key={form.key("location")}
            required
            label="Location"
            placeholder="Location"
            classNames={{
              input: "h-12 border-[#6d6d6d] border-1",
              root: "text-gray-800",
            }}
            className="w-full"
          />
        </Flex>
        <Flex direction="row" mt={150} justify="space-between">
          <Button variant="outline" radius={10} px={20} onClick={handleCloseSched} w="auto">
            CANCEL
          </Button>
          <Button
            variant="transparent"
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
            w="auto"
            px={20}
            className="custom-gradient border-none hover:text-white text-white"
            radius={10}>
            UPDATE SCHEDULE
          </Button>
        </Flex>
      </Modal>
    </form>
  );
}
