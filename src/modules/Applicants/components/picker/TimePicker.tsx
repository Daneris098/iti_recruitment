import { useState } from "react";
import { Popover, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

interface TimePickerProps {
    selectedTime: string;
    onTimeChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ selectedTime, onTimeChange }) => {
    const [timeOpened, setTimeOpened] = useState(false);

    return (
        <div className="relative w-full">
            {/* Read-Only Input with Clock Icon Inside */}
            <Popover
                opened={timeOpened}
                onChange={setTimeOpened}
                position="bottom"
                withArrow
                trapFocus // Ensures the popover stays in focus
                closeOnEscape // Closes when pressing escape
            >
                <Popover.Target>
                    <TextInput
                        value={selectedTime}
                        readOnly
                        placeholder="hh:mm"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents dropdown conflicts
                            setTimeOpened((prev) => !prev);
                        }}
                        styles={{
                            input: {
                                fontSize: "16px",
                                border: "1px solid #6D6D6D",
                                borderRadius: "10px",
                                height: "56px",
                                fontFamily: "poppins",
                            },
                        }}
                        rightSection={
                            <button
                                className="text-gray-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTimeOpened((prev) => !prev);
                                }}
                            >
                                <IconClock size={22} />
                            </button>
                        }
                    />
                </Popover.Target>

                {/* Time Picker Inside Popover */}
                <Popover.Dropdown
                    style={{ zIndex: 1000, position: "absolute" }}
                    onClick={(e) => e.stopPropagation()} // Prevents clicks from closing other dropdowns
                >
                    <TimeInput
                        form="12"
                        value={selectedTime}
                        onChange={(event) => {
                            onTimeChange(event.currentTarget.value);
                            setTimeOpened(false); // Close popover after selection
                        }}
                    />
                </Popover.Dropdown>
            </Popover>
        </div>
    );
};

export default TimePicker;
