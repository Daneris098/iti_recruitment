import { apiClient } from "@shared/services/apiClient";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponse, JobOpenings, AcceptedOffer } from "@modules/Shared/types";
// import { Organization } from "@src/modules/OrganizationSettings/assets/Types";

export const useGetFeedbacks = new BaseService(apiClient, "recruitment/hiring/feedbacks");

export const useGetDivisions = new BaseService(apiClient, "recruitment/organization/divisions");

export const useGetDepartments = new BaseService(apiClient, "/recruitment/organization/departments");

export const useGetPositionLevels = new BaseService(apiClient, "/recruitment/organization/position-levels");

export const useSharedUserService = new BaseService<ApplicantResponse>(apiClient, "/recruitment/applicants");

export const useSharedTransferredPosition = new BaseService<JobOpenings>(apiClient, "recruitment/vacancies");

export const useSharedVacanciesService = new BaseService(apiClient, "recruitment/vacancies");

export const useSharedGeneralService = (endpoint?: string) => new BaseService<any>(apiClient, `/general${endpoint}`);

export const useSharedHiringService = (endpoint?: string) => new BaseService(apiClient, `/recruitment/hiring${endpoint}`);

export const useSharedOrgService = (endpoint?: string) => new BaseService(apiClient, `/recruitment/organization${endpoint}`);

export const useSharedUserManagementService = (endpoint?: string) => new BaseService(apiClient, `/user-management/users/me${endpoint}`);

export const useSharedViewAcceptedOffer = {
  getAcceptedOfferId: (idOrGuid: string | number) => apiClient.get<AcceptedOffer>(`recruitment/applicants/${idOrGuid}/view-accepted-offer`),
};
