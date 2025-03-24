import Vacancy from '@modules/Vacancies/components/modal/Vacancy'
import Alert from '@modules/Vacancies/components/modal/Alert'
import ViewApplicant from '@modules/Vacancies/components/modal/ViewApplicant'
import SelectedVacancy from '@modules/Vacancies/components/modal/SelectedVacancy'
import DrawerFilter from '@modules/Vacancies/components/modal/DrawerFilter'

export default function index() {
    return (
        <>
            <Vacancy />
            <Alert />
            <ViewApplicant />
            <SelectedVacancy />
            <DrawerFilter/>
        </>
    )
}