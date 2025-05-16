// import { useApplicantsById } from "@modules/Applicants/hooks/useApplicant";
import { useApplicantsById } from "@modules/Shared/hooks/useSharedApplicants";

import { useApplicantIdStore } from "@src/modules/Applicants/store";

export default function PersonalDetails() {

    const applicantId = useApplicantIdStore((state) => state.id);
    const { data: applicantsById } = useApplicantsById(applicantId)

    // const renderField = (label: any, value: any) => (
    //     <div className="mt-4">
    //         <h2 className="text-[#6D6D6D] text-[12px]">{label}</h2>
    //         <p className="font-semibold text-[#6D6D6D] text-[14px]">{value ?? "N/A"}</p>
    //     </div>
    // )
    const renderField = (label: any, value: any) => (
        <div className="flex flex-col gap-1 min-h-[60px]"> {/* Adjust min-h as needed */}
            <h2 className="text-[#6D6D6D] text-[12px]">{label}</h2>
            <p className="font-semibold text-[#6D6D6D] text-[14px] break-words">{value ?? "N/A"}</p>
        </div>
    );

    return (
        <div className="flex gap-8 pb-40">
            {/* Left Column */}
            <div className="w-3/5">
                {/* <div className="pt-2"> */}
                <div>
                    {/* Left Column: First Section */}
                    {renderField("Applying for (first choice):", applicantsById?.generalInformation.firstChoice)}
                    {renderField("Desired Salary", applicantsById?.generalInformation.desiredSalary)}
                    {renderField("Present Address", applicantsById?.generalInformation.presentAddress)}
                    {renderField("Date of Birth", applicantsById?.generalInformation.dateOfBirth)}
                    {renderField("Place of Birth", applicantsById?.generalInformation.placeOfBirth)}
                    {renderField("Civil Status", applicantsById?.generalInformation.civilStatus)}

                    {/* Left Column: Second Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Government ID Number(s)</h2>
                        {renderField("GSIS No.", applicantsById?.governmentIdInformation.gsisNo)}
                        {renderField("SSS No.", applicantsById?.governmentIdInformation.sssNo)}
                        {renderField("PagIbig No.", applicantsById?.governmentIdInformation.pagIbigNo)}

                        <h2 className="text-[#6D6D6D] text-[12px] mt-4"></h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"></p>
                    </div>

                    {/* Left Column: Fourth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Education</h2>

                        {renderField("School Name", applicantsById?.education.primary.name)}
                        {renderField("Course", applicantsById?.education.primary.course)}
                        {renderField("Educational Level", applicantsById?.education.primary.educationalLevel)}

                        {/* <div className="flex gap-8 mt-6"> */}
                        <div className="flex gap-8">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", applicantsById?.education.primary.startDate)}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End date", applicantsById?.education.primary.endDate)}
                            </div>

                        </div>
                    </div>

                    {/* Left Column: Third Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold mb-3">Employment Record</h2>
                        {renderField("Employer Name", applicantsById?.employmentRecord.firstEmployment.employerName)}
                        {renderField("Location", applicantsById?.employmentRecord.firstEmployment.location)}
                        {renderField("Position Held", applicantsById?.employmentRecord.firstEmployment.positionHeld)}

                        <div className="flex gap-8 mt-4">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", applicantsById?.employmentRecord.secondEmployment.startDate)}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End Date", applicantsById?.employmentRecord.secondEmployment.endDate)}
                            </div>
                        </div>

                        {renderField("Reason for Leaving", applicantsById?.employmentRecord.firstEmployment.reasonForLeaving)}
                    </div>

                    {/* Left Column: Fourth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Family Background</h2>
                        {renderField("Father's Name", applicantsById?.familyBackground.father.name)}
                        {renderField("Age", applicantsById?.familyBackground.father.age)}
                        {renderField("Occupation", applicantsById?.familyBackground.father.occupation)}
                        {renderField("Contact", applicantsById?.familyBackground.father.contact)}
                        {renderField("Sibling Name", applicantsById?.familyBackground.siblings[0].age)}
                        {renderField("Occupation", applicantsById?.familyBackground.siblings[0].occupation)}
                        {renderField("Contact", applicantsById?.familyBackground.siblings[0].contact)}
                    </div>

                    {/* Left Column: Sixth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Other Information</h2>
                        {renderField("Special Technical Skills", applicantsById?.otherInformation.specialSkills.skill)}
                        {renderField("Convicted of a crime", applicantsById?.otherInformation.conviction.answer)}
                    </div>

                    {/*  */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Character References</h2>
                        {renderField("Full Name", applicantsById?.characterReference.firstReference.referrer)}
                        {renderField("Company", applicantsById?.characterReference.firstReference.employerName)}
                        {renderField("Position Held", applicantsById?.characterReference.firstReference.positionHeld)}
                        {renderField("Contact Number", applicantsById?.characterReference.firstReference.contact)}
                    </div>

                    {/*  */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Employment References </h2>
                        {renderField("Full Name", applicantsById?.employmentReferences.info.referrer)}
                        {renderField("Company", applicantsById?.employmentReferences.info.employerName)}
                        {renderField("Position Held", applicantsById?.employmentReferences.info.positionHeld)}
                        {renderField("Contact Number", applicantsById?.employmentReferences.info.contact)}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-4/6 ">
                <div className="">
                    {/* <h2 className="text-[#6D6D6D] text-[12px] ">Applying for (second choice):</h2> */}
                    {renderField("Applying for (second choice): ", applicantsById?.generalInformation.secondChoice)}
                    {renderField("Availability to start", applicantsById?.generalInformation.startAvailability)}
                    {renderField("Permanent Address", applicantsById?.generalInformation.presentAddress)}

                    {/* Sub-Columns */}
                    {/* <div className="flex gap-8 mt-9"> */}
                    <div className="flex gap-8">
                        {/* Left Sub-Column */}
                        <div className="w-1/2">
                            {renderField("Age", applicantsById?.generalInformation.age)}
                            {renderField("Height", applicantsById?.generalInformation.height)}
                        </div>

                        {/* Right Sub-Column */}
                        <div className="w-1/2">
                            {renderField("Sex", applicantsById?.generalInformation.gender)}
                            {renderField("Weight", applicantsById?.generalInformation.weight)}
                        </div>
                    </div>

                    {renderField("Religion", applicantsById?.generalInformation.religion)}

                    {/*  */}
                    {/* <div className="pt-10"> */}
                    <div className="pt-12">
                        {/* Right Column: Second Section */}
                        <h2 className="text-[#559CDA] text-[16px] mt-5 font-bold"></h2>
                        {renderField("PhilHealth No.", applicantsById?.governmentIdInformation.philhealthNo)}

                        {/* <div className="flex gap-8 mt-5"> */}
                        <div className="flex gap-8">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("TIN ID", applicantsById?.governmentIdInformation.tinNo)}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("RTO Code", applicantsById?.governmentIdInformation.rdoCode)}
                            </div>
                        </div>

                        {renderField("Passport", applicantsById?.governmentIdInformation.passport)}
                        <h2 className="text-[#6D6D6D] text-[12px] mt-4"></h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"></p>
                    </div>

                    {/* Right Column: Third Section */}
                    {/* <div className="pt-16 mt-7"> */}
                    <div className="pt-6">
                        <h2 className="text-[#559CDA] text-[16px] mt-7 font-bold"></h2>

                        {renderField("School Name", applicantsById?.education.primary.name)}
                        {renderField("Course", applicantsById?.education.primary.course)}
                        {renderField("Educational Level", applicantsById?.education.primary.educationalLevel)}

                        {/* <div className="flex gap-8 mt-6"> */}
                        <div className="flex gap-8">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", applicantsById?.education.primary.startDate)}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End Date", applicantsById?.education.primary.endDate)}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Fourth Section */}
                    {/* <div className="pt-16"> */}
                    <div className="pt-14 mt-3">
                        {renderField("Employer Name", applicantsById?.employmentRecord.secondEmployment.employerName)}
                        {renderField("Location", applicantsById?.employmentRecord.secondEmployment.location)}
                        {renderField("Position Held", applicantsById?.employmentRecord.secondEmployment.positionHeld)}
                        <div className="flex gap-8 mt-4">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", applicantsById?.employmentRecord.secondEmployment.startDate)}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End Date", applicantsById?.employmentRecord.secondEmployment.endDate)}
                            </div>
                        </div>
                        {renderField("Reason For Leaving", applicantsById?.employmentRecord.secondEmployment.reasonForLeaving)}
                    </div>

                    {/*  */}
                    {/* <div className="pt-12"> */}
                    <div className="pt-16 mt-1">
                        {renderField("Mother's Name", applicantsById?.familyBackground.mother.name)}
                        {renderField("Age", applicantsById?.familyBackground.mother.age)}
                        {renderField("Occupation", applicantsById?.familyBackground.mother.occupation)}
                        {renderField("Contact", applicantsById?.familyBackground.mother.contact)}
                        {renderField("Sibling Name", applicantsById?.familyBackground.siblings[1].age)}
                        {renderField("Occupation", applicantsById?.familyBackground.siblings[1].occupation)}
                        {renderField("Contact", applicantsById?.familyBackground.siblings[1].contact)}
                    </div>

                    {/* Right Column: Sixth Section */}
                    {/* <div className="pt-10"> */}
                    <div className="pt-8">
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold"></h2>
                        {renderField("Hospitalized", applicantsById?.otherInformation.medicalHistory.answer)}
                        {renderField("Family Employed within the company", applicantsById?.otherInformation.familyEmployed.answer)}
                    </div>

                    {/*  */}
                    <div className="pt-12">
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold"></h2>
                        {renderField("Full Name", applicantsById?.characterReference.secondReference.referrer)}
                        {renderField("Company", applicantsById?.characterReference.secondReference.employerName)}
                        {renderField("Position Held", applicantsById?.characterReference.secondReference.positionHeld)}
                        {renderField("Contact Number", applicantsById?.characterReference.secondReference.contact)}
                    </div>

                    {/*  */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-5 font-bold"></h2>
                        {renderField("Full Name", applicantsById?.characterReference.secondReference.referrer)}
                        {renderField("Company", applicantsById?.characterReference.secondReference.employerName)}
                        {renderField("Position Held", applicantsById?.characterReference.secondReference.positionHeld)}
                        {renderField("Contact Number", applicantsById?.characterReference.secondReference.contact)}
                    </div>
                </div>
            </div>
        </div>
    )
}