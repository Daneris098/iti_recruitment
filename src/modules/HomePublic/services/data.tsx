import { useSharedOrgService, useSharedGeneralService } from "@src/modules/Shared/api/useSharedUserService";
import { useQuery } from "@tanstack/react-query";

export const useFilterDataResponse = () => {
  const departments = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const result = await useSharedOrgService("/departments").getAll();
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

  const employmentType = useQuery({
    queryKey: ["employment-types"],
    queryFn: async () => {
      const result = await useSharedGeneralService("/employment-types").getAll();
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
  return { departments, workPlaces, employmentType, experienceLevel };
};
