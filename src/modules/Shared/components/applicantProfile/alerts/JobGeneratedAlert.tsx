import { Button, Divider, Modal } from "@mantine/core";
import { IconChecklist } from "@tabler/icons-react";
import MyDocument from "@modules/Offers/components/documents/PDF"
import { PDFViewer } from "@react-pdf/renderer";
import { useCloseModal, useStatusStore } from "@src/modules/Shared/components/applicantProfile/store";
import UpdateApplicantSucessful from "@src/modules/Shared/components/applicantProfile/alerts/UpdateApplicantSuccessful";

interface JobGeneratedAlertProps {
    onClose: () => void;
    title: string | null;
}

export default function JobGeneratedAlert({ title, onClose }: JobGeneratedAlertProps) {

    // zustand store.
    const {
        isViewPDF, setIsViewPDF,
        isUpdateSuccessful, setIsUpdateSuccessful,
        isJobGeneratedOpen,
        setIsUpdateStatusButtonModalOpen,
        setIsViewApplicant,
        setIsOffered,
        setIsGenerateNewOffer,
        setIsModalOpen
    } = useCloseModal();

    if (!isJobGeneratedOpen) return null; // Prevents rendering if modal is closed
    const { setSelectedStatus } = useStatusStore();

    const handleCloseAll = () => {
        setIsViewPDF(false); // Close PDF Viewer
        setIsUpdateSuccessful(false); // Close success alert
        setIsViewApplicant(false);
        setSelectedStatus(null);
        setIsUpdateStatusButtonModalOpen(false);
        setIsViewApplicant(false);
        setIsGenerateNewOffer(false);
        setIsOffered(false);
        setIsModalOpen(false);
        // Call onClose if provided to close the JobGeneratedAlert
        if (typeof onClose === "function") {
            onClose();
        }
    };

    return (
        <div className="p-1">

            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">Generate Offer</h1>
                </div>

                <Divider size={2} color="#6D6D6D99" className="w-full mt-2 poppins" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-2">
                <IconChecklist size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div>
                <h1 className="font-semibold flex justify-center text-[24px] text-[#6D6D6D] poppins text-center">
                    Job Offer Generated Successfully!
                </h1>
            </div>

            {/* View Button */}
            <div className="flex justify-center items-center align-middle pt-7">
                <Button className="font-medium text-[15px] text-[#559CDA] bg-white border-[#559CDA] rounded-[10px] w-[198px]"
                    onClick={() => {
                        setIsViewPDF(true); // Open PDF
                    }}>
                    View
                </Button>
            </div>

            <div>

                {/* 
                This is the Generated PDF for the job offered user. 
                This PDF Component will be rendered when the user
                click the "View" button under the "Job Generated Successfully prompt."
                */}
                <Modal size={'65%'} opened={isViewPDF} onClose={() => setIsViewPDF(false)} title={title === "Offered" ? "Generate Offer" : "Job Offer"}>
                    <PDFViewer width="100%" height="710" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                        <MyDocument
                            Name={null}
                            Position={null}
                            Department={null}
                            Remarks={null}
                            Salary_Monthly={null}
                            Salary_Yearly={null}
                            Note_Salary={null}
                            Merit_Increase={null}
                            Description_VL={null}
                            Description_SL={null}
                            Description_BL={null}
                            Benefit_Paternity={null}
                            Benefit_Maternity={null}
                            Description_Transpo={null}
                            Acknowledgement={null}
                        />
                    </PDFViewer>
                    <div className="py-9 flex justify-center space-x-9">
                        <Button
                            className="
                            bg-white text-[#559CDA] border-1
                            border-[#559CDA] rounded-lg w-[198px]
                            h-[42px] font-medium text-[15px] cursor-pointer 
                            hover:bg-white hover:text-[#559CDA]"
                            onClick={() => {
                                setIsOffered(false)
                            }}
                        >
                            {"Edit Details".toUpperCase()}
                        </Button>

                        <Button
                            className="rounded-lg w-[198px] h-[42px] font-medium text-[15px] br-gradient border-0"
                            onClick={() => {
                                setIsUpdateSuccessful(true); // Show the success alert
                                setIsViewPDF(false); // Close the PDF viewer
                                setTimeout(() => {
                                    handleCloseAll(); // Close everything after 2 seconds
                                }, 1000);
                            }}
                        >
                            {"done".toUpperCase()}
                        </Button>

                    </div>
                </Modal>
            </div>

            <div>
                <Modal opened={isUpdateSuccessful} onClose={() => setIsUpdateSuccessful(false)}>
                    <UpdateApplicantSucessful onClose={() => setIsUpdateSuccessful(false)} />
                </Modal>
            </div>
        </div>
    );
}

// This is the top-level modal. Meaning, this is the last modal you should see as it is the final step in the process.