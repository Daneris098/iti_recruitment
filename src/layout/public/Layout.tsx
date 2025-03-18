import { AppShell, useMatches } from "@mantine/core";
import Header from "./Header";
import Main from "./Main";

interface PublicLayoutProps {
  isFullscreen: boolean;
  isShowIconLogout: boolean;
  isScreenAuto?: boolean;
}

function Layout({ isFullscreen, isShowIconLogout, isScreenAuto = false }: PublicLayoutProps) {

  const HeaderHeightSize = useMatches({
    base: "50",
    xl: "60"
  });

  const appShellProps = !isFullscreen
    ? { header: { height: HeaderHeightSize } }
    : {};

  return (
    <AppShell {...appShellProps}>
      {!isFullscreen && <Header isShowIconLogout={isShowIconLogout} />}
      <div className={`${isScreenAuto ? 'h-auto' : 'h-screen'}`}>
        <Main />
      </div>
    </AppShell>
  );
}

export default Layout;
