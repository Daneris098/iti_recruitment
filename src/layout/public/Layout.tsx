import { AppShell, useMatches } from "@mantine/core";
import Header from "./Header";
import Main from "./Main";
import { GlobalStore } from "@src/utils/GlobalStore";
import { TailwindIndicator } from "@src/components/tailwind-indicator"

function Layout() {
  const { is_fullscreen } = GlobalStore();

  const HeaderHeightSize = useMatches({
    base: "50",
    xl: "60"
  });

  const appShellProps = !is_fullscreen
    ? { header: { height: HeaderHeightSize } }
    : {};

  return (
    <AppShell {...appShellProps}>
      {!is_fullscreen && <Header />}
      <div className="h-screen">
        <Main />
        <TailwindIndicator />
      </div>
    </AppShell>
  );
}

export default Layout;
