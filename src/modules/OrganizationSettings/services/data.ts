import { useQuery } from "@tanstack/react-query";
import { useSharedOrgService, useSharedGeneralService } from "@src/modules/Shared/api/useSharedUserService";
import { OrganizationSettingsStore } from "../store";
import { Panel } from "../assets/Enum";

export const useFetchOrganizationSettings = () => {
  const { sortBy, activePanel, setTime, page, pageSize } = OrganizationSettingsStore();
  const formattedValues: Record<string, any> = {
    SortBy: sortBy === "" ? null : sortBy,
    Page: page === 1 ? null : page,
    PageSize: pageSize === 15 ? null : pageSize,
  };
  const cleanedValues = Object.fromEntries(Object.entries(formattedValues).filter(([_, value]) => value !== null));
  const branches = useQuery({
    queryKey: ["org_branch", { ...cleanedValues }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await useSharedOrgService("/branches").getAll(cleanedValues);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },

    enabled: activePanel === Panel.branch,
    staleTime: 1000 * 60 * 5,
  });

  const companies = useQuery({
    queryKey: ["org_company", { ...cleanedValues }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await useSharedOrgService("/companies").getAll(cleanedValues);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },

    enabled: activePanel === Panel.companyList,
    staleTime: 1000 * 60 * 5,
  });

  const departments = useQuery({
    queryKey: ["org_department", { ...cleanedValues }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await useSharedOrgService("/departments").getAll(cleanedValues);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    enabled: activePanel === Panel.departments,
    staleTime: 1000 * 60 * 5,
  });

  const divisions = useQuery({
    queryKey: ["org_division", { ...cleanedValues }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await useSharedOrgService("/divisions").getAll(cleanedValues);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    enabled: activePanel === Panel.division,
    staleTime: 1000 * 60 * 5,
  });

  const positions = useQuery({
    queryKey: ["org_position", { ...cleanedValues }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await useSharedOrgService("/position-levels").getAll(cleanedValues);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    enabled: activePanel === Panel.positionLevel,
    staleTime: 1000 * 60 * 5,
  });

  const sections = useQuery({
    queryKey: ["org_section", { ...cleanedValues }],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await useSharedOrgService("/sections").getAll(cleanedValues);
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      setTime(executionTime.toFixed(3).toString());
      return result;
    },
    enabled: activePanel === Panel.section,
    staleTime: 1000 * 60 * 5,
  });

  const locations = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const result = await useSharedGeneralService("/locations").getAll({});
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const areas = useQuery({
    queryKey: ["areas"],
    queryFn: async () => {
      const result = await useSharedGeneralService("/areas").getAll({});
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  return { branches, companies, departments, divisions, positions, sections, locations, areas };
};
