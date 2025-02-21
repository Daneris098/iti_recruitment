
export interface ProfileSettingsState {
  alert: string;
  activePanel: string;

  setActivePanel: (activePanel: string) => void;
  setAlert: (alert: string) => void;
}


export enum AlertType {
  saved = 'saved',
  cancel = 'Cancel',
  cancellled = 'Cancelled',
}