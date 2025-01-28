import { Modal, Button, Divider, Stepper, StepperProps } from '@mantine/core';
import { HomeStore } from "@src/modules/Home/store";
import { useState } from 'react';

export default function index() {
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    function StyledStepper(props: StepperProps) {
        return (
            <Stepper
                styles={{
                    stepBody: {
                        width: '15%',
                        marginTop: 50,
                        alignItems: 'center',
                        position: 'absolute',
                        textAlign: 'center'
                    },
                    step: {
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    stepIcon: {
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
        <StyledStepper active={active} onStepClick={setActive}>
            <Stepper.Step label="" description="General and Personal Information" />
            <Stepper.Step label="" description="Education and Employment Record" />
            <Stepper.Step label="" description="Family Background and Other Information" />
            <Stepper.Step label="" description="Reference" />
            <Stepper.Step label="" description="Photo" />
        </StyledStepper>
    )
}