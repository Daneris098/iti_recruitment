
export interface OrganizationSettingsState {
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

export enum title {
  userAccounts = 'Company List',
}

export enum description {
  userAccounts = 'List all your companies below',
}

export enum panel {
  userAccounts = 'userAccounts',
}

export const columns = {
  userAccounts: [
    { accessor: 'username', title: 'Username', sortable: true },
    { accessor: 'lastname', title: 'Lastname', sortable: true },
    { accessor: 'firstname', title: 'Firstname', sortable: true },
    { accessor: 'email', title: 'Email', sortable: true },
  ],
};

export type Company = {
  username: string;
  lastname: string;
  firstname: string;
  email: string;
};