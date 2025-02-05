import { AppShell, Group } from "@mantine/core";
import { ProfileDropdown } from "@src/components/ProfileDropdown";
import { GlobalStore } from '@src/utils/GlobalStore';
interface HeaderProps {
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobile, toggleDesktop }) => {
  const { isMobile } = GlobalStore()
  return (
    <AppShell.Header>
      <div className="flex justify-between w-full">

        <Group h="100%" className="sm:pl-6 pl-4 font-semibold text-2xl cursor-pointer">
          {isMobile ? (<p onClick={toggleMobile} >  <img
            src="logo.png "
            className="w-28 2xl:w-40 cursor-pointer"
            alt="bg"
          /></p>) : (
            <p onClick={toggleDesktop} >  <img
              src="logo.png "
              className="w-28 2xl:w-40 cursor-pointer"
              alt="bg"
            /></p>
          )}
        </Group>
        <ProfileDropdown />
      </div>
    </AppShell.Header>
  );
}

export default Header;