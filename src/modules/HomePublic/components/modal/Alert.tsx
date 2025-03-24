import { ApplicationStore, HomeStore } from "@modules/HomePublic/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType, Step } from "../../types";
import { cn } from "@src/lib/utils";

// Define auto-close behavior
const AlertAutoClose: Record<AlertType, boolean> = {
    [AlertType.applicationSuccesfull]: true,
    [AlertType.cancelledApplication]: true,
    [AlertType.cancelApplication]: false,
    [AlertType.submitResponse]: true,
};

interface ArgProps {
    arg?: string
}

export default function AlertModals({ arg }: ArgProps) {
    const { setActiveStepper } = ApplicationStore();
    const { setApplicationFormModal, setAlert, alert, alertBody } = HomeStore();
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
            {/* Form Error */}
            <Modal
                opened={alert === AlertType.submitResponse}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Error"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleAlert color="#559cda" size={80} strokeWidth={1} />
                    <Text className="text-xl text-center font-bold">
                        {alertBody}
                    </Text>
                </div>
            </Modal>
            {/* Application Successful Modal */}
            <Modal
                opened={alert === AlertType.applicationSuccesfull}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Application Successful"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={80} strokeWidth={1} />
                    <Text className="text-xl text-center font-bold">
                        Congratulations, your application has been sent!
                    </Text>
                    <p>Kindly wait for your interview schedule.</p>
                </div>
            </Modal>

            {/* Cancelled Application Modal */}
            <Modal
                opened={alert === AlertType.cancelledApplication}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Application Cancelled"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleAlert color="#559cda" size={80} strokeWidth={1} />
                    <Text className="text-xl font-bold">
                        You have cancelled your application.
                    </Text>
                </div>
            </Modal>

            {/* Confirm Cancel Application Modal */}
            <Modal
                opened={alert === AlertType.cancelApplication}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Cancel Application"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleAlert color="#559cda" size={80} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        Are you sure you want to cancel your application?
                    </Text>
                    <div className="flex gap-2 w-full">
                        <Button
                            variant="outline"
                            className={cn("w-1/2 rounded-md")}
                            onClick={() => {
                                setApplicationFormModal(false);
                                setActiveStepper(Step.GeneralInformation);
                                setAlert(AlertType.cancelledApplication)
                            }}
                        >
                            YES
                        </Button>
                        <Button
                            variant="outline"
                            className={cn("w-1/2 rounded-md border-none br-gradient text-white")}
                            onClick={() => setAlert("")}
                        >
                            NO
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
