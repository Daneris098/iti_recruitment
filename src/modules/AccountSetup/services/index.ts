import { useMutation, useQuery } from "@tanstack/react-query";
import { useSharedGeneralService, useSharedHiringService, useSharedOrgService } from "@src/modules/Shared/api/useSharedUserService";
import authApi from "@src/api/authApi";
import { apiClient } from "@shared/services/apiClient";

export const useAccountSetupAPI = () => {
  const { mutate: profileSetup } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return authApi.post("/user-management/users/me/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: companySetup } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/companies").create(form);
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: branchSetup } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/branches").create(form);
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: divisionSetup } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/divisions").create(form);
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: otherSettingsSetup } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return apiClient.post("/recruitment/hiring/other-settings", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: interviewStageSetup } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedHiringService("/interview-stages").create(form);
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: interviewerSetup } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedHiringService("/interviewers").create(form);
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
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
  return { profileSetup, companySetup, branchSetup, divisionSetup, otherSettingsSetup, interviewStageSetup, interviewerSetup, locations, areas };
};
