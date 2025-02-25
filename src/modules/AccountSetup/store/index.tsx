import { create } from "zustand";
import { AccountSetupState, Step, form } from "@modules/AccountSetup/types";
import { formValue} from "@modules/AccountSetup/values"
export const AccountSetupStore = create<AccountSetupState>((set) => ({
  activeStepper: Step.profile,
  form: formValue,
  setForm: (form: form) => set({ form: form }),
  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),
}));

