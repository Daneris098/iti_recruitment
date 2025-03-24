import bg2 from '@assets/bg2.png';
import "@modules/AccountSetup/styles/index.css"
import Stepper from '@modules/AccountSetup/components/stepper'
import ProfileDetails from "@modules/AccountSetup/components/ProfileDetails"
import Organization from "@modules/AccountSetup/components/Organization"
import Hiring from "@modules/AccountSetup/components/Hiring"
import { AccountSetupStore } from "@modules/AccountSetup/store/index"
import { Step, SubModuleRef, Submodule } from "@modules/AccountSetup/types"
import { Button } from '@mantine/core';
import { cn } from "@src/lib/utils";
import Modals from "@modules/AccountSetup/components/modal/"
import { useRef } from 'react';

export default function index() {
    const { activeStepper, setActiveStepper } = AccountSetupStore()
    const subModuleRef = {
        profile: useRef<SubModuleRef | null>(null),
        organization: useRef<SubModuleRef | null>(null),
        hiring: useRef<SubModuleRef | null>(null),
    };

    let currentStepComponent;
    if (activeStepper === Step.profile) {
        currentStepComponent = <ProfileDetails ref={subModuleRef.profile} />;
    }
    else if (activeStepper === Step.organization) {
        currentStepComponent = <Organization ref={subModuleRef.organization} />;
    }
    else if (activeStepper === Step.hiring) {
        currentStepComponent = <Hiring ref={subModuleRef.hiring} />;
    }
    else {
        currentStepComponent = <div>Else Page</div>;
    }

    const buttons = () => {
        return (
            <div className='w-[75%] h-[10%]  mx-auto flex flex-col '>
                <div className='flex self-center sm:self-end gap-4  text-white mb-8'>
                    <Button variant='outline' className={cn("self-end w-[150px] rounded-md")} onClick={() => {
                        if (activeStepper > 0)
                            setActiveStepper(activeStepper - 1)
                    }}>
                        BACK
                    </Button>
                    <Button variant='outline' className={cn("self-end w-[150px] rounded-md br-gradient border-none text-white")} onClick={() => {
                        subModuleRef[Step[activeStepper] as keyof typeof Submodule].current?.submit();
                    }}>
                        NEXT
                    </Button>
                </div>
            </div>
        )
    }

    // const scrollableComponent = () => {
    //     return (
    //         <div className='flex flex-col  md:h-[65%] gap-6 '>
    //             <div className='h-[90%] md:overflow-y-auto mb-2 md:mb-2'>
    //                 {currentStepComponent}
    //             </div>
    //             {buttons()}
    //         </div>
    //     )
    // }

    const fixHeightComponent = () => {
        return (
            <div className='flex flex-col gap-6 '>
                {currentStepComponent}
                {buttons()}
            </div>
        )
    }

    return (
        <div className='h-full flex flex-col gap-36 bg-white'>
            <Modals />
            <div style={{ backgroundImage: `url(${bg2})` }} className=" bg-cover bg-center h-[10.6rem] flex flex-col relative">
                <div className="w-[89%] 2xl:w-[92%] m-auto flex flex-col justify-center text-white text-center pt-4 pb-8">
                    <p className='text-3xl md:text-4xl font-semibold mb-2'>Welcome, Aboard!</p>
                    <p className='text-md md:text-lg'>To get started with HRDotNet Recruitment, let’s fist set-up your account.</p>
                </div>
                <Stepper />
            </div>
            {/* {scrollableComponent()} */}
            {fixHeightComponent()}
        </div>
    )
}