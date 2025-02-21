import { Menu, ActionIcon, rem } from "@mantine/core";
import {
  IconSettings,
  IconUsers,
  IconPhoneCall,
  IconAddressBook,
} from "@tabler/icons-react";
import "@shared/layout/base/styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Settings = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Current Route:", location.pathname);
  }, [location.pathname]); // Runs every time the route changes
  return (
    <Menu
      shadow="md"
      width={280}
      position="bottom-end"
      radius={10}
      transitionProps={{ transition: "fade-down", duration: 100 }}

    >
      <Menu.Target>
        <ActionIcon variant="transparent" size="lg" aria-label="Settings">
          <IconSettings
            style={{ width: "100%", height: "100%" }}
            stroke={1}
            color="gray"
          />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className="p-2">
        <Menu.Label className=" text-xl custom-gradient bg-clip-text text-transparent w-[38%] m-auto">
          Settings
        </Menu.Label>
        <p className="text-xs text-gray-600 poppins text-center pb-2">Configure your settings here.</p>

        <Menu.Item
          className={` poppins ${location.pathname == '/organizationSettings' ? 'text-white br-gradient' : 'text-gray-500'}`}
          color="#6d6d6d"
          fw={500}
          leftSection={
            <IconUsers
              visibility=""
              style={{ width: rem(20), height: rem(20) }}
            />
          }
          onClick={() => { navigate("/organizationSettings"); }}
        >
          <p className="ml-4">Organization Settings</p>
        </Menu.Item>

        <Menu.Item
          className={` poppins ${location.pathname == '/hiringSettings' ? 'text-white br-gradient' : 'text-gray-500'}`}
          color="#6d6d6d"
          fw={500}
          leftSection={
            <IconPhoneCall style={{ width: rem(20), height: rem(20) }} />
          }
          onClick={() => { navigate("/hiringSettings"); }}
        >
          <p className="ml-4" >Hiring Settings</p>
        </Menu.Item>
        <Menu.Item
          fw={500}
          className={` poppins ${location.pathname == '/administratorSettings' ? 'text-white br-gradient' : 'text-gray-500'}`}
          color="#6d6d6d"
          leftSection={
            <IconAddressBook style={{ width: rem(20), height: rem(20) }} />
          }
          onClick={() => { navigate("/administratorSettings"); }}
        >
          <p className="ml-4" >Administrator Settings</p>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
