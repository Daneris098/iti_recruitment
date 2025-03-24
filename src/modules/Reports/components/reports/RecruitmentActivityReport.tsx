import { MultiSelect } from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { DateRange } from "@modules/Reports/components/DateRange";
import { useDateRangeStore } from "@shared/hooks/useDateRange";
export default function index() {
    const { value, setValue } = useDateRangeStore();
    return (
        <div className="flex flex-col gap-4">
            <MultiSelect classNames={{ input: 'poppins text-[#6D6D6D]', pill: 'poppins text-[#6D6D6D]', dropdown: 'poppins text-[#6D6D6D]' }} radius={8} data={["ITI", 'ALL']} className="w-full text-[#6D6D6D]" size="md" label="Company" placeholder="Select Company" rightSection={<IconCaretDownFilled size='18' />} />
            <DateRange
                gapValue={20}
                size="md"
                value={value}
                setValue={setValue}
                fLabel="Date Range From"
                lLabel="Date Range to"
                fPlaceholder="Select Start Date"
                lPlaceholder="Select End Date"
            />
            <div className="flex gap-6">
                <MultiSelect classNames={{ input: 'poppins text-[#6D6D6D]', pill: 'poppins text-[#6D6D6D]', dropdown: 'poppins text-[#6D6D6D]' }} radius={8} data={["IT", 'Accounting']} className="w-full text-[#6D6D6D]" size="md" label="Department" placeholder="Specify Department" rightSection={<IconCaretDownFilled size='18' />} />
                <MultiSelect classNames={{ input: 'poppins text-[#6D6D6D]', pill: 'poppins text-[#6D6D6D]', dropdown: 'poppins text-[#6D6D6D]' }} radius={8} data={["Junior", 'Senior']} className="w-full text-[#6D6D6D]" size="md" label="Position" placeholder="Specify Position" rightSection={<IconCaretDownFilled size='18' />} />
            </div>
            <MultiSelect classNames={{ input: 'poppins text-[#6D6D6D]', pill: 'poppins text-[#6D6D6D]', dropdown: 'poppins text-[#6D6D6D]' }} radius={8} data={["Inactive", 'Not Qualified', "Offer Declined"]} className="w-full text-[#6D6D6D]" size="md" label="Archived Status Feedback" placeholder="Choose feedback to display" rightSection={<IconCaretDownFilled size='18' />} />
        </div>
    )
}