import { Button } from "@mantine/core";

// Sidebar.tsx
type SidebarProps = {
    applicantsById: any;
    setIsUpdateStatusButtonModalOpen: (open: boolean) => void;
    setIsViewPDF: (open: boolean) => void;
    setIsTransferPosition: (open: boolean) => void;
    setIsGenerateNewOffer: (open: boolean) => void;
};

export default function Sidebar({
    applicantsById,
    setIsUpdateStatusButtonModalOpen,
    setIsViewPDF,
    setIsTransferPosition,
    setIsGenerateNewOffer,
}: SidebarProps) {
    return (
        <div className="w-1/3 border-r p-4 space-y-2">
            <pre className="text-sm">{JSON.stringify(applicantsById, null, 2)}</pre>
            <Button onClick={() => setIsViewPDF(true)}>View PDF</Button>
            <Button onClick={() => setIsTransferPosition(true)}>Transfer</Button>
            <Button onClick={() => setIsGenerateNewOffer(true)}>New Offer</Button>
            <Button onClick={() => setIsUpdateStatusButtonModalOpen(true)}>Update Status</Button>
        </div>
    );
}
