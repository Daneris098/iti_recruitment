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
            <div className="text-[#6D6D6D] flex flex-col gap-3  p-2">
                <div className="flex">
                    <div className="flex flex-col h-full w-[20%] p-2 gap-6">
                        <img src={applicationForm.photo ?? ""} alt="Captured" className="w-[90%] h-auto object-cover rounded-lg" />
                        <p className="text-[#0078EB] text-2xl">{applicationForm.generalInformation.personalInformation.fullname.firstName + " " + applicationForm.generalInformation.personalInformation.fullname.lastName}</p>
                        <p>{applicationForm.generalInformation.firstChoice}</p>
                        <p className="text-[#6D6D6D]">Email</p>
                        <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.workingEmailAddress}</p>
                        <p className="text-[#6D6D6D]">Phone</p>
                        <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.mobileNumber}</p>
                        <p className="text-[#6D6D6D]">Landline Number</p>
                        <p className="text-[#6D6D6D] font-bold">{applicationForm.generalInformation.personalInformation.landlineNumber}</p>
                    </div>
                    <div className="flex flex-col h-full w-full p-2 gap-5">
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
                    </div>
                </div>
            </div>
        </form>
    )
}