import { Modal, Divider, Button } from '@mantine/core';
import { HomeStore } from "@src/modules/Home/store";
import Stepper from "@modules/Home/components/stepper"
import GeneralInformation from "@modules/Home/components/form/GeneralInformation"
export default function index() {
    const { applicationForm, setApplicationForm } = HomeStore();

    return (
        <>
            <Modal size='100%' opened={applicationForm} centered onClose={() => setApplicationForm(false)} title="Application Form" className='text-[#559CDA]' >
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <div className='m-auto w-[95%]  flex flex-col gap-3'>
                    <div className='w-[80%] m-auto  pb-12 hidden sm:block'>
                        <Stepper />
                    </div>
                    <GeneralInformation />
                    <Button className="self-end sm:w-[10%] rounded-md br-gradient border-none">
                        Next
                    </Button>
                </div>
            </Modal>
        </>
    )
}