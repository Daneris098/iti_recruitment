
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled } from "@tabler/icons-react";
import dropDownChoicesJSON from "@modules/Applicants/constants/json/dropdown.json";

export default function OfferedStatus() {

    const {
        getSalaryTypes, setSalaryTypes,
        amount, setAmount,
        position, setPosition,
        department, setDepartment,
        setDepartmentId, setPositionId, setPaymentSchemeId
    } = useDropDownOfferedStore();

    const positionOptions = dropDownChoicesJSON[0].position.map((pos) => ({
        value: pos.id,
        label: pos.name,
    }));

    const departmentOptions = dropDownChoicesJSON[0].department.map((dep) => ({
        value: dep.id,
        label: dep.name,
    }))

    const salaryTypesOptions = dropDownChoicesJSON[0].paymentScheme.map((paysch) => ({
        value: paysch.id,
        label: paysch.name,
    }))

    const departmentCombobox = useCombobox({ onDropdownClose: () => departmentCombobox.resetSelectedOption(), });
    const salaryComboBox = useCombobox({ onDropdownClose: () => salaryComboBox.resetSelectedOption(), })
    const interviewerCombobox = useCombobox({ onDropdownClose: () => interviewerCombobox.resetSelectedOption(), })
    const combobox = useCombobox({ onDropdownClose: () => combobox.resetSelectedOption(), });
    const positionCombobox = useCombobox();
    const feedbacksComboBox = useCombobox({ onDropdownClose: () => feedbacksComboBox.resetSelectedOption(), })

    return (
        <div>

            {/* Position and Department (Two-Column Layout)*/}
            <div className="flex gap-4 pt-4 poppins">
                {/* Position Dropdown */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Position/Rank <span className="text-[#F14336] poppins">*</span>
                    </h3>
                    <Combobox store={positionCombobox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                value={position}
                                onChange={() => { }}
                                onFocus={() => positionCombobox.openDropdown()}
                                rightSection={<IconCaretDownFilled size={16} />}
                                placeholder="Select Position"
                                classNames={{
                                    input: "cursor-pointer poppins relative flex items-center w-[271px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {positionOptions.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {positionOptions.map((role) => (
                                    <Combobox.Option
                                        key={role.value}
                                        value={role.label}
                                        onClick={() => {
                                            setPosition(role.label);
                                            setPositionId(role.value)
                                            positionCombobox.closeDropdown();
                                        }}
                                        className="poppins px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
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
                        Department/Division <span className="text-[#F14336]">*</span>
                    </h3>
                    <Combobox store={departmentCombobox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                value={department}
                                onChange={() => { }}
                                onFocus={() => departmentCombobox.openDropdown()}
                                rightSection={<IconCaretDownFilled size={16} />}
                                placeholder="Select Department"
                                classNames={{
                                    input: "cursor-pointer poppins relative flex items-center w-[271px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {departmentOptions.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {departmentOptions.map((dept) => (
                                    <Combobox.Option
                                        key={dept.value}
                                        value={dept.label}
                                        onClick={() => {
                                            setDepartment(dept.label);
                                            departmentCombobox.closeDropdown();
                                            setDepartmentId(dept.value)
                                        }}
                                        className="poppins px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                                    >
                                        {dept.label}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Dropdown>
                        )}
                    </Combobox>
                </div>
            </div>

            {/* Salary Types and Amount (Two-Column layout) */}
            <div className="flex gap-4 pt-4">
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Salary Type <span className="text-[#F14336]">*</span>
                    </h3>
                    <Combobox store={salaryComboBox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                value={getSalaryTypes}
                                onChange={() => { }}
                                onFocus={() => salaryComboBox.openDropdown()}
                                rightSection={<IconCaretDownFilled size={16} />}
                                placeholder="Monthly Rate"
                                classNames={{
                                    input: "cursor-pointer poppins relative flex items-center w-[271px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {salaryTypesOptions.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {salaryTypesOptions.map((salary) => (
                                    <Combobox.Option
                                        key={salary.value}
                                        value={salary.label}
                                        onClick={() => {
                                            setSalaryTypes(salary.label);
                                            setPaymentSchemeId(salary.value)
                                            salaryComboBox.closeDropdown();
                                        }}
                                        className="poppins px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
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
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Amount <span className="text-[#F14336]">*</span>
                    </h3>
                    <TextInput
                        type="text"
                        placeholder="00,000.0000"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        classNames={{
                            input: "poppins relative flex items-center w-[271px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                        }}
                        required
                    />
                </div>
            </div>
        </div>
    )
}