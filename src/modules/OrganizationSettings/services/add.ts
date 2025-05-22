import { queryClient } from "@src/client/queryClient";
import { useSharedOrgService } from "@src/modules/Shared/api/useSharedUserService";
import { useMutation } from "@tanstack/react-query";

export const useAddOrganizationSettings = () => {
  const { mutate: addBranch } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      console.log(form);
      return useSharedOrgService("/branches").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_branch"] });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: addCompany } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/companies").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_company"] });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: addDepartment } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/departments").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_department"] });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: addDivision } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/divisions").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_division"] });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: addPosition } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      console.log(form);
      return useSharedOrgService("/position-levels").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_position"] });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  const { mutate: addSection } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/sections").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_section"] });
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
    },
  });

  return { addBranch, addCompany, addDepartment, addDivision, addPosition, addSection };
};
