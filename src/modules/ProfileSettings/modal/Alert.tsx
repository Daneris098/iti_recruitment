import { OrganizationSettingsStore } from "@modules/OrganizationSettings/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType } from "@modules/ProfileSettings/types";


export default function AlertModals() {
    const { setAlert, alert } = OrganizationSettingsStore();
    const AlertAutoClose: Record<AlertType, boolean> = {
        [AlertType.cancel]: false,
        [AlertType.cancellled]: true,
        [AlertType.saved]: true,
    };

    useEffect(() => {
        console.log('alert: ', alert)
        if (alert && (AlertAutoClose as any)[alert]) {
            const timer = setTimeout(() => {
                setAlert("");
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
                opened={alert === AlertType.saved}
                withCloseButton={true}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Save Changes"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} />
                    <Text className="text-xl font-bold">
                        All Changes have been successfully saved!
                    </Text>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.cancellled}
                withCloseButton={true}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Cancel Changes"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} />
                    <Text className="text-xl font-bold">
                        Changes have not been saved.
                    </Text>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.cancel}
                withCloseButton={true}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Save Changes"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} />
                    <Text className="text-xl font-bold text-center">
                        Are you sure you want to cancel the changes?
                    </Text>
                    <div className="flex gap-2 w-[80%]">
                        <Button className="w-[50%] rounded-md" variant="outline" onClick={() => { setAlert(AlertType.cancellled) }}>YES</Button>
                        <Button className="w-[50%] rounded-md border-none br-gradient" onClick={() => { setAlert('') }}>NO</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
