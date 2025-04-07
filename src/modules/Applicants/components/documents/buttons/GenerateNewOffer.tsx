{/*Generate new offer button.*/ }
import { Button, Combobox, Divider, Textarea, TextInput, useCombobox } from "@mantine/core";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import { useDropDownOfferedStore } from "@modules/Applicants/store"
import JobGeneratedModal from "@modules/Applicants/components/modal/jobGenerated"
import JobGeneratedAlert from "@src/modules/Applicants/components/alerts/JobGeneratedAlert"
import { useCloseModal } from "@modules/Applicants/store"
interface DropDownOfferedProps {
    onClose: () => void;
    ApplicantName: string;
}

export default function DropDownOffered({ onClose, ApplicantName }: DropDownOfferedProps) {

    // These are just a hardcoded information. This will be removed during the integration with the backend.
    const positions = ["HR Specialist", "Engineer", "Doctor"];
    const departments = ["Finance", "IT", "HR", "Operations"];
    const salaryTypes = ["Monthly", "Semi-Monthly", "Anually"];

    const {
        getSalaryTypes, setSalaryTypes,
        amount, setAmount,
        position, setPosition,
        department, setDepartment,
        comments, setComments
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
            <form
                // onSubmit={handleSubmit} 
                className="space-y-4 mt-4">
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
                            Position/Rank <span className="text-[#F14336]">*</span>
                        </h3>
                        <Combobox store={positionCombobox} withinPortal={false}>
                            <Combobox.Target>
                                <TextInput
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

                            {positions.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                    {positions.map((role) => (
                                        <Combobox.Option
                                            key={role}
                                            value={role}
                                            onClick={() => {
                                                setPosition(role);
                                                positionCombobox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition poppins"
                                        >
                                            {role}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Dropdown>
                            )}
                        </Combobox>
                    </div>

                    {/* Department Dropdown */}
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                            Department/Division <span className="text-[#F14336]">*</span>
                        </h3>
                        <Combobox store={departmentCombobox} withinPortal={false}>
                            <Combobox.Target>
                                <TextInput
                                    value={department}
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

                            {departments.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                    {departments.map((dept) => (
                                        <Combobox.Option
                                            key={dept}
                                            value={dept}
                                            onClick={() => {
                                                setDepartment(dept);
                                                departmentCombobox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition  poppins"
                                        >
                                            {dept}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Dropdown>
                            )}
                        </Combobox>
                    </div>
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

                            {salaryTypes.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                    {salaryTypes.map((salary) => (
                                        <Combobox.Option
                                            key={salary}
                                            value={salary}
                                            onClick={() => {
                                                setSalaryTypes(salary);
                                                salaryComboBox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition poppins"
                                        >
                                            {salary}
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
                            onChange={(e) => setAmount(e.target.value)}
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
                        onClick={() => setIsModalOpen(true)} // Open modal on click
                        className="custom-gradient text-white px-6 py-2 rounded-lg font-medium text-[15px]"
                    >
                        {"Generate Offer".toUpperCase()}
                    </Button>

                </div>
            </form>

            <div>
                <JobGeneratedModal isOpen={isModalOpen} >
                    <JobGeneratedAlert onClose={onClose} title={""} />
                </JobGeneratedModal>
            </div>
        </div>
    )
}