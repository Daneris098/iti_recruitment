import { Divider } from "@mantine/core";

interface ViewApplicantsProps {
    // Applicant_Name: string;
    Position: string;
    // Status: string;
    // Email: string;
    // Phone: string;
    // Skills: string;
}

export default function PersonalDetails({ Position }: ViewApplicantsProps) {
    return (
        <div className="flex gap-8 pb-36">
            {/* Left Column */}
            <div className="w-3/5">
                <div className="pt-2">

                    {/* Left Column: First Section */}
                    <div>
                        <h2 className="text-[#6D6D6D] text-[12px]">Applying for (first choice):</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">{Position ?? "N/A"}</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Desired Salary</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">PHP 50,000</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Present Address</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">12 Catanduanes, Quezon City, 1105 Metro Manila</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Date of Birth</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">February 25, 2002</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Place of Birth</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Quezon City</p>

                        <Divider size={2} color="#A8A8A899" className="w-full mt-2" />

                        <h2 className="font-semibold text-[#6D6D6D] text-[12px] mt-4">Work Details</h2>
                        <p className="text-[#6D6D6D] text-[12px]">Software Engineer with 5+ years of experience in full-stack development, specializing in React and Node.js.</p>
                    </div>

                    {/* Left Column: Second Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold">Employment History</h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Job Title</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Freelance Consultant</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Job Title</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Senior Consultant</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Employer name</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Microsoft</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Start Date</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Jan 2016</p>

                        <h2 className="font-semibold text-[#6D6D6D] text-[14px] mt-4">Reason for Leaving</h2>
                        <p className="text-[#6D6D6D] text-[12px]">Micromanagement. Software Engineer with 5+ years of experience in full-stack development, specializing in React and Node.js.</p>
                    </div>

                    {/* Left Column: Third Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold">Education</h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">School Name</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">University of the East</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Course</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Bachelor of Science in Computer Engineering</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Educational Level</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Bachelor's</p>

                        <div className="flex gap-8 mt-6">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                <h2 className="text-[#6D6D6D] text-[12px]">Start Date</h2>
                                <p className="font-semibold text-[#6D6D6D] text-[14px]">Jan 2016</p>


                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                <h2 className="text-[#6D6D6D] text-[12px]">End Date</h2>
                                <p className="font-semibold text-[#6D6D6D] text-[14px]">Jan 2020</p>
                            </div>

                        </div>
                    </div>

                    {/* Left Column: Fourth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold">Family Background</h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Father's Name</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Juan Alfonso Aguinaldo</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Age</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">70</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Occupation</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Company Driver</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Contact Number</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>
                    </div>

                    {/* Left Column: Fifth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold">Government ID/Number</h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">SSS No.</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">PhilHealth No.</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Driver's License</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>
                    </div>

                    {/* Left Column: Sixth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold">Other Information</h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Special Technical Skills</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Welding and Machinery</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Convicted of a crime</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Once</p>
                    </div>

                </div>
            </div>

            {/* Right Column */}
            <div className="w-4/6 ">
                <div className="pt-2">
                    <h2 className="text-[#6D6D6D] text-[12px]">Applying for (second choice):</h2>
                    <p className="font-semibold text-[#6D6D6D] text-[14px]">Quality Assurance Tester</p>

                    <h2 className="text-[#6D6D6D] text-[12px] mt-4">Availability to start</h2>
                    <p className="font-semibold text-[#6D6D6D] text-[14px]">July 25, 2025</p>

                    <h2 className="text-[#6D6D6D] text-[12px] mt-4">Permanent Address</h2>
                    <p className="font-semibold text-[#6D6D6D] text-[14px]">12 Catanduanes, Quezon City, 1105 Metro Manila</p>

                    {/* Sub-Columns */}
                    <div className="flex gap-8 mt-6">
                        {/* Left Sub-Column */}
                        <div className="w-1/2">
                            <h2 className="text-[#6D6D6D] text-[12px]">Age</h2>
                            <p className="font-semibold text-[#6D6D6D] text-[14px]">26</p>

                            <h2 className="text-[#6D6D6D] text-[12px] mt-3">Height</h2>
                            <p className="font-semibold text-[#6D6D6D] text-[14px]">157cm</p>

                        </div>

                        {/* Right Sub-Column */}
                        <div className="w-1/2">
                            <h2 className="text-[#6D6D6D] text-[12px]">Sex</h2>
                            <p className="font-semibold text-[#6D6D6D] text-[14px]">Female</p>

                            <h2 className="text-[#6D6D6D] text-[12px] mt-3">Weight</h2>
                            <p className="font-semibold text-[#6D6D6D] text-[14px]">50 kg</p>
                        </div>
                    </div>

                    <Divider size={2} color="#A8A8A899" className="w-full mt-6" />
                    <h2 className="font-semibold text-[#6D6D6D] text-[12px] mt-4">Work Details</h2>
                    <p className="text-[#6D6D6D] text-[12px]">Software Engineer with 5+ years of experience in full-stack development, specializing in React and Node.js.</p>

                    {/*  */}
                    <div className="pt-10">
                        {/* Right Column: Second Section */}
                        <h2 className="text-[#559CDA] text-[16px] mt-14 font-bold"></h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Job Title</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Freelance Consultant</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Job Title</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Senior Consultant</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Employer name</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Microsoft</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Start Date</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Jan 2016</p>

                        <h2 className="font-semibold text-[#6D6D6D] text-[14px] mt-4">Reason for Leaving</h2>
                        <p className="text-[#6D6D6D] text-[12px]">Micromanagement. Software Engineer with 5+ years of experience in full-stack development, specializing in React and Node.js.</p>
                    </div>

                    {/* Right Column: Third Section */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold"></h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">School Name</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">University of the East</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Course</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Bachelor of Science in Computer Engineering</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Educational Level</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Bachelor's</p>

                        <div className="flex gap-8 mt-6">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                <h2 className="text-[#6D6D6D] text-[12px]">Start Date</h2>
                                <p className="font-semibold text-[#6D6D6D] text-[14px]">Jan 2016</p>


                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                <h2 className="text-[#6D6D6D] text-[12px]">End Date</h2>
                                <p className="font-semibold text-[#6D6D6D] text-[14px]">Jan 2020</p>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Fourth Section */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-14 font-bold"></h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Mothers's Name</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Juan Alfonso Aguinaldo</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Age</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">70</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Occupation</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Company Driver</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Contact Number</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>
                    </div>

                    {/* Right Column: Sixth Section */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold"></h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">SSS No.</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">PhilHealth No.</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Driver's License</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"> +63 917 123 4567</p>
                    </div>

                    {/* Right Column: Sixth Section */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-6 font-bold"></h2>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Special Technical Skills</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Sewing and Knitting</p>

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4">Convicted of a crime</h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]">Twice</p>
                    </div>
                </div>
            </div>
        </div>
    )
}