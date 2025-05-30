import { ApplicantStore } from "@modules/Vacancies/store/index"
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
// import ViewApplicant from "@src/modules/Applicants/components/documents/main/ViewApplicant";
import ViewApplicant from "@modules/Shared/components/viewApplicants/index";
import { useEffect } from "react";
export default function index() {
    const { setIsViewApplicant, selectedApplicant, isViewApplicant } = ApplicantStore();

    useEffect(() => {
        console.log('selectedApplicant: ', selectedApplicant)
    }, [selectedApplicant])

    // const Applicant = {
    //     ApplicantId: selectedApplicant.applicantId,
    //     applicantName: selectedApplicant.applicantName,
    //     position: selectedApplicant.position,
    //     status: selectedApplicant.status,
    //     skills: selectedApplicant.skills,
    //     email: selectedApplicant.email,
    //     phone: selectedApplicant.phone,
    //     remarks: selectedApplicant.remarks,
    //     applicationDate: selectedApplicant.applicationDate,
    //     isJobOffer: selectedApplicant.isJobOffer
    // }

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