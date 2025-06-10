import { AppShell, Divider, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import {
    IconUser,
    IconUsers, IconHome,
    IconArchive, IconUserPlus,
    IconBriefcase, IconMessageCircleUser,
    IconCalendarWeek, IconFileDescription,
    // IconTransfer,
} from '@tabler/icons-react';
import {
    FileUser,
    Search, Files,
    // FileUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@src/lib/utils";
import { useEffect, useState } from "react";

interface NavbarProps {
  toggleMobile: () => void;
  toggleDesktop: () => void;
  desktopOpened: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMobile, toggleDesktop, desktopOpened }) => {
  const { isMobile } = GlobalStore();
  const [isCollapsed, setIsCollapsed] = useState(!desktopOpened && !isMobile);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsCollapsed(!desktopOpened && !isMobile);
  }, [desktopOpened, isMobile]);

  const navLinks = [
    { to: "home", icon: <IconHome />, label: "HOME" },
    { to: "calendar", icon: <IconCalendarWeek />, label: "CALENDAR" },
    { to: "vacancies", icon: <IconUsers />, label: "VACANCIES" },
    { to: "jobOffers", icon: <Files />, label: "JOB OFFERS" },
    { to: "reports", icon: <IconFileDescription />, label: "REPORTS" },
  ];

    const applicantsNavLinks = [
        { to: "applicants", icon: <IconUser />, label: "ALL APPLICANTS" },
        { to: "applied", icon: <FileUser />, label: "APPLIED" },
        { to: "interview", icon: <IconMessageCircleUser />, label: "FOR INTERVIEW" },
        { to: "offered", icon: <IconBriefcase />, label: "OFFERED" },
        { to: "hired", icon: <IconUserPlus />, label: "HIRED" },
        // { to: "transferee", icon: <IconTransfer />, label: "FOR TRANSFER" },
        // { to: "transferred", icon: <FileUp />, label: "TRANSFERRED" },
        { to: "archive", icon: <IconArchive />, label: "ARCHIVED" },
    ];

  // Filter the navLinks and applicantsNavLinks based on the search term
  const filteredNavLinks = navLinks.filter((link) => link.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredApplicantsNavLinks = applicantsNavLinks.filter((link) => link.label.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AppShell.Navbar p="md" className="flex flex-col gap-2">
      <p onClick={isMobile ? toggleMobile : toggleDesktop}>
        {desktopOpened || isMobile ? (
          <img src="logoword.png" className="w-auto h-auto 2xl:w-40 cursor-pointer m-auto pb-4" alt="bg" />
        ) : (
          <img src="logoicon.png" className="w-28 2xl:w-40 cursor-pointer m-auto pb-4" alt="bg" />
        )}
      </p>
      {isCollapsed ? (
        <Search color="#6D6D6D" className="self-center m-2" />
      ) : (
        <TextInput
          leftSection={<Search color="#6D6D6D" />}
          placeholder="Search..."
          size="md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          styles={{
            input: {
              borderColor: "#6D6D6D",
              borderWidth: 2,
              borderRadius: 10,
              color: "#559CDA",
            },
            label: {
              color: "green",
            },
          }}
          className={cn("w-full")}
        />
      )}
      {filteredNavLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={({ isActive }) => (isActive ? (isCollapsed ? "active2" : "active") : isCollapsed ? "inactive2" : "inactive")}
          onClick={() => toggleMobile()}>
          <div className="flex gap-4">
            {link.icon}
            {isCollapsed ? "" : link.label}
          </div>
        </NavLink>
      ))}
      {!isCollapsed ? <p className="text-xs py-2">APPLICANTS</p> : <Divider my="md" />}
      {filteredApplicantsNavLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={({ isActive }) => (isActive ? (isCollapsed ? "active2" : "active") : isCollapsed ? "inactive2" : "inactive")}
          onClick={() => toggleMobile()}>
          <div className="flex gap-4">
            {link.icon}
            {isCollapsed ? "" : link.label}
          </div>
        </NavLink>
      ))}
    </AppShell.Navbar>
  );
};

export default Navbar;
