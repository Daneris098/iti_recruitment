import { Button, Divider, Modal } from "@mantine/core";
import { VacancyStore } from "@modules/Vacancies/store";
import { selectedDataVal } from "@modules/Vacancies/values";
import { AlertType } from "@modules/Vacancies/types";
import "@modules/Vacancies/style.css"
import { Pill } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function index() {
    const { selectedVacancy, action, setSelectedVacancy, setAlert, setAction } = VacancyStore();
    
    const formatToWord = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-PH', {
            timeZone: 'Asia/Manila', // Ensure it's using Philippine time
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    
    return (
        <>
            <Modal radius="lg" size={'80%'} opened={selectedVacancy != selectedDataVal && action == ''}
                withCloseButton={false} centered onClose={() => setSelectedVacancy(selectedDataVal)}
                className='text-[#559CDA] scrollbar ' classNames={{ content: 'scrollbar' }}
                styles={{
                    header: { width: '95%' },
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                    body: { padding: '0' }
                }}>
                <div className='poppins h-[85vh] flex flex-col gap-3 py-3 text-[#6D6D6D]'>
                    {/* header */}
                    <div className='px-10 top-0 z-50 sticky  pt-4'>
                        <div className='flex justify-between'>
                            <p className='text-[#559CDA] text-[22px] font-bold py-2'>Vacancy Details</p>
                            <IconX size={30} className="text-[#6D6D6D] cursor-pointer" onClick={() => { setSelectedVacancy(selectedDataVal); }} />
                        </div>
                        <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                    </div>

                    {/* body */}
                    <div className=" flex flex-col gap-8 h-[80%] px-10 overflow-y-auto scrollbar2 relative">

                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Position Title</p>
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
                                <p>Employment Type</p>
                                <p className="font-bold">{selectedVacancy.employmentType}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Workplace Type</p>
                                <p className="font-bold">{selectedVacancy.workplace}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Experience Level</p>
                                <p className="font-bold">{selectedVacancy.experienceLevel}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>Vacancy Type</p>
                                <p className="font-bold">{selectedVacancy.vacancyType}</p>
                            </div>
                            <div className="w-[30%]">
                                <p>No. of Open Position </p>
                                <p className="font-bold">{selectedVacancy.quantity}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[30%]">
                                <p>Vacancy Duration</p>
                                <p className="font-bold">{`${formatToWord(selectedVacancy.vacancyDuration.start)} - ${formatToWord(selectedVacancy.vacancyDuration.end)}`}</p>
                            </div>
                        </div>
                        <div>
                            <p>Job Description</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: (selectedVacancy as any)?.jobDescription ?? "",
                                }}
                            />
                        </div>
                        <div>
                            <p>Must Have Skills</p>
                            <p className="font-bold">
                                <Pill.Group>
                                    {Array.isArray(selectedVacancy?.mustHaveSkills) &&
                                        selectedVacancy.mustHaveSkills.map((item, index) => (
                                            <Pill key={index}>
                                                <p className="font-bold text-[#6D6D6D] text-[16px]">{(item as any).keyword}</p>
                                            </Pill>
                                        ))}
                                </Pill.Group>
                            </p>
                        </div>
                        <div>
                            <p>Qualification</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: (selectedVacancy as any)?.qualifications?.[0]?.keyword ?? "",
                                }}
                            />
                        </div>

                    </div>
                    {/* footer */}
                    <div className="gap-2 flex justify-end z-40 px-10 items-center  py-3 ">
                        <Button variant="outline" className="w-1/6 self-end  rounded-md" onClick={() => { setAction('Edit') }}>EDIT</Button>
                        <Button className="w-1/6 self-end br-gradient border-none rounded-md" onClick={() => { setSelectedVacancy(selectedDataVal); setAlert(AlertType.closeVacancy) }}>CLOSE VACANCY</Button>
                    </div>
                </div>
            </Modal>
        </>

    )
}