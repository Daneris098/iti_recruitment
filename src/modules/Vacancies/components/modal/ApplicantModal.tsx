import { ApplicantStore } from "@modules/Vacancies/store/index"
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
// import ViewApplicant from "@src/modules/Applicants/components/documents/main/ViewApplicant";
import ViewApplicant from "@modules/Shared/components/viewApplicants/index";

export default function index() {
    const { setIsViewApplicant, selectedApplicant, isViewApplicant } = ApplicantStore();
    
    const Applicant = {
        ApplicantId: selectedApplicant.applicantId,
        applicantName: selectedApplicant.applicantName,
        position: selectedApplicant.position,
        status: selectedApplicant.status,
        skills: selectedApplicant.skills,
        email: selectedApplicant.email,
        phone: selectedApplicant.phone,
        remarks: selectedApplicant.remarks,
        applicationDate: selectedApplicant.applicationDate,
        isJobOffer: selectedApplicant.isJobOffer
    }

    return (
        <ModalWrapper
            isOpen={isViewApplicant}
            overlayClassName="modal-overlay"
            contentClassName="modal-content"
            onClose={() => setIsViewApplicant(false)}
        >
            <ViewApplicant
                applicantName={Applicant.applicantName}
                Position={Applicant.position}
                Status={Applicant.status}
                Email={Applicant.email}
                Phone={Applicant.phone}
                Skills={Applicant.skills}
                Remarks={Applicant.remarks}
                Application_Date={Applicant.applicationDate}
                IsJobOffer={Applicant.isJobOffer}
                onClose={() => setIsViewApplicant(false)}
            />
        </ModalWrapper>
        // <ApplicantProfile applicant={Applicant} setIsOpen={setIsViewApplicant} isOpen={isViewApplicant} onClose={() => setIsViewApplicant(false)} />
    )
}