import { AppShell } from "@mantine/core";
import Header from "./Header";
import Main from "./Main";
import { GlobalStore } from "@src/utils/GlobalStore";
import { TailwindIndicator } from "@src/components/tailwind-indicator"

function Layout() {
  const { is_fullscreen } = GlobalStore();

  // Conditionally set the AppShell properties
  const appShellProps = !is_fullscreen
    ? { header: { height: 50 } }
    : {};

  return (
    <AppShell {...appShellProps}>
      {!is_fullscreen && <Header />}
      <div className="h-screen-100">
        <Main />
        <TailwindIndicator />
      </div>
    </AppShell>
  );
}

export default Layout;
