import { AppShell } from "@mantine/core";
import { IconLayoutDashboard, IconWallet, IconSettings } from '@tabler/icons-react';
import { NavLink } from "react-router-dom";

interface NavbarProps {
    toggleMobile: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ toggleMobile }) => {
    return (
        <AppShell.Navbar p="md" className="flex flex-col  gap-2">
            <NavLink to="dashboard" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className=" flex gap-4"><IconLayoutDashboard />Dashboard</div></NavLink>
            <NavLink to="expenses" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className="flex gap-4"><IconWallet /> Expenses</div></NavLink>
            <NavLink to="settings" className={({ isActive }) => (isActive ? "active" : "inactive")} onClick={() => toggleMobile()}><div className="flex gap-4"><IconSettings /> Settings</div></NavLink>
        </AppShell.Navbar>
    );
}

export default Navbar;
