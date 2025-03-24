import { useState } from "react";
import { Popover, TextInput, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

interface DateRangeFilerProps {
    label: string;
    value: string | null;
    onChange: (date: string | null) => void;
    placeholder: string;
};

const DateRangeFilter: React.FC<DateRangeFilerProps> = ({ label, value, onChange, placeholder }) => {
  const [opened, setOpened] = useState(false);
  const selectedDate = value ? new Date(value) : null;

  return (
    <div>
      <Text fw={500} fz={12} c="#6d6d6d">{label}</Text>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        withArrow
        transitionProps={{ transition: "fade" }}
      >
        <Popover.Target>
          <TextInput
            value={selectedDate ? selectedDate.toDateString() : ""}
            readOnly
            placeholder={placeholder}
            rightSection={
              <div
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => setOpened((o) => !o)}
              >
                <IconCalendar size={18} color="#6d6d6d" />
              </div>
            }
            radius={8}
            className="border-none w-full text-sm"
            styles={{ input: { cursor: "pointer" } }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              onChange(date ? date.toISOString() : null);
              setOpened(false);
            }}
          />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
