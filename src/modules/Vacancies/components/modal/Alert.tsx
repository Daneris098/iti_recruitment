import { VacancyStore } from "@modules/Vacancies/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleCheck, CircleCheckBig, CircleHelp } from "lucide-react";
import { useMatches } from "@mantine/core";
import { AlertType } from "../../types";
import { IconX } from "@tabler/icons-react";

// Define auto-close behavior
const AlertAutoClose: Record<AlertType, boolean> = {
    [AlertType.vacancyAddedSuccesfull]: false,
    [AlertType.closeVacancy]: false,
    [AlertType.closeSuccessfully]: true,
    [AlertType.updateSuccessfully]: true,
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
        lg: "32%",
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
                </div>
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
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

            <Modal
                opened={alert === AlertType.closeVacancy}
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
                            Close Vacancy
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-6 text-[#6D6D6D]">
                    <CircleHelp color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        Are you sure you want to close this job vacancy?
                    </Text>
                    <div className="flex flex-col self-start">
                        <p>12 Applicants Applied</p>
                        <p>12 Applicants for interview</p>
                    </div>
                    <Button className="rounded-lg br-gradient border-none px-14" onClick={() => {
                        setAlert(AlertType.closeSuccessfully)
                    }}>CONFIRM</Button>
                </div>
            </Modal>

            <Modal
                opened={alert === AlertType.closeSuccessfully}
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
                            Vacancy Closed
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-6 text-[#6D6D6D]">
                    <CircleCheck color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        Job Vacancy successfully closed!
                    </Text>
                </div>
            </Modal>
            

            <Modal
                opened={alert === AlertType.updateSuccessfully}
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
                            Vacancy Updated
                        </p>
                        <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
                    </div>
                    <Divider size="xs" color="#6D6D6D" />
                </div>
                <div className="flex flex-col mt-6 items-center gap-6 text-[#6D6D6D]">
                    <CircleCheck color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold text-center">
                        Job Vacancy successfully updated!
                    </Text>
                </div>
            </Modal>

        </>
    );
}
