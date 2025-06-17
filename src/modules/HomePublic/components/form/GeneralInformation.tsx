import { Divider, Select, TextInput, Popover, Checkbox, NumberInput, Autocomplete } from "@mantine/core";
import { useForm } from '@mantine/form';
import { GlobalStore } from "@src/utils/GlobalStore";
import { ApplicationStore, HomeStore } from "@modules/HomePublic/store"
import { IconCalendarMonth, IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Step, GeneralInformation } from '@modules/HomePublic/types';
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { cn } from "@src/lib/utils";
import axiosInstance from "@src/api";
import { useVacancies } from "@modules/HomePublic/hooks/useVacancies";
import {
    Combobox,
    ComboboxTarget,
    ComboboxDropdown,
    ComboboxOptions,
    ComboboxOption,
    InputBase
} from '@mantine/core';
import { useCombobox } from '@mantine/core';

export default function index() {

    const { isMobile } = GlobalStore()
    const { data: vacanciesData } = useVacancies();
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const { selectedData, barangays, setBarangays, barangays2, setBarangays2, sameAsPresent, setSameAsPresent, isFromPortal } = HomeStore();
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const [vacancies, setVacancies] = useState([
        { id: 1, value: 'Software Engineer', label: 'Software Engineer' },
        { id: 2, value: 'Web Developer', label: 'Web Developer' },
    ]);
    const [cities, setCities] = useState([
        { id: 1, value: 'MANILA', label: 'MANILA' },
    ]);
    const [presentBarangayKey, setPresentBarangayKey] = useState('');
    const [startDateAvailabilityOpened, setStartDateAvailabilityOpened] = useState(false);
    const [datedOfBirthOpened, setDatedOfBirthOpenedOpened] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.generalInformation,
        validate: {
            firstChoice: (value: string) => value === null || value === '' ? "First choice is required" : null,
            desiredSalary: (value: number) => value <= 0 ? "Desired salary must be greater than 0" : null,

            personalInformation: {
                fullname: {
                    firstName: (value: string) => !value.trim() ? "First name is required" : null,
                    lastName: (value: string) => !value.trim() ? "Last name is required" : null,
                },
                presentAddress: {
                    houseNo: (value: string) => value.length === 0 ? "House No is required" : null,
                    street: (value: string) => value.length === 0 ? "Street is required" : null,
                    barangay: (value: string) => value.length === 0 ? "Barangay is required" : null,
                    city: (value: string) => value.length === 0 ? "City is required" : null,
                    // livingArrangement: (value: string) => value.length === 0 ? "Living arrangement is required" : null,
                },

                permanentAddress: {
                    houseNo: (value: string) => value.length === 0 ? "House No is required" : null,
                    street: (value: string) => value.length === 0 ? "Street is required" : null,
                    barangay: (value: string) => value.length === 0 ? "Barangay is required" : null,
                    city: (value: string) => value.length === 0 ? "City is required" : null,
                    // livingArrangement: (value: string) => value.length === 0 ? "Address type is required" : null,
                },


                dateOfBirth: (value: string) => value.length === 0 ? "Date of birth is required" : null,
                placeOfBirth: (value: string) => value.length === 0 ? "Places of birth is required" : null,
                age: (value: number) => value <= 0 ? "Age must be greater than 0" : null,
                gender: (value: string) => value.length === 0 ? "Gender is required" : null,
                civilStatus: (value: string) => value.length === 0 ? "Civil Status is required" : null,
                mobileNumber: (value: number | string) => /^\d+$/.test(value.toString()) ? (value.toString().length < 11 ? "Enter a valid mobile number" : null) : "Mobile number must contain digits only",
                workingEmailAddress: (value: string) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "Enter a valid email address" : null,
                landlineNumber: (value: string) => value && value.length != 8 ? "Enter a valid landline mobile number" : null,

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

    const onSubmit = async (formData: GeneralInformation) => {
        const emailAvailable = await checkIfAvailable('email')
        const mobileAvailable = await checkIfAvailable('mobile')
        if (!emailAvailable) {
            form.setFieldError('personalInformation.workingEmailAddress', 'Email Already Exist!')
        }
        if (!mobileAvailable) {
            form.setFieldError('personalInformation.mobileNumber', 'Mobile Number Already Exist!')
        }
        if (!emailAvailable || !mobileAvailable) {
            return
        }
        setApplicationForm({ ...applicationForm, generalInformation: formData })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    const checkIfAvailable = async (type: string): Promise<boolean> => {
        let payload = {};
        if (type === 'email') {
            payload = {
                Email: form.getValues().personalInformation.workingEmailAddress,
            };
        } else {
            payload = {
                MobileNo: form.getValues().personalInformation.mobileNumber,
            };
        }

        return await axiosInstance
            .get(`/recruitment/applicants/check-availability`, { params: payload })
            .then((response: any) => {
                return response.data;
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message);
                return false;
            });
    };


    useEffect(() => {
        if (submit === true && activeStepper === Step.GeneralInformation && formRef.current) {
            form.setValues({
                ...form.getValues(),
                personalInformation: {
                    ...form.getValues().personalInformation,
                    permanentAddress: form.getValues().personalInformation.presentAddress,
                },
            });
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])


    const fetchCities = async () => {
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
                        value: `${item.id}`,
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
        fetchCities()
    }, [])

    useEffect(() => {
        if (isFromPortal) {
            form.setFieldValue('firstChoice', selectedData.position)
        }
        // fetchCities()
    }, [vacancies])

    useEffect(() => {
        const mapVacancies = vacanciesData?.map((item) => ({
            id: item.id,
            value: String(item.id),
            label: item.position,
        })) ?? [];
        setVacancies(mapVacancies)

    }, [vacanciesData])

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
                    setBarangays(map);
                }
                else {
                    setBarangays2(map);
                }
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });
    }

    const combobox = useCombobox();
    const combobox2 = useCombobox();

    const inputProps = form.getInputProps("firstChoice");

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4 relative">
                <p className="font-bold">General Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end ">
                    <Combobox
                        store={combobox}
                        onOptionSubmit={(val) => {
                            form.setFieldValue('firstChoice', val);
                            combobox.closeDropdown();
                        }}
                    >
                        <ComboboxTarget>
                            <InputBase
                                label="Position Applying for - First Choice"
                                withAsterisk
                                radius={8}
                                rightSection={<IconCaretDownFilled size={18} />}
                                className="border-none w-full text-sm"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                {...form.getInputProps("firstChoice")}
                                component="button"
                                type="button"
                                pointer
                                rightSectionPointerEvents="none"
                                onClick={() => combobox.toggleDropdown()}
                            >
                                {form.getValues().firstChoice}
                            </InputBase>
                        </ComboboxTarget>

                        <ComboboxDropdown>
                            <ComboboxOptions>
                                {vacancies.map((item) => (
                                    <ComboboxOption value={item.label} key={item.id}>
                                        {item.label}
                                    </ComboboxOption>
                                ))}
                            </ComboboxOptions>
                        </ComboboxDropdown>
                    </Combobox>


                    <Combobox
                        store={combobox2}
                        onOptionSubmit={(val) => {
                            form.setFieldValue('secondChoice', val);
                            combobox2.closeDropdown();
                        }}
                    >
                        <ComboboxTarget>
                            <InputBase
                                label="Position Applying for - Second Choice"
                                withAsterisk
                                radius={8}
                                rightSection={<IconCaretDownFilled size={18} />}
                                className="border-none w-full text-sm"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                {...form.getInputProps("secondChoice")}
                                component="button"
                                type="button"
                                pointer
                                rightSectionPointerEvents="none"
                                onClick={() => combobox2.toggleDropdown()}
                            >
                                {form.getValues().secondChoice}
                            </InputBase>
                        </ComboboxTarget>

                        <ComboboxDropdown>
                            <ComboboxOptions>
                                {(form.getValues().firstChoice == '' ? vacancies : vacancies.filter(item => item.label != form.getValues().firstChoice)).map((item) => (
                                    <ComboboxOption value={item.label} key={item.id}>
                                        {item.label}
                                    </ComboboxOption>
                                ))}
                            </ComboboxOptions>
                        </ComboboxDropdown>
                    </Combobox>

                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <NumberInput withAsterisk hideControls min={1} {...form.getInputProps("desiredSalary")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '50%' : '100%'} label="Desired Salary" placeholder="Desired Salary in PESO" />
                    <Popover
                        position="bottom"
                        shadow="md"
                        opened={startDateAvailabilityOpened}
                        onChange={setStartDateAvailabilityOpened}
                    >
                        <Popover.Target>
                            <TextInput
                                {...form.getInputProps("startDateAvailability")}
                                key={form.key('startDateAvailability')}
                                radius='md' w={isMobile ? '25%' : '100%'}
                                readOnly
                                label='Availability to Start'
                                placeholder='Select Date'
                                className="w-full cursor-default"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                rightSection={
                                    <IconCalendarMonth onClick={() => setStartDateAvailabilityOpened((o) => !o)} className="cursor-pointer" />
                                }
                                styles={{ label: { color: "#6d6d6d" } }} onClick={() => setStartDateAvailabilityOpened((o) => !o)}
                            />
                        </Popover.Target>
                        <Popover.Dropdown className="w-full">
                            <DatePicker minDate={new Date()} firstDayOfWeek={0}  {...form.getInputProps("startDateAvailability")} onChange={(value: Date | null) => {
                                if (value != null) {
                                    setStartDateAvailabilityOpened(false)
                                }
                                form.setFieldValue("startDateAvailability", value ? dayjs(value).format("YYYY-MM-DD") : '')
                            }} />
                        </Popover.Dropdown>
                    </Popover>
                </div>

                <p className="font-bold">Personal Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end relative w-full">
                    <TextInput className="w-full sp:w-1/4" classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.lastName")} radius='md' label={<p>Full Name <span className="text-red-500">*</span><span className="text-[#A8A8A8] text-xs">(Leave blank if not applicable)</span></p>} placeholder="Last Name" />
                    <TextInput className="w-full sp:w-1/4" classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.firstName")} radius='md' placeholder="First Name" />
                    <TextInput className="w-full sp:w-1/4" classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.middleName")} radius='md' placeholder="Middle Name" />
                    <TextInput className="w-full sp:w-1/4" classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("personalInformation.fullname.suffix")} radius='md' placeholder="Suffix(Jr. Sr. etc.)" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end relative w-full">
                    <div className="w-full sp:w-1/2 flex items-end gap-4">
                        <TextInput className="w-full sp:w-1/2" classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.unitNo")} key={form.key('personalInformation.presentAddress.unitNo')} radius='md' label={<p>Present Address <span className="text-red-500">*</span><span className="text-[#A8A8A8] absolute text-xs">(Leave blank if not applicable)</span></p>} placeholder="Unit no." />
                        <TextInput className="w-full sp:w-1/2" classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.houseNo")} key={form.key('personalInformation.presentAddress.houseNo')} radius='md' placeholder="House no." />
                    </div>
                    <div className="w-full sp:w-1/2 flex flex-col sp:flex-row items-end gap-4">
                        <TextInput className="w-full sp:w-1/2" classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.street")} key={form.key('personalInformation.presentAddress.street')} radius='md' placeholder="Street" />
                        <TextInput className="w-full sp:w-1/2" classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.presentAddress.subdivision")} key={form.key('personalInformation.presentAddress.subdivision')} radius='md' placeholder="Subdivision" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">

                    <div className="flex flex-col sp:flex-row gap-4  w-full sp:w-1/2">
                        <Autocomplete
                            {...form.getInputProps("personalInformation.presentAddress.city")}
                            // key={presentCityKey}
                            limit={50}
                            placeholder={"City"}
                            radius={8}
                            data={cities}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full sp:w-1/2 text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={((val) => {
                                const selectedCity = cities.find(city => city.label === val);
                                fetchBarangays(selectedCity?.id ?? 1, 1)
                                form.setFieldValue("personalInformation.presentAddress.city", val);
                                form.setFieldValue("personalInformation.presentAddress.barangay", '');
                                setPresentBarangayKey(val)
                            })}
                        />

                        <Autocomplete
                            {...form.getInputProps("personalInformation.presentAddress.barangay")}
                            key={presentBarangayKey}
                            limit={50}
                            placeholder={"Barangay"}
                            radius={8}
                            data={barangays}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full sp:w-1/2 text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={((val) => {
                                form.setFieldValue("personalInformation.presentAddress.barangay", val);
                            })}
                        />
                    </div>

                    <div className="flex gap-4  w-full sp:w-1/2">

                        <TextInput
                            {...form.getInputProps("personalInformation.presentAddress.zipCode")}
                            placeholder={"Zip Code"}
                            radius={8}
                            className="border-none text-sm sp:w-1/2 w-[50%]"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                        />
                        <Select
                            {...form.getInputProps("personalInformation.presentAddress.livingArrangement")}
                            placeholder={"Living Arrangement"}
                            radius={8}
                            data={["RELATIVES", "OWNED", "RENTED", "WILLING TO RELOCATE"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none text-sm sp:w-1/2 w-[50%]"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                        />

                    </div>

                    {/* <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Living Arrangement" /> */}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end relative">
                    <div className={cn("w-[100%]", isMobile && "w-[25%]  ")}>
                        <Checkbox
                            checked={sameAsPresent}
                            label="Same as Present Address"
                            classNames={{ label: 'poppins text-xs ' }}
                            className="absolute ml-36 text-xs  text-blue-400 sm:px-2 "
                            onChange={(value) => {
                                setSameAsPresent(value.target.checked);
                                if (value.target.checked) {
                                    // setPermanentCityKey(form.getValues().personalInformation.presentAddress.city)
                                    // setPermanentBarangayKey(form.getValues().personalInformation.presentAddress.barangay)
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
                        {!sameAsPresent ? (
                            <TextInput disabled={sameAsPresent} withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.unitNo")} key={form.key('personalInformation.permanentAddress.unitNo')} radius='md' w={isMobile ? '25%' : '100%'} label="Permanent Address" placeholder="Unit no." />
                        ) : (
                            <p className="m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label">Permanent Address</p>
                        )}
                    </div>
                    {!sameAsPresent && (
                        <>
                            <TextInput disabled={sameAsPresent} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.houseNo")} key={form.key('personalInformation.permanentAddress.houseNo')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                            <TextInput disabled={sameAsPresent} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.street")} key={form.key('personalInformation.permanentAddress.street')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                            <TextInput disabled={sameAsPresent} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.permanentAddress.subdivision")} key={form.key('personalInformation.permanentAddress.subdivision')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
                        </>
                    )}
                </div>

                {!sameAsPresent && (
                    <div className="flex flex-col sm:flex-row gap-4 items-end">

                        <div className="flex flex-col sp:flex-row gap-4  w-full sp:w-1/2">
                            <Autocomplete
                                limit={50}
                                disabled={sameAsPresent}
                                // key={permanentCityKey}
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
                                    const selectedCity = cities.find(city => city.label === val);
                                    fetchBarangays(selectedCity?.id ?? 1, 2)
                                    form.setFieldValue("personalInformation.permanentAddress.city", val);
                                    form.setFieldValue("personalInformation.permanentAddress.barangay", '');
                                    // setPermanentBarangayKey(val)
                                })}
                            />

                            <Autocomplete
                                limit={50}
                                disabled={sameAsPresent}
                                // key={permanentBarangayKey}
                                {...form.getInputProps("personalInformation.permanentAddress.barangay")}
                                w={isMobile ? '25%' : '100%'}
                                placeholder={"Barangay"}
                                radius={8}
                                data={sameAsPresent ? barangays : barangays2}
                                rightSection={<IconCaretDownFilled size='18' />}
                                className="border-none w-full text-sm"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                styles={{ label: { color: "#6d6d6d" } }}
                                onChange={((val) => {
                                    form.setFieldValue("personalInformation.permanentAddress.barangay", val);
                                })}
                            />
                        </div>

                        <div className="flex flex-row gap-4  w-full sp:w-1/2">
                            <TextInput
                                disabled={sameAsPresent}
                                key={form.key('personalInformation.permanentAddress.zipCode')}
                                {...form.getInputProps("personalInformation.permanentAddress.zipCode")}
                                placeholder={"Zip Code"}
                                radius={8}
                                className="border-none w-1/2 sp:w-full text-sm"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                styles={{ label: { color: "#6d6d6d" } }}
                            />
                            <Select
                                disabled={sameAsPresent}
                                key={form.key('personalInformation.permanentAddress.livingArrangement')}
                                {...form.getInputProps("personalInformation.permanentAddress.livingArrangement")}
                                placeholder={"Living Arrangement"}
                                radius={8}
                                data={["RELATIVES", "OWNED", "RENTED", "WILLING TO RELOCATE"]}
                                rightSection={<IconCaretDownFilled size='18' />}
                                className="border-none w-1/2 sp:w-full text-sm"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                styles={{ label: { color: "#6d6d6d" } }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex flex-col sp:flex-row gap-4 items-end w-full sp:w-1/2">

                        <Popover
                            position="bottom"
                            shadow="md"
                            trapFocus={true}
                            returnFocus={false}
                            opened={datedOfBirthOpened}
                            onChange={setDatedOfBirthOpenedOpened}
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
                                    rightSection={<IconCalendarMonth onClick={() => setDatedOfBirthOpenedOpened((o) => !o)} />}
                                    styles={{ label: { color: "#6d6d6d" } }}
                                    onClick={() => setDatedOfBirthOpenedOpened((o) => !o)}
                                />
                            </Popover.Target>
                            <Popover.Dropdown className="w-full">
                                <DatePicker maxDate={new Date()} firstDayOfWeek={0}  {...form.getInputProps("personalInformation.dateOfBirth")} onChange={(value: Date | null) => {
                                    if (value != null) {
                                        setDatedOfBirthOpenedOpened(false)
                                    }
                                    form.setFieldValue("personalInformation.dateOfBirth", value ? dayjs(value).format("YYYY-MM-DD") : '')
                                    const dateOfBirth = dayjs(value).format("YYYY-MM-DD");
                                    const birthDate = new Date(dateOfBirth);
                                    let age = new Date().getFullYear() - birthDate.getFullYear();
                                    const monthDifference = new Date().getMonth() - birthDate.getMonth();
                                    // Adjust if the birthday hasn't occurred yet this year
                                    if (monthDifference < 0 || (monthDifference === 0 && new Date().getDate() < birthDate.getDate())) {
                                        age--;
                                    }
                                    form.setFieldValue('personalInformation.age', age);
                                }} />
                            </Popover.Dropdown>
                        </Popover>

                        <TextInput withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.placeOfBirth")} radius='md' w={isMobile ? '25%' : '100%'} label="Place of birth" placeholder="Place of birth" />

                    </div>

                    <div className="flex flex-row gap-4 items-end w-full sp:w-1/2">
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
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex flex-row gap-4  w-full sp:w-1/2">
                        <NumberInput hideControls classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.height")} radius='md' w={isMobile ? '25%' : '100%'} label="Height" placeholder="Height" />
                        <NumberInput hideControls classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.weight")} radius='md' w={isMobile ? '25%' : '100%'} label="Weight" placeholder="Weight" />
                    </div>
                    <div className="flex flex-row gap-4  w-full sp:w-1/2">
                        <Select data={["Single", "Married", "Widowed", "Divorced"]} rightSection={<IconCaretDownFilled size='18' />} withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.civilStatus")} radius='md' w={isMobile ? '25%' : '100%'} label="Civil Status" placeholder="Civil Status" />
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.religion")} radius='md' w={isMobile ? '25%' : '100%'} label="Religion" placeholder="Religion" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput maxLength={11} inputMode="numeric" classNames={{ input: 'poppins text-[#6D6D6D]' }} withAsterisk {...form.getInputProps("personalInformation.mobileNumber")} radius='md' w={isMobile ? '33%' : '100%'} label="Mobile Number" placeholder="Mobile Number (+63)" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} withAsterisk {...form.getInputProps("personalInformation.workingEmailAddress")} radius='md' w={isMobile ? '33%' : '100%'} label="Working Email Address" placeholder="Email Address" />
                    <TextInput maxLength={8} classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.landlineNumber")} radius='md' w={isMobile ? '33%' : '100%'} label="Landline Number" placeholder="Landline Number" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex flex-row gap-4 items-end w-full sp:w-1/2">
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.sssNo")} radius='md' w={isMobile ? '33%' : '100%'} label="Government ID Number(s)" placeholder="SSS No." />
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.gsisNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="GSIS No." />
                    </div>
                    <div className="flex flex-row gap-4 items-end w-full sp:w-1/2">
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.pagibigNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Pagibig-No." />
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.philhealthNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="PhilHealth No." />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex flex-row gap-4 items-end w-full sp:w-1/2">
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.driversLicense")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Drivers License No." />
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.passport")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Passport No." />
                    </div>
                    <div className="flex flex-row gap-4 items-end w-full sp:w-1/2">
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.tinNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="TIN No." />
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("personalInformation.governmentIdOrNumber.rdoCode")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="RDO Code" />
                    </div>
                </div>
            </div>

        </form>

    )
}