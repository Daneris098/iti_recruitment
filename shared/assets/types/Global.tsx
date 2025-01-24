export enum FilingStatus {
  Approved = "Approved",
  Cancelled = "Cancelled",
  Reviewed = "Reviewed",
  Filed = "Filed",
  Posted = "Posted",
}

export enum Tabs {
  List = "Lust",
  Review = "Review",
  Approve = "Approve",
}

export type DateRangeType = {
  dateFrom: string;
  dateTo: string;
};

export type LookUpResponse = {
  id: number;
  name: string;
  code?: string;
  description?: string;
};
