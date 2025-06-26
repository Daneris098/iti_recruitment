import { useQuery } from "@tanstack/react-query";
import { useSharedOrgService } from "@src/modules/Shared/api/useSharedUserService";
import { OrganizationSettingsStore } from "../store";

export const useFetchOrganization = () => {
  const { sortBy, page, pageSize, ascDesc, setTime } = OrganizationSettingsStore();

  const isAscOrDesc = ascDesc ? "+" : "-";

  const formattedFilters: Record<string, any> = {
    SortBy: sortBy === "" ? null : `${isAscOrDesc}${sortBy}`,
    Page: page === 1 ? null : page,
    PageSize: pageSize === 15 ? null : pageSize,
  };

  const sortFilter = Object.fromEntries(Object.entries(formattedFilters).filter(([_, value]) => value !== null));

  return {
    useBranches: () =>
      useQuery({
        queryKey: ["org_branch", { ...sortFilter }],
        queryFn: async () => {
          const startTime = performance.now();
          const result = await useSharedOrgService("/branches").getAll({});
          const endTime = performance.now();
          const executionTime = (endTime - startTime) / 1000;
          setTime(executionTime.toFixed(3).toString());
          return result;
        },
        staleTime: 1000 * 60 * 5,
      }),

    useCompanies: () =>
      useQuery({
        queryKey: ["org_company", { ...sortFilter }],
        queryFn: async () => {
          const startTime = performance.now();
          const result = await useSharedOrgService("/companies").getAll({});
          const endTime = performance.now();
          const executionTime = (endTime - startTime) / 1000;
          setTime(executionTime.toFixed(3).toString());
          return result;
        },
        staleTime: 1000 * 60 * 5,
      }),

    useDepartments: () =>
      useQuery({
        queryKey: ["org_department", { ...sortFilter }],
        queryFn: async () => {
          const startTime = performance.now();
          const result = await useSharedOrgService("/departments").getAll({});
          const endTime = performance.now();
          const executionTime = (endTime - startTime) / 1000;
          setTime(executionTime.toFixed(3).toString());
          return result;
        },
        staleTime: 1000 * 60 * 5,
      }),

    useDivisions: () =>
      useQuery({
        queryKey: ["org_division", { ...sortFilter }],
        queryFn: async () => {
          const startTime = performance.now();
          const result = await useSharedOrgService("/divisions").getAll({});
          const endTime = performance.now();
          const executionTime = (endTime - startTime) / 1000;
          setTime(executionTime.toFixed(3).toString());
          return result;
        },
        staleTime: 1000 * 60 * 5,
      }),

    useSections: () =>
      useQuery({
        queryKey: ["org_section", { ...sortFilter }],
        queryFn: async () => {
          const startTime = performance.now();
          const result = await useSharedOrgService("/sections").getAll({});
          const endTime = performance.now();
          const executionTime = (endTime - startTime) / 1000;
          setTime(executionTime.toFixed(3).toString());
          return result;
        },
        staleTime: 1000 * 60 * 5,
      }),

    usePositions: () =>
      useQuery({
        queryKey: ["org_position", { ...sortFilter }],
        queryFn: async () => {
          const startTime = performance.now();
          const result = await useSharedOrgService("/position-levels").getAll({});
          const endTime = performance.now();
          const executionTime = (endTime - startTime) / 1000;
          setTime(executionTime.toFixed(3).toString());
          return result;
        },
        staleTime: 1000 * 60 * 5,
      }),
  };
};
