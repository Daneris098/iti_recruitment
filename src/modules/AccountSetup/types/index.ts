export enum Step {
  profile,
  organization,
  hiring,
}

export interface AccountSetupState {
  activeStepper: number;
  setActiveStepper: (activeStepper: number) => void;
}