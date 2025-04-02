
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled } from "@tabler/icons-react";

export default function OfferedStatus() {

    const {
        getSalaryTypes, setSalaryTypes,
        fullName, setFullName,
        amount, setAmount,
        position, setPosition,
        department, setDepartment,
    } = useDropDownOfferedStore();

    const positions = ["HR Specialist", "Engineer", "Doctor"];
    const departments = ["Finance", "IT", "HR", "Operations"];
    const salaryTypes = ["Monthly", "Semi-Monthly", "Anually"];


    // Independent Combobox hooks
    const departmentCombobox = useCombobox({
        onDropdownClose: () => departmentCombobox.resetSelectedOption(),
    });

    const salaryComboBox = useCombobox({
        onDropdownClose: () => salaryComboBox.resetSelectedOption(),
    })

    const interviewerCombobox = useCombobox({
        onDropdownClose: () => interviewerCombobox.resetSelectedOption(),
    })

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    // Independent Combobox hooks
    const positionCombobox = useCombobox();

    // To activate the comboBox of feedbacks field.
    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    })

    return (
        <div>

            {/* Applicant Full Name */}
            <div className="pt-4">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                    Applicant Full Name <span className="text-[#F14336]">*</span>
                </h3>
                <TextInput
                    type="text"
                    placeholder="Type Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    classNames={{
                        input: "poppins relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                    required
                />
            </div>

            {/* Position and Department (Two-Column Layout)*/}
            <div className="flex gap-4 pt-4 poppins">
                {/* Position Dropdown */}
                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Position/Rank <span className="text-[#F14336] poppins">*</span>
                    </h3>
                    <Combobox store={positionCombobox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                value={position}
                                onChange={(e) => setPosition(e.currentTarget.value)}
                                onFocus={() => positionCombobox.openDropdown()}
                                rightSection={<IconCaretDownFilled size={16} />}
                                placeholder="Select Position"
                                classNames={{
                                    input: "poppins relative flex items-center h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {positions.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {positions.map((role) => (
                                    <Combobox.Option
                                        key={role}
                                        value={role}
                                        onClick={() => {
                                            setPosition(role);
                                            positionCombobox.closeDropdown();
                                        }}
                                        className="poppins px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                                    >
                                        {role}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Dropdown>
                        )}
                    </Combobox>
                </div>

                {/* Department Dropdown */}
                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Department/Division <span className="text-[#F14336]">*</span>
                    </h3>
                    <Combobox store={departmentCombobox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                value={department}
                                onChange={(e) => setDepartment(e.currentTarget.value)}
                                onFocus={() => departmentCombobox.openDropdown()}
                                rightSection={<IconCaretDownFilled size={16} />}
                                placeholder="Select Department"
                                classNames={{
                                    input: " poppins relative flex items-center  h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {departments.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {departments.map((dept) => (
                                    <Combobox.Option
                                        key={dept}
                                        value={dept}
                                        onClick={() => {
                                            setDepartment(dept);
                                            departmentCombobox.closeDropdown();
                                        }}
                                        className="poppins px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
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
            <div className="flex gap-4 pt-4">
                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Salary Type <span className="text-[#F14336]">*</span>
                    </h3>
                    <Combobox store={salaryComboBox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                value={getSalaryTypes}
                                onChange={(e) => setSalaryTypes(e.currentTarget.value)}
                                onFocus={() => salaryComboBox.openDropdown()}
                                rightSection={<IconCaretDownFilled size={16} />}
                                placeholder="Monthly Rate"
                                classNames={{
                                    input: "poppins relative flex items-center h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {salaryTypes.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {salaryTypes.map((salary) => (
                                    <Combobox.Option
                                        key={salary}
                                        value={salary}
                                        onClick={() => {
                                            setSalaryTypes(salary);
                                            salaryComboBox.closeDropdown();
                                        }}
                                        className="poppins px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                                    >
                                        {salary}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Dropdown>
                        )}
                    </Combobox>
                </div>

                {/* Amouunt */}
                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Amount <span className="text-[#F14336]">*</span>
                    </h3>
                    <TextInput
                        type="text"
                        placeholder="00,000.0000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        classNames={{
                            input: "poppins relative flex items-center  h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                        }}
                        required
                    />
                </div>
            </div>
        </div>
    )
}