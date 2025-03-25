import { Modal, Divider, Button, Popover, LoadingOverlay } from '@mantine/core';
import { HomeStore, ApplicationStore } from "@src/modules/HomePublic/store";
import Stepper from "@modules/HomePublic/components/stepper";
import GeneralInformation from "@modules/HomePublic/components/form/GeneralInformation";
import EducationalAndEmployment from "@modules/HomePublic/components/form/EducationalAndEmployment";
import FamilyAndOther from "@modules/HomePublic/components/form/FamilyAndOther";
import Reference from "@modules/HomePublic/components/form/Reference";
import Photo from "@modules/HomePublic/components/form/Photo";
import Preview from "@modules/HomePublic/components/form/Preview";
import Oath from "@modules/HomePublic/components/Oath"
import { cn } from "@src/lib/utils";
import { PhotoRef, Step } from '@modules/HomePublic/types';
import { useRef, useState } from 'react';
import { IconCaretDownFilled } from '@tabler/icons-react';
import "@modules/HomePublic/styles/index.css"

export default function index() {
    const { applicationFormModal, setApplicationFormModal } = HomeStore();
    const { activeStepper, setActiveStepper, setSubmit, isPhotoCaptured, setIsPhotoCapture, submitLoading } = ApplicationStore();
    const photo = useRef<PhotoRef | null>(null);

    let currentStepComponent;
    if (activeStepper === Step.GeneralInformation) {
        currentStepComponent = <GeneralInformation />;
    } else if (activeStepper === Step.EducationalAndEmployment) {
        currentStepComponent = <EducationalAndEmployment />;
    } else if (activeStepper === Step.FamilyAndOther) {
        currentStepComponent = <FamilyAndOther />;
    } else if (activeStepper === Step.Reference) {
        currentStepComponent = <Reference />;
    }
    else if (activeStepper === Step.Photo) {
        currentStepComponent = <Photo ref={photo} />;
    }
    else if (activeStepper === Step.Preview) {
        currentStepComponent = <Preview />;
    }
    else if (activeStepper === Step.Oath) {
        currentStepComponent = <Oath />;
    }
    else {
        currentStepComponent = <div>Else Page</div>;
    }

    const [opened, setOpened] = useState(false);

    // const togglePopover = () => {
    //     setOpened((prev) => !prev);
    // };

    return (
        <>
            <Modal radius="lg" size='80%' opened={applicationFormModal} centered onClose={() => setApplicationFormModal(false)}
                title={(activeStepper == Step.Preview ? 'Preview Application Details' : activeStepper == Step.Oath ? 'Oath of Application' : 'Application Form')}
                className='text-[#559CDA] scrollbar' classNames={{ content: 'scrollbar' }}
                styles={{
                    header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }} >
                <div className='h-full m-auto w-[95%] flex flex-col gap-3 overflow-y-auto '>
                    {activeStepper != Step.Oath && (<Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />)}

                    {activeStepper != Step.Preview && activeStepper != Step.Oath && (<div className='w-[80%] m-auto pb-12 hidden sm:block'>
                        <Stepper />
                    </div>)}

                    {currentStepComponent}
                    <LoadingOverlay visible={submitLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

                    <div className={cn('flex gap-2 self-end w-[100%] sm:w-[25%] ', (activeStepper === Step.GeneralInformation) && 'sm:w-[10%]', (activeStepper === Step.Oath) && 'sm:w-[100%] justify-between')}>
                        {activeStepper > Step.GeneralInformation && (
                            <Button variant='outline' className={cn("self-end w-[50%] rounded-md ", (activeStepper === Step.Oath) && 'sm:w-[15%]')} onClick={() => {
                                setActiveStepper(activeStepper - 1)
                            }}>
                                {activeStepper === Step.Preview ? 'EDIT' : 'BACK'}
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
                                <div className={cn("relative br-gradient border-none w-[50%] rounded-md text-white flex  justify-center  items-center cursor-pointer", activeStepper === Step.GeneralInformation && 'w-full h-full p-[0.60rem] sm:p-[0.40rem]', (activeStepper === Step.Oath) && 'sm:w-[15%]')} onClick={() => {
                                    if (activeStepper === Step.Photo && !isPhotoCaptured) {
                                        setIsPhotoCapture(true)
                                    } else {
                                        setSubmit(true)
                                    }
                                    setOpened(false)

                                }}>
                                    <div className='flex'>

                                        <p className='w-24 text-center'>{activeStepper === Step.Photo && !isPhotoCaptured ? 'TAKE PHOTO' : (activeStepper === Step.Preview || activeStepper === Step.Oath) ? 'SUBMIT' : 'NEXT'}</p>

                                        {activeStepper === Step.Photo && (
                                            <div className='right-[0%] absolute py-[6px] bottom-[0%] text-white' onClick={(e) => {
                                                setOpened(true)
                                                e.stopPropagation()
                                            }}>
                                                < IconCaretDownFilled className='mr-1' />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Popover.Target>
                            <Popover.Dropdown className="p-0 rounded-lg flex flex-col">
                                {isPhotoCaptured && (<Button variant="transparent" onClick={() => { photo?.current?.retakePhoto() }}>RETAKE</Button>)}
                                <Button variant="transparent" onClick={() => { photo?.current?.upload(); }}>UPLOAD</Button>
                                <Button variant="transparent" onClick={() => { photo?.current?.skip(); setSubmit(true); setOpened(false); }}>SKIP THIS STEP</Button>
                            </Popover.Dropdown>
                        </Popover>


                    </div>
                </div>
            </Modal >
        </>
    );
}
