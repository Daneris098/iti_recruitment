/**
 * @version    HRDotNet(v.2.0.0)
 * @file       Root Layout
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

//---  Layouts
import Header from "@shared/layout/base/Header";
import Navbar from "@shared/layout/base/Navbar";
import Main from "@shared/layout/base/Main";

import { useLogoWidth } from "@shared/hooks/useWidth";

export default function Root() {
  const [opened, { toggle }] = useDisclosure();
  const { isLogowordVisible } = useLogoWidth();
  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{
        width: isLogowordVisible ? 250 : 70,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Header toggle={toggle} opened={opened} />
      <Navbar toggle={toggle} />
      <Main />
    </AppShell>
  );
}
