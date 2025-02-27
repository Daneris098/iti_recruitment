export interface ReportState {
    selectedReport: Report | null;
    alert: AlertType | null

    setAlert: (alert: AlertType | null) => void;
    setSelectedReport: (selectedReport: Report | null) => void;
}

export enum AlertType {
    downloadReportSuccess = 'downloadReportSuccess',
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
    offerRejectionSummary = "offerRejectionSummary"
}

export interface Report {
    icon: React.ReactNode,
    name: string,
    description: string,
    type: Reports
}