
import { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { interviewStagesOption } from "@modules/Applicants/types";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import {
    useViewPositionLevels, useViewDepartments,
    useGetCompanyDivisions, useGetPaymentSchemes
} from "@modules/Shared/hooks/useSharedApplicants";
import { usePositionApplied, useDepartmentStore, useDivisionStore, useChoiceStore, useJobOpeningPositionStore } from "@src/modules/Shared/store";
import { useTransferPositionLookup } from "@modules/Shared/hooks/useSharedApplicants";

export default function OfferedStatus() {

    const setDepartmentNameJob = useDepartmentStore((state) => state.setDepartmentName);
    const setDivisionName = useDivisionStore((state) => state.setDivisionName)
    const {
        setJobOpenings,
        setSelectedOpening,
        setDepartmentName,
    } = useJobOpeningPositionStore()
    const { data: positionLevels } = useViewPositionLevels();
    const { data: orgDepartments } = useViewDepartments();
    const { data: compDivisions } = useGetCompanyDivisions();
    const { data: paymentSchemes } = useGetPaymentSchemes();

    const [getPositionLevels, setPositionLevels] = useState<interviewStagesOption[]>([]);
    const [getDepartments, setDepartments] = useState<interviewStagesOption[]>([]);
    const [getDivisions, setDivisions] = useState<interviewStagesOption[]>([]);
    const [getPaymentSchemes, setPaymentSchemes] = useState<interviewStagesOption[]>([]);

    const [localPage, _setLocalPage] = useState(1);
    const localPageSize = 10;
    const {
        data: jobOpenings,
    } = useTransferPositionLookup(localPage - 1, localPageSize);

    const [openings, setOpenings] = useState<any[]>([]);

    useEffect(() => {
        if (jobOpenings && openings.length === 0) {
            setOpenings(jobOpenings);
        }
    }, [jobOpenings]);

    const transferredPosition = useChoiceStore.getState().transferredPositionName;
    const positionsApplied = usePositionApplied((state) => state.firstPositionApplied);
    const getPositionId = usePositionApplied((s) => s.positionId);
    const setTransferredDepartmentId = useChoiceStore((state) => state.setTransferredDepartmentId);

    useEffect(() => {
        if (!jobOpenings?.length) return;

        const findMatchByPosition = (pos: string | null | undefined) => {
            if (!pos) return null;
            return jobOpenings.find(
                (job) => job.position.trim().toLowerCase() === pos.trim().toLowerCase()
            );
        };

        let matched = findMatchByPosition(transferredPosition);
        if (!matched && positionsApplied) {
            matched = findMatchByPosition(positionsApplied);
        }

        if (matched) {
            setTransferredDepartmentId(matched.department);
            setPosition(matched.position);
            setPositionId(Number(matched.id));
            setDepartment(matched.departmentName);
            setDepartmentId(matched.department);
            setDivision(matched.divisionName); // 

            // Optionally setDivisionId if you have it
            // setDivisionId(matched.divisionId);
        }
    }, [transferredPosition, positionsApplied, jobOpenings]);

    useEffect(() => {
        if (!positionLevels || !orgDepartments || !compDivisions || !paymentSchemes || !openings) return;

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
        if (jobOpenings && jobOpenings.length > 0) {
            setOpenings(jobOpenings);
            setDepartmentName(jobOpenings[0].departmentName);
            setDepartmentId(Number(jobOpenings?.[0]?.id));
            setDivisionName(jobOpenings[0].divisionName);
        }

        if (getPositionLevels.length > 0) {
            setPosition(getPositionLevels[0].label);
            setPositionId(getPositionLevels[0].value);
        }

        if (getDivisions.length > 0 && !division) {
            setDivision(getDivisions[0].label);
            setDivisionId(getDivisions[0].value);
            setDivisionName(getDivisions[0].label);
        }

        if (getPaymentSchemes.length > 0 && !getSalaryTypes) {
            setSalaryTypes(getPaymentSchemes[0].label);
            setPaymentSchemeId(getPaymentSchemes[0].value);
        }
    }, [
        jobOpenings,
        getPositionLevels,
        getDepartments,
        getDivisions,
        getPaymentSchemes,
    ]);

    const {
        setDivision, setDepartment,
        department, division,
        amount, setAmount, setPosition,
        getSalaryTypes, setSalaryTypes,
        setPositionId, setDepartmentId,
        setDivisionId, setPaymentSchemeId,
    } = useDropDownOfferedStore();

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

    useEffect(() => {
        if (openings) {
            setJobOpenings(openings);

            const selected = openings.find((job) => job.id === getPositionId);
            setSelectedOpening(selected ?? null);
            setDepartmentNameJob(selected?.departmentName ?? null);
        }
    }, [openings, getPositionId]);

    if (!positionLevels || !orgDepartments || !compDivisions || !paymentSchemes || !openings) {
        return <div>Loading...</div>
    }

    return (
        <div>

            {/* Position and Department (Two-Column Layout)*/}
            <div className="flex gap-4 pt-4 poppins">
                {/* Position Dropdown */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Position<span className="text-[#F14336]">*</span>
                    </h3>
                    <Combobox store={positionCombobox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                disabled
                                value={transferredPosition || positionsApplied}
                                onChange={(e) => setPosition(e.currentTarget.value)}
                                onFocus={() => positionCombobox.openDropdown()}
                                rightSection={<IconChevronDown size={16} />}
                                placeholder="Select Position"
                                classNames={{
                                    input: "poppins relative flex items-center w-[270px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
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
                                value={department || ""}
                                // value={openings?.[getPositionId ?? 0]?.departmentName}
                                // value={selectedOpening?.departmentName || ""}
                                onChange={(e) => setDepartment(e.currentTarget.value)}
                                onFocus={() => departmentCombobox.openDropdown()}
                                rightSection={<IconChevronDown size={16} />}
                                placeholder="Select Department"
                                classNames={{
                                    input: "poppins relative flex items-center w-[270px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
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


            {/* Salary Types and Amount (Two-Column layout) */}
            <div>
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins pt-2">
                    Division <span className="text-[#F14336]">*</span>
                </h3>
                <Combobox store={divisionCombobox} withinPortal={false}>
                    <Combobox.Target>
                        <TextInput
                            disabled
                            value={division || ""}
                            // value={openings?.[0]?.divisionName}
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
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 pt-2">
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
                                    input: "poppins relative flex items-center w-[270px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
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
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins pt-2">
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