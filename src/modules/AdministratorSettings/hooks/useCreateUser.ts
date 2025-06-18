import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@src/api/authApi";
import { UserForm, AlertType } from "../types";
import { UseFormReturnType } from "@mantine/form";
import { AdministratorSettingsStore } from "../store";

interface CreateUserInput {
  formValues: UserForm;
  isGenerated: boolean;
  setAction: (val: string) => void;
  setAlert: (val: AlertType) => void;
  setNewlyAddedUser: (user: UserForm) => void;
  form: UseFormReturnType<UserForm>;
}

interface ErrorResponse {
  code: string;
  errorType: number;
  message: string;
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
      variables.form.clearErrors();
    },
    onError: (error: { response: { data: { errors: ErrorResponse[] } } }, variables) => {
      const errors = error.response.data.errors;
      errors.forEach((err) => {
        if (err.code === "Registration.UsernameAlreadyExists") {
          variables.form.setFieldError("username", "Username already exists");
        }

        if (err.code === "Registration.EmailAddressAlreadyExists") {
          variables.form.setFieldError("email", "Email already exists");
        }
      });
    },
  });
};
