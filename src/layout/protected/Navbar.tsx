import { AppShell, Divider, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconUsers, IconHome, IconCalendarWeek, IconFileDescription, IconArchive, IconTransfer, IconUserPlus, IconBriefcase, IconMessageCircleUser, IconUser } from '@tabler/icons-react';
import { Search, Files, FileUp, FileUser } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@src/lib/utils";
import { useEffect, useState } from "react";
interface NavbarProps {
    toggleMobile: () => void;
    toggleDesktop: () => void;
    desktopOpened: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ toggleMobile, toggleDesktop, desktopOpened }) => {
    const { isMobile } = GlobalStore()
    const [isCollapsed, setIsCollapsed] = useState(!desktopOpened && !isMobile)

    useEffect(() => {
        setIsCollapsed(!desktopOpened && !isMobile)
    }, [desktopOpened, isMobile])
    return (


        < AppShell.Navbar p="md" className="flex flex-col  gap-2" >
            <p onClick={isMobile ? toggleMobile : toggleDesktop} >

                {desktopOpened || isMobile ? (
                    <img
                        src="logo.png "
                        className="w-28 2xl:w-40 cursor-pointer m-auto pb-4"
                        alt="bg"></img>
                ) : (
                    <img
                        src="logo2.png "
                        className="w-28 2xl:w-40 cursor-pointer m-auto pb-4"
                        alt="bg"></img>
                )}
            </p>
            {
                isCollapsed ? (<Search color="#6D6D6D" className="self-center m-2" />) : (
                    <TextInput
                        leftSection={<Search color="#6D6D6D" />}
                        placeholder=""
                        styles={{
                            input: {
                                borderColor: "#6D6D6D",
                                borderWidth: 2,
                                borderRadius: 10,
                                color: "#559CDA",
                            },
                        }}
                        className={cn("w-full")}
                    />)
            }
            <NavLink to="home" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconHome />{isCollapsed ? '' : 'HOME'}</div></NavLink>
            <NavLink to="calendar" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconCalendarWeek />{isCollapsed ? '' : 'CALENDAR'}</div></NavLink>
            <NavLink to="vacancies" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconUsers />{isCollapsed ? '' : 'VACANCIES'}</div></NavLink>
            <NavLink to="jobOffers" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><Files />{isCollapsed ? '' : 'JOB OFFERS'}</div></NavLink>
            <NavLink to="reports" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconFileDescription />{isCollapsed ? '' : 'REPORTS'}</div></NavLink>
            {!isCollapsed ? (<p className="text-xs py-2">APPLICANTS</p>) : (<Divider my="md" />)}
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconUser />{isCollapsed ? '' : 'ALL APPLICANTS'}</div></NavLink>
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><FileUser />{isCollapsed ? '' : 'APPLIED'}</div></NavLink>
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconMessageCircleUser />{isCollapsed ? '' : 'FOR INTERVIEW'}</div></NavLink>
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconBriefcase />{isCollapsed ? '' : 'FOR OFFERED'}</div></NavLink>
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconUserPlus />{isCollapsed ? '' : 'HIRED'}</div></NavLink>
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconTransfer />{isCollapsed ? '' : 'FOR TRANSFEREE'}</div></NavLink>
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><FileUp />{isCollapsed ? '' : 'TRANSFERED'}</div></NavLink>
            <NavLink to="" className={({ isActive }) => isActive ? isCollapsed ? "active2" : "active" : isCollapsed ? "inactive2" : "inactive"} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconArchive />{isCollapsed ? '' : 'ARCHIVED'}</div></NavLink>
        </AppShell.Navbar >
    );
}

export default Navbar;
