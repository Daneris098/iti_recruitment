import { Button, Divider } from "@mantine/core";
import { IconCaretDownFilled, IconDots, IconX } from "@tabler/icons-react";
import TransferredPositionModal from "@modules/Applicants/components/modal/jobGenerated";
import TransferEmployeePosition from "@src/modules/Applicants/components/alerts/TransferEmployee";
import { useCloseModal } from "@src/modules/Applicants/store";

interface TransferEmployeeProps {
    Name: string
    onClose: () => void
    Status: string
}

export default function TransferEmployee({ Name, onClose, Status }: TransferEmployeeProps) {

    const { isTransferEmployeePosition, setIsTransferEmployeePosition } = useCloseModal();
    return (
        <div className="px-5 py-5 overflow-y-auto h-screen pb-24">
            {/* <div>
                <IconX
                    onClick={onClose}
                />
            </div> */}
            <div className="flex justify-between items-center">
                <h2 className="text-[22px] font-semibold text-[#559CDA]">
                    Transfer Employee
                </h2>
                <IconX
                    onClick={onClose}
                    className="w-[15px] h-[15px] cursor-pointer" />
            </div>
            <Divider size={2} color="#A8A8A899" className="w-full mt-2" />

            <div className="pt-3">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-1 poppins pb-1">
                    Employee Name <span className="text-[#F14336]">*</span>
                </h3>
                <p className=" justify-between 
            poppins relative flex items-center w-full h-[56px] px-4 bg-[#6D6D6D50] 
            border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-[#6D6D6D50]
            hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]
            ">{Name}
                    <span><IconCaretDownFilled size={16} /></span></p>
            </div>

            <div>
                <h3 className="font-semibold text-[#6D6D6D] text-[18px] pt-5 pb-1 poppins ">
                    Job Information <span className="text-[#F14336]">*</span>
                </h3>
                <Divider size={2} color="#A8A8A899" className="w-full" />

            </div>

            <div className="grid grid-cols-2 gap-5">

                {/* Left Section */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                        Access Number <span className="text-[#F14336]">*</span>
                    </h3>
                    {/* <TextInput
                        className="w-full h-[56px] rounded-[8px] py-2 poppins font-semibold"
                        placeholder="Enter Access Number"
                    /> */}
                    <p className="border-[#6D6D6D99] text-[16px] border-2 py-2 h-[56px] font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center">
                        Enter Access Number
                    </p>

                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Position Level <span className="text-[#F14336]">*</span>
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins h-[56px] text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center">
                            Enter position level
                            <span><IconCaretDownFilled size={16} /></span>
                        </p>
                    </div>

                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Log Required
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins h-[56px] text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center">
                            Select if Yes or No
                            <span><IconCaretDownFilled size={16} /></span>
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                        Employment Status <span className="text-[#F14336]">*</span>
                    </h3>

                    <p className="border-[#6D6D6D99] border-2 font-medium poppins h-[56px] text-[#6D6D6D99] px-4 rounded-[8px] bg-[#6D6D6D40] flex items-center justify-between">
                        {Status}
                        <IconCaretDownFilled size={16} />
                    </p>



                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Payroll Group <span className="text-[#F14336]">*</span>
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins  h-[56px] text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center">
                            Select Payroll Group
                            <span><IconCaretDownFilled size={16} /></span>
                        </p>
                    </div>

                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Union Member <span className="text-[#F14336]">*</span>
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                            Select Union Membership
                            <span><IconCaretDownFilled size={16} /></span>
                        </p>
                    </div>

                </div>
            </div>


            <h3 className="font-semibold text-[#6D6D6D] text-[18px] pt-5 pb-1 poppins">
                Payroll <span className="text-[#F14336]">*</span>
            </h3>
            <Divider size={2} color="#A8A8A899" className="w-full" />

            <div className="grid grid-cols-2 gap-5">

                {/* Left Section */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                        Payment Scheme <span className="text-[#F14336]">*</span>
                    </h3>

                    <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                        Select Payment Scheme
                    </p>

                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Payment Frequency <span className="text-[#F14336]">*</span>
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                            Select Payment Frequency
                            <span><IconDots size={16} /></span>
                        </p>

                    </div>

                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Tax Exemption
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                            Select Tax Exemption
                            <span><IconDots size={16} /></span>
                        </p>
                    </div>

                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Payroll Parameter
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                            Select Payroll Parameter
                            <span><IconDots size={16} /></span>
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                        Bank<span className="text-[#F14336]">*</span>
                    </h3>
                    <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                        Input Reference Number (if neccessary)
                        <span><IconDots size={16} /></span>
                    </p>

                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Account Type <span className="text-[#F14336]">*</span>
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                            Select Account Type
                            <span><IconDots size={16} /></span>
                        </p>
                    </div>


                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Account Number <span className="text-[#F14336]">*</span>
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                            Select Account Number
                            <span><IconDots size={16} /></span>
                        </p>
                    </div>


                    <div className="">
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                            Payment Mode <span className="text-[#F14336]">*</span>
                        </h3>
                        <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                            Select Payment Mode
                            <span><IconDots size={16} /></span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                    Currency <span className="text-[#F14336]">*</span>
                </h3>
                <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                    Select Currency Type
                    <span><IconDots size={16} /></span>
                </p>
            </div>


            <h3 className="font-semibold text-[#6D6D6D] text-[18px] pt-5 pb-1 poppins">
                Schedule <span className="text-[#F14336]">*</span>
            </h3>
            <Divider size={2} color="#A8A8A899" className="w-full" />


            <div className="">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                    Default Schedule <span className="text-[#F14336]">*</span>
                </h3>
                <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                    Select Schedule
                    <span><IconDots size={16} /></span>
                </p>
            </div>

            <h3 className="font-semibold text-[#6D6D6D] text-[18px] pt-5 pb-1 poppins">
                Leave <span className="text-[#F14336]">*</span>
            </h3>
            <Divider size={2} color="#A8A8A899" className="w-full" />


            <div className="">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                    Leave Parameter <span className="text-[#F14336]">*</span>
                </h3>
                <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                    Select Leave Parameter
                    <span><IconDots size={16} /></span>
                </p>
            </div>

            <div className="">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                    Leave Details <span className="text-[#F14336]">*</span>
                </h3>
                <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                    Select Leave Details
                    <span><IconDots size={16} /></span>
                </p>
            </div>

            <h3 className="font-semibold text-[#6D6D6D] text-[18px] pt-5 pb-1 poppins">
                Payroll Parameter <span className="text-[#F14336]">*</span>
            </h3>
            <Divider size={2} color="#A8A8A899" className="w-full" />


            <div className="">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                    Payroll Parameter <span className="text-[#F14336]">*</span>
                </h3>
                <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                    Select Payroll Parameter
                    <span><IconDots size={16} /></span>
                </p>
            </div>

            <h3 className="font-semibold text-[#6D6D6D] text-[18px] pt-5 pb-1 poppins">
                Benefits Details <span className="text-[#F14336]">*</span>
            </h3>
            <Divider size={2} color="#A8A8A899" className="w-full" />


            <div className="">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins pb-1">
                    Benefits Details <span className="text-[#F14336]">*</span>
                </h3>
                <p className="border-[#6D6D6D99] border-2 py-2 font-medium poppins text-[#6D6D6D99] px-2 rounded-[8px] flex justify-between items-center h-[56px]">
                    Select Benefits Details
                    <span><IconDots size={16} /></span>
                </p>
            </div>

            <div className="flex justify-end mt-8">
                <Button className="br-gradient poppins text-[14px] rounded-[8px]"
                    onClick={() => setIsTransferEmployeePosition(true)}>
                    Transfer Employee
                </Button>
            </div>

            <div>
                <TransferredPositionModal isOpen={isTransferEmployeePosition}>
                    <TransferEmployeePosition
                        Employee_Name={Name}
                        onClose={onClose}
                    />
                </TransferredPositionModal>
            </div>
        </div>

    )
}