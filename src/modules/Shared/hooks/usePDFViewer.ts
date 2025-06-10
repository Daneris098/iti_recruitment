import { useState, useEffect } from 'react';
import { PDFViewerProps } from "@modules/Shared/types";
import { fetchPDFBlobUrl } from "@modules/Shared/utils/PdfViewer/pdfUtils";

export function usePDFViewer<T>({ identifier, getPdfPathFn }: PDFViewerProps<T>) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let objectUrl: string | null;

        const loadPDF = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = sessionStorage.getItem('accessToken');
                if (!token) {
                    throw new Error("Access token not found.");
                }

                const pdfPath = await getPdfPathFn(identifier);
                objectUrl = await fetchPDFBlobUrl(pdfPath, token);

                setPdfUrl(objectUrl);
            }
            catch (error) {
                console.error(error instanceof Error ? error.message : 'Error Unknown');
            }
            finally {
                setLoading(false);
            }
        };
        loadPDF();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            setPdfUrl(null);
        };

    }, [identifier, getPdfPathFn])
    return { pdfUrl, loading, error };
}