import { Checkbox } from "@mantine/core";
import { DataTable } from "mantine-datatable";

export default function TransferDetails() {

    // For Leave Details DataTable
    const data = [
        { id: 1, leaveParameter: 'Sick Leave', payrollParameter: 'Monthly' },
        { id: 2, leaveParameter: 'Vacation Leave', payrollParameter: 'Bi-Weekly' },
        { id: 3, leaveParameter: 'Emergency Leave', payrollParameter: 'Hourly' },
    ];

    // For Benefits Detail DataTable
    const sampleData = [
        { id: 1, code: "EMP001", name: "John Doe", amount: 5000 },
        { id: 2, code: "EMP002", name: "Jane Smith", amount: 7000 },
        { id: 3, code: "EMP003", name: "Michael Johnson", amount: 6000 },
        { id: 4, code: "EMP004", name: "Emily Davis", amount: 5500 },
    ];

    return (

        <div className="pt-2 overflow-auto pb-52">
            {/* Header */}
            <div>
                <h1 className="text-[#559CDA] text-[16px] font-bold">Job Information</h1>
            </div>

            {/* Company Info */}
            <div>
                <h2 className="text-[#6D6D6D] text-[12px] mt-1">Company</h2>
                <p className="font-semibold text-[#6D6D6D] text-[14px]">Intellismart Technology Inc.</p>
            </div>

            {/* 4-Column Layout for Branch, Division, Department, Section */}
            <div className="grid grid-cols-4 gap-4 mt-4">

                {/* First Column */}
                <div>

                    {/* First Column: First Section */}
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px]">Branch</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Branch Name</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Position Level</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Position Level</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Log Required</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Yes</p>
                    </div>

                    {/* First Column: Second section */}
                    <h1 className="text-[#559CDA] text-[16px] font-bold mt-10">Payroll</h1>

                    <div className="mt-1">
                        <h2 className="text-[#6D6D6D] text-[12px]">Payment Scheme</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Monthly</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Bank</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Bank</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Payroll Parameter</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Payroll Parameter</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Monthly Rate</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Monthly Rate</p>
                    </div>

                    {/* First Column: Third section */}
                    <h1 className="text-[#559CDA] text-[16px] font-bold mt-10">Schedule</h1>
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px] mt-1">Default Schedule</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Schedule</p>
                    </div>

                    {/* First Column: Fourth section */}
                    <h1 className="text-[#559CDA] text-[16px] font-bold mt-10">Employee Benefit</h1>
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px] mt-1">Leave Parameter</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Leave Parameter</p>
                    </div>

                </div>

                {/* Second Column */}
                <div>

                    {/* Second Colum: First Section*/}
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px]">Division</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Division</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Designation</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Designation</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Union Member</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Union</p>
                    </div>

                    {/* Secon Column : Second Section */}
                    <div className="mt-16 pt-1">
                        <h2 className="text-[#6D6D6D] text-[12px]">Payment Frequency</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Payment Frequency</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Account Type</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Account Type</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Payroll Mode</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Payroll Mode</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Daily Rate</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">PHP 000000</p>
                    </div>

                    {/* Second Column: Third Section */}
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px] mt-44">Payroll Parameter</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Payroll Parameter</p>
                    </div>

                </div>

                {/* Third Column */}
                <div>

                    {/* Third Column: First Section */}
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px]">Department</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Department</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Access Number</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">1234567</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Employment Status</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Probationary</p>
                    </div>

                    {/* Third Column: Second Section */}
                    <div className="mt-16 pt-1">
                        <h2 className="text-[#6D6D6D] text-[12px]">Tax Exemption</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Tax Exemption</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Account Number</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">###########</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Currency</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Peso</p>

                    </div>
                </div>

                {/* Fourth Colum */}
                <div>
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px]">Section</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Papaya</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Payroll Group</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Payroll Group</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-6">Start Date</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">July 15, 2024</p>
                    </div>
                </div>
            </div>

            {/* Leave details */}
            <h1 className="text-[#559CDA] text-[16px] font-bold mt-8">Leave Details</h1>
            <DataTable
                highlightOnHover
                records={data}
                columns={[
                    { accessor: 'leaveParameter', title: 'Leave Code Parameter' },
                    { accessor: 'payrollParameter', title: 'Leave Parameter' },
                ]}
                className="border border-gray-50 rounded-lg "
            />

            {/* Benefits Details */}
            <h1 className="text-[#559CDA] text-[16px] font-bold mt-8">Benefits Details</h1>
            <DataTable
                highlightOnHover
                className="border border-gray-50 rounded-lg "
                records={sampleData}
                columns={[
                    { accessor: "code", title: "Code" },
                    { accessor: "name", title: "Name" },
                    { accessor: "amount", title: "Amount" },
                    {
                        accessor: "p1", title: "P1", render: () => (
                            <Checkbox
                            // checked={checkedState[record.id].p1}
                            // onChange={() => toggleCheckbox(record.id, "p1")}
                            />
                        ),
                    },
                    { accessor: "p2", title: "P2", render: () => (<Checkbox />) },
                    { accessor: "p3", title: "P3", render: () => (<Checkbox />) },
                    { accessor: "p4", title: "P4", render: () => (<Checkbox />) },
                    { accessor: "p5", title: "P5", render: () => (<Checkbox />) },
                    { accessor: "p6", title: "P6", render: () => (<Checkbox />) },
                    { accessor: "p7", title: "P7", render: () => (<Checkbox />) },
                    { accessor: "p8", title: "P8", render: () => (<Checkbox />) },
                    { accessor: "p9", title: "P9", render: () => (<Checkbox />) },
                    { accessor: "p10", title: "P10", render: () => (<Checkbox />) },
                ]}
            />
        </div>
    );
}
