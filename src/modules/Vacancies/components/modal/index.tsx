import AddVacancy from '@modules/Vacancies/components/modal/AddVacancy'
import Alert from '@modules/Vacancies/components/modal/Alert'
import ViewApplicant from '@modules/Vacancies/components/modal/ViewApplicant'

export default function index() {
    return (
        <>
            <AddVacancy />
            <Alert />
            <ViewApplicant/>
        </>
    )
}