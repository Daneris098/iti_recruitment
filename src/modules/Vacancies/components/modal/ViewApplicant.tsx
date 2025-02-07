import { Divider, Modal } from "@mantine/core";
import { VacancyStore } from "../../store";
import { selectedDataVal } from "../../values";
import { useEffect } from "react";

export default function index() {
    const { selectedData, setSelectedData } = VacancyStore();
    useEffect(() => {
        console.log(selectedData)
    }, [selectedData])
    return (
        <Modal size={'80%'} opened={selectedData != selectedDataVal} centered onClose={() => setSelectedData(selectedDataVal)} title={'View Applicant'}
            className='text-[#559CDA]' styles={{
                header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
            }}>
            <div className='m-auto w-[95%] '>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <div className="grid grid-cols-5">
                    <div>
                        <p className="text-[#0078EB]">Applied</p>
                    </div>
                    <div >
                        <p className="text-[#FF7800]">For Interview</p>
                    </div>
                    <div >
                        <p className="text-[#FEC001]">Offered</p>
                    </div>
                    <div>
                        <p className="text-[#5A9D27]">Hired</p>
                    </div>
                    <div>
                        <p className="text-[#FF554A]">Archived</p>
                    </div>

                </div>
            </div>
        </Modal>
    )
}