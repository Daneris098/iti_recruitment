{/*Generate new offer button.*/ }
import { useEffect, useState } from "react";
import { useCloseModal } from "@modules/Applicants/store"
import { IconChevronDown, IconX } from "@tabler/icons-react";
import { useDepartmentStore } from "@src/modules/Shared/store";
import { interviewStagesOption } from "@modules/Applicants/types";
import { useDropDownOfferedStore } from "@modules/Applicants/store";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import JobGeneratedAlert from "@src/modules/Applicants/components/alerts/JobGeneratedAlert"
import { Button, Combobox, Divider, Textarea, TextInput, useCombobox } from "@mantine/core";
import {
    useViewPositionLevels, useViewDepartments,
    useGetCompanyDivisions, useGetPaymentSchemes
} from "@modules/Shared/hooks/useSharedApplicants";
interface DropDownOfferedProps {
    onClose: () => void;
    ApplicantName: string;
}

export default function DropDownOffered({ onClose, ApplicantName }: DropDownOfferedProps) {

    const { data: positionLevels } = useViewPositionLevels();
    const { data: orgDepartments } = useViewDepartments();
    const { data: compDivisions } = useGetCompanyDivisions();
    const { data: paymentSchemes } = useGetPaymentSchemes();

    const setDepartmentName = useDepartmentStore((state) => state.setDepartmentName);

    const [getPositionLevels, setPositionLevels] = useState<interviewStagesOption[]>([]);
    const [getDepartments, setDepartments] = useState<interviewStagesOption[]>([]);
    const [getDivisions, setDivisions] = useState<interviewStagesOption[]>([]);
    const [getPaymentSchemes, setPaymentSchemes] = useState<interviewStagesOption[]>([]);

    const departmentName = useDepartmentStore((state) => state.departmentName);

    useEffect(() => {
        if (!positionLevels || !orgDepartments || !compDivisions || !paymentSchemes) return;

        const schemes = paymentSchemes.map((payments: any) => ({
            value: payments.id,
            label: payments.name
        }))
        setPaymentSchemes(schemes);

        const positions = positionLevels.map((position: any) => ({
            value: position.id,
            label: position.name
        }));
        setPositionLevels(positions)

        const departments = orgDepartments.map((deps: any) => ({
            value: deps.id,
            label: deps.name
        }));
        setDepartments(departments);

        const divisions = compDivisions.map((divs: any) => ({
            value: divs.id,
            label: divs.name
        }))
        setDivisions(divisions);

    }, [positionLevels, orgDepartments])

    useEffect(() => {
        if (getDepartments.length > 0) {
            setDepartment(getDepartments[0].label);
            setDepartmentId(getDepartments[0].value)
            setDepartmentName(getDepartments[0].label)
        }
        if (getPositionLevels.length > 0) {
            setPosition(getPositionLevels[0].label)
            setPositionId(getPositionLevels[0].value)
        }
        if (getDivisions.length > 0) {
            setDivision(getDivisions[0].label)
            setDivisionId(getDivisions[0].value)
        }
        if (getPaymentSchemes.length > 0) {
            setSalaryTypes(getPaymentSchemes[0].label)
            setPaymentSchemeId(getPaymentSchemes[0].value)
        }

    }, [getPositionLevels, getDepartments, getDivisions])

    // These are just a hardcoded information. This will be removed during the integration with the backend.
    // const positions = ["HR Specialist", "Engineer", "Doctor"];
    // const divisions = ["Finance", "IT", "HR", "Operations"];
    // const salaryTypes = ["Monthly", "Semi-Monthly", "Anually"];
    const {
        setDepartment,
        setDivisionId,
        amount, setAmount,
        comments, setComments,
        position, setPosition,
        getSalaryTypes, setSalaryTypes,
        setPositionId, setDepartmentId,
        division, setDivision, setPaymentSchemeId
    } = useDropDownOfferedStore();

    const { isModalOpen, setIsModalOpen } = useCloseModal();

    // Independent Combobox hooks
    const positionCombobox = useCombobox();

    const departmentCombobox = useCombobox({
        onDropdownClose: () => departmentCombobox.resetSelectedOption(),
    });

    const salaryComboBox = useCombobox({
        onDropdownClose: () => salaryComboBox.resetSelectedOption(),
    })

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const divisionCombobox = useCombobox({
        onDropdownClose: () => divisionCombobox.resetSelectedOption(),
    })

    // if (!positionLevels || !orgDepartments || !compDivisions || !getSalaryTypes) {
    //     return <div>Loading...</div>
    // }

    return (

        // Container
        <div className="p-9">

            {/* Header */}
            <div >
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">Generate New Offer</h1>
                    <IconX className="w-[15px] h-[15px] cursor-pointer" onClick={onClose} />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Form */}
            <form className="space-y-4 mt-4">
                {/* Applicant Full Name */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Applicant Full Name <span className="text-[#F14336]">*</span>
                    </h3>
                    <p className="relative flex items-center w-[540px] h-[56px] px-4 border border-[#6D6D6D] rounded-lg text-[#6D6D6D] text-[14px] text-[#6D6D6D99] bg-[#6D6D6D30] poppins">{ApplicantName ?? "Applicant name unavailable."}</p>
                </div>

                {/* Position and Department (Two-Column Layout)*/}
                <div className="flex gap-4">
                    {/* Position Dropdown */}
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                            Position <span className="text-[#F14336]">*</span>
                        </h3>
                        <Combobox store={positionCombobox} withinPortal={false}>
                            <Combobox.Target>
                                <TextInput
                                    disabled
                                    value={position}
                                    onChange={(e) => setPosition(e.currentTarget.value)}
                                    onFocus={() => positionCombobox.openDropdown()}
                                    rightSection={<IconChevronDown size={16} />}
                                    placeholder="Select Position"
                                    classNames={{
                                        input: "poppins relative flex items-center w-[259px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                    }}
                                    required
                                />
                            </Combobox.Target>

                            {getPositionLevels.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                    {getPositionLevels.map((role) => (
                                        <Combobox.Option
                                            key={role.value}
                                            value={role.label}
                                            onClick={() => {
                                                setPosition(role.label);
                                                setPositionId(role.value);
                                                positionCombobox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition poppins"
                                        >
                                            {role.label}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Dropdown>
                            )}

                        </Combobox>
                    </div>

                    {/* Department Dropdown */}
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                            Department <span className="text-[#F14336]">*</span>
                        </h3>
                        <Combobox store={departmentCombobox} withinPortal={false}>
                            <Combobox.Target>
                                <TextInput
                                    disabled
                                    // value={department}
                                    value={departmentName || ""}
                                    onChange={(e) => setDepartment(e.currentTarget.value)}
                                    onFocus={() => departmentCombobox.openDropdown()}
                                    rightSection={<IconChevronDown size={16} />}
                                    placeholder="Select Department"
                                    classNames={{
                                        input: "poppins relative flex items-center w-[259px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                    }}
                                    required
                                />
                            </Combobox.Target>

                            {getDepartments.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                    {getDepartments.map((dept) => (
                                        <Combobox.Option
                                            key={dept.value}
                                            value={dept.label}
                                            onClick={() => {
                                                setDepartment(dept.label);
                                                setDepartmentId(dept.value)
                                                departmentCombobox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition  poppins"
                                        >
                                            {dept.label}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Dropdown>
                            )}
                        </Combobox>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Division <span className="text-[#F14336]">*</span>
                    </h3>
                    <Combobox store={divisionCombobox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                disabled
                                value={division}
                                onChange={(e) => setDivision(e.currentTarget.value)}
                                onFocus={() => divisionCombobox.openDropdown()}
                                rightSection={<IconChevronDown size={16} />}
                                placeholder="Select Division"
                                classNames={{
                                    input: "poppins relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {getDivisions.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                {getDivisions.map((div) => (
                                    <Combobox.Option
                                        key={div.value}
                                        value={div.label}
                                        onClick={() => {
                                            setDivision(div.label);
                                            setDivisionId(div.value);
                                            divisionCombobox.closeDropdown();
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition  poppins"
                                    >
                                        {div.label}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Dropdown>
                        )}
                    </Combobox>
                </div>
                {/* Salary Types and Amount (Two-Column layout) */}
                <div className="flex gap-4">
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1">
                            Salary Type <span className="text-[#F14336]">*</span>
                        </h3>
                        <Combobox store={salaryComboBox} withinPortal={false}>
                            <Combobox.Target>
                                <TextInput
                                    value={getSalaryTypes}
                                    onChange={(e) => setSalaryTypes(e.currentTarget.value)}
                                    onFocus={() => salaryComboBox.openDropdown()}
                                    rightSection={<IconChevronDown size={16} />}
                                    placeholder="Monthly Rate"
                                    classNames={{
                                        input: "poppins relative flex items-center w-[259px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                    }}
                                    required
                                />
                            </Combobox.Target>

                            {getPaymentSchemes.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                    {getPaymentSchemes.map((salary) => (
                                        <Combobox.Option
                                            key={salary.value}
                                            value={salary.label}
                                            onClick={() => {
                                                setSalaryTypes(salary.label);
                                                setPaymentSchemeId(salary.value)
                                                salaryComboBox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition poppins"
                                        >
                                            {salary.label}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Dropdown>
                            )}
                        </Combobox>
                    </div>

                    {/* Amouunt */}
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1">
                            Amount <span className="text-[#F14336]">*</span>
                        </h3>
                        <TextInput
                            type="text"
                            placeholder="00,000.0000"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            classNames={{
                                input: "poppins relative flex items-center w-[259px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                            }}
                            required
                        />
                    </div>
                </div>

                {/* Comment and suggestion text input */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Comments
                    </h3>
                    <Textarea
                        placeholder="Type here"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        autosize
                        minRows={4}
                        classNames={{
                            input: "poppins w-[540px] h-[98px] pt-2 px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                        }}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-between pt-4">
                    <Button onClick={onClose} className="bg-transparent text-[#559CDA] px-6 py-2 rounded-lg border-[#559CDA] font-medium text-[15px]">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="custom-gradient text-white px-6 py-2 rounded-lg font-medium text-[15px]"
                    >
                        {"Generate Offer".toUpperCase()}
                    </Button>

                </div>
            </form>

            <div>
                <ModalWrapper
                    isOpen={isModalOpen}
                    overlayClassName="job-offer-modal-overlay"
                    contentClassName="job-generated"
                    onClose={() => { }}
                >
                    <JobGeneratedAlert onClose={onClose} title={""} />
                </ModalWrapper>
            </div>
        </div>
    )
}