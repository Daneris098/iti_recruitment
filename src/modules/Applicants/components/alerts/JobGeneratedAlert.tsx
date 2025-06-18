import { PDFViewer } from "@react-pdf/renderer";
import { Button, Divider } from "@mantine/core";
import { IconChecklist } from "@tabler/icons-react";
import { PDFProps } from "@modules/Applicants/types";
import ViewPDF from "@modules/Offers/components/modal/pdfModal"
import { useApplicantIdStore } from "@src/modules/Shared/store";
import MyDocument from "@modules/Offers/components/documents/PDF"
import { useCreateOffer } from "@modules/Shared/hooks/useSharedApplicants";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import { useApplicantsById } from "@src/modules/Shared/hooks/useSharedApplicants";
import { JOB_OFFER_CONSTANTS } from "@modules/Applicants/constants/pdf/descriptions";
import UpdateApplicantSucessful from "@src/modules/Applicants/components/alerts/UpdateApplicantSuccessful";
import { useCloseModal, useStatusStore, useDropDownOfferedStore, useApplicantStore } from "@src/modules/Applicants/store";
import { X } from "lucide-react";
// import { usePositionApplied, useDepartmentStore, useDivisionStore } from "@src/modules/Shared/store";
interface JobGeneratedAlertProps extends Partial<PDFProps> {
    onClose: () => void;
    title: string | null;
}

export default function JobGeneratedAlert({ title, onClose, Department }: JobGeneratedAlertProps) {
    const {
        getSalaryTypes,
        amount,
        position,
        department,
        departmentId, positionId, paymentSchemeId, comments,
    } = useDropDownOfferedStore();

    const applicantId = useApplicantIdStore((state) => state.id);
    const { mutateAsync: createOffer } = useCreateOffer();
    const { data: applicantsById } = useApplicantsById(applicantId);
    const getApplicantRecords = useApplicantStore((s) => s.records);

    const annualSalary = (Number(applicantsById?.generalInformation?.desiredSalary) || 0) * 12;

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

    // For submitting Offered Application Movement.
    const handleSubmit = async () => {
        await createOffer({
            ApplicantId: applicantId,
            Position: {
                Id: positionId,
                Name: position
            },
            Department: {
                Name: department,
                Id: departmentId
            },
            PaymentScheme: {
                Id: paymentSchemeId,
                Name: getSalaryTypes
            },
            Salary: amount,
            Comment: comments
        })
        setIsUpdateSuccessful(true);
        setTimeout(() => {
            handleCloseAll();
        }, 1000)
    }

    return (
        <div className="p-1">

            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                        Generate Offer
                    </h1>
                    <button
                        onClick={onClose}
                        className="text-[#6D6D6D] hover:text-[#F14336] transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2 poppins" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-2">
                <IconChecklist size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div>
                <h1 className="font-semibold flex justify-center text-[24px] text-[#6D6D6D] poppins">
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
                <ViewPDF isOpen={isViewPDF} onClose={() => setIsViewPDF(false)} header={title === "Offered" ? "Generate Offer" : "Job Offer"}>
                    <Divider size={2} color="#6D6D6D99" className="w-full poppins mb-2" />
                    <PDFViewer width="100%" height="710" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>

                        <MyDocument
                            applicantName={applicantsById?.name}
                            position={getApplicantRecords[0].position}
                            department={Department}
                            remarks={JOB_OFFER_CONSTANTS.remarks}
                            acknowledgement={JOB_OFFER_CONSTANTS.acknowledgement}
                            salaryMonthly={applicantsById?.generalInformation.desiredSalary + JOB_OFFER_CONSTANTS.currency}
                            salaryYearly={annualSalary.toString() + JOB_OFFER_CONSTANTS.currency}
                            meritIncrease={JOB_OFFER_CONSTANTS.meritIncrease}
                            benefitMaternity={JOB_OFFER_CONSTANTS.benefitMaternity}
                            benefitPaternity={JOB_OFFER_CONSTANTS.benefitPaternity}
                            descriptionBL={JOB_OFFER_CONSTANTS.descriptionBL}
                            descriptionSL={JOB_OFFER_CONSTANTS.descriptionSL}
                            descriptionTranspo={JOB_OFFER_CONSTANTS.descriptionTranspo}
                            descriptionVL={JOB_OFFER_CONSTANTS.descriptionVL}
                            noteSalary={JOB_OFFER_CONSTANTS.noteSalary}
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
                                setIsOffered(false);
                                setIsModalOpen(false)
                            }}
                        >
                            {"Edit Details".toUpperCase()}
                        </Button>

                        <Button
                            className="rounded-lg w-[198px] h-[42px] font-medium text-[15px] br-gradient border-0"
                            onClick={handleSubmit}
                        >
                            {"done".toUpperCase()}
                        </Button>

                    </div>
                </ViewPDF>
            </div>

            <div>
                <ModalWrapper
                    isOpen={isUpdateSuccessful}
                    overlayClassName="job-offer-modal-overlay"
                    contentClassName="job-generated"
                    onClose={onClose}
                >
                    <UpdateApplicantSucessful onClose={() => setIsUpdateSuccessful(false)} />
                </ModalWrapper>
            </div>
        </div>
    );
}

// This is the top-level modal. Meaning, this is the last modal you should see as it is the final step in the process.