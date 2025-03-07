import { MultiSelect } from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { DateRange } from "@modules/Reports/components/DateRange";
import { useDateRangeStore } from "@shared/hooks/useDateRange";
export default function index() {
    const { value, setValue } = useDateRangeStore();
    return (
        <div className="flex flex-col gap-4">
            <MultiSelect radius={8} data={["ITI", 'ALL']} className="w-full text-[#6D6D6D]" size="md" label="Company" placeholder="ALL" rightSection={<IconCaretDownFilled size='18' />} />
            <DateRange
                gapValue={20}
                size="md"
                value={value}
                setValue={setValue}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
            />
            <div className="flex gap-6">
                <MultiSelect radius={8} data={["IT", 'Accounting']} className="w-full text-[#6D6D6D]" size="md" label="Department" placeholder="Specify Department" rightSection={<IconCaretDownFilled size='18' />} />
                <MultiSelect radius={8} data={["Junior", 'Senior']} className="w-full text-[#6D6D6D]" size="md" label="Position" placeholder="Specify Position" rightSection={<IconCaretDownFilled size='18' />} />
            </div>
            <MultiSelect radius={8} data={["ITI", 'ALL']} className="w-full text-[#6D6D6D]" size="md" label="Applicant Status" placeholder="ALL" rightSection={<IconCaretDownFilled size='18' />} />
        </div>
    )
}