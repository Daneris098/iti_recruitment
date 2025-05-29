import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@src/api/authApi";
import {  AlertType, ResetCredentialForm } from "../types";

interface UpdateUserInput {
    userId: number;
    formValues: ResetCredentialForm;
    setAlert: (val: AlertType) => void;
    onSuccess?: () => void;
}

export const useResetPassword = () => {

    return useMutation({
        mutationFn: async ({ userId, formValues }: UpdateUserInput) => {
            await axiosInstance.post(`/auth/${userId}/reset-password`, formValues);
        },
        onSuccess: (_, variables) => {
            variables.onSuccess?.();
        },
        onError: (error: any) => {
            const message = error.response?.data?.errors?.[0]?.message || 'Reset Password failed';
            console.error(message);
        },
    });
};
