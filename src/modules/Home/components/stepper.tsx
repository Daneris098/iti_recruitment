import { Stepper, StepperProps } from '@mantine/core';
import { ApplicationStore } from "@src/modules/Home/store";

export default function index() {
    const { activeStepper } = ApplicationStore();
    

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
                        background: 'blue',
                        color:'white',
                        borderWidth: 4,
                    },
                    separator: {
                        marginLeft: -2,
                        marginRight: -2,
                        height: 10,
                    },
                }}
                {...props}
            />
        );
    }

    return (
        <StyledStepper active={activeStepper} >
            <Stepper.Step label="" description="General and Personal Information" />
            <Stepper.Step label="" description="Education and Employment Record" />
            <Stepper.Step label="" description="Family Background and Other Information" />
            <Stepper.Step label="" description="Reference" />
            <Stepper.Step label="" description="Photo" />
        </StyledStepper>
    )
}