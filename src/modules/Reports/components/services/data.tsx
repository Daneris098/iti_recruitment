import { useSharedOrgService, useSharedVacanciesService } from "@src/modules/Shared/api/useSharedUserService";
import { useQuery } from "@tanstack/react-query";

export const useFetchReport = () => {
  const companies = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const result = await useSharedOrgService("/companies").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const departments = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const result = await useSharedOrgService("/departments").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const vacancies = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const result = await useSharedVacanciesService.getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { companies, departments, vacancies };
};
