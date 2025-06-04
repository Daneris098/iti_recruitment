import { ApplicantStore } from "@modules/Vacancies/store/index";
import ViewApplicant from "@modules/Shared/components/viewApplicants/index";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";

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
                applicantName={`${selectedApplicant.nameResponse?.firstName} ${selectedApplicant.nameResponse?.lastName}`}
                location={selectedApplicant.addresses?.[0]?.zipCode?.name}
                position={selectedApplicant.position}
                status={selectedApplicant.applicationMovements?.at(-1)?.status.name ?? "N/A"}
                email={selectedApplicant.contact?.emailAddress}
                phone={selectedApplicant.contact?.mobileNo}
                skills={selectedApplicant.skills}
                remarks={selectedApplicant.remarks}
                applicationDate={selectedApplicant.applicationDate}
                IsJobOffer={selectedApplicant.isJobOffer}
                onClose={() => setIsViewApplicant(false)}
            />
        </ModalWrapper>
    )
}