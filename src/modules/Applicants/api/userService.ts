import { apiClient } from "@shared/services/apiClient";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponse, ApplicantResponseById, ApplicationMovements } from "@modules/Applicants/types";

export const userService = new BaseService<ApplicantResponse>(
    apiClient,
    "/recruitment/applicants"
);

export const applicantsByIdService = {
    getById: (idOrGuid: string | number) =>
      apiClient.get<ApplicantResponseById>(`/recruitment/applicants/${idOrGuid}`),
  };

export const applicationMovements = {
    postById: (idOrGuid: number, data: Record<string, any>) => 
        apiClient.post<ApplicationMovements>(`/recruitment/applicants/${idOrGuid}/archive`, null, {params: data})
}