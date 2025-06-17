import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@src/api/authApi";
import { UserForm, AlertType } from "../types";
import { UseFormReturnType } from "@mantine/form";

interface CreateUserInput {
  formValues: UserForm;
  isGenerated: boolean;
  setAction: (val: string) => void;
  setAlert: (val: AlertType) => void;
  setNewlyAddedUser: (user: UserForm) => void;
  form: UseFormReturnType<UserForm>;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formValues, isGenerated }: CreateUserInput) => {
      const payload = { ...formValues, isGenerated };
      await axiosInstance.post("/auth/register", payload);
      return formValues;
    },
    onSuccess: (formValues, variables) => {
      queryClient.refetchQueries({ queryKey: ["auth/users"], type: "active" });
      variables.setAction("");
      variables.setAlert(AlertType.createAccountSuccess);
      variables.setNewlyAddedUser(formValues);
      variables.form.reset();
    },
    onError: (error: any) => {
      const message = error.response?.data?.errors?.[0]?.message || "Something went wrong";
      console.error(message);
    },
  });
};
