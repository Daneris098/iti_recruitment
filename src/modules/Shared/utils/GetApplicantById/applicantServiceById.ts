// services/applicantService.ts
import { getApplicantById } from '@src/modules/Shared/utils/GetApplicantById/api';
/**
 * Fetch one applicant.
 *
 *
 * // default (any)
 * const applicant = await fetchApplicantById(1);
 *
 * // strongly typed
 * const applicant = await fetchApplicantById<ApplicantMovementsProps>(1);
 */
export const fetchApplicantByIdService = async <T = any>(
    id: string | number,
    token?: string | null
): Promise<T> => {
    return getApplicantById<T>("/api/recruitment/applicants", id, token);
};
