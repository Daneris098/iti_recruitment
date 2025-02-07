import { Modal, Divider, Button, Popover, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { GlobalStore } from '@src/utils/GlobalStore';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { useEffect, useRef } from "react";
import { DateRange } from '../DateRange';
import { useDateRangeStore } from "@shared/hooks/useDateRange";
import { Vacancytore, DialogStore } from "@modules/Vacancies/store";
import { AlertType } from '../../types';

export default function index() {
    const { isMobile } = GlobalStore()
    const { action, setAction } = DialogStore()
    const { setAlert } = Vacancytore();
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {},
        validate: {
            // firstChoice: (value: string) => value.length === 0 ? "First choice is required" : null,
            // desiredSalary: (value: number) => value <= 0 ? "Desired salary must be greater than 0" : null,
            // startDateAvailability: (value: string) => value.length === 0 ? "Start date availability is required" : null,
        }
    });

    const onSubmit = async (form: any) => {
    };

    const { value, setValue } = useDateRangeStore();


    return (
        <Modal size={'80%'} opened={action != ''} centered onClose={() => setAction('')} title={'Add Vacancy'}
            className='text-[#559CDA]' styles={{
                header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
            }} >
            <div className='m-auto w-[95%] '>

                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className="flex flex-col sm:flex-row gap-4 items-end w-full">
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Company"
                            placeholder={"Select Company"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex flex-col gap-4  w-full'>
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Branch"
                            placeholder={"Select Branch"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Division"
                            placeholder={"Select Division"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm  w-full"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4  w-full flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Department"
                            placeholder={"Select Department"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Section"
                            placeholder={"Select Section"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4  w-full flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Position Level"
                            placeholder={"Select Position Level"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Payroll Group"
                            placeholder={"Select Payroll Group"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4  w-full flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Union Member"
                            placeholder={"Select Union Member"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Hiring Manager"
                            placeholder={"Select Hiring Manager"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4  w-full flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Employment Type"
                            placeholder={"Select Employment Type"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Workplace Type"
                            placeholder={"Select Workplace Type"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4 flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Vacancy Type"
                            placeholder={"Select Vacancy Type"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("firstChoice")}
                            label="Experience Level"
                            placeholder={"Select Experience Level"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4 '>
                        <div className='w-1/2'>
                            <DateRange
                                gapValue={12}
                                size="lg"
                                value={value}
                                setValue={setValue}
                                fLabel="Vacancy Duration"
                                lLabel=" "
                                fPlaceholder="Start Date"
                                lPlaceholder="End Date"
                            />
                        </div>
                        <TextInput className='w-1/2 text-[#6D6D6D]' {...form.getInputProps("desiredSalary")} radius='md' size="lg" label="No. of Open Positions" placeholder="Specify the number of open position here." />
                    </div>

                    <Textarea
                        size="lg"
                        placeholder="Write Job Description here."
                        label="Job Description"
                        autosize
                        minRows={2}
                        classNames={{ label: "text-[#6D6D6D]", input: "rounded-md" }}
                    />

                    <TextInput className='text-[#6D6D6D]' {...form.getInputProps("desiredSalary")} radius='md' size="lg" label="Must have Skills" placeholder="Type keyword to set required skills." />
                    <TextInput className='text-[#6D6D6D]' {...form.getInputProps("desiredSalary")} radius='md' size="lg" label="Qualification" placeholder="Write Qualification here." />

                    <Button
                        variant="transparent"
                        className="br-gradient border-none text-white w-[10%] self-end"
                        radius={10}
                        onClick={() => {
                            setAlert(AlertType.vacancyAddedSuccesfull)
                            setAction('')
                        }}
                    >ADD</Button>

                </form>
            </div>
        </Modal>
    )
}