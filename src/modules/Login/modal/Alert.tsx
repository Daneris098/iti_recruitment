import { AdministratorSettingsStore } from "@modules/AdministratorSettings/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType } from "@modules/Login/types";
import { IconX, IconHelpCircle } from "@tabler/icons-react";


export default function AlertModals() {
    const { setAlert, alert } = AdministratorSettingsStore();
    const AlertAutoClose: Record<AlertType, boolean> = {
        [AlertType.loginSuccess]: true,
    };

    useEffect(() => {
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
                opened={alert === AlertType.loginSuccess}
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
                            Edit Success
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        You've successfully edited the account status.
                    </Text>
                </div>
            </Modal>
        </>
    );
}
