import { Button, Divider, Modal } from "@mantine/core";
import { ReportStore } from "@modules/Reports/store";
import { AlertType, Reports } from "@modules/Reports/types"
import { SourceEfficiencyReport } from "@modules/Reports/components/reports"
import { SourceEfficiencyReportPreview } from "@modules/Reports/components/reports/preview/index"
import "@modules/Vacancies/style.css"
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function index() {

    const { selectedReport, setSelectedReport, setAlert } = ReportStore();
    const [isPreview, setIsPreview] = useState(false);

    let currentReportComponent;
    let currentReportPreviewComponent;

    if (selectedReport?.type === Reports.sourceEfficiencyReport) {
        currentReportComponent = <SourceEfficiencyReport />;
        currentReportPreviewComponent = <SourceEfficiencyReportPreview />;
    }
    else {
        currentReportComponent = <div>Else Page</div>;
        currentReportPreviewComponent = <div>Else Page</div>;
    }

    return (
        <>
            <Modal className="rounded-md" size={'80%'} opened={selectedReport != null} centered onClose={() => { setSelectedReport(null); setIsPreview(false); }}
                styles={{
                    header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}
                withCloseButton={false}>

                <div className="flex flex-col gap-4 p-4">

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <p className="text-2xl text-[#559CDA] font-semibold">
                                { isPreview ? '':'Generate' } {selectedReport?.name}
                            </p>
                            <IconX size={30} className="text-[#6D6D6D]" onClick={() => { setSelectedReport(null); setIsPreview(false); }} />
                        </div>
                        <Divider size="xs" color="#6D6D6D" />
                    </div>

                    {isPreview ? (
                        <>
                            {currentReportPreviewComponent}
                            <Button variant="transparent" className="br-gradient border-none text-white sm:w-[25%] lg:w-[13%] self-end" radius={10} onClick={() => { setAlert(AlertType.downloadReportSuccess) }}
                            >Download Report</Button>
                        </>) : (
                        <>
                            {currentReportComponent}
                            <Button variant="transparent" className="br-gradient border-none text-white sm:w-[25%] lg:w-[13%] self-end" radius={10} onClick={() => { setIsPreview(true) }}
                            >PREVIEW</Button>
                        </>
                    )}

                </div>
            </Modal>
        </>
    )
}