import { PDFViewerProps } from "@modules/Shared/types";
import { usePDFViewer } from "@modules/Shared/hooks/usePDFViewer";

export function PDFViewer<T>({ identifier, getPdfPathFn }: PDFViewerProps<T>) {
    const { pdfUrl, loading, error } = usePDFViewer({ identifier, getPdfPathFn });

    if (loading) return <div>Loading PDF...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pdfUrl) return null;

    return (
        <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="1000px"
            style={{ border: 'none' }}
        />
    );
}