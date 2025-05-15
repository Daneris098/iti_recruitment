import { apiClient } from "@shared/services/apiClient";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponse } from "@modules/Shared/types";

export const useSharedUserService = new BaseService<ApplicantResponse>(
    apiClient,
    "/recruitment/applicants"
);