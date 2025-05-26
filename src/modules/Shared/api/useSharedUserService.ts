import { apiClient } from "@shared/services/apiClient";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponse, JobOpenings } from "@modules/Shared/types";

export const useSharedUserService = new BaseService<ApplicantResponse>(apiClient, "/recruitment/applicants");

export const useSharedTransferredPosition = new BaseService<JobOpenings>(apiClient, "recruitment/vacancies");
