//--- Mantine Modules
import { Menu, Avatar, rem, Flex } from "@mantine/core";
//--- Tabler Icons
import {
  IconUserCircle,
  IconShieldLock,
  IconLogout,
} from '@tabler/icons-react';
import avatar from "@assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { GlobalStore, userDetailsValue } from "@src/utils/GlobalStore";
import { ProfileSettingsStore } from "@modules/ProfileSettings/store"

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { setActivePanel, activePanel } = ProfileSettingsStore()
  const { userDetails, isMobile, setUserDetails } = GlobalStore()
  return (
    <Menu
      shadow="md"
      width={250}
      position="bottom-end"
      radius={10}
      transitionProps={{ transition: "fade-down", duration: 100 }}
    >

      <div className="flex text-center items-center">

        {!isMobile && !!userDetails.Name && (userDetails.Name.split(' ')[0])}
        <Menu.Target>
          <Avatar
            src={avatar}
            alt="it's me"
            className="cursor-pointer"
            size="lg"
          />
        </Menu.Target>
      </div>

      <Menu.Dropdown className="pt-1 pb-2 px-2">
        <Flex
          mih={50}
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <p className="border-none br-gradient bg-clip-text text-transparent  font-semibold text-xl">
            Welcome, Raisah!
          </p>
          <p className="text-xs text-gray-600 poppins">Customize your account here</p>
        </Flex>
        <Menu.Item
          className={` poppins ${location.pathname == '/profileSettings' && activePanel === 'profileDetails' ? 'text-white br-gradient' : 'text-gray-500'}`}
          color="#6d6d6d"
          fw={500}
          leftSection={
            <IconUserCircle
              visibility="sm"
              style={{ width: rem(20), height: rem(20) }}
            />
          }
          onClick={() => { navigate("/profileSettings"); setActivePanel('profileDetails'); }}
        >
          Profile
        </Menu.Item>

        <Menu.Item
          fw={500}
          className={` poppins ${location.pathname == '/profileSettings' && activePanel === 'changePassword' ? 'text-white br-gradient' : 'text-gray-500'}`}
          color="#6d6d6d"
          leftSection={
            <IconShieldLock style={{ width: rem(20), height: rem(20) }} />
          }
          onClick={() => { navigate("/profileSettings"); setActivePanel('changePassword'); }}
        >
          Change Password
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          color="#6d6d6d"
          leftSection={
            <IconLogout style={{ width: rem(20), height: rem(20) }} />
          }
          onClick={() => {
            sessionStorage.setItem("accessTokenFlash", '');
            document.cookie = "refreshTokenFlash=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=Strict";
            setUserDetails(userDetailsValue)
            navigate("/login");
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
