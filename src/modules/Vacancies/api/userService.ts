import { apiClient } from "@shared/services/apiClient";
import { BaseService } from "@shared/services/baseService";
import { ApplicantResponse,
    //  ApplicantResponseById, ApplicationMovements
     } from "@modules/Applicants/types";

export const userService = new BaseService<ApplicantResponse>(
    apiClient,
    "/recruitment/vacancies"
);

export const vacancies = {
    getAll: () =>
        apiClient.get<any>(`/recruitment/vacancies/`),
  };