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


/**
 * Fetches the PDF from a given path and returns a blob URL.
 * @param pdfPath - The path to the PDF (relative).
 * @param token - The Bearer token for authentication.
 * @returns A blob URL representing the fetched PDF.
 * @throws If the response is not a valid PDF or if the fetch fails.
 */
export async function fetchPDFBlobUrl(pdfPath: string, token: string): Promise<string> {
    const proxiedPdfUrl = `/files/Uploads/applicants/${pdfPath}`;

    const response = await fetch(proxiedPdfUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/pdf, application/octet-stream, */*',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const pdfBlob = await response.blob();

    if (pdfBlob.type.startsWith('text') || pdfBlob.size < 1000) {
        const text = await pdfBlob.text();
        console.error('Not a PDF. Got text:', text);
        throw new Error('Server did not return a valid PDF file.');
    }

    return URL.createObjectURL(pdfBlob);
}