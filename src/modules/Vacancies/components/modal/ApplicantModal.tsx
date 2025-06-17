import { useEffect, useState } from "react";
import { ApplicantStore } from "@modules/Vacancies/store";
import { useApplicantIdStore } from "@src/modules/Shared/store";
import ViewApplicant from "@src/modules/Shared/components/viewApplicants";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import { fetchApplicantByIdService } from '@src/modules/Shared/utils/GetApplicantById/applicantServiceById';

export default function ViewApplicantModal() {
    const { setIsViewApplicant, selectedApplicant, isViewApplicant } = ApplicantStore();

    const setApplicantId = useApplicantIdStore((s) => s.setApplicantId);
    const applicantId = useApplicantIdStore((state) => state.id);

    useEffect(() => {
        if (isViewApplicant && selectedApplicant?.id && applicantId !== selectedApplicant.id) {
            setApplicantId(selectedApplicant.id);
        }
    }, [isViewApplicant, selectedApplicant?.id, applicantId, setApplicantId]);


    const token = sessionStorage.getItem("accessToken") ?? undefined;
    const [_applicant, setApplicant] = useState<any | null>(null);
    const [_isLoading, setLoading] = useState(false);
    const [_error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!applicantId || !token) return;

        setLoading(true);
        fetchApplicantByIdService(applicantId, token)
            .then(setApplicant)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [applicantId, token]);

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
    );
}