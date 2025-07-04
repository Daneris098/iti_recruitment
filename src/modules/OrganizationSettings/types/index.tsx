export interface OrganizationSettingsState {
  alert: string;
  activePanel: string;
  action: string;
  reroute: boolean;
  validationMessage: string;

  setValidationMessage: (validationMessage: string) => void;
  setReroute: (reroute: boolean) => void;
  setAction: (action: string) => void;
  setActivePanel: (activePanel: string) => void;
  setAlert: (alert: string) => void;
}

export enum Operation {
  add = "add",
  edit = "edit",
  noOperation = "null",
}

export enum AlertType {
  saved = "saved",
  cancel = "Cancel",
  cancellled = "Cancelled",
  validation = "Validation",
}

export enum title {
  companyList = "Company List",
  branch = "Branch",
  section = "Section",
  division = "Division",
  positionLevel = "Position Level",
  departments = "Departments",
}

export enum description {
  companyList = "List all your companies below",
  branch = "List all your branches below",
  section = "List all section below",
  division = "List all your division",
  positionLevel = "List all position levels below",
  departments = "List all your department below.",
}

export enum panel {
  companyList = "companyList",
  branch = "branch",
  section = "section",
  division = "division",
  positionLevel = "positionLevel",
  departments = "departments",
}

export const columns = {
  companyList: [
    { accessor: "code", title: "Code", sortable: true },
    { accessor: "name", title: "Name", sortable: true },
  ],
  branch: [
    { accessor: "code", title: "Code", sortable: true },
    { accessor: "name", title: "Name", sortable: true },
    { accessor: "location", title: "Location", sortable: true },
    { accessor: "area", title: "Area", sortable: true },
    { accessor: "description", title: "Description", sortable: true },
    { accessor: "status", title: "Status", sortable: true },
  ],
  section: [
    { accessor: "code", title: "Code", sortable: true },
    { accessor: "name", title: "Name", sortable: true },
    { accessor: "division", title: "Division", sortable: true },
    { accessor: "department", title: "Department", sortable: true },
    { accessor: "description", title: "Description", sortable: true },
    { accessor: "status", title: "Status", sortable: true },
  ],
  division: [
    { accessor: "code", title: "Code", sortable: true },
    { accessor: "name", title: "Name", sortable: true },
    { accessor: "description", title: "Description", sortable: true },
    { accessor: "status", title: "Status", sortable: true },
  ],
  positionLevel: [
    { accessor: "code", title: "Code", sortable: true },
    { accessor: "name", title: "Name", sortable: true },
    { accessor: "description", title: "Description", sortable: true },
    { accessor: "status", title: "Status", sortable: true },
  ],
  departments: [
    { accessor: "code", title: "Code", sortable: true },
    { accessor: "name", title: "Name", sortable: true },
    { accessor: "departmentHead", title: "Department Head", sortable: true },
    { accessor: "division", title: "Division", sortable: true },
    { accessor: "description", title: "Description", sortable: true },
    { accessor: "status", title: "Status", sortable: true },
  ],
};

export type Company = {
  id: number;
  name: string;
  code: string;
  location: string;
  area: string;
  description: string;
  status: string;
  division: string;
  department: string;
  departmentHead: string;
  isNewField?: boolean;
  touched?: boolean;
};

export interface ErrorTypes {
  type: string;
  title: string;
  status: 0;
  traceId: string;
}
