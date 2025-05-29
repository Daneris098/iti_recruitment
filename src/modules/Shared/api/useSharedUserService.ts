import { apiClient } from "@shared/services/apiClient";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponse, JobOpenings } from "@modules/Shared/types";

export const useSharedUserService = new BaseService<ApplicantResponse>(apiClient, "/recruitment/applicants");

export const useSharedTransferredPosition = new BaseService<JobOpenings>(apiClient, "recruitment/vacancies");

export const useSharedOrgService = (endpoint?: string) => new BaseService(apiClient, `/recruitment/organization${endpoint}`);

export const useSharedGeneralService = (endpoint?: string) => new BaseService(apiClient, `/general${endpoint}`);

export const useSharedUserManagementService = (endpoint?: string) => new BaseService(apiClient, `/user-management/users/me${endpoint}`);

export const useSharedHiringService = (endpoint?: string) => new BaseService(apiClient, `/recruitment/hiring${endpoint}`);
