import { create } from "zustand";
import { AccountSetupState, Step, accountSetupForm } from "@modules/AccountSetup/types";
import { formValue } from "@modules/AccountSetup/values";
export const AccountSetupStore = create<AccountSetupState>((set, get) => ({
  activeStepper: Step.profile,
  accountSetupForm: formValue,
  alert: "",

  setAlert: (alert: string) => set({ alert: alert }),
  setAccountSetupForm: (form: accountSetupForm) => set({ accountSetupForm: form }),
  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),

  forms: {},

  updateForm: (formKey, values) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [formKey]: values,
      },
    })),

  getForm: (formKey) => get().forms[formKey],
}));
