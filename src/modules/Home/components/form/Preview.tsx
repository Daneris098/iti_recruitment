import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { ApplicationStore } from "../../store";
import { ApplicationFormVal } from "../../values";
import { ApplicationForm, Step } from "../../types";

export default function index() {
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, applicationForm } = ApplicationStore()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: ApplicationFormVal,
        validate: {

        },
    });

    const onSubmit = async (form: ApplicationForm) => {
        console.log(form)
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
                        <img src={applicationForm.photo ?? ""} alt="Captured" className="w-[90%] h-auto object-cover rounded-lg" />
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

                            <div className="flex gap-48">
                                <div>
                                    <p className="text-[#6D6D6D]">Age</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.age}</p>
                                </div>

                                <div>
                                    <p className="text-[#6D6D6D]">Sex</p>
                                    <p className="font-bold">{applicationForm.generalInformation.personalInformation.sex}</p>
                                </div>
                            </div>


                            <div className="flex gap-48">
                                <div>
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

                </div>
            </div>
        </form>
    )
}