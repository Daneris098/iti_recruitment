
export interface AdministratorSettingsState {
  alert: string;
  activePanel: string;
  selectedUser: user;

  setSelectedUser: (selectedUser: user) => void;
  setActivePanel: (activePanel: string) => void;
  setAlert: (alert: string) => void;
}


export enum AlertType {
  saved = 'saved',
  cancel = 'Cancel',
  cancellled = 'Cancelled',
  editSuccess = 'editSuccess',
  resetSuccess = 'resetSuccess',
  createAccountSuccess = 'createAccountSuccess',
  resetConfirmation = 'resetConfirmation',
}

export enum title {
  userAccounts = 'User Account',
}

export enum description {
  userAccounts = 'Manage system users',
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

export type user = {
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  status: string;
};

export interface DialogState {
  action: string,
  loading: boolean,

  setAction: (action: string) => void;
  setLoading: (loading: boolean) => void;
}