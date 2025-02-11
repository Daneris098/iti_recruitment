
export interface ProfileSettingsState {
  alert: string;

  setAlert: (alert: string) => void;
}


export enum AlertType {
  saved = 'saved',
  cancel = 'Cancel',
  cancellled = 'Cancelled',
}