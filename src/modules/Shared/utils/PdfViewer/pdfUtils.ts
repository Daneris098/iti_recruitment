import { useSharedViewAcceptedOffer } from "@modules/Shared/api/useSharedUserService";

/**
 * Retrieves the PDF path for a given applicant from the accepted offer API.
 * @param applicantId - The ID of the applicant.
 * @returns The path to the applicant's PDF.
 * @throws If no path is found or the API fails.
 */
export async function getApplicantPDFPath(applicantId: number): Promise<string> {
    const apiResponse = await useSharedViewAcceptedOffer.getAcceptedOfferId(applicantId);
    const fileInfo = Array.isArray(apiResponse.data) ? apiResponse.data[0] : apiResponse.data;

    if (!fileInfo?.path) {
        throw new Error(`No PDF path found in response: ${JSON.stringify(apiResponse.data)}`);
    }

    return fileInfo.path;
}

export async function getPendingApplicantPDFPath(
    applicantId: number
): Promise<string> {
    return (
        "/proxy/pdf/Report/Get/?" +
        "filter=ReportFilename=HRDotNet_Recruitment_Activity_Report_v1" +
        "@ID_Company=1@ID_Department=1@ID_Vacancy=1" +
        "@DateFrom=20250605@DateTo=20250610@ID_PrintedBy=0"
    );
}

/**
 * Fetches the PDF from a given path and returns a blob URL.
 * @param pdfPath - The path to the PDF (relative).
 * @param token - The Bearer token for authentication.
 * @returns A blob URL representing the fetched PDF.
 * @throws If the response is not a valid PDF or if the fetch fails.
 */
export async function fetchPDFBlobUrl(
    pdfPath: string,
    token: string
): Promise<string> {
    const isAbsolute =
        pdfPath.startsWith("http") || pdfPath.startsWith("/");

    const url = isAbsolute
        ? pdfPath
        : `/files/Uploads/applicants/${pdfPath}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf, application/octet-stream, */*",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const blob = await response.blob();
    if (blob.type.startsWith("text") || blob.size < 1000) {
        console.error("Not a PDF:", await blob.text());
        throw new Error("Server did not return a valid PDF.");
    }
    return URL.createObjectURL(blob);
}
