import bg2 from '@assets/bg2.png';
import "@modules/AccountSetup/styles/index.css"
import Stepper from '@modules/AccountSetup/components/stepper'
import ProfileDetails from "@modules/AccountSetup/components/profileDetails"
import Organization from "@modules/AccountSetup/components/organization"
import { AccountSetupStore } from "@modules/AccountSetup/store/index"
import { Step } from "@modules/AccountSetup/types/index"
import { Button } from '@mantine/core';
import { cn } from "@src/lib/utils";

export default function index() {
    const { activeStepper, setActiveStepper } = AccountSetupStore()
    let currentStepComponent;
    if (activeStepper === Step.profile) {
        currentStepComponent = <ProfileDetails />;
    }
    else if (activeStepper === Step.organization) {
        currentStepComponent = <Organization />;
    }
    else {
        currentStepComponent = <div>Else Page</div>;
    }

    const buttons = () => {
        return (
            <div className='w-[75%] h-[10%]  mx-auto flex flex-col '>
                <div className='flex self-center sm:self-end gap-4  text-white'>
                    <Button variant='outline' className={cn("self-end w-[150px] rounded-md ")} onClick={() => {
                        setActiveStepper(activeStepper - 1)
                    }}>
                        BACK
                    </Button>
                    <Button variant='outline' className={cn("self-end w-[150px] rounded-md br-gradient border-none text-white")} onClick={() => {
                        setActiveStepper(activeStepper + 1)
                    }}>
                        NEXT
                    </Button>
                </div>
            </div>
        )
    }

    const scrollableComponent = () => {
        return (
            <div className='flex flex-col  md:h-[65%] gap-6 '>
                <div className='h-[90%] md:overflow-y-auto mb-2 md:mb-2'>
                    {currentStepComponent}
                </div>
                {buttons()}
            </div>
        )
    }

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
            <div style={{ backgroundImage: `url(${bg2})` }} className=" bg-cover bg-center h-[16%]  flex flex-col ">
                <div className="w-[89%] 2xl:w-[92%] m-auto flex flex-col justify-center text-white text-center pb-6 pt-4 sm:pb-12 md:pb-8">
                    <p className='text-3xl md:text-5xl'>Welcome, Aboard!</p>
                    <p className='text-md md:text-lg'>To get started with HRDotNet Recruitment, let’s fist set-up your account.</p>
                </div>
                <Stepper />
            </div>
            {/* {scrollableComponent()} */}
            {fixHeightComponent()}
        </div>
    )
}