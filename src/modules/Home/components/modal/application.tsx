import { Modal, Divider, Button } from '@mantine/core';
import { HomeStore } from "@src/modules/Home/store";
import Stepper from "@modules/Home/components/stepper"
import GeneralInformation from "@modules/Home/components/form/GeneralInformation"
import { useEffect } from 'react';
export default function index() {
    const { applicationForm, setApplicationForm, activeStepper, setActiveStepper } = HomeStore();

    useEffect(() => {
        console.log(activeStepper)
    }, [activeStepper])

    return (
        <>
            <Modal size='100%' opened={applicationForm} centered onClose={() => setApplicationForm(false)} title="Application Form" className='text-[#559CDA]' >
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <div className='m-auto w-[95%]  flex flex-col gap-3'>
                    <div className='w-[80%] m-auto  pb-12 hidden sm:block'>
                        <Stepper />
                    </div>
                    {(
                        activeStepper === 0 ? <GeneralInformation /> : <div></div>
                    )}
                    <div className='flex gap-2 self-end w-[25%]'>
                        <Button variant='outline' className="self-end sm:w-[50%] rounded-md " onClick={() => { setActiveStepper((activeStepper > 0 ? activeStepper - 1 : activeStepper)) }}>
                            Back
                        </Button>
                        <Button className="self-end sm:w-[50%] rounded-md br-gradient border-none" onClick={() => { setActiveStepper((activeStepper < 4 ? activeStepper + 1 : activeStepper)) }}>
                            Next
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}