import { Divider, Radio } from "@mantine/core";
import { useEffect, useState } from "react";
import { ApplicationStore, HomeStore } from "../store";
import { AlertType, Step } from "../types";

export default function Index() {
    const [consent, setConsent] = useState(''); 
    const { submit, activeStepper, setSubmit, setActiveStepper } = ApplicationStore();
    const { setApplicationFormModal, setAlert } = HomeStore();

    useEffect(() => {
        if (submit === true && activeStepper === Step.Oath && consent != '') {
            if (consent === 'true') {
                setApplicationFormModal(false);
                setActiveStepper(Step.GeneralInformation);
                setAlert(AlertType.applicationSuccesfull);
            }
            else {
                setAlert(AlertType.cancelApplication);
            }
        }
        return () => setSubmit(false);
    }, [submit]);

    return (
        <div className="text-center text-[#6D6D6D] flex flex-col gap-7">
            <div className="flex flex-col gap-1">
                <Divider size="md" color="black" className="opacity-30 p-2" />
                <p className="font-bold text-xl">OATH OF APPLICATION</p>
                <Divider size="md" color="#6D6D6D" className="opacity-30 p-2" />
            </div>
            <p>
                I certify that all the information I voluntarily provided in the application form is factual and true to the best of my knowledge. I understand that any misrepresentation or omission may result in termination of my employment with the company. I also give the company authority to contact schools, employers, references, and others for any background check related to my potential employment with Intellismart Technology, Inc., and I hereby release and hold the company harmless from any liability as a result of such investigation. Additionally, I acknowledge that I am allowing the company to retain all information and data regarding my employment record for filing purposes.
            </p>
            <Radio.Group value={consent} onChange={setConsent}>
                <div className="flex flex-col gap-2 mb-2">
                    <Radio value="true" label="I consent." />
                    <Radio value="false" label="I do not consent to this." />
                </div>
            </Radio.Group>
        </div>
    );
}
