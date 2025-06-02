import { Divider, Select, TextInput, Popover, Checkbox, NumberInput, Autocomplete } from "@mantine/core";
import { useForm } from '@mantine/form';
import { GlobalStore } from "@src/utils/GlobalStore";
import { ApplicationStore } from "@modules/HomePublic/store"
import { IconCalendarMonth, IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Step, GeneralInformation } from '@modules/HomePublic/types';
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { cn } from "@src/lib/utils";
import axiosInstance from "@src/api";

export default function index() {
    const { isMobile } = GlobalStore()
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [vacancies, setVacancies] = useState([
        { id: 1, value: 'Software Engineer', label: 'Software Engineer' },
        { id: 2, value: 'Web Developer', label: 'Web Developer' },
    ]);
    const [cities, setCities] = useState([
    ]);
    const [barangay, setBarangay] = useState([
    ]);
    const [barangay2, setBarangay2] = useState([
    ]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.generalInformation,
        validate: {
            firstChoice: (value: string) => value === null || value === '' ? "First choice is required" : null,
            secondChoice: (value: string) => value === null || value === '' ? "First choice is required" : null,
            desiredSalary: (value: number) => value <= 0 ? "Desired salary must be greater than 0" : null,
            startDateAvailability: (value: string) => value.length === 0 ? "Start date availability is required" : null,

            personalInformation: {
                fullname: {
                    firstName: (value: string) => !value.trim() ? "First name is required" : null,
                    middleName: (value: string) => !value.trim() ? "(Write N/A if not applicable)" : null,
                    lastName: (value: string) => !value.trim() ? "Last name is required" : null,
                    suffix: (value: string) => !value.trim() ? "(Write N/A if not applicable)" : null,
                },
                presentAddress: {
                    unitNo: (value: string) => value.length === 0 ? "Unit No is required" : null,
                    houseNo: (value: string) => value.length === 0 ? "House No is required" : null,
                    street: (value: string) => value.length === 0 ? "Street is required" : null,
                    subdivision: (value: string) => value.length === 0 ? "Subdivision is required" : null,
                    barangay: (value: string) => value.length === 0 ? "Barangay is required" : null,
                    city: (value: string) => value.length === 0 ? "City is required" : null,
                    zipCode: (value: string) => value.length === 0 ? "Zip code is required" : null,
                    livingArrangement: (value: string) => value.length === 0 ? "Living arrangement is required" : null,
                },

                permanentAddress: {
                    unitNo: (value: string) => value.length === 0 ? "Unit No is required" : null,
                    houseNo: (value: string) => value.length === 0 ? "House No is required" : null,
                    street: (value: string) => value.length === 0 ? "Street is required" : null,
                    subdivision: (value: string) => value.length === 0 ? "Subdivision is required" : null,
                    barangay: (value: string) => value.length === 0 ? "Barangay is required" : null,
                    city: (value: string) => value.length === 0 ? "City is required" : null,
                    zipCode: (value: string) => value.length === 0 ? "Zip code is required" : null,
                    livingArrangement: (value: string) => value.length === 0 ? "Address type is required" : null,
                },


                dateOfBirth: (value: string) => value.length === 0 ? "Date of birth is required" : null,
                placeOfBirth: (value: string) => value.length === 0 ? "Places of birth is required" : null,
                religion: (value: string) => value.length === 0 ? "Religion is required" : null,
                age: (value: number) => value <= 0 ? "Age must be greater than 0" : null,
                gender: (value: string) => value.length === 0 ? "Gender is required" : null,
                height: (value: number | null) => value === null ? "Height is required" : null,
                weight: (value: number | null) => value === null ? "Weight is required" : null,
                civilStatus: (value: string) => value.length === 0 ? "Civil Status is required" : null,
                mobileNumber: (value: string) => value.length < 10 ? "Enter a valid mobile number" : null,
                workingEmailAddress: (value: string) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "Enter a valid email address" : null,
                landlineNumber: (value: string) => value.length < 10 ? "Enter a valid mobile number" : null,

                governmentIdOrNumber: {
                    sssNo: (value: string) => value && value.length !== 10 ? "Please input a valid SSS Number" : null,
                    gsisNo: (value: string) => value && value.length !== 11 ? "Please input a valid GSIS Number" : null,
                    pagibigNo: (value: string) => value && value.length !== 11 ? "Please input a valid Pag-IBIG Number" : null,
                    driversLicense: (value: string) => value && value.length !== 11 ? "Please input a valid Driver's License Number" : null,
                    philhealthNo: (value: string) => value && value.length !== 12 ? "Please input a valid Philhealth Number" : null,
                    passport: (value: string) => value && value.length !== 12 ? "Please input a valid Passport Number" : null,
                    tinNo: (value: string) => value && (value.length < 9 || value.length > 12) ? "Please input a valid Tin Number" : null,
                    rdoCode: (value: string) => value && value.length !== 3 ? "RDO Code is required" : null,
                }

            }
        }
    });

    const onSubmit = async (form: GeneralInformation) => {
        setApplicationForm({ ...applicationForm, generalInformation: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.GeneralInformation && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

    useEffect(() => {
        const dateOfBirth = form.getValues().personalInformation.dateOfBirth;

        const birthDate = new Date(dateOfBirth);
        let age = new Date().getFullYear() - birthDate.getFullYear();
        const monthDifference = new Date().getMonth() - birthDate.getMonth();

        // Adjust if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && new Date().getDate() < birthDate.getDate())) {
            age--;
        }
        form.setFieldValue('personalInformation.age', age);
        // form.setValues({ ...form.getValues(), personalInformation: { ...form.getValues().personalInformation, age: age } });
        // setApplicationForm({ ...applicationForm, generalInformation: { ...applicationForm.generalInformation, personalInformation: { ...applicationForm.generalInformation.personalInformation, age: age } } });
    }, [form.getValues().personalInformation.dateOfBirth]);



    const fetchLookups = async () => {
        await axiosInstance
            .get("/recruitment/vacancies")
            .then((response) => {
                const map = response.data.items.map((item: any) => {
                    return {
                        id: item.id,
                        value: item.positionTitleResponse,
                        label: item.positionTitleResponse,
                    }
                });
                setVacancies(map)
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });
        await axiosInstance
            .get("/general/cities")
            .then((response) => {
                const seen = new Set();
                const map = response.data.items
                    .filter((item: any) => {
                        if (seen.has(item.name)) return false;
                        seen.add(item.name);
                        return true;
                    })
                    .map((item: any) => ({
                        id: item.id,
                        value: item.name,
                        label: item.name,
                    }));
                setCities(map);
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });

    };

    useEffect(() => {
        fetchLookups()
    }, [])

    const fetchBarangays = async (cityId: number, mode: number = 1) => {
        await axiosInstance
            .get(`/general/cities/${cityId}/barangays`)
            .then((response) => {
                const seen = new Set();
                const map = response.data.items
                    .filter((item: any) => {
                        if (seen.has(item.name)) return false;
                        seen.add(item.name);
                        return true;
                    })
                    .map((item: any) => ({
                        id: item.id,
                        value: item.name,
                        label: item.name,
                    }));
                if (mode == 1) {
                    setBarangay(map);
                }
                else {
                    setBarangay2(map);
                }
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });
    }

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4 relative">
                <p className="font-bold">General Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end ">
                    <Select
                        withAsterisk
                        {...form.getInputProps("firstChoice")}
                        w={isMobile ? '25%' : '100%'}
                        label="Position Applying for - First Choice"
                        placeholder={"First Choice"}
                        radius={8}
                        data={vacancies}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />

                    <Select
                        {...form.getInputProps("secondChoice")}
                        w={isMobile ? '25%' : '100%'}
                        label="Position Applying for - Second Choice"
                        placeholder={"Second Choice"}
                        radius={8}
                        data={vacancies}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />

                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <NumberInput withAsterisk hideControls min={1} {...form.getInputProps("desiredSalary")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '50%' : '100%'} label="Desired Salary" placeholder="Desired Salary in PESO" />
                    <Popover
                        position="bottom"
                        shadow="md"
                        trapFocus={true}
                        returnFocus={true}
                    >
                        <Popover.Target>
                            <TextInput
                                withAsterisk
                                {...form.getInputProps("startDateAvailability")}
                                key={form.key('startDateAvailability')}
                                radius='md' w={isMobile ? '25%' : '100%'}
                                readOnly
                                label='Availability to Start'
                                placeholder='Select Date'
                                className="w-full cursor-default"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                rightSection={<IconCalendarMonth />}
                                styles={{ label: { color: "#6d6d6d" } }}
                            />
                        </Popover.Target>
                        <Popover.Dropdown className="w-full">
                            <DatePicker minDate={new Date()} firstDayOfWeek={0}  {...form.getInputProps("startDateAvailability")} onChange={(value: Date | null) => { form.setFieldValue("startDateAvailability", value ? dayjs(value).format("YYYY-MM-DD") : '') }} />
                        </Popover.Dropdown>
                    </Popover>
                </div>

                <p className="font-bold">Personal Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.lastName")} radius='md' w={isMobile ? '25%' : '100%'} label={<p>Full Name <span className="text-red-500">*</span><span className="text-[#A8A8A8]">(Write N/A if not applicable)</span></p>} placeholder="Last Name" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.firstName")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="First Name" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.middleName")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Middle Name" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.suffix")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Suffix(Jr. Sr. etc.)" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end relative  ">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.unitNo")} key={form.key('personalInformation.presentAddress.unitNo')} radius='md' w={isMobile ? '25%' : '100%'} label={<p>Present Address <span className="text-red-500">*</span><span className="text-[#A8A8A8] absolute">(Write N/A if not applicable)</span></p>} placeholder="Unit no." />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.houseNo")} key={form.key('personalInformation.presentAddress.houseNo')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.street")} key={form.key('personalInformation.presentAddress.street')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.subdivision")} key={form.key('personalInformation.presentAddress.subdivision')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Autocomplete
                        {...form.getInputProps("personalInformation.presentAddress.city")}
                        // key={form.key('personalInformation.presentAddress.city')}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"City"}
                        radius={8}
                        data={cities}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={((val) => {
                            const selectedCity = cities.find(city => city.value === val);
                            fetchBarangays(selectedCity?.id ?? 1, 1)
                            form.setFieldValue("personalInformation.presentAddress.city", val);
                        })}
                    />

                    <Select
                        {...form.getInputProps("personalInformation.presentAddress.barangay")}
                        key={form.key('personalInformation.presentAddress.barangay')}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Barangay"}
                        radius={8}
                        data={barangay}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}

                    />

                    <Select
                        {...form.getInputProps("personalInformation.presentAddress.zipCode")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Zip Code"}
                        radius={8}
                        data={["1400", "1500", "1600"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        {...form.getInputProps("personalInformation.presentAddress.livingArrangement")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Living Arrangement"}
                        radius={8}
                        data={["RELATIVES", "OWNED", "RENTED", "WILLING TO RELOCATE"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    {/* <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Living Arrangement" /> */}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end relative">
                    <div className={cn("w-[100%]", isMobile && "w-[25%]  bg-green-400")}>
                        <Checkbox
                            checked={sameAsPresent}
                            label="Same as Present Address"
                            classNames={{ label: 'poppins' }}
                            className="absolute ml-36 text-xs  text-blue-400 sm:px-2 "
                            onChange={(value) => {
                                console.log('form.getValues().personalInformation.presentAddress: ', form.getValues().personalInformation.presentAddress)
                                setSameAsPresent(value.target.checked);
                                if (value.target.checked) {
                                    form.setValues({
                                        ...form.getValues(),
                                        personalInformation: {
                                            ...form.getValues().personalInformation, // Preserve all existing fields
                                            permanentAddress: form.getValues().personalInformation.presentAddress,
                                        },
                                    });
                                }
                            }}
                        />
                        <TextInput disabled={sameAsPresent} withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.unitNo")} key={form.key('personalInformation.permanentAddress.unitNo')} radius='md' w={isMobile ? '25%' : '100%'} label="Permanent Address" placeholder="Unit no." />
                    </div>
                    <TextInput disabled={sameAsPresent} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.houseNo")} key={form.key('personalInformation.permanentAddress.houseNo')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                    <TextInput disabled={sameAsPresent} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.street")} key={form.key('personalInformation.permanentAddress.street')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                    <TextInput disabled={sameAsPresent} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.subdivision")} key={form.key('personalInformation.permanentAddress.subdivision')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Autocomplete
                        disabled={sameAsPresent}
                        key={form.key('personalInformation.permanentAddress.city')}
                        {...form.getInputProps("personalInformation.permanentAddress.city")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"City"}
                        radius={8}
                        data={cities}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={((val) => {
                            const selectedCity = cities.find(city => city.value === val);
                            console.log('Selected city ID:', selectedCity?.id);
                            fetchBarangays(selectedCity?.id ?? 1, 2)
                            form.setFieldValue("personalInformation.permanentAddress.city", val);
                        })}
                    />

                    <Select
                        disabled={sameAsPresent}
                        key={form.key('personalInformation.permanentAddress.barangay')}
                        {...form.getInputProps("personalInformation.permanentAddress.barangay")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Barangay"}
                        radius={8}
                        data={sameAsPresent ? barangay : barangay2}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />

                    <Select
                        disabled={sameAsPresent}
                        key={form.key('personalInformation.permanentAddress.zipCode')}
                        {...form.getInputProps("personalInformation.permanentAddress.zipCode")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Zip Code"}
                        radius={8}
                        data={["1400", "1500", "1600"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        disabled={sameAsPresent}
                        key={form.key('personalInformation.permanentAddress.livingArrangement')}
                        {...form.getInputProps("personalInformation.permanentAddress.livingArrangement")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Living Arrangement"}
                        radius={8}
                        data={["RELATIVES", "OWNED", "RENTED", "WILLING TO RELOCATE"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Popover
                        position="bottom"
                        shadow="md"
                        trapFocus={true}
                        returnFocus={true}
                    >
                        <Popover.Target>
                            <TextInput
                                withAsterisk
                                {...form.getInputProps("personalInformation.dateOfBirth")}
                                key={form.key('personalInformation.dateOfBirth')}
                                radius='md' w={isMobile ? '25%' : '100%'}
                                readOnly
                                label='Date of Birth'
                                placeholder='Select Date'
                                className="w-full cursor-default"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                rightSection={<IconCalendarMonth />}
                                styles={{ label: { color: "#6d6d6d" } }}
                            />
                        </Popover.Target>
                        <Popover.Dropdown className="w-full">
                            <DatePicker maxDate={new Date()} firstDayOfWeek={0}  {...form.getInputProps("personalInformation.dateOfBirth")} onChange={(value: Date | null) => { form.setFieldValue("personalInformation.dateOfBirth", value ? dayjs(value).format("YYYY-MM-DD") : '') }} />
                        </Popover.Dropdown>
                    </Popover>

                    <TextInput withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.placeOfBirth")} radius='md' w={isMobile ? '25%' : '100%'} label="Place of birth" placeholder="Place of birth" />
                    <TextInput disabled classNames={{ input: 'poppins text-[#6D6D6D]' }} key={form.key('personalInformation.age')} {...form.getInputProps("personalInformation.age")} radius='md' w={isMobile ? '25%' : '100%'} label="Age" placeholder="Age" />

                    <Select
                        withAsterisk
                        key={form.key('personalInformation.gender')}
                        {...form.getInputProps("personalInformation.gender")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder="Gender"
                        label="Gender"
                        radius={8}
                        data={["Male", "Female"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />

                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <NumberInput hideControls withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.height")} radius='md' w={isMobile ? '25%' : '100%'} label="Height" placeholder="Height" />
                    <NumberInput hideControls withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.weight")} radius='md' w={isMobile ? '25%' : '100%'} label="Weight" placeholder="Weight" />
                    <TextInput withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.civilStatus")} radius='md' w={isMobile ? '25%' : '100%'} label="Civil Status" placeholder="Civil Status" />
                    <TextInput withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.religion")} radius='md' w={isMobile ? '25%' : '100%'} label="Religion" placeholder="Religion" />
                </div>



                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} withAsterisk {...form.getInputProps("personalInformation.mobileNumber")} radius='md' w={isMobile ? '33%' : '100%'} label="Mobile Number" placeholder="Mobile Number (+63)" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} withAsterisk {...form.getInputProps("personalInformation.workingEmailAddress")} radius='md' w={isMobile ? '33%' : '100%'} label="Working Email Address" placeholder="Email Address" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.landlineNumber")} radius='md' w={isMobile ? '33%' : '100%'} label="Landline Number" placeholder="Landline Number" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.sssNo")} radius='md' w={isMobile ? '33%' : '100%'} label="Government ID Number(s)" placeholder="SSS No." />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.gsisNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="GSIS No." />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.pagibigNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Pagibig-No." />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.philhealthNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="PhilHealth No." />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.driversLicense")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Drivers License No." />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.passport")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Passport No." />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.tinNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="TIN No." />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.rdoCode")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="RDO Code" />
                </div>

            </div>

        </form>

    )
}