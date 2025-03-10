//--- Mantine Modules
import { Popover, Flex, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

//--- Tabler Icons
import { IconCalendarMonth } from "@tabler/icons-react";
//--- Shared Utils
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useEffect, useState } from "react";
interface DateRangeProps {
  value: [Date | null, Date | null];
  setValue: (newValue: [Date | null, Date | null]) => void;
  fLabel: string;
  lLabel: string;
  fPlaceholder: string;
  lPlaceholder: string;
  isColumn?: boolean;
  isMobile?: boolean;
  gapValue?: number
  size?: string
}

export const DateRange = ({
  fLabel,
  lLabel,
  fPlaceholder,
  lPlaceholder,
  value,
  setValue,
  isColumn = false,
  isMobile = false,
  gapValue,
  size
}: DateRangeProps) => {

  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (value[0] != null && value[1] != null) {
      setOpened(false)
    }
  }, [value])

  return (
    <Flex
      direction={`${isColumn ? "column" : "row"}`}
      justify="space-between"
      gap={(gapValue ?? 0)}
      className="w-full items-end"
    >
      <Popover opened={opened} position="bottom" shadow="md" trapFocus={true} returnFocus={true}>
        <Popover.Target>
          <TextInput
            value={
              value[0] === null
                ? ""
                : DateTimeUtils.dayWithDate(`${value[0]?.toString()}`)
            }
            radius="md"
            size={size ?? 'xs'}
            readOnly
            label={fLabel}
            placeholder={fPlaceholder}
            className="w-full cursor-default"
            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ' }}
            rightSection={<IconCalendarMonth />}
            styles={{ label: { color: "#6d6d6d" } }}
            onClick={() => setOpened((o) => !o)}
          />
        </Popover.Target>
        <Popover.Dropdown className="w-full">
          <DatePicker
            firstDayOfWeek={0}
            numberOfColumns={isMobile ? 1 : 2}
            type="range"
            value={value}
            onChange={setValue}
          />
        </Popover.Dropdown>
      </Popover>
      <Popover position="bottom" shadow="md">
        <Popover.Target>
          <TextInput
            value={
              value[1] === null
                ? ""
                : DateTimeUtils.dayWithDate(`${value[1]?.toString()}`)
            }
            radius="md"
            size={size ?? 'xs'}
            readOnly
            label={lLabel}
            placeholder={lPlaceholder}
            rightSection={<IconCalendarMonth />}
            className="w-full"
            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ' }}
            styles={{ label: { color: "#6d6d6d" } }}
            onClick={() => setOpened((o) => !o)}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker
            numberOfColumns={isMobile ? 1 : 2}
            type="range"
            value={value}
            onChange={setValue}
          />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
};
