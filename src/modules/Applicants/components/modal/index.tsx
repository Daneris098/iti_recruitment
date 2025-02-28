import ApplicantModal from '@modules/Applicants/components/modal/applicantProfile'
import UpdateStatusModal from "@modules/Applicants/components/modal/updateStatus";

export default function index() {
    return (
        <>
            <ApplicantModal isOpen={false} onClose={function (): void {
                throw new Error('Function not implemented.')
            }} children={undefined} />

            <UpdateStatusModal isOpen={false} onClose={function (): void {
                throw new Error('Function not implemented.')
            }} children={undefined} />
        </>
    )
}