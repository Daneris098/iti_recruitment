type FormValues = Record<string, any>;
export interface ReportState {
  selectedReport: Report | null;
  alert: AlertType | null;
  isPreview: boolean;

  setIsPreview: (isPreview: boolean) => void;
  setAlert: (alert: AlertType | null) => void;
  setSelectedReport: (selectedReport: Report | null) => void;

  forms: Record<string, FormValues>;
  updateForm: (formKey: string, values: FormValues) => void;
  getForm: (formKey: string) => FormValues | undefined;
}

export enum AlertType {
  downloadReportSuccess = "downloadReportSuccess",
}

export enum Reports {
  sourceEfficiencyReport = "sourceEfficiencyReport",
  locationSummary = "locationSummary",
  positionReport = "positionReport",
  timeToFill = "timeToFill",
  applicantStatusReport = "applicantStatusReport",
  recruitmentActivityReport = "recruitmentActivityReport",
  timeToHire = "timeToHire",
  offerAcceptanceReport = "offerAcceptanceReport",
  offerRejectionSummary = "offerRejectionSummary",
}

export interface Report {
  title: String;
  icon: React.ReactNode;
  name: string;
  description: string;
  type: Reports;
}

type OfferAcceptance = {
  month: string;
  IT: number;
  Accounting: number;
  Sales: number;
  HR: number;
  Admin: number;
};

export interface OfferAcceptanceProps {
  data: OfferAcceptance[];
}
