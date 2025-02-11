import { VacancyStore, DialogStore } from "@modules/Vacancies/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType } from "../../types";

// Define auto-close behavior
const AlertAutoClose: Record<AlertType, boolean> = {
    [AlertType.vacancyAddedSuccesfull]: false,
};

export default function AlertModals() {
    const {  setAlert, alert } = VacancyStore();
    const { setAction } = DialogStore();
    useEffect(() => {
        console.log(alert)
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
                withCloseButton={true}
                onClose={() => setAlert("")}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Vacancy Added"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <CircleCheckBig color="#559cda" size={70} />
                    <Text className="text-xl font-bold">
                        Job Vacancy successfully added!
                    </Text>
                    <Button className="rounded-lg br-gradient border-none" onClick={() => {
                        setAction('New')
                        setAlert("")
                    }}>Add Again</Button>
                </div>
            </Modal>
        </>
    );
}
