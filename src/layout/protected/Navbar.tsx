import { AppShell, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconLayoutDashboard, IconUsers } from '@tabler/icons-react';
import { Search } from "lucide-react";
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
                leftSection={<Search color="#559CDA" />}
                placeholder=""
                styles={{
                    input: {
                        borderColor: "#559CDA",
                        borderWidth: 2,
                        borderRadius: 10,
                        color: "#559CDA",
                    },
                }}
                className="w-full"
            />
            <NavLink to="dashboard" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconLayoutDashboard />Dashboard</div></NavLink>
            <NavLink to="vacancies" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconUsers />Vacancies</div></NavLink>
        </AppShell.Navbar>
    );
}

export default Navbar;
