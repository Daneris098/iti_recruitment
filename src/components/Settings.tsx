import { Menu, ActionIcon, rem } from "@mantine/core";
import {
  IconSettings,
  IconUsers,
  IconPhoneCall,
  IconAddressBook,
} from "@tabler/icons-react";
import "@shared/layout/base/styles/navbar.css";
import { useNavigate } from "react-router-dom";
export const Settings = () => {
  const navigate = useNavigate();
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
          className="poppins"
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
          className="poppins"
          color="#6d6d6d"
          fw={500}
          leftSection={
            <IconPhoneCall style={{ width: rem(20), height: rem(20) }} />
          }
        >
          <p className="ml-4" >Hiring Settings</p>
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          color="#6d6d6d"
          leftSection={
            <IconAddressBook style={{ width: rem(20), height: rem(20) }} />
          }
        >
          <p className="ml-4" >Administrator Settings</p>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
