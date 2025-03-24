import { Button, Divider, Modal } from "@mantine/core";
import { ReportStore } from "@modules/Reports/store";
import { AlertType, Reports } from "@modules/Reports/types"
import { SourceEfficiency, LocationSummary, TimeToFill, PositionReport, ApplicantStatus, RecruitmentActivityReport, TimeToHire, OfferAcceptanceReport, OfferRejectionSummary} from "@modules/Reports/components/reports"
import { SourceEfficiencyPreview, LocationSummaryPreview, TimeToFillPreview, PositionReportPreview, ApplicantStatusPreview, RecruitmentActivityReportPreview, TimeToHirePreview, OfferAcceptanceReportPreview, OfferRejectionSummaryPreview } from "@modules/Reports/components/reports/preview/index"
import "@modules/Vacancies/style.css"
import { IconX } from "@tabler/icons-react";

export default function index() {

    const { selectedReport, setSelectedReport, setAlert, isPreview, setIsPreview } = ReportStore();

    let currentReportComponent;
    let currentReportPreviewComponent;

    if (selectedReport?.type === Reports.sourceEfficiencyReport) {
        currentReportComponent = <SourceEfficiency />;
        currentReportPreviewComponent = <SourceEfficiencyPreview />;
    }
    else if (selectedReport?.type === Reports.locationSummary) {
        currentReportComponent = <LocationSummary />;
        currentReportPreviewComponent = <LocationSummaryPreview />;
    }
    else if (selectedReport?.type === Reports.positionReport) {
        currentReportComponent = <PositionReport />;
        currentReportPreviewComponent = <PositionReportPreview />;
    }
    else if (selectedReport?.type === Reports.timeToFill) {
        currentReportComponent = <TimeToFill />;
        currentReportPreviewComponent = <TimeToFillPreview />;
    }
    else if (selectedReport?.type === Reports.applicantStatusReport) {
        currentReportComponent = <ApplicantStatus />;
        currentReportPreviewComponent = <ApplicantStatusPreview />;
    }
    else if (selectedReport?.type === Reports.recruitmentActivityReport) {
        currentReportComponent = <RecruitmentActivityReport />;
        currentReportPreviewComponent = <RecruitmentActivityReportPreview />;
    }
    else if (selectedReport?.type === Reports.timeToHire) {
        currentReportComponent = <TimeToHire />;
        currentReportPreviewComponent = <TimeToHirePreview />;
    }
    else if (selectedReport?.type === Reports.offerAcceptanceReport) {
        currentReportComponent = <OfferAcceptanceReport />;
        currentReportPreviewComponent = <OfferAcceptanceReportPreview />;
    }
    else if (selectedReport?.type === Reports.offerRejectionSummary) {
        currentReportComponent = <OfferRejectionSummary />;
        currentReportPreviewComponent = <OfferRejectionSummaryPreview />;
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
                                {isPreview ? selectedReport?.name : selectedReport?.title}
                            </p>
                            <IconX size={30} className="text-[#6D6D6D]" onClick={() => { setSelectedReport(null); setIsPreview(false); }} />
                        </div>
                        <Divider size="xs" color="#6D6D6D" />
                    </div>

                    {isPreview ? (
                        <>
                            {currentReportPreviewComponent}
                            <Button variant="transparent" className="br-gradient border-none text-white sm:w-[25%] lg:w-[14%] self-end" radius={10} onClick={() => { setAlert(AlertType.downloadReportSuccess); setSelectedReport(null); }}
                            >DOWNLOAD REPORT</Button>
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