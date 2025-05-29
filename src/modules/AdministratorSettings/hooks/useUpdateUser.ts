import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@src/api/authApi";
import {  AlertType } from "../types";

interface UpdateUserInput {
    userId: number;
    formValues: any;
    setAlert: (val: AlertType) => void;
    onSuccess?: () => void;
}

export const useUpdateUser = () => {

    return useMutation({
        mutationFn: async ({ userId, formValues }: UpdateUserInput) => {
            await axiosInstance.post(`/auth/${userId}/update`, formValues);
            return formValues;
        },
        onSuccess: (_, variables) => {
            variables.onSuccess?.();
        },
        onError: (error: any) => {
            const message = error.response?.data?.errors?.[0]?.message || 'Update failed';
            console.error(message);
        },
    });
};
