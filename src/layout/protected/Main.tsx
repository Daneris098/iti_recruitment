import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <AppShell.Main className="protected"
    >
      <Outlet />
    </AppShell.Main>
  );
}
