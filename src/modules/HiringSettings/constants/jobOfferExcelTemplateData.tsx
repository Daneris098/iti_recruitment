export type SpreadsheetCell = {
    value: string;
    readOnly?: boolean;
    className?: string;
  };
export const JobOfferExcelTemplateData : SpreadsheetCell[][] = [
    [
        { value: "" },
        {
          value: `{headerImage}`,
          readOnly: true,
        },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
      ],
      [
        { value: "" },
        { value: "" },
      ],
      [
        { value: "" },
        {
          value: "STRICTLY CONFIDENTIAL",
          readOnly: true,
          className: "header",
        },
        { value: "" },
      ],
      [
        { value: "" },
        { value: "" },
      ],
      [
        { value: "" },
        { value: "Name", readOnly: true, className: "text-title" },
      ],
      [
        { value: "" },
        { value: "Position and Rank", readOnly: true, className: "text-title" },
        { value: "Position:" },
      ],
      [
        { value: "" },
        { value: "Department/Division", readOnly: true, className: "text-title" },
      ],
      [
        { value: "" },
        { value: "Status Upon Hiring", readOnly: true, className: "text-title" },
        { value: "Probationary" },
      ],
      [
        { value: "" },
        { value: "", },
      ],
      [
        { value: "" },
        { value: "Salary", readOnly: true, className: "text-title" },
        { value: "Monthly: PHP XX,XXX.XX (Gross)" },
        { value: "Annual: PHP XXX,XXX.XX" },
      ],
      [
        { value: "" },
        { value: "", className: "text-title" },
        {
          value: `* Pro-rated 13th month pay on first year of employment; provided that you must have rendered at least one (1) month service with Intellismart Technology Inc. (until November 5 of the current year)`,
          readOnly: true
        },
      ],
      [
        { value: "" },
        { value: "Merit Increase", readOnly: true, className: "text-title" },
        { value: "* Subject to the Company's income and incumbent's individual performance rating.", readOnly: true },
      ],
      [
        { value: "" },
        { value: "", },
      ],
      [
        { value: "" },
        { value: "Benefit", readOnly: true, className: "text-title" },
        { value: "Description", readOnly: true, className: "text-title" },
      ],
      [
        { value: "" },
        { value: "Vacation Leave", readOnly: true, className: "text-title" },
        { value: "6 days/year; non-convertible to cash; non-accumulation (Upon regularization)", readOnly: true }
      ],
      [
        { value: "" },
        { value: "Sick Leave", readOnly: true, className: "text-title" },
        { value: "6 days/year; non-convertible to cash; non-accumulation (Upon regularization)", readOnly: true },
      ],
      [
        { value: "" },
        { value: "Bereavement Leave", readOnly: true, className: "text-title" },
        { value: "3 days/year; non-convertible to cash; non-accumulation (Immediate family)", readOnly: true },
      ],
      [
        { value: "" },
        { value: "Maternity/Paternity Leave", readOnly: true, className: "text-title" },
        { value: "Maternity Leave Benefit :", readOnly: true, className: "text-title" },
        { value: "Paternity Leave Benefit: 7 Working days", readOnly: true },
      ],
      [
        { value: "" },
        { value: "", readOnly: true, className: "text-title" },
        { value: "Normal Delivery - 105 calendar days", readOnly: true },
      ],
      [
        { value: "" },
        { value: "", readOnly: true, className: "text-title" },
        { value: "Ceasarian Delivery - 105 calendar days", readOnly: true },
      ],
      [
        { value: "" },
        { value: "", readOnly: true, className: "text-title" },
        { value: "Miscarriage Delivery - 60 calendar days", readOnly: true },
      ],
      [
        { value: "" },
        { value: "Transportation Subsidy", readOnly: true, className: "text-title" },
        {
          value: "Transportation subsidy when doing onsite visits and/or client calls through Cash Advances (policies on cash advance and liquidation shall apply)",
          readOnly: true
        },
      ],
      [
        { value: "" },
        {
          value: `You acknowledge that this offer letter represents the entire agreement between you and the company and that no verbal or written agreements, promises and representations that are not specifically stated in this letter are or will be binding upon the company. Further, this is not an employment contract but an offer dependent upon your passing the pre-employment requirements. Should you find the above details acceptable, please affix your signature below. Your confirmation of this offer within three days is requested.`,
          readOnly: true
        },
      ],
      [
        { value: "" },
      ],
      [
        { value: "" },
        { value: "Prepared By", readOnly: true, className: "text-title" },
        { value: "" },
        { value: "Conforme", readOnly: true, className: "text-title" },
      ],
  
      [
        { value: "" },
        { value: "Noted By", readOnly: true, className: "text-title" },
        { value: "" },
        { value: "Date Signed", readOnly: true, className: "text-title" },
      ],
      [
        { value: "" },
        { value: "Approved By", readOnly: true, className: "text-title" },
        { value: "" },
        { value: "Reporting Date", readOnly: true, className: "text-title" },
      ],
      [
        { value: "" },
      ],
      [
        { value: "" },
      ],
      [
        { value: "" },
        { value: "ePRF No.", readOnly: true, className: "text-title" },
        { value: "" },
        { value: "Cost Center:", readOnly: true, className: "text-title" },
      ],
      [
        { value: "" },
      ],
      [
        { value: "" },
        { value: "Nature of Vacancy", readOnly: true, className: "text-title" },
        { value: "New", readOnly: true, },
        { value: "Additional", readOnly: true, },
        { value: "Replacement", readOnly: true, },
      ],
]