import { create } from "zustand";
import { AccountSetupState, Step, accountSetupForm } from "@modules/AccountSetup/types";
import { formValue} from "@modules/AccountSetup/values"
export const AccountSetupStore = create<AccountSetupState>((set) => ({
  activeStepper: Step.profile,
  accountSetupForm: formValue,
  alert: '',
  
  setAlert: (alert: string) => set({ alert: alert }),
  setAccountSetupForm: (form: accountSetupForm) => set({ accountSetupForm: form }),
  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),
}));

