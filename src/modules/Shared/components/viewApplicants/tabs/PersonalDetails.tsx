import { useEffect, useState } from "react";
import { DateTimeUtils } from '@shared/utils/DateTimeUtils';
import { useApplicantIdStore } from "@src/modules/Shared/store";
import { PersonalDetailsType } from '@src/modules/Shared/types';
import { fetchApplicantByIdService } from '@src/modules/Shared/utils/GetApplicantById/applicantServiceById';

export default function PersonalDetails() {

    const [error, setError] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(false);

    const token = sessionStorage.getItem("accessToken") ?? undefined;
    const applicantId = useApplicantIdStore((state) => state.id);

    const [applicant, setApplicant] = useState<PersonalDetailsType | null>(null);

    useEffect(() => {
        if (!applicantId || !token) return;

        setIsLoading(true);
        fetchApplicantByIdService(applicantId, token)
            .then(setApplicant)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [applicantId, token]);

    if (isLoading) return <p>Loading…</p>;
    if (error || !applicant) {
        return (
            <div className="p-4 text-red-500">
                Couldn't load personal details — please try again.
            </div>
        );
    }

    const renderField = (label: any, value: any) => (
        <div className="flex flex-col gap-1 min-h-[60px]"> {/* Adjust min-h as needed */}
            <h2 className="text-[#6D6D6D] text-[12px]">{label}</h2>
            <p className="font-semibold text-[#6D6D6D] text-[14px] break-words">{value ?? "N/A"}</p>
        </div>
    );
    if (!fetchApplicantByIdService) return <p>Loading…</p>;

    const {
        positionsApplied = [],
        addresses = [],
        identification = {},
        educations = [],
        previousEmployments = [],
        family = {},
        characterReferences = [],
        questionnaire = [],
        birthDate,
        birthPlace,
        civilStatus,
        gender,
        religion,
        height,
        weight,
        skills = [],
        mother,
    } = applicant || {};

    const firstChoice = positionsApplied[0] || {};
    const secondChoice = positionsApplied[1] || {};
    const address = addresses[0] || {};
    const education = educations[0] || {};
    const prevEmployment1 = previousEmployments[0] || {};
    const prevEmployment2 = previousEmployments[1] || {};
    const sibling1 = family.siblings?.[0] || {};
    const sibling2 = family.siblings?.[1] || {};
    const ref1 = characterReferences[0] || {};
    const ref2 = characterReferences[1] || {};

    return (
        <div className="flex gap-8 pb-56">

            {/* Left Column */}
            <div className="w-3/5">
                <div>
                    {/* Left Column: First Section */}
                    {renderField("Applying for (first choice):", firstChoice.name)}
                    {renderField("Desired Salary", firstChoice.salary)}
                    {renderField("Present Address", address.subdivision)}
                    {renderField("Date of Birth", DateTimeUtils.dateDefaultToHalfMonthWord(birthDate ?? "N/A"))}
                    {renderField("Place of Birth", birthPlace)}
                    {renderField("Civil Status", civilStatus?.name)}

                    {/* Left Column: Second Section */}
                    < div >
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Government ID Number(s)</h2>
                        {renderField("GSIS No.", identification.gsisNo)}
                        {renderField("SSS No.", identification.hdmfNo)}
                        {renderField("PagIbig No.", identification.phicNo)}

                        < h2 className="text-[#6D6D6D] text-[12px] mt-4" ></h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"></p>
                    </div>

                    {/* Left Column: Fourth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Education</h2>
                        {renderField("School Name", education.school)}
                        {renderField("Course", education.course)}
                        {renderField("Educational Level", education.level?.name)}

                        <div className="flex gap-8">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", DateTimeUtils.dateDefaultToHalfMonthWord(positionsApplied?.[0]?.availableDateStart ?? "N/A"))}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End Date", DateTimeUtils.dateDefaultToHalfMonthWord(educations?.[0]?.yearTo ?? "N/A"))}
                            </div>

                        </div>
                    </div>

                    {/* Left Column: Third Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold mb-3">Employment Record</h2>
                        {renderField("Employer Name", prevEmployment1.company)}
                        {renderField("Location", prevEmployment1.location)}
                        {renderField("Position Held", prevEmployment1.position)}

                        <div className="flex gap-8 mt-4">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", DateTimeUtils.dateDefaultToHalfMonthWord(prevEmployment2?.dateFrom ?? "N/A"))}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End Date", DateTimeUtils.dateDefaultToHalfMonthWord(prevEmployment2?.dateTo ?? "N/A"))}
                            </div>
                        </div>
                        {renderField("Reason for Leaving", prevEmployment1?.reason)}
                    </div>

                    {/* Left Column: Fourth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Family Background</h2>
                        {renderField("Father's Name", family.father?.name)}
                        {renderField("Age", family.father?.age)}
                        {renderField("Occupation", family.father?.occupation)}
                        {renderField("Contact", family.father?.contactNo)}
                        {renderField("Sibling Name", sibling1.name)}
                        {renderField("Occupation", sibling1.occupation)}
                        {renderField("Contact", sibling1.contact)}
                    </div>

                    {/* Left Column: Sixth Section */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Other Information</h2>
                        {renderField("Special Technical Skills", skills[1]?.keyword)}
                        {renderField("Convicted of a crime", questionnaire[0]?.answer)}
                    </div>

                    {/*  */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Character References</h2>
                        {renderField("Full Name", ref1.name)}
                        {renderField("Company", ref1.company)}
                        {renderField("Position Held", ref1.position)}
                        {renderField("Contact Number", ref1.contactNo)}
                    </div>

                    {/*  */}
                    <div>
                        <h2 className="text-[#559CDA] text-[16px] mt-8 mb-3 font-bold">Employment References </h2>
                        {renderField("Full Name", ref1.name)}
                        {renderField("Company", ref1.company)}
                        {renderField("Position Held", ref1.position)}
                        {renderField("Contact Number", ref1.contactNo)}
                    </div>
                </div>
            </div >

            {/* Right Column */}
            < div className="w-4/6 " >
                <div className="">
                    {renderField("Applying for (second choice):", secondChoice.name)}
                    {renderField("Availability to start", DateTimeUtils.dateDefaultToHalfMonthWord(secondChoice.availableDateStart ?? "N/A"))}
                    {renderField("Permanent Address", address.subdivision)}

                    {/* Sub-Columns */}
                    <div className="flex gap-8">
                        {/* Left Sub-Column */}
                        <div className="w-1/2">
                            {renderField("Age", "N/A")}
                            {renderField("Height", height)}
                        </div>

                        {/* Right Sub-Column */}
                        <div className="w-1/2">
                            {renderField("Sex", gender?.name)}
                            {renderField("Weight", weight)}
                        </div>
                    </div>

                    {renderField("Religion", religion?.name)}

                    {/* Identifications */}
                    <div className="pt-12">
                        {/* Right Column: Second Section */}
                        <h2 className="text-[#559CDA] text-[16px] mt-5 font-bold"></h2>
                        {renderField("PhilHealth No.", identification.hdmfNo)}

                        <div className="flex gap-8">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("TIN ID", identification.tinNo)}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("RTO Code", identification.hdmfNo)}
                            </div>
                        </div>
                        {renderField("Passport", identification.passportNo)}
                        <h2 className="text-[#6D6D6D] text-[12px] mt-4"></h2>
                        <p className="font-semibold text-[#6D6D6D] text-[14px]"></p>
                    </div>

                    {/* Right Column: Third Section */}
                    <div className="pt-6">
                        <h2 className="text-[#559CDA] text-[16px] mt-7 font-bold"></h2>

                        {renderField("School Name", education.school)}
                        {renderField("Course", education.course)}
                        {renderField("Educational Level", education.level?.name)}

                        <div className="flex gap-8">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", DateTimeUtils.dateDefaultToHalfMonthWord(education.yearFrom ?? "N/A"))}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End Date", DateTimeUtils.dateDefaultToHalfMonthWord(education.yearTo ?? "N/A"))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Fourth Section */}
                    <div className="pt-14 mt-3">
                        {renderField("Employer Name", prevEmployment2.company)}
                        {renderField("Location", prevEmployment2.location)}
                        {renderField("Position Held", prevEmployment2.position)}
                        <div className="flex gap-8 mt-4">
                            {/* Left Sub-Column */}
                            <div className="w-1/2">
                                {renderField("Start Date", DateTimeUtils.dateDefaultToHalfMonthWord(prevEmployment2.dateFrom ?? "N/A"))}
                            </div>

                            {/* Right Sub-Column */}
                            <div className="w-1/2">
                                {renderField("End Date", DateTimeUtils.dateDefaultToHalfMonthWord(prevEmployment2.dateTo ?? "N/A"))}
                            </div>
                        </div>
                        {renderField("Reason For Leaving", prevEmployment2.reason)}
                    </div>

                    {/* Parents & Siblings */}
                    <div className="pt-16 mt-1">
                        {renderField("Father's Name", mother?.name)}
                        {renderField("Age", family.mother?.age)}
                        {renderField("Occupation", family.mother?.occupation)}
                        {renderField("Contact", family.mother?.contactNo)}
                        {renderField("Sibling Name", sibling2.name)}
                        {renderField("Occupation", sibling2.occupation)}
                        {renderField("Contact", sibling2.contact)}
                    </div>

                    {/* Right Column: Sixth Section */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold"></h2>
                        {renderField("Hospitalized", questionnaire[1]?.answer)}
                        {renderField("Family Employed within the company", questionnaire[3]?.answer)}
                    </div>

                    {/*  */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-8 font-bold"></h2>
                        {renderField("Full Name", ref2.name)}
                        {renderField("Company", ref2.company)}
                        {renderField("Position Held", ref2.position)}
                        {renderField("Contact Number", ref2.contactNo)}
                    </div>

                    {/*  */}
                    <div className="pt-10">
                        <h2 className="text-[#559CDA] text-[16px] mt-5 font-bold"></h2>
                        {renderField("Full Name", ref2.name)}
                        {renderField("Company", ref2.company)}
                        {renderField("Position Held", ref2.position)}
                        {renderField("Contact Number", ref2.contactNo)}
                    </div>
                </div>
            </div >
        </div >
    )
}