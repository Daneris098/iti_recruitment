import { BranchType, CompanyType, DepartmentType, DivisionType, PositionType, SectionType } from "./Types";

export enum Panel {
  branch = "branch",
  companyList = "companyList",
  departments = "departments",
  division = "division",
  positionLevel = "positionLevel",
  section = "section",
}

export type DataRecords = {
  [Panel.branch]: BranchType[];
  [Panel.companyList]: CompanyType[];
  [Panel.departments]: DepartmentType[];
  [Panel.division]: DivisionType[];
  [Panel.positionLevel]: PositionType[];
  [Panel.section]: SectionType[];
};

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

export enum Title {
  companyList = "Company List",
  branch = "Branch",
  section = "Section",
  division = "Division",
  positionLevel = "Position Level",
  departments = "Departments",
}

export enum Description {
  companyList = "List all your companies below",
  branch = "List all your branches below",
  section = "List all section below",
  division = "List all your division",
  positionLevel = "List all position levels below",
  departments = "List all your department below.",
}

export enum AlertType {
  Saved = "saved",
  Cancel = "Cancel",
  Cancelled = "Cancelled",
  Validation = "Validation",
}
