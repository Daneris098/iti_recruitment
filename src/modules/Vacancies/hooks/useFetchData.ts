import { useSharedGeneralService, useSharedOrgService } from "@src/modules/Shared/api/useSharedUserService";
import { useQuery } from "@tanstack/react-query";

export const useFormDataResponse = () => {
  const companies = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const result = await useSharedOrgService("/companies").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });
  const branches = useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const result = await useSharedOrgService("/branches").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const divisions = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const result = await useSharedOrgService("/divisions").getAll();
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

  const sections = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const result = await useSharedOrgService("/sections").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const employmentType = useQuery({
    queryKey: ["employment-types"],
    queryFn: async () => {
      const result = await useSharedGeneralService("/employment-types").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const workPlaces = useQuery({
    queryKey: ["work-places"],
    queryFn: async () => {
      const result = await useSharedGeneralService("/work-places").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const vacancyTypes = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const result = await useSharedGeneralService("/vacancy-types").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const experienceLevel = useQuery({
    queryKey: ["experience-levels"],
    queryFn: async () => {
      const result = await useSharedGeneralService("/experience-levels").getAll();
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });
  return { companies, branches, divisions, departments, sections, workPlaces, employmentType, vacancyTypes, experienceLevel };
};
