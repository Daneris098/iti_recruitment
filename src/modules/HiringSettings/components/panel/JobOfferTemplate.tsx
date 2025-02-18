import Dropzone from "@modules/HiringSettings/components/Dropzone";
export default function index() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-[#559CDA] font-bold">Custom Job Offer</p>
                <p className="text-[#6D6D6D]">Click to <span className="text-[#559CDA] cursor-pointer underline font-semibold">GENERATE AND DOWNLOAD TEMPLATE</span>. Customize the benefits, then upload the updated Job Offer Template for use during Job Offer Generation.</p>
            </div>
            <Dropzone />
        </div>
    )
}