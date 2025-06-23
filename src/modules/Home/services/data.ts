import { useSharedUserService } from "@src/modules/Shared/api/useSharedUserService";
import { useQuery } from "@tanstack/react-query";

export const useVacanciesByStatus = (statusId?: number) => {
  return useQuery({
    queryKey: ["vacancies", statusId ?? "all"],
    queryFn: () => useSharedUserService.getAll(statusId ? { StatusIds: statusId } : {}),
    staleTime: 1000 * 60 * 5,
    enabled: statusId === undefined || !!statusId,
  });
};

import { ApplicantIcons, Applicant } from "../assets/sample-data"; // adjust path

export const useApplicantsData = (): {
  applicantsData: Applicant[];
  isLoading: boolean;
} => {
  const { data: all, isLoading: isLoadingAll } = useVacanciesByStatus(); // all

  const { data: forInterview, isLoading: isLoadingInterview } = useVacanciesByStatus(2);

  const { data: hired, isLoading: isLoadingHired } = useVacanciesByStatus(5);

  const { data: archived, isLoading: isLoadingArchived } = useVacanciesByStatus(4);

  const applicantsData: Applicant[] = [
    {
      icon: ApplicantIcons.Users,
      title: "Total Applicants",
      value: all?.items.length ?? 0,
    },
    {
      icon: ApplicantIcons.UserUp,
      title: "For Interview",
      value: forInterview?.items.length ?? 0,
    },
    {
      icon: ApplicantIcons.UserCheck,
      title: "Hired",
      value: hired?.items.length ?? 0,
    },
    {
      icon: ApplicantIcons.UserX,
      title: "Archived",
      value: archived?.items.length ?? 0,
    },
  ];

  return {
    applicantsData,
    isLoading: isLoadingAll || isLoadingInterview || isLoadingHired || isLoadingArchived,
  };
};
