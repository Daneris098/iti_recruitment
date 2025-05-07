import { AccountSetupStore } from "@modules/AccountSetup/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleCheckBig, HelpCircle } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType, Step } from "@modules/AccountSetup/types";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { OrganizationSettingsStore } from "@modules/OrganizationSettings/store"
import { panel } from "@modules/OrganizationSettings/types/index"

export default function AlertModals() {
    const { setAlert, alert, setActiveStepper } = AccountSetupStore();
    const { setActivePanel, setReroute } = OrganizationSettingsStore()
      const navigate = useNavigate();
    const AlertAutoClose: Record<AlertType, boolean> = {
        [AlertType.save]: false,
        [AlertType.saved]: true,
        [AlertType.nextStep]: true,
    };

    useEffect(() => {
        if (alert && AlertAutoClose[alert as AlertType]) {
            const timer = setTimeout(() => {
                setAlert("");
                if (alert === AlertType.saved) {
                    setAlert(AlertType.nextStep);
                }
                if (alert === AlertType.nextStep) {
                    navigate("/organizationSettings");
                    setActivePanel(panel.departments)
                    setReroute(false)
                    setActiveStepper(Step.profile)
                }
            }, 1600);
            return () => clearTimeout(timer);
        }
    }, [alert, setAlert]);

    const modalSize = useMatches({
        base: "100%",
        lg: "30%",
    });

    return (
        <>
            <Modal
                opened={alert === AlertType.save}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                centered
                size={modalSize}
                padding={30}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-2xl text-[#559CDA] font-semibold">
                            Save Account Information
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <HelpCircle color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        Do you want to save all the account details you've entered?
                    </Text>
                    <div className="flex gap-2 w-[80%]">
                        <Button className="w-[50%] rounded-md " variant="outline" onClick={() => { setAlert('') }}>NO</Button>
                        <Button className="w-[50%] rounded-md br-gradient border-none" onClick={() => { setAlert(AlertType.saved); }}>YES</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.saved}
                withCloseButton={false}
                onClose={() => { setAlert("") }}
                centered
                size={modalSize}
                padding={30}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-2xl text-[#559CDA] font-semibold">
                            Account Set-up Successful
                        </p>
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-semibold text-center">
                        Congratulations! Initial account setup complete!
                    </Text>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.nextStep}
                withCloseButton={false}
                onClose={() => setAlert("")}
                centered
                size={modalSize}
                padding={30}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-2xl text-[#559CDA] font-semibold">
                            Next Step
                        </p>
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-semibold text-center">
                        Next, let's configure your <span className="text-[#559CDA]">Department</span> and Section in the Organization Settings.
                    </Text>
                </div>
            </Modal>

        </>
    );
}
