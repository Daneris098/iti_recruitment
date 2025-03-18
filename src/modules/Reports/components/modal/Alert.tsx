import { ReportStore } from "@modules/Reports/store";
import { Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { useMatches } from "@mantine/core";
import { AlertType } from "@modules/Reports/types/index";
import { IconFileDownload } from "@tabler/icons-react";

// Define auto-close behavior
const AlertAutoClose: Record<AlertType, boolean> = {
    [AlertType.downloadReportSuccess]: true,
};

export default function AlertModals() {
    const { setAlert, alert, setSelectedReport, setIsPreview } = ReportStore();

    useEffect(() => {
        if (alert && (AlertAutoClose as any)[alert]) {
            const timer = setTimeout(() => {
                setIsPreview(false)
                if (AlertType.downloadReportSuccess) {
                    setSelectedReport(null);
                }
                setAlert(null);
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
                opened={alert === AlertType.downloadReportSuccess}
                withCloseButton={false}
                onClose={() => setAlert(null)}
                styles={{
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                title="Download Report"
                centered
                size={modalSize}
                padding={30}
            >
                <Divider size="xs" color="#6D6D6D" />
                <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
                    <IconFileDownload color="#559cda" size={70} strokeWidth={1} />
                    <Text className="text-xl font-bold">
                        Report downloaded successfully.
                    </Text>
                </div>
            </Modal>
        </>
    );
}
