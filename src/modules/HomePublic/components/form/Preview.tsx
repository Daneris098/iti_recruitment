import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { ApplicationStore } from "../../store";
import { ApplicationFormVal } from "../../values";
import { Step } from "../../types";
import { cn } from "@src/lib/utils";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils"

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
                        <p className="text-[#0078EB] text-2xl">{applicationForm.generalInformation.personalInformation.fullname.firstName + " " + applicationForm.generalInformation.personalInformation.fullname.lastName}</p>
                        <p>{applicationForm.generalInformation.firstChoice}</p>
                        <div className="flex gap-1 sm:flex-col sm:gap-0">
                            <p className="text-[#6D6D6D]">Email</p>
                            <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.workingEmailAddress}</p>
                        </div>
                        <div className="flex gap-1 sm:flex-col sm:gap-0">
                            <p className="text-[#6D6D6D]">Phone</p>
                            <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.mobileNumber}</p>
                        </div>
                        <div className="flex gap-1 sm:flex-col sm:gap-0">
                            <p className="text-[#6D6D6D]">Landline Number</p>
                            <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.landlineNumber}</p>
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-6">


                        <div className="flex h-full w-full">


                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <p className="text-[#0078EB] text-xl font-bold">Personal Details</p>
                                <div>
                                    <p className="text-[#6D6D6D]">Applying for (First Choice)</p>
                                    <p className="font-bold">{applicationForm.generalInformation.firstChoice}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Desired Salary</p>
                                    <p className="font-bold">PHP {applicationForm.generalInformation.desiredSalary}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Present Address</p>
                                    <p className="font-bold">
                                        {
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
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.dateOfBirth}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Place of Birth</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.placeOfBirth}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Civil Status</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.civilStatus}</p>
                                </div>
                            </div>


                            <div className="flex flex-col p-2 gap-5 w-1/2 mt-[4.9rem] sm:mt-14">
                                <div>
                                    <p className="text-[#6D6D6D]">Applying for (Second Choice)</p>
                                    <p className="font-bold">{applicationForm.generalInformation.secondChoice}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Availability to start</p>
                                    <p className="font-bold">{applicationForm.generalInformation.startDateAvailability}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Permanent Address</p>
                                    <p className="font-bold">
                                        {
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
                                        <p className="font-bold">{applicationForm.generalInformation.personalInformation.age}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Sex</p>
                                        <p className="font-bold">{applicationForm.generalInformation.personalInformation.sex}</p>
                                    </div>
                                </div>


                                <div className="flex sm:gap-48">
                                    <div className="w-12">
                                        <p className="text-[#6D6D6D]">Height</p>
                                        <p className="font-bold">{applicationForm.generalInformation.personalInformation.height}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Weight</p>
                                        <p className="font-bold">{applicationForm.generalInformation.personalInformation.weight}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Religion</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.religion}</p>
                                </div>
                            </div>

                        </div>

                        <div className="flex h-full w-full">


                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <p className="text-[#0078EB] text-xl font-bold">Government ID/Number</p>
                                <div>
                                    <p className="text-[#6D6D6D]">SSS</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.sssNo}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Philhealth No.</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.philhealthNo}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Driver License</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.philhealthNo}</p>
                                </div>

                            </div>


                            <div className="flex flex-col p-2 gap-5 w-1/2 mt-[4.9rem] sm:mt-7">
                                <p className="text-[#0078EB] text-xl font-bold"></p>
                                <div>
                                    <p className="text-[#6D6D6D]">Pag-ibig No.</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.pagibigNo}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">TIN ID.</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.tinNo}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Passport</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.governmentIdOrNumber.passport}</p>
                                </div>

                            </div>


                        </div>


                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.educationAndEmployment.educationBackground.map((education, index) => (
                                <div className="flex flex-col p-2 gap-5 w-1/2">
                                    <p className="text-[#0078EB] text-xl font-bold">Education</p>
                                    <div>
                                        <p className="text-[#6D6D6D]">School Name</p>
                                        <p className="font-bold">{education.nameOfSchool}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Educational Level</p>
                                        <p className="font-bold">{education.educationalLevel}</p>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Course</p>
                                        <p className="font-bold">{education.course}</p>
                                    </div>

                                    <div className="flex sm:gap-48">
                                        <div className="w-28">
                                            <p className="text-[#6D6D6D]">Start Date</p>
                                            <p className="font-bold">{DateTimeUtils.dateToYearOnly(education.yearsAttended.from?.toString())}</p>
                                        </div>

                                        <div className="w-28">
                                            <p className="text-[#6D6D6D]">End Date</p>
                                            <p className="font-bold">{DateTimeUtils.dateToYearOnly(education.yearsAttended.to?.toString())}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[#6D6D6D]">Professional Liscences</p>
                                        <p className="font-bold">{education.professionalLiscenses}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.educationAndEmployment.employmentRecord.map((employment, index) => (
                                <div key={index} className="flex flex-col p-2 gap-5 w-1/2">
                                    <p className={cn("text-[#0078EB] text-xl font-bold", index != 0 && "opacity-0")}>Employment Record</p>
                                    <div>
                                        <p className="text-[#6D6D6D]">Employer Name</p>
                                        <p className="font-bold">{employment.employerCompany}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Location</p>
                                        <p className="font-bold">{employment.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Position Held</p>
                                        <p className="font-bold">{employment.positionHeld}</p>
                                    </div>
                                    <div className="flex sm:gap-48">
                                        <div className="w-28">
                                            <p className="text-[#6D6D6D]">Start Date</p>
                                            <p className="font-bold">{employment.inclusiveDate.from}</p>
                                        </div>
                                        <div className="w-28">
                                            <p className="text-[#6D6D6D]">End Date</p>
                                            <p className="font-bold">{employment.inclusiveDate.to}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Salary</p>
                                        <p className="font-bold">PHP {employment.salary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex h-full w-full">
                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <p className="text-[#0078EB] text-xl font-bold">Family Background</p>
                                <div>
                                    <p className="text-[#6D6D6D]">Father's Name</p>
                                    <p className="font-bold">{applicationForm.familyBackground.father.fullname}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Age</p>
                                    <p className="font-bold">{applicationForm.familyBackground.father.age}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Occupation</p>
                                    <p className="font-bold">{applicationForm.familyBackground.father.occupation}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Contact Number</p>
                                    <p className="font-bold">{applicationForm.familyBackground.father.contactNumber}</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-2 gap-5 w-1/2 ">
                                <p className="text-[#0078EB] text-xl font-bold mt-2">Mother's Name</p>
                                <div>
                                    <p className="text-[#6D6D6D]">Father's Name</p>
                                    <p className="font-bold">{applicationForm.familyBackground.mother.fullname}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Age</p>
                                    <p className="font-bold">{applicationForm.familyBackground.mother.age}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Occupation</p>
                                    <p className="font-bold">{applicationForm.familyBackground.mother.occupation}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Contact Number</p>
                                    <p className="font-bold">{applicationForm.familyBackground.mother.contactNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.familyBackground.siblings.length > 0 && applicationForm.familyBackground.siblings != ApplicationFormVal.familyBackground.siblings &&  applicationForm.familyBackground.siblings.map((sibling, index) => (
                                <div key={index} className="flex flex-col p-2 gap-5 w-1/2">
                                    <div>
                                        <p className="text-[#6D6D6D]">Sibling's Name </p>
                                        <p className="font-bold">{sibling.fullname}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Age</p>
                                        <p className="font-bold">{sibling.age}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Occupation</p>
                                        <p className="font-bold">{sibling.occupation}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Contact Number</p>
                                        <p className="font-bold">{sibling.contactNumber}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex h-full w-full">
                            <div className="flex flex-col p-2 gap-5 w-1/2">
                                <p className="text-[#0078EB] text-xl font-bold">Other Information</p>
                                <div>
                                    <p className="text-[#6D6D6D]">Convicted Crime</p>
                                    <p className="font-bold">{applicationForm.familyBackground.otherInformation.isConvictedCrimeDetails}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Medical Condition</p>
                                    <p className="font-bold">{applicationForm.familyBackground.otherInformation.medicalConditionDetails}</p>
                                </div>
                            </div>
                            <div className="flex flex-col p-2 gap-5 w-1/2 mt-[3.5rem] sm:mt-7">
                                <p className="text-[#0078EB] text-xl font-bold"></p>
                                <div>
                                    <p className="text-[#6D6D6D]">Hospitalized</p>
                                    <p className="font-bold">{applicationForm.familyBackground.otherInformation.isBeenHospitalizedDetails}</p>
                                </div>
                                <div>
                                    <p className="text-[#6D6D6D]">Family Employed within the Company</p>
                                    <p className="font-bold">{applicationForm.familyBackground.otherInformation.relativeWorkingWithUsDetails}</p>
                                </div>

                            </div>
                        </div>

                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.reference.characterReference.map((ref, index) => (
                                <div key={index} className="flex flex-col p-2 gap-5 w-1/2">
                                    <p className={cn("text-[#0078EB] text-xl font-bold", index != 0 && "opacity-0")}>Character Reference</p>
                                    <div>
                                        <p className="text-[#6D6D6D]">Full Name</p>
                                        <p className="font-bold">{ref.fullname}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Company</p>
                                        <p className="font-bold">{ref.company}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Position Held</p>
                                        <p className="font-bold">{ref.positionHeld}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Contact Number</p>
                                        <p className="font-bold">{ref.ContactNo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex h-full w-full flex-wrap">
                            {applicationForm.reference.characterReference.map((ref, index) => (
                                <div className="flex flex-col p-2 gap-5 w-1/2">
                                    <p className={cn("text-[#0078EB] text-xl font-bold", index != 0 && "opacity-0")}>Employment Reference</p>
                                    <div>
                                        <p className="text-[#6D6D6D]">Full Name</p>
                                        <p className="font-bold">{ref.fullname}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Company</p>
                                        <p className="font-bold">{ref.company}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Position Held</p>
                                        <p className="font-bold">{ref.positionHeld}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#6D6D6D]">Contact Number</p>
                                        <p className="font-bold">{ref.ContactNo}</p>
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