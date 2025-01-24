/**
 * @version    HRDotNet(v.2.0.0)
 * @file       Header Layout
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { AppShell, Burger, Group, Flex, ActionIcon } from "@mantine/core";

//--- Components
import { Notifications } from "@shared/layout/base/components/Notifications";
import { Settings } from "@shared/layout/base/components/Settings";
import { Profile } from "@shared/layout/base/components/Profile";
import { IconArrowLeft } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

export default function Header({
  opened,
  toggle,
  visibleBack = false,
}: {
  opened: boolean;
  toggle: () => void;
  visibleBack?: boolean;
}) {
  return (
    <AppShell.Header>
      {visibleBack ? (
        <Flex justify="center" align="center" pl={20}>
          <NavLink to="/">
            <ActionIcon variant="outline" size="xl" aria-label="Settings">
              <IconArrowLeft
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </NavLink>
        </Flex>
      ) : null}
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Group>
      <Group h="100%" px="md" flex="">
        <Flex align="center" gap="md">
          <Notifications />
          <Settings />
          <Profile />
        </Flex>
      </Group>
    </AppShell.Header>
  );
}
