import ApplicantProfile from "@modules/Shared/components/applicantProfile/applicantProfile"
import { ApplicantStore } from "@modules/Vacancies/store/index"

export default function index() { 
    const { setIsViewApplicant, selectedApplicant, isViewApplicant } = ApplicantStore()
    const Applicant = {
        ApplicantId: selectedApplicant.applicantId,
        Applicant_Name: selectedApplicant.Applicant_Name,
        Position: selectedApplicant.Position,
        Status: selectedApplicant.Status,
        Skills: selectedApplicant.Skills,
        Email: selectedApplicant.Email,
        Phone: selectedApplicant.Phone,
        Remarks: selectedApplicant.Remarks,
        Application_Date: selectedApplicant.Application_Date
    }
 
    return (
        <ApplicantProfile applicant={Applicant} setIsOpen={setIsViewApplicant} isOpen={isViewApplicant} onClose={() => setIsViewApplicant(false)} />
    )
}