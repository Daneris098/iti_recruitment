import '@mantine/tiptap/styles.css';
import { useEffect, useRef, useState } from "react";
import { Modal, Divider, Button, Select, TextInput, MultiSelect, Flex, Popover, Text } from '@mantine/core';
import { IconCalendarMonth, IconCaretDownFilled, IconX } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { VacancyStore } from "@modules/Vacancies/store";
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { AlertType, ActionTitle, ActionButtonTitle } from '@modules/Vacancies/types';
import { DateTimeUtils } from '@shared/utils/DateTimeUtils';
import { selectedDataVal } from '@src/modules/Vacancies/values';
import { vacancyFormInitialData } from '@src/modules/HiringSettings/values';

export default function index() {
    const { action, setAction, setAlert, setSelectedVacancy, selectedVacancy } = VacancyStore();
    const [vacancyDuration, setVacancyDuration] = useState<[Date | null, Date | null]>([null, null]);
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const [mustHaveSkills, setMustHaveSkills] = useState<string[]>([]);
    const [opened, setOpened] = useState(false);
    const [opened2, setOpened2] = useState(false);
    useEffect(() => {
        if (vacancyDuration[0] != null && vacancyDuration[1] != null) {
            setOpened(false)
            setOpened2(false)
        }
    }, [vacancyDuration])
    const myRef = useRef(null);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: vacancyFormInitialData,
        validate: {
            positionTitle: (value: string) => value.length === 0 ? "Position Title is required" : null,
            company: (value: string) => value.length === 0 ? "Company is required" : null,
            branch: (value: string) => value.length === 0 ? "Branch is required" : null,
            division: (value: string) => value.length === 0 ? "Division is required" : null,
            department: (value: string) => value.length === 0 ? "Department is required" : null,
            section: (value: string) => value.length === 0 ? "Section is required" : null,
            employmentType: (value: string) => value.length === 0 ? "Employment Type is required" : null,
            workplaceType: (value: string) => value.length === 0 ? "Work Type is required" : null,
            vacancyType: (value: string) => value.length === 0 ? "Vacancy Type is required" : null,
            experienceLevel: (value: string) => value.length === 0 ? "Experience Level is required" : null,
            duration: {
                start: (value: string) => value.length === 0 ? "Start date is required" : null,
                end: (value: string) => value.length === 0 ? "End date is required" : null,
            },
            noOfOpenPosition: (value: number) => value <= 0 ? "Number of open position must be greater than 0" : null,
            jobDescription: (value: string) => value == "<p>Write Job Description Here</p>" || value === '<p></p>' || value == "" ? "Job Description is required" : null,
            mustHaveSkills: (value: string) => value.length === 0 ? "Must have skills is required" : null,
            qualification: (value: string) => value == "<p>Write Qualification here</p>" || value === '<p></p>' || value == "" ? "Qualification is required" : null,
        }
    });

    const handleChange = (value: any) => {
        setMustHaveSkills(value);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            if (!mustHaveSkills.includes(newValue)) {
                setMustHaveSkills((prev) => [...prev, newValue]);
                (myRef as any).current.value = "";
            }
            event.preventDefault();
        }
    };

    useEffect(() => {
        form.setFieldValue('mustHaveSkills', mustHaveSkills.toString())
    }, [mustHaveSkills])

    const editor = useEditor({
        extensions: [
            TextStyle, Color,
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: action == 'Edit' ? selectedVacancy.jobDescription : `<p>Write Job Description Here</p>`,
        onUpdate: ({ editor }) => {
            form.setFieldValue('jobDescription', editor.getHTML());
        },
    });

    const editor2 = useEditor({
        extensions: [
            TextStyle, Color,
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: action == 'Edit' ? selectedVacancy.qualification : `<p>Write Qualification here</p>`,
        onUpdate: ({ editor }) => {
            form.setFieldValue('qualification', editor.getHTML());
        },
    });

    useEffect(() => {

        if (action == 'Edit') {
            form.setFieldValue('positionTitle', selectedVacancy.position)
            form.setFieldValue('company', selectedVacancy.company)
            form.setFieldValue('branch', selectedVacancy.branch)
            form.setFieldValue('division', selectedVacancy.division)
            form.setFieldValue('department', selectedVacancy.department)
            form.setFieldValue('section', selectedVacancy.section)
            form.setFieldValue('employmentType', selectedVacancy.employmentType)
            form.setFieldValue('workplaceType', selectedVacancy.workplace)
            form.setFieldValue('vacancyType', selectedVacancy.vacancyType)
            form.setFieldValue('experienceLevel', selectedVacancy.experienceLevel)
            form.setFieldValue('duration.start', selectedVacancy.vacancyDuration.start)
            form.setFieldValue('duration.end', selectedVacancy.vacancyDuration.end)
            form.setFieldValue('noOfOpenPosition', selectedVacancy.quantity)

            form.setFieldValue('jobDescription', selectedVacancy.jobDescription)
            form.setFieldValue('qualification', selectedVacancy.qualification)

            editor?.commands.setContent(selectedVacancy.jobDescription)
            setMustHaveSkills(selectedVacancy.skills);
            editor2?.commands.setContent(selectedVacancy.qualification)
        }
        else {
            form.setValues(vacancyFormInitialData);
            editor?.commands.setContent("<p>Write Job Description Here</p>")
            setMustHaveSkills(selectedVacancy.skills);
            editor2?.commands.setContent("<p>Write Qualification here</p>")
        }
    }, [action, selectedVacancy])

    const onSubmit = async () => {
        formRef.current?.requestSubmit();
        setAlert(action === 'Edit' ? AlertType.updateSuccessfully : AlertType.vacancyAddedSuccesfull)
        setAction('')
        setSelectedVacancy(selectedDataVal);
    };



    return (
        <Modal radius="lg" size={'80%'} opened={action != ''} withCloseButton={false} centered onClose={() => { setAction(''); setSelectedVacancy(selectedDataVal); }}
            className='text-[#559CDA] scrollbar' classNames={{ content: 'scrollbar' }}

            styles={{
                header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
            }} >
            <div className='m-auto w-[95%] poppins text-[#6D6D6D] '>
                <div className='top-0 z-50 sticky bg-white'>
                    <div className='flex justify-between'>
                        <p className='text-[#559CDA] text-[22px] font-bold py-2'>{ActionTitle[action as keyof typeof ActionTitle]}</p>
                        <IconX size={30} className="text-[#6D6D6D] cursor-pointer" onClick={() => { setAction(''); setSelectedVacancy(selectedDataVal); }} />
                    </div>
                    <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                </div>
                <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <TextInput key={form.key('positionTitle')} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("positionTitle")} radius='md' size="lg" label="Position Title" placeholder={"Type Position Title"} />
                    <Select key={form.key('company')} {...form.getInputProps("company")} label="Company" placeholder={"Select Company"} radius={8} data={["Cloud Innovations Ltd.", "Business Solutions Inc.", "Tech Innovations Inc.", "Innovate Solutions Ltd.", "Data Insights Corp.", "Creative Marketing Agency"]}
                        rightSection={<IconCaretDownFilled size='18' />} className="border-none w-full text-sm" classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }} size='lg'
                    />

                    <div className='flex flex-col lg:flex-row gap-4  w-full'>
                        <Select
                            {...form.getInputProps("branch")}
                            key={form.key('branch')}
                            label="Branch"
                            placeholder={"Select Branch"}
                            radius={8}
                            data={["Remote Team", "San Francisco", "New Yorks"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("division")}
                            key={form.key('division')}
                            label="Division"
                            placeholder={"Select Division"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA", "Analytics"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm "
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4  w-full flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("department")}
                            key={form.key('department')}
                            label="Department"
                            placeholder={"Select Department"}
                            radius={8}
                            data={["Business"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("section")}
                            key={form.key('section')}
                            label="Section"
                            placeholder={"Select Section"}
                            radius={8}
                            data={["Network Management", "Content Creation", "Business Analysis"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4  w-full flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("employmentType")}
                            key={form.key('employmentType')}
                            label="Employment Type"
                            placeholder={"Select Employment Type"}
                            radius={8}
                            data={["Full-time", "Part-time"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("workplaceType")}
                            key={form.key('workplaceType')}
                            label="Workplace Type"
                            placeholder={"Select Workplace Type"}
                            radius={8}
                            data={["Remote", "On-site"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4 flex-col sm:flex-row'>
                        <Select
                            {...form.getInputProps("vacancyType")}
                            key={form.key('vacancyType')}
                            label="Vacancy Type"
                            placeholder={"Select Vacancy Type"}
                            radius={8}
                            data={["External", "Internal"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                        <Select
                            {...form.getInputProps("experienceLevel")}
                            key={form.key('experienceLevel')}
                            label="Experience Level"
                            placeholder={"Select Experience Level"}
                            radius={8}
                            data={["Entry-level", "Mid-level", "Senior"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            size='lg'
                        />
                    </div>

                    <div className='flex gap-4 items-end'>
                        <div className='w-1/2'>
                            <Flex
                                direction="row"
                                justify="space-between"
                                gap={12}
                                className="w-full items-end"
                            >
                                <Popover opened={opened} position="bottom" shadow="md" trapFocus={true} returnFocus={true}>
                                    <Popover.Target>
                                        <TextInput
                                            radius="md"
                                            size={'lg'}
                                            readOnly
                                            label="Vacancy Duration"
                                            placeholder="Start Date"
                                            className="w-full cursor-default"
                                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ' }}
                                            rightSection={<IconCalendarMonth />}
                                            styles={{ label: { color: "#6d6d6d" } }}
                                            {...form.getInputProps("duration.start")}
                                            onClick={() => {
                                                setOpened((o) => !o)
                                                setOpened2((o) => o ? false : o)
                                            }}
                                        />
                                    </Popover.Target>
                                    <Popover.Dropdown className="w-full">
                                        <DatePicker
                                            firstDayOfWeek={0}
                                            numberOfColumns={2}
                                            type="range"
                                            value={vacancyDuration}
                                            onChange={(e) => {
                                                if (e[0] != null)
                                                    form.setFieldValue('duration.start', DateTimeUtils.dayWithDate(`${e[0]?.toString()}`))
                                                if (e[1] != null)
                                                    form.setFieldValue('duration.end', DateTimeUtils.dayWithDate(`${e[1]?.toString()}`))
                                                setVacancyDuration(e)
                                            }}
                                        />
                                    </Popover.Dropdown>
                                </Popover>
                                <Popover opened={opened2} position="bottom" shadow="md">
                                    <Popover.Target>
                                        <TextInput
                                            radius="md"
                                            size={'lg'}
                                            readOnly
                                            label={""}
                                            placeholder="End Date"
                                            rightSection={<IconCalendarMonth />}
                                            className="w-full"
                                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D] ' }}
                                            styles={{ label: { color: "#6d6d6d" } }}
                                            {...form.getInputProps("duration.end")}
                                            onClick={() => {
                                                setOpened((o) => o ? false : o)
                                                setOpened2((o) => !o)
                                            }}
                                        />
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <DatePicker
                                            numberOfColumns={2}
                                            type="range"
                                            value={vacancyDuration}
                                            onChange={(e) => {
                                                if (e[0] != null)
                                                    form.setFieldValue('duration.start', DateTimeUtils.dayWithDate(`${e[0]?.toString()}`))
                                                if (e[1] != null)
                                                    form.setFieldValue('duration.end', DateTimeUtils.dayWithDate(`${e[1]?.toString()}`))
                                                setVacancyDuration(e)
                                            }}
                                        />
                                    </Popover.Dropdown>
                                </Popover>
                            </Flex>
                        </div>
                        <TextInput className='w-1/2 text-[#6D6D6D]' key={form.key('noOfOpenPosition')} {...form.getInputProps("noOfOpenPosition")} radius='md' size="lg" label="No. of Open Positions" placeholder="Specify the number of open position here." />
                    </div>

                    <p className='text-[#6D6D6D] text-lg ' >Job Description</p>
                    <div className={`border ${form.errors.jobDescription ? 'border-red-500' : 'border-gray-300'} rounded-md transition-colors duration-200 relative`}>
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Subscript />
                                    <RichTextEditor.Superscript />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Undo />
                                    <RichTextEditor.Redo />
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>

                            <RichTextEditor.Content className={`border ${form.errors.jobDescription ? 'text-red-500' : ''}`} />
                        </RichTextEditor>
                        {form.errors.jobDescription && (
                            <Text className='absolute' color="red" size="sm">
                                {form.errors.jobDescription}
                            </Text>
                        )}

                    </div>

                    <MultiSelect radius='md' size="lg" label="Must have Skills" ref={myRef}
                        {...form.getInputProps("mustHaveSkills")}
                        key={form.key('mustHaveSkills')}
                        classNames={{ dropdown: 'hidden', input: 'poppins text-[#6D6D6D]', pill: 'poppins text-[#6D6D6D]' }}
                        className='w-full'
                        placeholder="Type keyword to set required skills."
                        data={[]}
                        searchable
                        value={mustHaveSkills}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />

                    <p className='text-[#6D6D6D] text-lg'>Qualification</p>
                    <div className={`border ${form.errors.qualification ? 'border-red-500' : 'border-gray-300'} rounded-md transition-colors duration-200 relative`}>
                        <RichTextEditor editor={editor2}>
                            <RichTextEditor.Toolbar sticky>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Subscript />
                                    <RichTextEditor.Superscript />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Undo />
                                    <RichTextEditor.Redo />
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>

                            <RichTextEditor.Content className={`border ${form.errors.jobDescription ? 'text-red-500' : ''}`} />
                        </RichTextEditor>
                        {form.errors.qualification && (
                            <Text className='absolute' color="red" size="sm">
                                {form.errors.qualification}
                            </Text>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="br-gradient border-none text-white w-[10%] self-end"
                        variant="transparent"
                        radius={10}
                    >{ActionButtonTitle[action as keyof typeof ActionButtonTitle]}</Button>

                </form>
            </div>
        </Modal>
    )
}