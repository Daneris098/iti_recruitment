import { create } from "zustand";
import { AccountSetupState, Step } from "@modules/AccountSetup/types";

export const AccountSetupStore = create<AccountSetupState>((set) => ({
  activeStepper: Step.profile,
  setActiveStepper: (activeStepper: number) => set({ activeStepper: activeStepper }),
}));

