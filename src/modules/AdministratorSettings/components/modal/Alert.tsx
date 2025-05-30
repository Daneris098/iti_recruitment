import { AdministratorSettingsStore } from "@modules/AdministratorSettings/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType } from "@modules/AdministratorSettings/types";
import { IconX, IconHelpCircle } from "@tabler/icons-react";


export default function AlertModals({ selectedAccountRef }: { selectedAccountRef: React.RefObject<{ submit: () => void; }> }) {
    const { setAlert, alert, newlyAddedUser, resetCredentials } = AdministratorSettingsStore();
    const AlertAutoClose: Record<AlertType, boolean> = {
        [AlertType.cancel]: false,
        [AlertType.cancellled]: true,
        [AlertType.saved]: true,
        [AlertType.editSuccess]: true,
        [AlertType.createAccountSuccess]: false,
        [AlertType.resetSuccess]: false,
        [AlertType.resetConfirmation]: false,
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
                opened={alert === AlertType.saved}
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
                            Save Changes
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold">
                        All Changes have been successfully saved!
                    </Text>
                </div>
            </Modal>

            <Modal
                zIndex={1000}
                opened={alert === AlertType.editSuccess}
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

            <Modal
                opened={alert === AlertType.resetSuccess}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                centered
                size={modalSize}
                padding={30}
                zIndex={1000}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-2xl text-[#559CDA] font-semibold">
                            Reset Success
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        You've successfully reset the user credentials.
                    </Text>
                    <Button className="w-[50%] rounded-md" variant="outline" onClick={() => {
                        setAlert(''); navigator.clipboard.writeText(JSON.stringify(resetCredentials, null, 2))
                            .then(() => {
                                console.log("Copied to clipboard!");
                            })
                            .catch(err => {
                                console.error("Failed to copy: ", err);
                            });
                    }}>COPY CREDENTIALS</Button>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.createAccountSuccess}
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
                            Create Account Success
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        You've successfully added a new account.
                    </Text>
                    <Button className="w-[50%] rounded-md" variant="outline" onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(newlyAddedUser, null, 2))
                            .then(() => {
                                console.log("Copied to clipboard!");
                            })
                            .catch(err => {
                                console.error("Failed to copy: ", err);
                            });
                        setAlert('');
                    }}>COPY CREDENTIALS</Button>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.cancellled}
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
                            Cancel Changes
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleAlert color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold">
                        Changes have not been saved.
                    </Text>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.cancel}
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
                            Save Changes
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleAlert color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        Are you sure you want to cancel the changes?
                    </Text>
                    <div className="flex gap-2 w-[80%]">
                        <Button className="w-[50%] rounded-md" variant="outline" onClick={() => { setAlert(AlertType.cancellled) }}>YES</Button>
                        <Button className="w-[50%] rounded-md border-none br-gradient" onClick={() => { setAlert('') }}>NO</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.resetConfirmation}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600, },
                }}
                centered
                size={modalSize}
                padding={30}
                zIndex={1000}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-2xl text-[#559CDA] font-semibold">
                            Reset Confirmation
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <IconHelpCircle color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        Are you sure you want to reset the account credentials?
                    </Text>
                    <div className="flex gap-2 w-[80%]">
                        <Button className="w-[50%] rounded-md" variant="outline" onClick={() => { setAlert(AlertType.cancellled) }}>NO</Button>
                        <Button className="w-[50%] rounded-md  border-none br-gradient" onClick={() => {
                            selectedAccountRef.current?.submit();
                            setAlert(AlertType.resetSuccess);
                        }}>YES</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
