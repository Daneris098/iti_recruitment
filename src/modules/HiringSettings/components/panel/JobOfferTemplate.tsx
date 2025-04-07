import { useState } from "react";
import headerImage from "@src/assets/intellismart-header.png";
import { JobOfferExcelTemplateData } from "@modules/HiringSettings/constants/jobOfferExcelTemplateData"
import Dropzone from "@modules/HiringSettings/components/Dropzone";
import SpreadsheetExportButton from "@modules/HiringSettings/components/excel/SpreadSheetExportButton";

const MySpreadsheet = () => {
  const [data] = useState(JobOfferExcelTemplateData)

  return (
    <div className="flex flex-col gap-8">

      <SpreadsheetExportButton
        data={data}
        image={headerImage}
        fileName="job-offer-template.xlsx"
      />

      <Dropzone />
    </div>
  );
};

export default MySpreadsheet;
