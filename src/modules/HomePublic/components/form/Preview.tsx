import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { ApplicationStore } from "../../store";
import { ApplicationFormVal } from "../../values";
import { Step } from "../../types";
import { cn } from "@src/lib/utils";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils"
import { Pill } from "@mantine/core";

export default function index() {
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, applicationForm, setActiveStepper } = ApplicationStore()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm,
        validate: {

        },
    });

    const onSubmit = async () => {
        setActiveStepper(activeStepper < Step.Oath ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.Preview && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-3  p-2 text-sm sm:text-md">
                <div className="flex flex-col sm:flex-row">

                    <div className="flex flex-col h-full  sm:w-[20%] p-2 gap-6 ">
                        <img src={applicationForm.photo ?? ""} alt="Profile Picture" className="w-[90%] h-auto object-cover rounded-lg" />
                        <p className="text-[#559CDA] text-2xl font-bold">{applicationForm.generalInformation.personalInformation.fullname.firstName + " " + applicationForm.generalInformation.personalInformation.fullname.lastName}</p>
                        <p>{applicationForm.generalInformation.firstChoice}</p>
                        <div className="flex gap-1 sm:flex-col sm:gap-0">
                            <p className="text-[#6D6D6D] ">Email</p>
                            <p className="text-[#6D6D6D] font-bold truncate">{applicationForm.generalInformation.personalInformation.workingEmailAddress}</p>
                        </div>
                        <div className="flex gap-1 sm:flex-col sm:gap-0">
                            <p className="text-[#6D6D6D]">Phone</p>
                            <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.mobileNumber}</p>
                        </div>
                        <div className="flex gap-1 sm:flex-col sm:gap-0">
                            <p className="text-[#6D6D6D]">Landline Number</p>
                            <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.landlineNumber}</p>
                        </div>
                        <div className="flex gap-1 sm:flex-col sm:gap-2">
                            <p className="text-[#6D6D6D]">Skills</p>
                            {applicationForm.familyBackground.otherInformation.specialTechnicalSkills != '' &&
                                (<Pill.Group>
                                    {applicationForm.familyBackground.otherInformation.specialTechnicalSkills.split(',').map((item, index) => (
                                        <Pill key={index}>
                                            {item}
                                        </Pill>
                                    ))}
                                </Pill.Group>)}
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-6">


                        <p className="text-[#559CDA] text-xl font-bold mt-6">Personal Details</p>
                        <div className="flex h-full w-full X">


                            <div className="flex flex-col p-2 gap-5 w-1/2 ">
                                <div>
                                    <p className="text-[#6D6D6D]">Applying for (First Choice)</p>
                                    <p className="font-bold">{applicationForm.generalInformation.firstChoice}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Desired Salary</p>
                                    <p className="text-[#6D6D6D] font-bold">  PHP {Number(applicationForm.generalInformation.desiredSalary).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Present Address</p>
                                    <p className="text-[#6D6D6D] font-bold">
                                        {
                                            applicationForm.generalInformation.personalInformation.presentAddress.unitNo + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.houseNo + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.zipCode + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.barangay + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.subdivision + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.street + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.city
                                        }
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Date of Birth</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.dateOfBirth}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Place of Birth</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.placeOfBirth}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Civil Status</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.civilStatus}</p>
                                </div>
                            </div>


                            <div className="flex flex-col p-2 gap-5 w-1/2 ">
                                <div>
                                    <p className="text-[#6D6D6D]">Applying for (Second Choice)</p>
                                    <p className="font-bold">{applicationForm.generalInformation.secondChoice != '' ? applicationForm.generalInformation.secondChoice : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Availability to start</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.startDateAvailability != '' ? applicationForm.generalInformation.startDateAvailability : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Permanent Address</p>
                                    <p className="text-[#6D6D6D] font-bold">
                                        {
                                            applicationForm.generalInformation.personalInformation.presentAddress.unitNo + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.houseNo + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.zipCode + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.barangay + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.subdivision + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.street + " " +
                                            applicationForm.generalInformation.personalInformation.presentAddress.city
                                        }
                                    </p>
                                </div>

                                <div className="flex sm:gap-48">
                                    <div className=" w-12">
                                        <p className="text-[#6D6D6D]">Age</p>
                                        <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.age}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Gender</p>
                                        <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.gender}</p>
                                    </div>
                                </div>


                                <div className="flex sm:gap-48">
                                    <div className="w-12">
                                        <p className="text-[#6D6D6D]">Height</p>
                                        <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.height != null ? applicationForm.generalInformation.personalInformation.height : 'N/A'}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Weight</p>
                                        <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.weight != null ? applicationForm.generalInformation.personalInformation.weight : 'N/A'}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Religion</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.religion != '' ? applicationForm.generalInformation.personalInformation.religion : 'N/A'}</p>
                                </div>
                            </div>

                        </div>

                        <p className="text-[#559CDA] text-xl font-bold">Government ID/Number</p>
                        <div className="flex h-full w-full">


                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <div>
                                    <p className="text-[#6D6D6D]">SSS</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.sssNo != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.sssNo : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Philhealth No.</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.philhealthNo != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.philhealthNo : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Driver License</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.driversLicense != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.driversLicense : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">GSIS No.</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.gsisNo != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.gsisNo : 'N/A'}</p>
                                </div>


                            </div>


                            <div className="flex flex-col p-2 gap-5 w-1/2 ">
                                <div>
                                    <p className="text-[#6D6D6D]">Pag-ibig No.</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.pagibigNo != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.pagibigNo : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">TIN ID.</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.tinNo != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.tinNo : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Passport</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.passport != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.passport : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">RDO Code</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.rdoCode != '' ? applicationForm.generalInformation.personalInformation.governmentIdOrNumber.rdoCode : 'N/A'}</p>
                                </div>

                            </div>


                        </div>


                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.educationAndEmployment.educationBackground.map((education) => (
                                <div className="flex flex-col p-2 gap-5 w-1/2">
                                    <p className="text-[#559CDA] text-xl font-bold">Education</p>
                                    <div>
                                        <p className="text-[#6D6D6D]">School Name</p>
                                        <p className="text-[#6D6D6D] font-bold">{education.nameOfSchool}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Educational Level</p>
                                        <p className="text-[#6D6D6D] font-bold">{education.educationalLevel}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Course</p>
                                        <p className="text-[#6D6D6D] font-bold">{education.course}</p>
                                    </div>

                                    <div className="flex sm:gap-48">
                                        <div className="w-28">
                                            <p className="text-[#6D6D6D]">Date</p>
                                            <p className="text-[#6D6D6D] font-bold">{DateTimeUtils.dateToYearOnly(education.yearsAttended.from?.toString())} - {DateTimeUtils.dateToYearOnly(education.yearsAttended.to?.toString())}</p>
                                        </div>

                                        {/* <div className="w-28">
                                            <p className="text-[#6D6D6D]">End Date</p>
                                            <p className="text-[#6D6D6D] font-bold">{DateTimeUtils.dateToYearOnly(education.yearsAttended.to?.toString())}</p>
                                        </div> */}
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Professional Liscences</p>
                                        <p className="text-[#6D6D6D] font-bold">{education.professionalLicenses != "" ? education.professionalLicenses : 'N/A'}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Certifications</p>
                                        <p className="text-[#6D6D6D] font-bold">{education.certifications != "" ? education.certifications : 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.educationAndEmployment.employmentRecord.map((employment, index) => (
                                <div key={index} className="flex flex-col p-2 gap-5 w-1/2">
                                    <p className={cn("text-[#559CDA] text-xl font-bold", index != 0 && "opacity-0")}>Employment Record</p>
                                    <div>
                                        <p className="text-[#6D6D6D]">Employer Name</p>
                                        <p className="text-[#6D6D6D] font-bold">{employment.employerCompany != '' ? employment.employerCompany : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Location</p>
                                        <p className="text-[#6D6D6D] font-bold">{employment.location != '' ? employment.location : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Position Held</p>
                                        <p className="text-[#6D6D6D] font-bold">{employment.positionHeld != '' ? employment.positionHeld : 'N/A'}</p>
                                    </div>
                                    <div className="flex sm:gap-48">
                                        <div className="w-28">
                                            <p className="text-[#6D6D6D]">Start Date</p>
                                            <p className="text-[#6D6D6D] font-bold">
                                                {employment.inclusiveDate.from || employment.inclusiveDate.to
                                                    ? `${employment.inclusiveDate.from || ''}-${employment.inclusiveDate.to || ''}`
                                                    : 'N/A'}
                                            </p>
                                        </div>
                                        {/* <div className="w-28">
                                            <p className="text-[#6D6D6D]">End Date</p>
                                            <p className="text-[#6D6D6D] font-bold">{employment.inclusiveDate.to}</p>
                                        </div> */}
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Salary</p>
                                        <p className="text-[#6D6D6D] font-bold">{employment.salary === 0 ? `N/A` : `PHP ${employment.salary}`}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Reason for Leaving</p>
                                        <p className="text-[#6D6D6D] font-bold">{employment.reasonForLeaving != '' ? employment.reasonForLeaving : 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-[#559CDA] text-xl font-bold">Family Background</p>
                        <div className="flex h-full w-full">
                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <div>
                                    <p className="text-[#6D6D6D]">Father's Name</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.father.fullname != '' ? applicationForm.familyBackground.father.fullname : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Age</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.father.age != 0 ? applicationForm.familyBackground.father.age : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Occupation</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.father.occupation != '' ? applicationForm.familyBackground.father.occupation : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Contact Number</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.father.contactNumber != '' ? applicationForm.familyBackground.father.contactNumber : 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <div>
                                    <p className="text-[#6D6D6D]">Mother's Name</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.mother.fullname != '' ? applicationForm.familyBackground.mother.fullname : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Age</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.mother.age != 0 ? applicationForm.familyBackground.mother.age : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Occupation</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.mother.occupation != '' ? applicationForm.familyBackground.mother.occupation : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Contact Number</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.mother.contactNumber != '' ? applicationForm.familyBackground.mother.contactNumber : 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-full w-full flex-wrap">
                            <div className="flex flex-col p-2 gap-5 w-1/2 mt-[3.5rem]">
                                <div>
                                    <p className="text-[#6D6D6D]">Number Of Children</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.children.numberOfChildren}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Age Range</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.children.ageRange != '' ? applicationForm.familyBackground.children.ageRange : 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <div>
                                    <p className="text-[#6D6D6D]">Spouse Name</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.spouse?.fullname != '' ? applicationForm.familyBackground.spouse?.fullname : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Age</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.spouse?.age != 0 ? applicationForm.familyBackground.spouse?.age : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Occupation</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.spouse?.occupation != '' ? applicationForm.familyBackground.spouse?.occupation : 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Contact Number</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.spouse?.contactNumber != '' ? applicationForm.familyBackground.spouse?.contactNumber : 'N/A'}</p>
                                </div>
                            </div>
                            {applicationForm.familyBackground.siblings.length > 0 && applicationForm.familyBackground.siblings != ApplicationFormVal.familyBackground.siblings && applicationForm.familyBackground.siblings.map((sibling, index) => (
                                <div key={index} className="flex flex-col p-2 gap-5 w-1/2">
                                    <div>
                                        <p className="text-[#6D6D6D]">Sibling's Name </p>
                                        <p className="text-[#6D6D6D] font-bold">{sibling.fullname}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Age</p>
                                        <p className="text-[#6D6D6D] font-bold">{sibling.age}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Occupation</p>
                                        <p className="text-[#6D6D6D] font-bold">{sibling.occupation}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Contact Number</p>
                                        <p className="text-[#6D6D6D] font-bold">{sibling.contactNumber}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-[#559CDA] text-xl font-bold">Other Information</p>
                        <div className="flex h-full w-full">
                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <div>
                                    <p className="text-[#6D6D6D]">Convicted Crime</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.otherInformation.isConvictedCrimeDetails}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Medical Condition</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.otherInformation.medicalConditionDetails}</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <div>
                                    <p className="text-[#6D6D6D]">Hospitalized</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.otherInformation.isBeenHospitalizedDetails}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Family Employed within the Company</p>
                                    <p className="text-[#6D6D6D] font-bold">{applicationForm.familyBackground.otherInformation.relativeWorkingWithUsDetails}</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.reference.characterReference.map((ref, index) => (
                                <div key={index} className="flex flex-col p-2 gap-5 w-full sp:w-1/2">
                                    <p className={cn("text-[#559CDA] text-xl font-bold", index != 0 && "opacity-0")}>Character Reference</p>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Full Name</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.fullname}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Company</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.company}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Position Held</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.positionHeld}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Contact Number</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.ContactNo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.reference.employmentReference.map((ref, index) => (
                                <div key={index} className="flex flex-col p-2 gap-5 w-full sp:w-1/2">
                                    <p className={cn("text-[#559CDA] text-xl font-bold", index != 0 && "opacity-0")}>Employment Reference</p>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Full Name</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.fullname != '' ? ref.fullname : 'N/A'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Company</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.company != '' ? ref.company : 'N/A'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Position Held</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.positionHeld != '' ? ref.positionHeld : 'N/A'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sp:grid-cols-1 gap-5 ">
                                        <p className="text-[#6D6D6D]">Contact Number</p>
                                        <p className="text-[#6D6D6D] font-bold">{ref.ContactNo != '' ? ref.ContactNo : 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}