import { Button, Divider, Modal } from "@mantine/core";
import { VacancyStore } from "@modules/Vacancies/store";
import { selectedDataVal } from "@modules/Vacancies/values";
import { AlertType } from "@modules/Vacancies/types";
import "@modules/Vacancies/style.css"

export default function index() {
    const { selectedVacancy, action, setSelectedVacancy, setAlert, setAction } = VacancyStore();

    return (
        <>
            <Modal size={'80%'} opened={selectedVacancy != selectedDataVal && action == ''} centered onClose={() => setSelectedVacancy(selectedDataVal)} title={'Vacancy Details'}
                styles={{
                    header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}>
                <div className='m-auto w-[95%] text-[#6D6D6D] flex flex-col'>
                    <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                    <div className="flex flex-col gap-8">

                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Job Title</p>
                                <p className="font-bold">{selectedVacancy.position}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Company</p>
                                <p className="font-bold">{selectedVacancy.company}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Branch</p>
                                <p className="font-bold">{selectedVacancy.branch}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Division</p>
                                <p className="font-bold">{selectedVacancy.division}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Department</p>
                                <p className="font-bold">{selectedVacancy.department}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Section</p>
                                <p className="font-bold">{selectedVacancy.section}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Position Level</p>
                                <p className="font-bold">{selectedVacancy.positionLevel}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Workplace Type</p>
                                <p className="font-bold">{selectedVacancy.workplace}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>No. of Open Position </p>
                                <p className="font-bold">{selectedVacancy.quantity}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Hiring Manager</p>
                                <p className="font-bold">{selectedVacancy.hiringManager}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Experience Level</p>
                                <p className="font-bold">{selectedVacancy.experienceLevel}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Vacancy Type</p>
                                <p className="font-bold">{selectedVacancy.vacancyType}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Vacancy Duration</p>
                                <p className="font-bold">{`${selectedVacancy.vacancyDuration.start} - ${selectedVacancy.vacancyDuration.end}`}</p>
                            </div>
                        </div>
                        <div className="flex self-end w-2/6 gap-2">
                            <Button className="w-1/2 self-end br-gradient border-none rounded-md" onClick={() => { setAction('Edit') }}>EDIT</Button>
                            <Button className="w-1/2 self-end br-gradient border-none rounded-md" onClick={() => { setSelectedVacancy(selectedDataVal); setAlert(AlertType.closeVacancy) }}>CLOSE VACANCY</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}