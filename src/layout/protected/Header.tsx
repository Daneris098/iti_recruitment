import { AppShell, Group } from "@mantine/core";
import { Notifications } from "@src/components/Notifications";
import { ProfileDropdown } from "@src/components/ProfileDropdown";
import { Settings } from "@src/components/Settings";
import { GlobalStore } from '@src/utils/GlobalStore';
import { useEffect } from "react";
interface HeaderProps {
  toggleMobile: () => void;
  toggleDesktop: () => void;
  desktopOpened: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleMobile, toggleDesktop }) => {
  const { isMobile, isDrawerOpened } = GlobalStore()

  return (
    <AppShell.Header>
      <div className="flex justify-between w-full">

        <Group h="100%" className="sm:pl-6 pl-4 font-semibold text-2xl cursor-pointer">
          {isMobile ? (<p onClick={toggleMobile} >
            <img
              src="logo.png "
              className="w-28 2xl:w-40 cursor-pointer"
              alt="bg"
            />
          </p>) : (!isDrawerOpened && isMobile) ? (
            <p onClick={toggleDesktop} >
              <img
                src="logo.png "
                className="w-28 2xl:w-40 cursor-pointer"
                alt="bg"
              />
            </p>
          ) : (<></>)}
        </Group>
        <div className="flex items-center gap-3">
          <Notifications />
          <Settings />
          <ProfileDropdown />
        </div>
      </div>
    </AppShell.Header>
  );
}

export default Header;