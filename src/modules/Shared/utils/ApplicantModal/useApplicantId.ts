// hooks/useApplicantId.ts
import { useApplicantIdStore } from "@src/modules/Shared/store";

/**
 * Reads and writes the applicant‑ID that lives in the
 * global applicant‑ID store.
 *
 * @returns { applicantId, setApplicantId }
 */
export function useApplicantId() {
    return useApplicantIdStore((state) => ({
        applicantId: state.id,
        setApplicantId: state.setApplicantId,
    }));
}
