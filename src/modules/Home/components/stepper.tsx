import { Stepper, StepperProps } from '@mantine/core';
import { ApplicationStore } from "@src/modules/Home/store";
import "@modules/Home/styles/index.css"
export default function index() {
    const { activeStepper, setActiveStepper } = ApplicationStore();
    

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
                        color:'white',
                        borderStyle:'hidden'
                    },
                    separator: {
                        marginLeft: -2,
                        marginRight: -2,
                        height: 4,
                        margin:'0.1rem',
                        background: '#cfcfcf'
                    },
                }}
                {...props}
            />
        );
    }

    return (
        <StyledStepper active={activeStepper}  onStepClick={(data:number)=>{data < activeStepper && setActiveStepper(data)}}>
            <Stepper.Step label="" description="General and Personal Information" />
            <Stepper.Step label="" description="Education and Employment Record" />
            <Stepper.Step label="" description="Family Background and Other Information" />
            <Stepper.Step label="" description="Reference" />
            <Stepper.Step label="" description="Photo" />
        </StyledStepper>
    )
}