import { queryClient } from "@src/client/queryClient";
import { useSharedOrgService } from "@src/modules/Shared/api/useSharedUserService";
import { useMutation } from "@tanstack/react-query";
import { OrganizationSettingsStore } from "../store";

export const useAddOrganizationSettings = () => {
  const { setAlert } = OrganizationSettingsStore();
  const { mutate: addBranch } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/branches").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_branch"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
      setAlert("Validation");
    },
  });

  const { mutate: addCompany } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/companies").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_company"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
      setAlert("Validation");
    },
  });

  const { mutate: addDepartment } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/departments").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_department"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
      setAlert("Validation");
    },
  });

  const { mutate: addDivision } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/divisions").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_division"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
      setAlert("Validation");
    },
  });

  const { mutate: addPosition } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      console.log(form);
      return useSharedOrgService("/position-levels").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_position"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
      setAlert("Validation");
    },
  });

  const { mutate: addSection } = useMutation({
    mutationFn: async (form: Record<string, any>) => {
      return useSharedOrgService("/sections").create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_section"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: any } }) => {
      console.error(error.response.data);
      setAlert("Validation");
    },
  });

  return { addBranch, addCompany, addDepartment, addDivision, addPosition, addSection };
};
