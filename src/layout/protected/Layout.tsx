import { AppShell } from '@mantine/core';
import Header from './Header';
import Main from "./Main";
import Navbar from './Navbar';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { GlobalStore } from '@src/utils/GlobalStore';

function Layout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { set_is_mobile } = GlobalStore()

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      set_is_mobile(isMobile);
    };
  
    handleResize(); // Set the initial value
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [set_is_mobile]); // Make sure `set_is_mobile` is stable
  

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <div className='h-screen-100'>
        <Header
          toggleMobile={toggleMobile}
          toggleDesktop={toggleDesktop}
        />
        <Navbar toggleMobile={toggleMobile} />
        <Main />
      </div>
    </AppShell>
  );
}

export default Layout;