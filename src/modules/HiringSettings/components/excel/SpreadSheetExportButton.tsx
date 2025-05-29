import { Button } from "@mantine/core";
import { JobOfferExcelTemplate } from "@modules/HiringSettings/components/excel/JobOfferExcelTemplate";
import type { SpreadsheetCell } from "@modules/HiringSettings/constants/jobOfferExcelTemplateData";
type Props = {
    data: SpreadsheetCell[][];
    image?: string;
    fileName?: string;
    sheetName?: string;
};

const SpreadsheetExportButton = ({
    data,
    image,
    fileName,
    sheetName,
}: Props) => {
    return (
        <div

            className="text-[#6D6D6D] bg-white hover:bg-white hover:text-[#6D6D6D]"
        >
            Click to&nbsp;
            <span onClick={() => {
                JobOfferExcelTemplate({
                    data,
                    image,
                    fileName,
                    sheetName,
                })
            }} className="text-[#559CDA] cursor-pointer underline font-semibold hover:text-[#6D6D6D]">
                GENERATE AND DOWNLOAD TEMPLATE
            </span>
            . Customize the benefits, then upload the updated Job Offer Template for use during Job Offer Generation.
        </div>
    );
};

export default SpreadsheetExportButton;
