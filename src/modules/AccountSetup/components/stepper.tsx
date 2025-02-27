import { Stepper, StepperProps } from '@mantine/core';
import { AccountSetupStore } from "@src/modules/AccountSetup/store";
import "@modules/HomePublic/styles/index.css"
export default function index() {
    const { activeStepper, setActiveStepper } = AccountSetupStore();
    

    function StyledStepper(props: StepperProps) {
        return (
            <Stepper
                styles={{
                    stepBody: {
                        width: '15%',
                        marginTop: 50,
                        alignItems: 'center',
                        position: 'absolute',
                        textAlign: 'center',

                    },
                    step: {
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    stepIcon: {
                        background: '#cfcfcf',
                        color: 'white',
                        borderStyle: 'hidden'
                    },
                    separator: {
                        opacity: '0%'
                    },
                }}
                {...props}
            />
        );
    }

    return (
        <StyledStepper active={activeStepper} onStepClick={(data: number) => { data < activeStepper && setActiveStepper(data) }} className='w-full self-center px-8 sm:px-16 md:px-28 lg:px-48 xl:px-64 2xl:px-72 absolute bottom-[-20%]'>
            <Stepper.Step label="" description="Set-up your Profile" className='' />
            <Stepper.Step label="" description="Set-up your Organization Profile" />
            <Stepper.Step label="" description="Set-up your Hiring Process" />
        </StyledStepper>
    )
}