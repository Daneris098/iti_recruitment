import { PDFViewerProps } from "@modules/Shared/types";
import { usePDFViewer } from "@modules/Shared/hooks/usePDFViewer";

export function PDFViewer<T>(props: PDFViewerProps<T>) {
    const { pdfUrl, loading, error } = usePDFViewer(props);

    if (loading) return <div>Loading PDF...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pdfUrl) return null;

    return (
        <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="1000px"
            style={{ border: "none" }}
        />
    );
}