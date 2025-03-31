import { Button, Combobox, Divider, Modal, Textarea, TextInput, useCombobox } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { useDropDownOfferedStore } from "@modules/Shared/components/applicantProfile/store";
import { useState } from "react";
import TransferredPositionModal from "@modules/Shared/components/applicantProfile/modal/jobGenerated";
import TransferredPosition from "@src/modules/Shared/components/applicantProfile//alerts/Transferred"
interface ApplicantTransfereeName {
    Applicant_Name: string
    onClose: () => void
}

export default function TransferPosition({ Applicant_Name, onClose }: ApplicantTransfereeName) {

    const positions = ["HR Specialist", "Engineer", "Doctor"];
    const [isTransferred, setIsTransferred] = useState(false);
    const positionCombobox = useCombobox();
    const {
        position, setPosition,
        comments, setComments
    } = useDropDownOfferedStore();

    return (
        <div className="p-9">

            {/* Header */}
            <div >
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">Transfer Applicant Position</h1>
                    <IconX className="w-[15px] h-[15px] cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Name */}
            <div className="pt-4">
                <h1 className="poppins font-medium text-[#6D6D6D] text-[15px] pb-1">Name</h1>
                <p className="poppins w-[540px] h-[56px] px-4 bg-[#6D6D6D30] border border-[#6D6D6D] rounded-lg flex items-center text-[#6D6D6D99]"> {Applicant_Name ?? "N/A"}</p>
            </div>

            {/* Position Dropdown */}
            <div className="pt-4">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                    Position
                </h3>
                <Combobox store={positionCombobox} withinPortal={false}>
                    <Combobox.Target>
                        <TextInput
                            value={position}
                            onChange={(e) => setPosition(e.currentTarget.value)}
                            onFocus={() => positionCombobox.openDropdown()}
                            rightSection={<IconCaretDownFilled size={18} />}
                            placeholder="Select from open vacancy"
                            classNames={{
                                input: "poppins relative flex items-center w-[540px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                            }}
                            required
                        />
                    </Combobox.Target>

                    {positions.length > 0 && (
                        <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                            {positions.map((role) => (
                                <Combobox.Option
                                    key={role}
                                    value={role}
                                    onClick={() => {
                                        setPosition(role);
                                        positionCombobox.closeDropdown();
                                    }}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                                >
                                    {role}
                                </Combobox.Option>
                            ))}
                        </Combobox.Dropdown>
                    )}
                </Combobox>
            </div>

            {/* Comment and suggestion text input */}
            <div className="pt-4">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1">
                    Comments
                </h3>
                <Textarea
                    placeholder="Type here"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    autosize
                    minRows={4}
                    classNames={{
                        input: "poppins pt-2 w-[540px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-between pt-4">

                <Button className="bg-transparent text-[#559CDA] px-6 py-3 rounded-lg border-[#559CDA] font-medium text-[14px] poppins"
                    onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    className="custom-gradient text-white px-6 py-3 rounded-lg font-medium text-[14px] poppins"
                    onClick={() => {
                        setIsTransferred(true); // Open success modal first
                        setTimeout(() => onClose(), 1000); // Delay closing the transfer modal
                    }}>
                    {"Transfer Position".toUpperCase()}
                </Button>

            </div>

            <div>
                <Modal radius={"md"} size={"35%"} withCloseButton={false} centered opened={isTransferred} onClose={() => setIsTransferred(false)}>
                    <TransferredPosition
                        onClose={onClose}
                    />
                </Modal>
            </div>
        </div>
    )
}