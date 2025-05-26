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

export type Organization = {
  items: OrganizationItem[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type OrganizationItem = Section &
  Branch &
  Department & {
    guid: string;
    code: string;
    name: string;
    isActive: boolean;
    id: number;
    description: string;
    createdById: number;
    dateCreated: string;
  };

export type Department = {
  head?: string;
  division?: {
    id: number;
    name: string;
  };
};

export type Branch = {
  area?: {
    id: number;
    name: string;
  };
  location?: {
    id: number;
    name: string;
  };
};

export type Section = {
  division?: {
    id: number;
    name: string;
  };
  department?: {
    id: number;
    name: string;
  };
};

type sectionKeys = keyof Section;
type departmentKeys = keyof Department;
type branchKeys = keyof Branch;

export type BranchType = Omit<OrganizationItem, sectionKeys | departmentKeys> & Required<Pick<Branch, keyof Branch>>;
export type CompanyType = Omit<OrganizationItem, sectionKeys | departmentKeys | branchKeys>;
export type DepartmentType = Omit<OrganizationItem, branchKeys> & Required<Pick<Department, keyof Department>> & Required<Pick<Section, keyof Section>>;
export type DivisionType = Omit<OrganizationItem, branchKeys> & Required<Pick<Department, keyof Department>>;
export type PositionType = Omit<OrganizationItem, sectionKeys | departmentKeys | branchKeys>;
export type SectionType = Omit<OrganizationItem, branchKeys> & Required<Pick<Section, keyof Section>>;
