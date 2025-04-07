import { useState } from "react";
import { Popover, TextInput, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

interface DateRangeFilterProps {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
  placeholder: string;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ label, value, onChange, placeholder }) => {
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
            onChange={() => { }} // Read-only, no need to handle changes here
            readOnly
            placeholder={placeholder}
            onClick={() => setOpened((prev) => !prev)} // Make entire field clickable
            rightSection={
              <IconCalendar size={22} color="#6d6d6d" />
            }
            className="rounded-md w-full text-sm cursor-pointer"
            styles={{
              input: {
                paddingLeft: "18px",
                fontSize: "15px",
                border: "1px solid #6D6D6D",
                borderRadius: "10px",
                height: "56px",
                fontFamily: "poppins",
                color: "#6D6D6D",
                cursor: "pointer", // Ensures cursor pointer for the entire input
              },
            }}
          />
        </Popover.Target>
        <Popover.Dropdown style={{ zIndex: 1000, position: "absolute" }}>
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              onChange(date ? date.toISOString() : null); // Update selected date
              setOpened(false); // Close the calendar
            }}
          />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
