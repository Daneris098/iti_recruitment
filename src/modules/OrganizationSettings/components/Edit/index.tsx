import { DataTableRowExpansionProps } from "mantine-datatable";
import { Panel } from "../../assets/Enum";
import { BranchType, CompanyType, DepartmentType, DivisionType, PositionType, SectionType } from "../../assets/Types";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";

import Branch from "./branch";
import Company from "./company";
import Department from "./department";
import Division from "./division";
import Position from "./position";
import Section from "./section";

type DataExpandRow = {
  [Panel.branch]: DataTableRowExpansionProps<BranchType>;
  [Panel.companyList]: DataTableRowExpansionProps<CompanyType>;
  [Panel.departments]: DataTableRowExpansionProps<DepartmentType>;
  [Panel.division]: DataTableRowExpansionProps<DivisionType>;
  [Panel.positionLevel]: DataTableRowExpansionProps<PositionType>;
  [Panel.section]: DataTableRowExpansionProps<SectionType>;
};

export default function useEdit(): DataExpandRow {
  const { activePanel, setAddOrg, setNewRows, addOrg } = OrganizationSettingsStore();
  const expandedIds = OrganizationSettingsStore((state) => state.expandedIds);
  const setExpanded = OrganizationSettingsStore((state) => state.setExpanded);
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);

  useEffect(() => {
    resetExpandedRows();
  }, [activePanel]);

  const onHandleExpandRow = (ids: number[] | ((prev: number[]) => number[])) => {
    setExpanded(ids);
    if (addOrg) {
      const oldRow = { id: "OLD" };
      setAddOrg(false);
      setNewRows([oldRow]);
    }
  };

  return {
    [Panel.branch]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: onHandleExpandRow },
      content: ({ record }) => <Branch record={record} />,
    },
    [Panel.companyList]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: onHandleExpandRow },
      content: ({ record }) => <Company record={record} />,
    },
    [Panel.departments]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: onHandleExpandRow },
      content: ({ record }) => <Department record={record} />,
    },
    [Panel.division]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: onHandleExpandRow },
      content: ({ record }) => <Division record={record} />,
    },
    [Panel.positionLevel]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: onHandleExpandRow },
      content: ({ record }) => <Position record={record} />,
    },
    [Panel.section]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: onHandleExpandRow },
      content: ({ record }) => <Section record={record} />,
    },
  };
}
