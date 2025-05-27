import { useEffect, useState } from "react";
import headerImage from "@src/assets/intellismart-header.png";
import { JobOfferExcelTemplateData } from "@modules/HiringSettings/constants/jobOfferExcelTemplateData"
import Dropzone from "@modules/HiringSettings/components/Dropzone";
import SpreadsheetExportButton from "@modules/HiringSettings/components/excel/SpreadSheetExportButton";
import { NumberInput, Select } from "@mantine/core";
import axiosInstance from "@src/api";
import { panel } from "../../types";
import { HiringSettingsStore } from "../../store";

const OfferConfiguration = () => {
    const [data] = useState(JobOfferExcelTemplateData)
    const { activePanel } = HiringSettingsStore();

    const fetchData = async () => {
        await axiosInstance
            .get("/recruitment/hiring/other-settings")
            .then((response) => {
                console.log('response123: ', response)
                // const map = response.data.items.map((item: any) => {
                //     return {
                //         id: item.id,
                //         guid: item.guid,
                //         name: item.name,
                //         status: item.isActive ? 'ACTIVE' : 'INACTIVE',
                //         lastModified: item.dateModified
                //     }
                // });
                // setInterviewers(map)
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });
    };
    useEffect(() => {
        if (activePanel === panel.offerConfiguration) {
            fetchData()
        }
    }, [activePanel])

    return (
        <div className="flex flex-col gap-6 ">

            <div className="flex flex-col gap-8 border-[2px] border-blue-300 rounded-md px-4 sm:h-[90%] p-4 sm:p-8">
                <div className="flex flex-col gap-2">
                    <p className="text-[#559CDA] font-bold">Application Settings</p>
                    <p className="text-[#6D6D6D]">Customize your hiring process according to your preferences, including the option to allow applicants to reapply after not advancing to the final stage of the hiring pipeline.</p>
                </div>
                <div className="flex w-[70%] justify-between">
                    <Select
                        styles={{ label: { color: "#6D6D6D" }, input: { color: "#6D6D6D" }, options: { color: "#6D6D6D" } }}
                        radius={"md"}
                        label="Allow applicant to re-apply"
                        placeholder="Select Yes or No"
                        data={['Yes', 'No']}
                    />
                    <Select
                        styles={{ label: { color: "#6D6D6D" }, input: { color: "#6D6D6D" }, options: { color: "#6D6D6D" } }}
                        radius={"md"}
                        label="Allow Re-apply After"
                        placeholder=""
                        data={['6 months', '1 year']}
                    />
                </div>
            </div>


            <div className="flex flex-col gap-8 border-[2px] border-blue-300 rounded-md px-4 sm:h-[90%] p-4 sm:p-8">
                <div className="flex flex-col gap-2">
                    <p className="text-[#559CDA] font-bold">Offer Response Period</p>
                    <p className="text-[#6D6D6D]">Establish the maximum number of days for applicants to sign the job offers issued. Once this limit is reached, the job offer will be automatically marked as declined, and the applicant's status will be updated to Archived."</p>
                </div>
                <NumberInput
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
    );
};

export default OfferConfiguration;
