import { ApplicantStore } from "@modules/Vacancies/store/index"
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
// import ViewApplicant from "@src/modules/Applicants/components/documents/main/ViewApplicant";
import ViewApplicant from "@modules/Shared/components/viewApplicants/index";
export default function index() {
    const { setIsViewApplicant, selectedApplicant, isViewApplicant } = ApplicantStore();

    return (
        <ModalWrapper
            isOpen={isViewApplicant}
            overlayClassName="modal-overlay"
            contentClassName="modal-content"
            onClose={() => setIsViewApplicant(false)}
        >
            <ViewApplicant
                applicantName={selectedApplicant.applicantName}
                Position={selectedApplicant.position}
                Status={selectedApplicant.status}
                Email={selectedApplicant.email}
                Phone={selectedApplicant.phone}
                Skills={selectedApplicant.skills}
                Remarks={selectedApplicant.remarks}
                Application_Date={selectedApplicant.applicationDate}
                IsJobOffer={selectedApplicant.isJobOffer}
                onClose={() => setIsViewApplicant(false)}
            />
        </ModalWrapper>
        // <ApplicantProfile applicant={Applicant} setIsOpen={setIsViewApplicant} isOpen={isViewApplicant} onClose={() => setIsViewApplicant(false)} />
    )
}