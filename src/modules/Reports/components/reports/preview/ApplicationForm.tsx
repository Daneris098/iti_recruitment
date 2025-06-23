import { ReportStore } from "@src/modules/Reports/store";

function ApplicationForm() {
  const ApplicationForm = ReportStore((state) => state.getForm("applicationForm"));

  return (
    <iframe
      src={`${import.meta.env.VITE_REPORTS_BASE_URL}/Report/Get/?filter=ReportFilename=HRDotNet_Recruitment_Application_Form_v1@ID_Applicant=${ApplicationForm?.applicantId}`}
      title="Offer Acceptance Report"
      allowFullScreen
      className="h-[90vh]"></iframe>
  );
}

export default ApplicationForm;
