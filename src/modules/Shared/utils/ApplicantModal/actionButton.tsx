import { Button } from "@mantine/core";

export function ActionButton({ status, onPDFView, onTransfer }: { status: string, onPDFView: () => void, onTransfer: () => void }) {
    const isPDFView = ['Hired', 'Offered', 'For Transfer', 'Transferred'].includes(status);
    const shouldShow = status !== 'Archived';

    if (!shouldShow) return null;

    return (
        <Button
            className="text-white rounded-[10px] poppins bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer"
            onClick={isPDFView ? onPDFView : onTransfer}
        >
            {isPDFView ? 'View PDF' : 'Transfer Position'}
        </Button>
    );
}
