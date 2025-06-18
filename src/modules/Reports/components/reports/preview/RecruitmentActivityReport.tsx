import { ReportStore } from "@src/modules/Reports/store";

export default function index() {
  const ActivityReport = ReportStore((state) => state.getForm("activityReport"));
  return (
    <iframe
      src={`${import.meta.env.VITE_REPORTS_BASE_URL}/Report/Get/?filter=ReportFilename=HRDotNet_Recruitment_Activity_Report_v1@ID_Company=${ActivityReport?.companyId}@ID_Department=${ActivityReport?.departmentId}@ID_Vacancy=${ActivityReport?.vacancyId}@DateFrom=${ActivityReport?.dateFrom}@DateTo=${ActivityReport?.dateTo}@ID_PrintedBy=${ActivityReport?.printedBy}`}
      title="Activity Report"
      allowFullScreen
      className="h-[90vh]"></iframe>
  );
}
