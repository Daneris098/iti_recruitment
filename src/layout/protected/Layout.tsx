import { AppShell } from "@mantine/core";
import Header from "./Header";
import Main from "./Main";
import Navbar from "./Navbar";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { GlobalStore } from "@src/utils/GlobalStore";

function Layout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { setIsMobile, setIsDrawerOpened } = GlobalStore();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobile(isMobile);
    };

    handleResize(); // Set the initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]); // Make sure `setIsMobile` is stable

  useEffect(() => {
    setIsDrawerOpened(desktopOpened);
  }, [desktopOpened]);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: desktopOpened ? 250 : 70,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md">
      <div className="h-screen">
        <Header desktopOpened toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} />
        <Navbar toggleMobile={toggleMobile} toggleDesktop={toggleDesktop} desktopOpened={desktopOpened} />
        <Main />
      </div>
    </AppShell>
  );
}

export default Layout;
