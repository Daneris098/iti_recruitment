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
import { GlobalStore, user_details_value } from "@src/utils/GlobalStore";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user_details, is_mobile, set_user_details } = GlobalStore()
  return (
    <Menu
      shadow="md"
      width={250}
      position="bottom-end"
      radius={10}
      transitionProps={{ transition: "fade-down", duration: 100 }}
    >

      <div className="flex text-center items-center">

        {!is_mobile && !!user_details.name && (user_details.name.split(' ')[0])}
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
          <p className="font-semibold text-xl">
            {user_details.name}
          </p>
        </Flex>
        <Menu.Item
          className="poppins"
          color="#6d6d6d"
          fw={500}
          leftSection={
            <IconUserCircle
              visibility="sm"
              style={{ width: rem(20), height: rem(20) }}
            />
          }
        >
          Profile
        </Menu.Item>

        <Menu.Item
          fw={500}
          className="poppins"
          color="#6d6d6d"
          leftSection={
            <IconShieldLock style={{ width: rem(20), height: rem(20) }} />
          }
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
            set_user_details(user_details_value)
            navigate("/login");
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
