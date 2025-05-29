
export interface AdministratorSettingsState {
  alert: string;
  activePanel: string;
  selectedUser: user;
  newlyAddedUser: UserForm;
  resetCredentials: ResetCredentialForm;

  setResetCredentials: (resetCredentials: ResetCredentialForm) => void;
  setNewlyAddedUser: (newlyAddedUser: UserForm) => void;
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
    { accessor: 'status', title: 'Status', sortable: true },
  ],
};

export type user = {
  id: number;
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

export interface DataTableState {
  time: string,
  search: string,
  totalRecords: number;
  page: number;
  pageSize: number;
  sortStatus: { columnAccessor: string; direction: 'asc' | 'desc' };

  setTime: (time: string) => void;
  setSearch: (action: string) => void;
  setTotalRecords: (total: number) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortStatus: (status: { columnAccessor: string; direction: 'asc' | 'desc' }) => void;
}

export interface UserForm {
  firstName: string,
  middleName: string,
  lastName: string,
  extension: string,
  email: string,
  username: string,
  password: string,
  rePassword: string,
  isGenerated: boolean
}

export interface ResetCredentialForm {
  username: string,
  email: string,
  password: string,
  rePassword: string,
}