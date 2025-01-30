import { Modal, Divider, Button } from '@mantine/core';
import { HomeStore, ApplicationStore } from "@src/modules/Home/store";
import Stepper from "@modules/Home/components/stepper";
import GeneralInformation from "@modules/Home/components/form/GeneralInformation";
import EducationalAndEmployment from "@modules/Home/components/form/EducationalAndEmployment";
import FamilyAndOther from "@modules/Home/components/form/FamilyAndOther";
import Reference from "@modules/Home/components/form/Reference";
import Photo from "@modules/Home/components/form/Photo";
import { cn } from "@src/lib/utils";
import { Step } from '@modules/Home/types';
import { useEffect } from 'react';



export default function index() {
    const { applicationFormModal, setApplicationFormModal } = HomeStore();
    const { activeStepper, setActiveStepper, setSubmit , applicationForm} = ApplicationStore();

    let currentStepComponent;
    if (activeStepper === Step.GeneralInformation) {
        currentStepComponent = <GeneralInformation />;
    } else if (activeStepper === Step.EducationalAndEmployment) {
        currentStepComponent = <EducationalAndEmployment />;
    } else if (activeStepper === Step.FamilyAndOther) {
        currentStepComponent = <FamilyAndOther />;
    } else if (activeStepper === Step.Reference) {
        currentStepComponent = <Reference />;
    } else if (activeStepper === Step.Photo) {
        currentStepComponent = <Photo />;
    } else {
        currentStepComponent = <div>Else Page</div>;
    }

    useEffect(() => {
        console.log('applicationForm: ',applicationForm)
    }, [applicationForm])

    return (
        <>
            <Modal size='100%' opened={applicationFormModal} centered onClose={() => setApplicationFormModal(false)} title="Application Form" className='text-[#559CDA]' >
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <div className='m-auto w-[95%] flex flex-col gap-3'>
                    <div className='w-[80%] m-auto pb-12 hidden sm:block'>
                        <Stepper />
                    </div>

                    {currentStepComponent}

                    <div className={cn('flex gap-2 self-end w-[100%] sm:w-[25%]', (activeStepper === Step.GeneralInformation) && 'sm:w-[10%]')}>
                        {activeStepper > Step.GeneralInformation && (
                            <Button variant='outline' className={cn("self-end w-[50%] rounded-md ")} onClick={() => setActiveStepper(activeStepper - 1)}>
                                Back
                            </Button>
                        )}
                        <Button className={cn("self-end w-[50%] rounded-md br-gradient border-none", activeStepper === Step.GeneralInformation && 'w-full')} onClick={() => {
                            setSubmit(true)
                        }}>
                            Next
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
