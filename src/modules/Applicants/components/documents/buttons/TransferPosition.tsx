import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { IconDots, IconX } from "@tabler/icons-react";
import { Button, Divider, Textarea } from "@mantine/core";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import { useCloseModal, useDropDownOfferedStore } from "@modules/Applicants/store";
import TransferredPosition from "@src/modules/Applicants/components/alerts/Transferred";
interface ApplicantTransfereeName {
    Applicant_Name: string
    onClose: () => void
}

export default function TransferPosition({ Applicant_Name, onClose }: ApplicantTransfereeName) {

    const [isTransferred, setIsTransferred] = useState(false);
    const { comments, setComments } = useDropDownOfferedStore();
    const { setIsTransferPosition } = useCloseModal();
    const [getAvailableSlots, setAvailableSlots] = useState()

    const getVacancies = async () => {
        try {
            const response = await axios.get("/api/recruitment/vacancies");
            const getVacantPositions = response.data.items.map((item: any) => ({
                id: item.id,
                position: item.positionTitleResponse,
                company: item.companyResponse?.name ?? '',
                slots: item.availableSlot,
            }));
            // debugger;
            setAvailableSlots(getVacantPositions);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getVacancies();
    }, [])


    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState<any[]>([]);

    return (
        <div className="p-9">

            {/* Header */}
            <div >
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">Transfer Applicant Position</h1>
                    <IconX className="w-[15px] h-[15px] cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Name */}
            <div className="pt-4">
                <h1 className="poppins font-medium text-[#6D6D6D] text-[15px] pb-1">Name</h1>
                <p className="poppins w-[540px] h-[56px] px-4 bg-[#6D6D6D30] border border-[#6D6D6D] rounded-lg flex items-center text-[#6D6D6D99]"> {Applicant_Name ?? "N/A"}</p>
            </div>

            {/* Position Dropdown */}
            <div className="pt-4">
                <h1 className="poppins font-medium text-[#6D6D6D] text-[15px] pb-1">Vacancies</h1>

                <div className="w-full">
                    <Button
                        onClick={() => setOpened(true)}
                        className="relative w-[540px] h-[56px] px-4 bg-[#6D6D6D10] border border-[#6D6D6D] rounded-lg text-[#6D6D6D99] hover:bg-[#6D6D6D30] hover:text-[#6D6D6D99] flex items-center"
                    >
                        <span className="text-left text-[#6D6D6D99] font-medium text-[16px]">
                            Select Vacancies
                        </span>
                        <IconDots className="absolute right-4 text-[#6D6D6D99]" />
                    </Button>
                </div>

            </div>

            {/* Comment and suggestion text input */}
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
                        input: "poppins pt-2 w-[540px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between pt-4">

                <Button className="bg-transparent text-[#559CDA] px-6 py-2 rounded-lg border-[#559CDA] font-medium text-[14px] poppins"
                    // onClick={onClose}>
                    onClick={() => setIsTransferPosition(false)}>
                    Cancel
                </Button>

                <Button
                    className="custom-gradient text-white px-6 py-2 rounded-lg font-medium text-[14px] poppins"
                    onClick={() => {
                        setIsTransferred(true); // Open success modal first
                        setTimeout(() => onClose(), 1000); // Delay closing the transfer modal
                    }}>
                    {"Transfer Position".toUpperCase()}
                </Button>

            </div>

            <div>
                <ModalWrapper
                    isOpen={isTransferred}
                    overlayClassName="job-offer-modal-overlay"
                    contentClassName="job-generated"
                    onClose={onClose}
                >
                    <TransferredPosition
                        onClose={onClose}
                    />
                </ModalWrapper>

                <ModalWrapper
                    isOpen={opened}
                    overlayClassName="job-offer-modal-overlay"
                    contentClassName="available-positions"
                    onClose={() => setOpened(false)}
                >
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">Vacancies</h1>
                        <IconX className="w-[15px] h-[15px] cursor-pointer" onClick={() => setOpened(false)} />
                    </div>
                    <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
                    <DataTable
                        records={getAvailableSlots}
                        columns={[
                            { accessor: 'position', title: 'Position' },
                            { accessor: 'company', title: 'Company' },
                            { accessor: 'slots', title: 'Slots' },
                        ]}
                        selectedRecords={selected}
                        onSelectedRecordsChange={setSelected}
                        highlightOnHover
                        withColumnBorders
                    />
                </ModalWrapper>
            </div>
        </div >
    )
}