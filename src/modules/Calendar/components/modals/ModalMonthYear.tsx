import FullCalendar from "@fullcalendar/react";
import { Stack, Tabs, Text } from "@mantine/core";
import Modal from "@shared/template/container/Modal";
import { useCalendarStore, useMonthYearStore } from "../../store";
import { CalendarApi } from "@fullcalendar/core/index.js";
import React from "react";
import { DatePickerInput } from "@mantine/dates";

interface MonthYearProps {
  calendarRef: React.RefObject<FullCalendar>;
  viewType?: string;
}
const MonthYear = ({ calendarRef, viewType }: MonthYearProps) => {
  const { onMonthYear, setOnMonthYear } = useCalendarStore();
  const { month, year, setYear, setMonth, day, setDay } = useMonthYearStore();

  const onClose = () => {
    setOnMonthYear(false);
    setMonth(today.getMonth() + 1);
    setYear(today.getFullYear());
  };

  const propsFunc = { opened: onMonthYear, onClose: () => onClose(), buttonClose: () => onClose() };
  const today = new Date();

  const goToYear = (selectedYear: number) => {
    setYear(selectedYear);
    const api = calendarRef.current?.getApi() as CalendarApi;
    if (api) api.gotoDate(`${selectedYear}-${month.toString().padStart(2, "0")}-01`);
  };

  const goToMonth = (selectedMonth: number) => {
    setMonth(selectedMonth);
    const api = calendarRef.current?.getApi() as CalendarApi;
    if (api) api.gotoDate(`${year}-${selectedMonth.toString().padStart(2, "0")}-01`);
  };

  const goToDate = (selectedDate: Date) => {
    const formatDateParts = (date: Date) => {
      const year = date.getFullYear(); // 2025
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return { year, month, day };
    };
    const date = formatDateParts(selectedDate);

    const api = calendarRef.current?.getApi() as CalendarApi;
    if (api) api.gotoDate(`${date.year}-${date.month.toString().padStart(2, "0")}-${date.day}`);
  };

  return (
    <Modal centered {...propsFunc} title="Filter Date" size="lg">
      <Tabs defaultValue={viewType === "dayGridMonth" ? "month" : "day"}>
        <Tabs.List>
          {viewType === "dayGridMonth" && <Tabs.Tab value="month">Month</Tabs.Tab>}
          {viewType === "dayGridMonth" && <Tabs.Tab value="year">Year</Tabs.Tab>}
          {viewType != "dayGridMonth" && <Tabs.Tab value="day">Day</Tabs.Tab>}
        </Tabs.List>

        <Tabs.Panel value="month">
          <Stack className="mt-2">
            <div className="grid grid-cols-3 justify-center item-center gap-4">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((mnth) => (
                <Text
                  key={mnth}
                  className="bg-[#cddcf1] text-[#3495e9] text-center py-5 text-lg font-semibold cursor-pointer hover:scale-105 select-none rounded-md"
                  onClick={() => goToMonth(mnth)}>
                  {new Date(2000, mnth - 1, 1).toLocaleString("default", { month: "long" })}
                </Text>
              ))}
            </div>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="year">
          <Stack className="mt-2">
            <div className="grid grid-cols-3 justify-center item-center gap-4">
              {Array.from({ length: 12 }, (_, i) => today.getFullYear() - 6 + i).map((yr) => (
                <Text
                  key={yr}
                  className="bg-[#cddcf1] text-[#3495e9] text-center py-5 text-lg font-semibold cursor-pointer hover:scale-105 select-none rounded-md"
                  onClick={() => goToYear(yr)}>
                  {yr}
                </Text>
              ))}
            </div>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="day">
          <Stack className="mt-2">
            <DatePickerInput
              label="Pick date"
              placeholder="Pick date"
              value={day}
              onChange={(date) => {
                date && setDay(date);
                date && goToDate(date);
              }}
            />
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default MonthYear;
