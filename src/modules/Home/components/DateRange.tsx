import { DatePicker } from "@mantine/dates";
import { useState } from "react";

export const DateRange = () => {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker value={value} onChange={setValue} />;
};
