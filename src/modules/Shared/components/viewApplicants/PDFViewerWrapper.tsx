// PDFViewerWrapper.tsx
type PDFViewerWrapperProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function PDFViewerWrapper({ isOpen, onClose }: PDFViewerWrapperProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white w-4/5 h-4/5 p-4 relative">
                <button className="absolute top-4 right-4 text-gray-600 hover:text-black" onClick={onClose}>
                    Close
                </button>
                <iframe src="/sample.pdf" className="w-full h-full" title="PDF Viewer" />
            </div>
        </div>
    );
}
