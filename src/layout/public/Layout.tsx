import { AppShell, useMatches } from "@mantine/core";
import Header from "./Header";
import Main from "./Main";
import { GlobalStore } from "@src/utils/GlobalStore";
import { TailwindIndicator } from "@src/components/tailwind-indicator"

function Layout() {
  const { isFullscreen } = GlobalStore();

  const HeaderHeightSize = useMatches({
    base: "50",
    xl: "60"
  });

  const appShellProps = !isFullscreen
    ? { header: { height: HeaderHeightSize } }
    : {};

  return (
    <AppShell {...appShellProps}>
      {!isFullscreen && <Header />}
      <div className="h-screen">
        <Main />
        <TailwindIndicator />
      </div>
    </AppShell>
  );
}

export default Layout;
