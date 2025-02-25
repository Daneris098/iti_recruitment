import { AppShell, useMatches } from "@mantine/core";
import Header from "./Header";
import Main from "./Main";
import { TailwindIndicator } from "@src/components/tailwind-indicator"

interface PublicLayoutProps {
  isFullscreen: boolean;
  isShowIconLogout: boolean;
}

function Layout({ isFullscreen, isShowIconLogout } : PublicLayoutProps) {

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
      <div className="h-screen">
        <Main />
        <TailwindIndicator />
      </div>
    </AppShell>
  );
}

export default Layout;
