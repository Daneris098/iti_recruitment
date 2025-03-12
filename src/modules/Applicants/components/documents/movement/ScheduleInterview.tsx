import { Button, Divider } from "@mantine/core";
import { IconUserQuestion, IconX } from "@tabler/icons-react";
import { useCloseModal } from "@src/modules/Applicants/store";
import ApplicantContactNumber from "@modules/Applicants/components/documents/movement/ApplicantContactNumber";
import ApplicantUnreachable from "@modules/Applicants/components/modal/applicantUnReachable"
// import ApplicantUnreachableArchived from "@modules/Applicants/components/documents/movement/ApplicantUnreachableArchive";
// import DropDown from "@modules/Applicants/components/documents/dropdown/DropDown";
// import UpdateStatusModal from "@modules/Applicants/components/modal/updateStatus";

interface ApplicantNotReachableProps {
    onClose: () => void;
    Status: string;
}

export default function ApplicantNotReachable({ onClose, Status }: ApplicantNotReachableProps) {

    // console.log("Applicant current Status:", Status)
    // // Handle the state of applicant to "Archived" upon clicking the NO button.
    // const updateApplicantStatus = () => {
    //     useUpdateApplicantStore.getState().setStatus("Archived");
    //     onClose();
    //     console.log("Updated Status:", useUpdateApplicantStore.getState().status);
    // }

    const {
        // isAddtoCalendar, setIsAddtoCalendar, 
        // isApplicantNotReachable, 
        setIsApplicantNotReachable, isApplicantUnreachableArchive, setIsApplicantUnreachableArchive } = useCloseModal();

    // useEffect(() => {
    //     if (isAddtoCalendar) {
    //         const timer = setTimeout(() => {
    //             setisAddtoCalendar(false);
    //         }, 1000); // Closes modal after 1 second

    //         return () => clearTimeout(timer); // Cleanup timeout on unmount
    //     }
    // }, [isAddtoCalendar]);

    return (
        <div className="p-1 w-full h-full">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                        Applicant Not Reachable
                    </h1>

                    {/* Exit Icon - Closes modal */}
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={() => {
                            onClose(); // Close FeedbackSent modal
                        }}

                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-4">
                <IconUserQuestion size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div className="text-center">
                <h1 className="font-semibold text-[24px] text-[#6D6D6D] poppins">
                    Applicant cannot be reached via email. <br />
                    Would you like to call instead?
                </h1>
                <p className="mt-2 italic text-[#6D6D6D] text-[16px] poppins">If you choose NO, the applicant will be put in archived.</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-8 pt-8 pb-2">
                {/*YES*/}
                <Button className="br-gradient w-[152px] h-[42px] rounded-[10px] poppins"
                    onClick={() => setIsApplicantUnreachableArchive(true)}
                >
                    {"yes".toUpperCase()}
                </Button>

                {/*NO*/}
                <Button
                    className="
                    w-[152px] h-[42px] 
                    bg-white 
                    text-[#559CDA] rounded-[10px] border border-1 
                    border-[#559CDA] 
                    hover:text-[#559CDA]
                    hover:bg-white poppins"
                    // onClick={() => updateApplicantStatus()}
                    onClick={() => { }}
                    // onClick={() =>
                    //     setIsApplicantUnreachableArchive(true)
                    // }
                >
                    {"no".toUpperCase()}
                </Button>
            </div>

            <div>
                <ApplicantUnreachable isOpen={isApplicantUnreachableArchive} onClose={() => setIsApplicantUnreachableArchive(false)}>
                    <ApplicantContactNumber onClose={onClose} />
                </ApplicantUnreachable>

                {/* <UpdateStatusModal isOpen={isApplicantUnreachableArchive} onClose={onClose}>
                    <ApplicantUnreachableArchived
                        Status={Status}
                        onClose={onClose} />
                </UpdateStatusModal> */}
            </div>
        </div>
    );
}
