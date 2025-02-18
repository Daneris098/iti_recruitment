import { Button, Tabs } from "@mantine/core";
import { HiringSettingsStore } from "@modules/HiringSettings/store"
import Modals from "@src/modules/HiringSettings/components/modal"
import { panel, AlertType, description } from "@modules/HiringSettings/types/index"
import CustomFeedback from "@modules/HiringSettings/components/panel/CustomFeedback"
import OfferResponsePeriod from "@modules/HiringSettings/components/panel/OfferResponsePeriod"
import ApplicationSettings from "@modules/HiringSettings/components/panel/ApplicationSettings"
import InterviewStages from "@modules/HiringSettings/components/panel/InterviewStages"
import Interviewers from "@modules/HiringSettings/components/panel/Interviewers"
import JobOfferTemplate from "@modules/HiringSettings/components/panel/JobOfferTemplate"
import bg2 from '@assets/bg2.png';
import { useEffect, useRef } from "react";

export default function index() {
    const { setAlert, setActivePanel, activePanel } = HiringSettingsStore()
    const dataTableRef = useRef<{ saveAll: () => void, cancelAll: () => void } | null>(null);
        
    useEffect(() => {
        setActivePanel(panel.customFeedback)
    }, [])

    return (
        <div className="bg-white h-full">
            <Modals dataTableRef={dataTableRef} />
            <div style={{ backgroundImage: `url(${bg2})` }} className="bg-cover bg-center h-[15%]  rounded-t-md flex flex-col items-center">
                <div className=" flex items-center justify-between w-[90%] m-auto">
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-3xl text-white font-bold">Hiring Settings</p>
                        <p className="text-xs sm:text-xl text-white ">Customize Organization Settings</p>
                    </div>
                    <div className="flex gap-3 sm:w-[15%]">
                        <Button className="rounded-md w-[52%]" onClick={() => { setAlert(AlertType.cancel) }} color="white" variant="outline">Cancel</Button>
                        <Button className="rounded-md w-[48%]" onClick={() => { setAlert(AlertType.saved); dataTableRef.current?.saveAll(); }}>Save</Button>
                    </div>
                </div>
            </div>
            <Tabs defaultValue={panel.customFeedback} variant="default" className="h-[85%]  p-2" onChange={(val) => { setActivePanel(`${val}`) }}>
                <Tabs.List className="px-4 h-[15%] sm:h-auto  overflow-auto">
                    <Tabs.Tab value={panel.customFeedback}
                        className={` ${activePanel === panel.customFeedback ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        {description.customFeedback}
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.offerResponsePeriod}
                        className={` ${activePanel === panel.offerResponsePeriod ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        {description.offerResponsePeriod}
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.applicationSettings}
                        className={` ${activePanel === panel.applicationSettings ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        {description.applicationSettings}
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.interviewStages}
                        className={` ${activePanel === panel.interviewStages ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        {description.interviewStages}
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.interviewers}
                        className={` ${activePanel === panel.interviewers ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        {description.interviewers}
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.jobOfferTemplate}
                        className={` ${activePanel === panel.jobOfferTemplate ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        {description.jobOfferTemplate}
                    </Tabs.Tab>
                </Tabs.List>

                <div className="border-[2px] border-blue-300  rounded-md  px-4 sm:m-4 h-[85%] sm:h-[90%] p-4 sm:p-8">
                    <Tabs.Panel value={panel.customFeedback} className="h-full"><CustomFeedback ref={dataTableRef} /></Tabs.Panel>
                    <Tabs.Panel value={panel.offerResponsePeriod} className="h-full"><OfferResponsePeriod /></Tabs.Panel>
                    <Tabs.Panel value={panel.applicationSettings} className="h-full"><ApplicationSettings /></Tabs.Panel>
                    <Tabs.Panel value={panel.interviewStages} className="h-full"><InterviewStages ref={dataTableRef} /></Tabs.Panel>
                    <Tabs.Panel value={panel.interviewers} className="h-full"><Interviewers ref={dataTableRef} /></Tabs.Panel>
                    <Tabs.Panel value={panel.jobOfferTemplate} className="h-full"><JobOfferTemplate /></Tabs.Panel>
                </div>
            </Tabs>
        </div>
    );
};

