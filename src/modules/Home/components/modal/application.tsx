import { Modal, Divider, Button } from '@mantine/core';
import { HomeStore } from "@src/modules/Home/store";
import Stepper from "@modules/Home/components/stepper"
import GeneralInformation from "@modules/Home/components/form/GeneralInformation"
import EducationalAndEmployment from "@modules/Home/components/form/EducationalAndEmployment."
import FamilyAndOther from "@modules/Home/components/form/FamilyAndOther"
import { useEffect } from 'react';
import { cn } from "@src/lib/utils";

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
                        activeStepper === 0 ? <GeneralInformation /> :
                            activeStepper === 1 ? <EducationalAndEmployment /> :
                                activeStepper === 2 ? <FamilyAndOther />
                                    : <div></div>
                    )}
                    <div className={cn('flex gap-2 self-end w-[100%] sm:w-[25%]', (activeStepper === 0) && 'sm:w-[10%]')}>
                        {activeStepper > 0 && (<Button variant='outline' className={cn("self-end w-[50%] rounded-md ",)} onClick={() => { setActiveStepper((activeStepper > 0 ? activeStepper - 1 : activeStepper)) }}>
                            Back
                        </Button>)}
                        <Button className={cn("self-end w-[50%] rounded-md br-gradient border-none", activeStepper === 0 && 'w-full')} onClick={() => { setActiveStepper((activeStepper < 4 ? activeStepper + 1 : activeStepper)) }}>
                            Next
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}