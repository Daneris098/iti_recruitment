import { Modal, Divider, Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { useRef } from "react";
import { DateRange } from '../DateRange';
import { useDateRangeStore } from "@shared/hooks/useDateRange";
import { VacancyStore } from "@modules/Vacancies/store";
import { AlertType } from '../../types';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import '@mantine/tiptap/styles.css';

export default function index() {
    const { action, setAction } = VacancyStore()
    const { setAlert } = VacancyStore();
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
        content: `<p>Write Job Description Here</p>`,
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
        content: `<p>Write Qualification here</p>`,
    });

    const onSubmit = async () => {
    };

    const { value, setValue } = useDateRangeStore();


    return (
        <Modal size={'80%'} opened={action != ''} centered onClose={() => setAction('')} title={'Add Vacancy'}
            styles={{
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

                    <div className='flex flex-col lg:flex-row gap-4  w-full'>
                        <Select
                            {...form.getInputProps("branch")}
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
                            {...form.getInputProps("division")}
                            label="Division"
                            placeholder={"Select Division"}
                            radius={8}
                            data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm "
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

                    <p className='text-[#6D6D6D] text-lg'>Job Description</p>
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
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
                                <RichTextEditor.ColorPicker
                                    colors={[
                                        '#25262b',
                                        '#868e96',
                                        '#fa5252',
                                        '#e64980',
                                        '#be4bdb',
                                        '#7950f2',
                                        '#4c6ef5',
                                        '#228be6',
                                        '#15aabf',
                                        '#12b886',
                                        '#40c057',
                                        '#82c91e',
                                        '#fab005',
                                        '#fd7e14',
                                    ]}
                                />
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

                        <RichTextEditor.Content />
                    </RichTextEditor>

                    <TextInput className='text-[#6D6D6D]' {...form.getInputProps("desiredSalary")} radius='md' size="lg" label="Must have Skills" placeholder="Type keyword to set required skills." />
                    <p className='text-[#6D6D6D] text-lg'>Qualification</p>
                    <RichTextEditor editor={editor2}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
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
                                <RichTextEditor.ColorPicker
                                    colors={[
                                        '#25262b',
                                        '#868e96',
                                        '#fa5252',
                                        '#e64980',
                                        '#be4bdb',
                                        '#7950f2',
                                        '#4c6ef5',
                                        '#228be6',
                                        '#15aabf',
                                        '#12b886',
                                        '#40c057',
                                        '#82c91e',
                                        '#fab005',
                                        '#fd7e14',
                                    ]}
                                />
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

                        <RichTextEditor.Content />
                    </RichTextEditor>

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