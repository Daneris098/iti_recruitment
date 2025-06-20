import { useState, useEffect } from "react";
import { PDFViewerProps } from "@modules/Shared/types";
import { fetchPDFBlobUrl } from "@modules/Shared/utils/PdfViewer/pdfUtils";

export function usePDFViewer<T>({
    identifier,
    getApplicantStatus,
    getPdfPathFnHired,
    token,
    getPdfPathFnPending,
}: PDFViewerProps<T>) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let objectUrl: string | null = null;

        const loadPDF = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = sessionStorage.getItem("accessToken");
                if (!token) throw new Error("Access token not found.");

                const status = await getApplicantStatus(identifier);
                const pdfPath =
                    status === "Accepted"
                        ? await getPdfPathFnHired(identifier)
                        : await getPdfPathFnPending(identifier);

                objectUrl = await fetchPDFBlobUrl(pdfPath, token);
                setPdfUrl(objectUrl);
            } catch (err) {
                setError((err as Error).message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPDF();

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            setPdfUrl(null);
        };
    }, [
        identifier,
        getApplicantStatus,
        token,
        getPdfPathFnHired,
        getPdfPathFnPending,
    ]);

    return { pdfUrl, loading, error };
}