import { DataTable } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { useApplicantIdStore } from "@modules/Applicants/store";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import { useCloseModal, useDropDownOfferedStore } from "@modules/Applicants/store";
import { JobOpenings, ApplicantTransfereeName, Slot } from "@modules/Shared/types";
import { IconDots, IconRefresh, IconX, IconChevronDown } from "@tabler/icons-react";
import TransferredPosition from "@modules/Applicants/components/alerts/Transferred";
import { useTransferPositionLookup } from "@modules/Shared/hooks/useSharedApplicants";
import { useJobOpeningStore, useSelectedApplicantsStore } from "@modules/Shared/store";
import { Button, Divider, Textarea, TextInput, Menu, Pagination } from "@mantine/core";
import { useTransferApplicantPosition } from "@modules/Shared/hooks/useSharedApplicants";

export default function TransferPosition({ Applicant_Name, onClose }: ApplicantTransfereeName) {

    const { mutate: transferPosition } = useTransferApplicantPosition();
    const applicantId = useApplicantIdStore((state) => state.id);

    const [localPageSize] = useState(10);
    const [localPage, setLocalPage] = useState(1);
    const setJobOpenings = useJobOpeningStore((state) => state.setJobOpenings);
    const selectedIds = useSelectedApplicantsStore((state) => state.selectedIds);
    const setSelectedIds = useSelectedApplicantsStore((state) => state.setSelectedIds);

    const [opened, setOpened] = useState(false);
    const { setIsTransferPosition } = useCloseModal();
    const [filterText, setFilterText] = useState("");
    const [isTransferred, setIsTransferred] = useState(false);
    const { comments, setComments } = useDropDownOfferedStore();
    const [loadTime, setLoadTime] = useState<number | null>(null);
    const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
    const [filterType, setFilterType] = useState<"position" | "company">("position");

    const handlePageChange = (newPage: number) => {
        setLocalPage(newPage);
    };

    // Use localPage and localPageSize for fetching job openings
    const {
        total,
        isLoading,
        allVacancies,
        data: jobOpenings,
    } = useTransferPositionLookup(localPage, localPageSize, {}, setLoadTime);

    // Filter slots based on filter text and type (position or company)
    const filteredSlots = useMemo(() => {
        if (!filterText) return jobOpenings;
        const lower = filterText.toLowerCase();
        if (filterType === "company") {
            return jobOpenings?.filter((slot) =>
                slot.company?.name.toLowerCase().includes(lower)
            );
        }
        return jobOpenings?.filter((slot) =>
            slot.position.toLowerCase().includes(lower)
        );
    }, [filterText, filterType, jobOpenings]);

    // Transform API response to store-friendly JobOpenings format
    const transformToJobOpenings = (data: any[]): JobOpenings[] => {
        if (!data) return [];

        return data.map((item) => ({
            id: item.id,
            position: item.position,
            company: item.company,
            availableSlot: item.slots,
            departmentResponse: item.departmentResponse ?? { id: 0 },
            vacancyDurationResponse: item.vacancyDurationResponse ?? { dateStart: "" },
        }));
    };

    // Update global job openings state when data loads
    useEffect(() => {
        if (!isLoading && jobOpenings) {
            setJobOpenings(transformToJobOpenings(jobOpenings));
        }
    }, [isLoading, jobOpenings, setJobOpenings]);

    // Sync selected slots with selected IDs from the global store
    useEffect(() => {
        if (!filteredSlots) return;
        const selected = filteredSlots.filter((slot) => selectedIds.includes(slot.id));
        setSelectedSlots(selected);
    }, [filteredSlots, selectedIds]);

    // Handle user selection in the DataTable
    const handleSelectedRecordsChange = (slots: Slot[]) => {
        const selectedSlot = slots.length > 0 ? slots[0] : null;
        setSelectedSlots(selectedSlot ? [selectedSlot] : []);
        setSelectedIds(selectedSlot ? [selectedSlot.id] : []);
    };

    return (
        <div className="p-9">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                    Transfer Applicant Position
                </h1>
                <IconX
                    className="w-[15px] h-[15px] cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />

            {/* Applicant Name */}
            <div className="pt-4">
                <h1 className="poppins font-medium text-[#6D6D6D] text-[15px] pb-1">
                    Name
                </h1>
                <p className="poppins w-[540px] h-[56px] px-4 bg-[#6D6D6D30] border border-[#6D6D6D] rounded-lg flex items-center text-[#6D6D6D99]">
                    {Applicant_Name ?? "N/A"}
                </p>
            </div>

            {/* Vacancies Button */}
            <div className="pt-4">
                <h1 className="poppins font-medium text-[#6D6D6D] text-[15px] pb-1">
                    Vacancies
                </h1>
                <Button
                    onClick={() => setOpened(true)}
                    className="relative w-[540px] h-[56px] px-4 bg-[#6D6D6D10] border border-[#6D6D6D] rounded-lg text-[#6D6D6D99] hover:bg-[#6D6D6D30] flex items-center"
                >
                    <span className="text-left text-[#6D6D6D99] font-medium text-[16px]">
                        Select from open vacancies
                    </span>
                    <IconDots className="absolute right-4 text-[#6D6D6D99]" />
                </Button>
            </div>

            {/* Comments */}
            <div className="pt-4">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1">
                    Comments
                </h3>
                <Textarea
                    placeholder="Type here"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    autosize
                    minRows={4}
                    classNames={{
                        input:
                            "poppins pt-2 w-[540px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
                <Button
                    className="bg-transparent text-[#559CDA] px-6 py-2 rounded-lg border-[#559CDA] font-medium text-[14px] poppins"
                    onClick={() => setIsTransferPosition(false)}
                >
                    Cancel
                </Button>
                <Button
                    className="custom-gradient text-white px-6 py-2 rounded-lg font-medium text-[14px] poppins"
                    onClick={async () => {
                        if (!selectedSlots.length) return;
                        setIsTransferred(true);

                        const selectedSlot = selectedSlots[0];
                        const fullVacancy = allVacancies?.find(v => v.id === selectedSlot.id);
                        if (!fullVacancy) {
                            console.error("Matching vacancy not found");
                            return;
                        }
                        try {
                            transferPosition({
                                applicantId: applicantId,
                                position: {
                                    id: selectedSlot.id,
                                    name: selectedSlot.position,
                                    salary: 1,
                                    choice: {
                                        id: 2,
                                        name: ""
                                    },
                                    availableDateStart: fullVacancy.vacancyDurationResponse.dateStart,
                                    companyId: selectedSlot?.company?.id ?? 0,
                                    departmentId: fullVacancy.departmentResponse?.id ?? 0
                                },
                                comment: comments
                            });
                            setSelectedIds([]);
                            onClose();
                        } catch (error) {
                            console.error(error);
                        }
                    }}

                >
                    TRANSFER POSITION
                </Button>
            </div>

            {/* Transfer Confirmation Modal */}
            <ModalWrapper
                isOpen={isTransferred}
                overlayClassName="job-offer-modal-overlay"
                contentClassName="job-generated"
                onClose={onClose}
            >
                <TransferredPosition onClose={onClose} />
            </ModalWrapper>

            {/* Vacancies Selection Modal */}
            <ModalWrapper
                isOpen={opened}
                overlayClassName="job-offer-modal-overlay"
                contentClassName="available-positions"
                onClose={() => setOpened(false)}
            >
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                        Vacancies
                    </h1>
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={() => setOpened(false)}
                    />
                </div>

                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />

                {/* Filter Controls */}
                <div className="flex gap-3 mb-4 items-center mt-2">
                    <Menu withinPortal={false}>
                        <h1>Search By:</h1>
                        <Menu.Target>
                            <Button variant="light" size="sm">
                                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                <span className="pl-2">
                                    <IconChevronDown size={18} />
                                </span>
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() => setFilterType("position")}>
                                Position
                            </Menu.Item>
                            <Menu.Item onClick={() => setFilterType("company")}>
                                Company
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    <TextInput
                        placeholder={`Search by ${filterType}`}
                        value={filterText}
                        onChange={(e) => setFilterText(e.currentTarget.value)}
                        style={{ flexGrow: 1 }}
                    />

                    <Button onClick={() => setFilterText("")}>
                        <IconRefresh />
                    </Button>
                </div>

                {/* Job Openings DataTable */}
                <DataTable
                    records={filteredSlots}
                    columns={[
                        { accessor: "position", title: "Position", render: ({ position }) => position ?? "—" },
                        { accessor: "company", title: "Company", render: ({ company }) => company?.name ?? "—" },
                        { accessor: "slots", title: "Slots" },
                    ]}
                    selectedRecords={selectedSlots}
                    onSelectedRecordsChange={handleSelectedRecordsChange}
                />

                {/* Footer */}
                <div className="flex-shrink-0 mt-4 pt-2 border-t flex justify-between items-center">
                    <p className="job-offers-table text-sm poppins">
                        {`Showing data ${(localPage - 1) * localPageSize + 1} to ${Math.min(
                            localPage * localPageSize,
                            total ?? 0
                        )} of ${total ?? 0} entries`}
                        {loadTime !== null && ` found in (${loadTime.toFixed(3)})ms`}
                    </p>

                    <Pagination
                        value={localPage}
                        onChange={handlePageChange}
                        total={Math.ceil((total ?? 0) / localPageSize)}
                        radius="md"
                        size="sm"
                        siblings={1}
                        boundaries={1}
                    />
                </div>
            </ModalWrapper>
        </div>
    );
}
