import { VacancyStore } from "@modules/Vacancies/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType } from "../../types";
import { IconX } from "@tabler/icons-react";

// Define auto-close behavior
const AlertAutoClose: Record<AlertType, boolean> = {
    [AlertType.vacancyAddedSuccesfull]: false,
};

export default function AlertModals() {
    const { setAlert, alert, setAction } = VacancyStore();

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
                opened={alert === AlertType.vacancyAddedSuccesfull}
                withCloseButton={false}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title=""
                centered
                size={modalSize}
                padding={30}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <p className="text-2xl text-[#559CDA] font-semibold">
                            Vacancy Added
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold">
                        Job Vacancy successfully added!
                    </Text>
                    <Button className="rounded-lg br-gradient border-none" onClick={() => {
                        setAction('New')
                        setAlert("")
                    }}>ADD AGAIN</Button>
                </div>
            </Modal>
        </>
    );
}
