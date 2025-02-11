import { AppShell, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import {  IconUsers, IconHome, IconCalendarWeek, IconFileDescription, IconArchive, IconTransfer, IconUserPlus, IconBriefcase, IconMessageCirclePlus, IconMessageCircleUser, IconUser } from '@tabler/icons-react';
import { Search, Files, FileUp, FileUser } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
    toggleMobile: () => void;
    toggleDesktop: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ toggleMobile, toggleDesktop }) => {
    const { isMobile } = GlobalStore()
    return (
        <AppShell.Navbar p="md" className="flex flex-col  gap-2">
            <p onClick={isMobile ? toggleMobile : toggleDesktop} >
                <img
                    src="logo.png "
                    className="w-28 2xl:w-40 cursor-pointer m-auto pb-4"
                    alt="bg"></img>
            </p>
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
                className="w-full"
            />
            <NavLink to="home" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconHome />HOME</div></NavLink>
            <NavLink to="calendar" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconCalendarWeek />CALENDAR</div></NavLink>
            <NavLink to="vacancies" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconUsers />VACANCIES</div></NavLink>
            <NavLink to="jobOffers" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><Files />JOB OFFERS</div></NavLink>
            <NavLink to="reports" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconFileDescription />REPORTS</div></NavLink>
            <p className="text-xs py-2">APPLICANTS</p>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconUser />ALL APPLICANTS</div></NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><FileUser />APPLIED</div></NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconMessageCircleUser />FOR INTERVIEW</div></NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconBriefcase />OFFERED</div></NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconUserPlus />HIRED</div></NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconTransfer />FOR TRANSFEREE</div></NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><FileUp />TRANSFERED</div></NavLink>
            <NavLink to="" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconArchive />ARCHIVED</div></NavLink>
        </AppShell.Navbar>
    );
}

export default Navbar;
