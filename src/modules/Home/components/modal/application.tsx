import { Modal, Divider, Button, Popover } from '@mantine/core';
import { HomeStore, ApplicationStore } from "@src/modules/Home/store";
import Stepper from "@modules/Home/components/stepper";
import GeneralInformation from "@modules/Home/components/form/GeneralInformation";
import EducationalAndEmployment from "@modules/Home/components/form/EducationalAndEmployment";
import FamilyAndOther from "@modules/Home/components/form/FamilyAndOther";
import Reference from "@modules/Home/components/form/Reference";
import Photo from "@modules/Home/components/form/Photo";
import Preview from "@modules/Home/components/form/Preview";
import { cn } from "@src/lib/utils";
import { Step } from '@modules/Home/types';
import { useEffect, useState } from 'react';
import { IconCaretDownFilled } from '@tabler/icons-react';



export default function index() {
    const { applicationFormModal, setApplicationFormModal } = HomeStore();
    const { activeStepper, setActiveStepper, setSubmit, isPhotoCaptured, setIsPhotoCapture } = ApplicationStore();

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
    } else if (activeStepper === Step.Preview) {
        currentStepComponent = <Preview />;
    }
    else {
        currentStepComponent = <div>Else Page</div>;
    }

    useEffect(() => {
        console.log('activeStepper: ', activeStepper)
    }, [activeStepper])

    const [opened, setOpened] = useState(false);

    const togglePopover = () => {
        setOpened((prev) => !prev);
    };

    return (
        <>
            <Modal size='100%' opened={applicationFormModal} centered onClose={() => setApplicationFormModal(false)} title={(activeStepper != Step.Preview ? 'Application Form' : 'Preview Application Details')} className='text-[#559CDA]' styles={{
                title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
            }} >
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <div className='m-auto w-[95%] flex flex-col gap-3'>

                    {activeStepper != Step.Preview && (<div className='w-[80%] m-auto pb-12 hidden sm:block'>
                        <Stepper />
                    </div>)}

                    {currentStepComponent}

                    <div className={cn('flex gap-2 self-end w-[100%] sm:w-[25%]', (activeStepper === Step.GeneralInformation) && 'sm:w-[10%]')}>
                        {activeStepper > Step.GeneralInformation && (
                            <Button variant='outline' className={cn("self-end w-[50%] rounded-md ")} onClick={() => {
                                console.log(activeStepper)
                                setActiveStepper(activeStepper - 1)
                            }}>
                                Back
                            </Button>
                        )}


                        <Popover
                            position="bottom"
                            withArrow
                            shadow="md"
                            opened={opened}
                            onChange={setOpened}
                        >
                            <Popover.Target>
                                <div className={cn("br-gradient border-none w-[50%] rounded-md text-white flex  justify-center  items-center cursor-pointer", activeStepper === Step.GeneralInformation && 'w-full h-full p-[0.60rem] sm:p-[0.40rem]', activeStepper == Step.Photo && "justify-end")} onClick={() => {
                                    if (activeStepper === Step.Photo && !isPhotoCaptured) {
                                        setIsPhotoCapture(true)
                                    } else {
                                        setSubmit(true)
                                    }
                                }}>
                                    <p className={cn('text-xs sm:text-sm', isPhotoCaptured && 'mr-6')}>
                                        {activeStepper === Step.Photo && !isPhotoCaptured ? 'TAKE PHOTO' : 'Next'}
                                    </p>

                                    {activeStepper == Step.Photo && (<Button variant='transparent'>
                                        {activeStepper === Step.Photo && (
                                            < IconCaretDownFilled className="text-white" onClick={togglePopover} />
                                        )}
                                    </Button>)}
                                </div>
                            </Popover.Target>
                            <Popover.Dropdown className="p-0 rounded-lg">
                                <Button variant="transparent">SKIP THIS STEP</Button>
                            </Popover.Dropdown>
                        </Popover>
                    </div>
                </div>
            </Modal>
        </>
    );
}
