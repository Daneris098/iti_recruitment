import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
// import headerImage from "@src/assets/intellismart-header.png";
// import { JobOfferExcelTemplateData } from "@modules/HiringSettings/constants/jobOfferExcelTemplateData"
// import Dropzone from "@modules/HiringSettings/components/Dropzone";
// import SpreadsheetExportButton from "@modules/HiringSettings/components/excel/SpreadSheetExportButton";
import { NumberInput, Select } from "@mantine/core";
import axiosInstance from "@src/api";
import { AlertType, panel } from "../../types";
import { HiringSettingsStore } from "../../store";
import { useForm } from "@mantine/form";

const OfferConfiguration = forwardRef((_, ref) => {
    // const [data] = useState(JobOfferExcelTemplateData)
    const { activePanel, setAlert } = HiringSettingsStore();
    const formRef = useRef<HTMLFormElement>(null);
    const [otherSettingsId, setOtherSettingsId] = useState({ id: '', guid: '' });
    const fetchData = async () => {
        await axiosInstance
            .get("/recruitment/hiring/other-settings")
            .then((response: any) => {
                form.setFieldValue('allowReApply', response.data.allowReApply ? 'Yes' : 'No');
                form.setFieldValue('offerResponsePeriodInDays', response.data.offerResponsePeriodInDays);
                form.setFieldValue('reApplyInMonths', response.data.reApplyInMonths);
                setOtherSettingsId({ id: response.data.id, guid: response.data.guid })
            })
            .catch((error) => {
                console.error(error)
            });
    };

    useEffect(() => {
        if (activePanel === panel.offerConfiguration) {
            fetchData()
        }
    }, [activePanel])

    const form = useForm({
        mode: 'controlled',
        initialValues: { reApplyInMonths: 1, allowReApply: 'Yes', offerResponsePeriodInDays: 3 },
        validate: {
            allowReApply: (value: string) => value === null || value === '' ? "AllowReApply is required" : null,
            // reApplyInMonths: (value: number) => value <= 0? "ReApplyInMonths is required" : null,
            // offerResponsePeriodInDays: (value: number) => value.toString().length > 0 ? "ReApplyInMonths is required" : null,
        }
    });

    const onSubmit = async (form: any = { reApplyInMonths: 1, allowReApply: true, offerResponsePeriodInDays: 3 }) => {
        const formData = new FormData();
        formData.append('OfferResponsePeriodInDays', form.offerResponsePeriodInDays);
        formData.append('AllowReApply', form.allowReApply === 'Yes' ? 'true' : 'false');
        formData.append('ReApplyInMonths', form.reApplyInMonths);
        try {
            if (otherSettingsId.id != '') {
                formData.append('id', otherSettingsId.id)
                formData.append('Guid', otherSettingsId.guid)
                await axiosInstance.post(
                    `/recruitment/hiring/other-settings/${otherSettingsId.id}/update`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            } else {
                await axiosInstance.post(
                    "/recruitment/hiring/other-settings",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            }
            setAlert(AlertType.saved)
        } catch (error: any) {
            const message = error?.response?.data?.errors?.[0]?.message ?? 'An unexpected error occurred';
            form.setErrors({ username: ' ', password: message });
        }
    };

    useImperativeHandle(ref, () => ({
        saveAll: () => {
            formRef.current?.requestSubmit()
        },
        cancelAll: () => {
        },

    }));

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>

            <div className="flex flex-col gap-6 ">

                <div className="flex flex-col gap-8 border-[2px] border-blue-300 rounded-md px-4 sm:h-[90%] p-4 sm:p-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#559CDA] font-bold">Application Settings</p>
                        <p className="text-[#6D6D6D]">Customize your hiring process according to your preferences, including the option to allow applicants to reapply after not advancing to the final stage of the hiring pipeline.</p>
                    </div>

                    <div className="flex w-[70%] justify-between">
                        <Select
                            key={form.key('allowReApply')}
                            {...form.getInputProps("allowReApply")}
                            styles={{ label: { color: "#6D6D6D" }, input: { color: "#6D6D6D" }, options: { color: "#6D6D6D" } }}
                            radius={"md"}
                            label="Allow applicant to re-apply"
                            placeholder="Select Yes or No"
                            data={['Yes', 'No']}
                        />
                        <NumberInput
                            styles={{ label: { color: "#6D6D6D" }, input: { color: "#6D6D6D" } }}
                            suffix={form.getValues().reApplyInMonths > 1 ? " Months" : " Month"}
                            hideControls
                            min={1}
                            key={form.key('reApplyInMonths')}
                            {...form.getInputProps("reApplyInMonths")}
                            label="Allow Re-apply After"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-8 border-[2px] border-blue-300 rounded-md px-4 sm:h-[90%] p-4 sm:p-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-[#559CDA] font-bold">Offer Response Period</p>
                        <p className="text-[#6D6D6D]">Establish the maximum number of days for applicants to sign the job offers issued. Once this limit is reached, the job offer will be automatically marked as declined, and the applicant's status will be updated to Archived."</p>
                    </div>
                    <NumberInput
                        key={form.key('offerResponsePeriodInDays')}
                        {...form.getInputProps("offerResponsePeriodInDays")}
                        className="w-36 text-[#6D6D6D]"
                        radius={"md"}
                        label="Number of Days *"
                        placeholder=""
                        min={1}
                        defaultValue={1}
                        suffix=" Days"
                    />
                </div>

                {/* <div className="flex flex-col gap-8 border-[2px] border-blue-300 rounded-md px-4 sm:h-[90%] p-4 sm:p-8">
                        <p className="text-[#559CDA] font-bold">Job Offer Template</p>
                        <SpreadsheetExportButton
                            data={data}
                            image={headerImage}
                            fileName="job-offer-template.xlsx"
                        />
                        <Dropzone />
                </div> */}

            </div>
        </form>
    );
});

export default OfferConfiguration;
