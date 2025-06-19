import { Modal, Divider, Button, Popover, LoadingOverlay, Center, ActionIcon, MantineSize, useMatches } from '@mantine/core';
import { HomeStore, ApplicationStore } from "@src/modules/HomePublic/store";
import Stepper from "@modules/HomePublic/components/stepper";
import GeneralInformation from "@modules/HomePublic/components/form/GeneralInformation";
import EducationalAndEmployment from "@modules/HomePublic/components/form/EducationalAndEmployment";
import FamilyAndOther from "@modules/HomePublic/components/form/FamilyAndOther";
import Reference from "@modules/HomePublic/components/form/Reference";
import Photo from "@modules/HomePublic/components/form/Photo";
import Preview from "@modules/HomePublic/components/form/Preview";
import Oath from "@modules/HomePublic/components/Oath"
import { Pill } from "@mantine/core";
import { cn } from "@src/lib/utils";
import { AlertType, PhotoRef, Step, StepperTitle } from '@modules/HomePublic/types';
import { useEffect, useRef, useState } from 'react';
import { IconArrowRight, IconCaretDownFilled, IconX } from '@tabler/icons-react';
import "@modules/HomePublic/styles/index.css"
import { useMediaQuery } from "@mantine/hooks";
import { RingProgress } from '@mantine/core';

export default function index() {
    const isGreaterThanSp = useMediaQuery("(min-width: 769px)");
    const { applicationFormModal, setApplicationFormModal, setIsFromPortal, setAlert, vacancyDetailsModal, selectedData, setvacancyDetailsModal } = HomeStore();
    const { activeStepper, setActiveStepper, setSubmit, isPhotoCaptured, setIsPhotoCapture, submitLoading, applicationForm } = ApplicationStore();
    const photo = useRef<PhotoRef | null>(null);
    const StepperPercent = [20, 40, 60, 80, 100];
    const StepperLabel = ['1 of 5', '2 of 5', '3 of 5', '4 of 5', '5 of 5'];
    const [cameraAllowed, setCameraAllowed] = useState<boolean | null>(false);
    const pillSize: MantineSize = useMatches({ base: "lg" });
    const iconSize: MantineSize = useMatches({ base: "lg" });

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

    useEffect(() => {
        const checkCameraPermission = async () => {
            try {
                // Use Permissions API if available
                if (navigator.permissions) {
                    const result = await navigator.permissions.query({ name: 'camera' as PermissionName });

                    if (result.state === 'granted') {
                        setCameraAllowed(true);
                    } else if (result.state === 'denied') {
                        setCameraAllowed(false);
                    } else {
                        // state = 'prompt' → user hasn't decided yet
                        setCameraAllowed(null);
                    }

                    // Listen to changes (if permission changes while app is open)
                    result.onchange = () => {
                        setCameraAllowed(result.state === 'granted');
                    };
                } else {
                    // Fallback: Try requesting access
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setCameraAllowed(true);
                    stream.getTracks().forEach(track => track.stop()); // clean up
                }
            } catch (error: any) {
                if (error.name === 'NotAllowedError') {
                    setCameraAllowed(false);
                } else if (error.name === 'NotFoundError') {
                    setCameraAllowed(false);
                } else {
                    console.error('Unexpected camera access error:', error);
                    setCameraAllowed(null);
                }
            }
        };

        checkCameraPermission();
    }, []);


    return (
        <>
            <Modal radius="lg" size='80%' opened={applicationFormModal} fullScreen={!isGreaterThanSp} centered onClose={() => { setApplicationFormModal(false); }}
                withCloseButton={false}
                className='text-[#559CDA] scrollbar' classNames={{ content: 'scrollbar' }}
                styles={{
                    header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }} >
                <div className='h-[89vh] sp:h-[85vh] flex flex-col gap-3 py-3 '>

                    {/* header */}
                    <div className='top-0 z-50 sticky bg-white m-auto w-[95%]'>
                        <div className='flex justify-between items-center'>
                            {vacancyDetailsModal && (<img src="logoword.png" className="w-28 2xl:w-40 cursor-pointer" alt="bg" onClick={() => setApplicationFormModal(false)} />)}
                            <p className='text-[#559CDA] text-[22px] font-bold py-2'>{(activeStepper == Step.Preview ? 'Preview Application Details' : activeStepper == Step.Oath ? 'Oath of Application' : vacancyDetailsModal ? '' : 'Application Form')}</p>
                            <IconX size={30} className="text-[#6D6D6D] cursor-pointer" onClick={() => {
                                if (vacancyDetailsModal) {
                                    setApplicationFormModal(false);
                                }
                                else {
                                    setAlert(AlertType.cancelApplication);
                                }
                            }} />
                        </div>
                        {isGreaterThanSp && (<Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />)}
                    </div>

                    {vacancyDetailsModal ?
                        (
                            <>
                                {/* body */}
                                <div className='flex flex-col gap-3 w-full sp:px-8 h-[80%] overflow-y-auto scrollbar2  text-black'>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-xl text-gray-500 font-semibold">{selectedData.position}</p>
                                        <div className="w-full flex justify-between">
                                            <Pill.Group>
                                                <Pill className="rounded-md bg-[#7BADFF]" size={pillSize}>
                                                    <p className="text-white ">{selectedData.workplace}</p>
                                                </Pill>
                                                <Pill className="rounded-md bg-[#FFB703]" size={pillSize}>
                                                    <p className="text-white">{selectedData.employmentType}</p>
                                                </Pill>
                                            </Pill.Group>
                                        </div>
                                    </div>
                                    <div className="rte flex flex-col gap-6  hover:overflow-y-auto">
                                        <p className="text-gray-500 text-lg font-semibold ">Job Description</p>
                                        <div dangerouslySetInnerHTML={{ __html: selectedData.jobDescription }} />
                                        <p className="text-gray-500 text-sm font-semibold 2xl:text-2xl">Qualification</p>
                                        {(selectedData as any).qualifications.map((requirement: string) => {
                                            return (
                                                <>
                                                    <div dangerouslySetInnerHTML={{ __html: (requirement as any).keyword }} />
                                                </>
                                            );
                                        })}
                                        <p className="text-gray-500 text-sm font-semibold 2xl:text-xl">Skills</p>
                                        <Pill.Group>
                                            {selectedData.skills.map((skill: any) => {
                                                return (
                                                    <Pill className="text-gray-600 text-xs 2xl:text-lg" size={pillSize}>
                                                        <p>{skill.keyword}</p>
                                                    </Pill>
                                                );
                                            })}
                                        </Pill.Group>
                                    </div>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                {activeStepper != Step.Preview && activeStepper != Step.Oath && isGreaterThanSp && (
                                    <div className='w-[80%] m-auto pb-12 hidden sm:block'>
                                        <Stepper />
                                    </div>)}

                                {!isGreaterThanSp && activeStepper < 5 && (
                                    <div className='flex gap-2 items-center text-[#6D6D6D]'>
                                        <RingProgress
                                            size={80}
                                            sections={[{ value: Number(StepperPercent[activeStepper]), color: 'blue' }]}
                                        />
                                        <div className='flex flex-col'>
                                            <p className='text-sm'>{StepperLabel[activeStepper]}</p>
                                            <p className='text-sm'>{StepperTitle[activeStepper]}</p>
                                        </div>
                                    </div>
                                )}

                                {/* body */}
                                <div className='w-full sp:px-8 h-[80%] overflow-y-auto scrollbar2 '>
                                    {currentStepComponent}
                                </div>
                            </>
                        )}

                    <LoadingOverlay visible={submitLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

                    {/* footer */}
                    <div className='sp:px-8 sp:py-3 flex justify-end '>

                        {vacancyDetailsModal ? (
                            <Button rightSection={<IconArrowRight />} variant='outline' className={'w-full br-gradient border-none text-white'} onClick={() => {
                                setvacancyDetailsModal(false)
                                setActiveStepper(Step.GeneralInformation)
                            }}>
                                Apply Now
                            </Button>
                        ) :
                            <div className={cn('flex justify-end gap-2 self-end w-[100%] sm:w-[25%] ', (activeStepper === Step.GeneralInformation) && 'sm:w-[10%]', (activeStepper === Step.Oath) && 'sm:w-[100%] justify-between')}>
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
                                        <div className={cn("relative br-gradient border-none w-[50%] rounded-md text-white flex  justify-center  items-center cursor-pointer", activeStepper === Step.GeneralInformation && 'w-[155.547px] h-[36px]', (activeStepper === Step.Oath) && 'sm:w-[15%]')} onClick={() => {
                                            if (activeStepper === Step.Photo && !isPhotoCaptured) {
                                                if (cameraAllowed) {
                                                    setIsPhotoCapture(true)
                                                } else {
                                                    photo?.current?.upload();
                                                }
                                            } else {
                                                setSubmit(true)
                                            }
                                            setOpened(false)
                                            setIsFromPortal(false)
                                        }}>
                                            <div className='flex'>

                                                <p className='w-24 text-center'>{activeStepper === Step.Photo && !isPhotoCaptured && cameraAllowed ? 'TAKE PHOTO' : (activeStepper === Step.Photo && !isPhotoCaptured && (applicationForm.photo == '')) ? 'UPLOAD' : (activeStepper === Step.Preview || activeStepper === Step.Oath) ? 'SUBMIT' : 'NEXT'}</p>

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
                                        {cameraAllowed && (<Button variant="transparent" onClick={() => { photo?.current?.upload(); }}>UPLOAD</Button>)}
                                        <Button variant="transparent" onClick={() => { photo?.current?.skip(); setSubmit(true); setOpened(false); }}>SKIP THIS STEP</Button>
                                    </Popover.Dropdown>
                                </Popover>
                            </div>
                        }

                    </div>


                </div>
            </Modal >
        </>
    );
}
