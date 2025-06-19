import { queryClient } from "@src/client/queryClient";
import { useSharedOrgService } from "@src/modules/Shared/api/useSharedUserService";
import { useMutation } from "@tanstack/react-query";
import { OrganizationSettingsStore } from "../store";
import { ErrorTypes } from "../types";

export const useEditOrganizationSettings = () => {
  const branchData = OrganizationSettingsStore((state) => state.getForm("editBranch"));
  const companyData = OrganizationSettingsStore((state) => state.getForm("editCompany"));
  const departmentData = OrganizationSettingsStore((state) => state.getForm("editDepartment"));
  const divisionData = OrganizationSettingsStore((state) => state.getForm("editDivision"));
  const positionData = OrganizationSettingsStore((state) => state.getForm("editPosition"));
  const sectionData = OrganizationSettingsStore((state) => state.getForm("editSection"));

  const { setAlert, setValidationMessage } = OrganizationSettingsStore();

  const { mutate: editBranch } = useMutation({
    mutationFn: async (id: string) => {
      const formData: Record<string, any> = { ...branchData };
      return useSharedOrgService(`/branches/${id}/update`).create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_branch"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: ErrorTypes } }) => {
      console.error(error.response.data);
      setAlert("Validation");
      setValidationMessage(error.response.data.title);
    },
  });

  const { mutate: editCompany } = useMutation({
    mutationFn: async (id: string) => {
      const formData: Record<string, any> = { ...companyData };
      return useSharedOrgService(`/companies/${id}/update`).create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_company"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: ErrorTypes } }) => {
      console.error(error.response.data);
      setAlert("Validation");
      setValidationMessage(error.response.data.title);
    },
  });

  const { mutate: editDepartment } = useMutation({
    mutationFn: async (id: string) => {
      const formData: Record<string, any> = { ...departmentData };
      return useSharedOrgService(`/departments/${id}/update`).create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_department"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: ErrorTypes } }) => {
      console.error(error.response.data);
      setAlert("Validation");
      setValidationMessage(error.response.data.title);
    },
  });

  const { mutate: editDivision } = useMutation({
    mutationFn: async (id: string) => {
      const formData: Record<string, any> = { ...divisionData };
      return useSharedOrgService(`/divisions/${id}/update`).create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_division"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: ErrorTypes } }) => {
      console.error(error.response.data);
      setAlert("Validation");
      setValidationMessage(error.response.data.title);
    },
  });

  const { mutate: editPosition } = useMutation({
    mutationFn: async (id: string) => {
      const formData: Record<string, any> = { ...positionData };
      return useSharedOrgService(`/position-levels/${id}/update`).create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_position"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: ErrorTypes } }) => {
      console.error(error.response.data);
      setAlert("Validation");
      setValidationMessage(error.response.data.title);
    },
  });

  const { mutate: editSection } = useMutation({
    mutationFn: async (id: string) => {
      const formData: Record<string, any> = { ...sectionData };
      return useSharedOrgService(`/sections/${id}/update`).create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org_section"] });
      setAlert("saved");
    },
    onError: (error: { response: { data: ErrorTypes } }) => {
      console.error(error.response.data);
      setAlert("Validation");
      setValidationMessage(error.response.data.title);
    },
  });

  return { editCompany, editBranch, editDepartment, editDivision, editPosition, editSection };
};
