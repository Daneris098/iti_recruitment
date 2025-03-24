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
            onChange={() => { }} // No need to handle changes here
            readOnly
            placeholder={placeholder}
            rightSection={
              <div
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  setOpened((o) => !o); // Toggle the calendar
                  console.log("Clicked")
                }}
              >
                <IconCalendar size={22} color="#6d6d6d" />
              </div>
            }
            className="rounded-md w-full text-sm "
            styles={{
              input: {
                paddingLeft: "18px",
                fontSize: "15px",
                border: "1px solid #6D6D6D",
                borderRadius: "10px",
                height: "56px",
                fontFamily: "poppins",
                color: "#6D6D6D",
              },
            }}
          />
        </Popover.Target>
        <Popover.Dropdown style={{ zIndex: 1000, position: "absolute" }} >
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              onChange(date ? date.toISOString() : null); // Update the selected date
              setOpened(false); // Close the calendar after selecting a date
            }}
          />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;