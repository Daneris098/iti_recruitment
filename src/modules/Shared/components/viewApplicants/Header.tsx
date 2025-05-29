import { X } from "lucide-react";

type HeaderProps = {
    onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
    return (
        <div className="flex items-center justify-between border-b p-4">
            <h1 className="text-xl font-semibold">View Applicant</h1>
            <button onClick={onClose} className="text-gray-600 hover:text-black">
                <X size={20} />
            </button>
        </div>
    );
}