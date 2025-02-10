/**
 * @version    HRDotNet(v.2.0.0)
 * @file       Notification Layout Component
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { ActionIcon, Flex, Popover, Tabs, Text } from "@mantine/core";
//--- Tabler Icons
import { BellDot } from "lucide-react";
import "@shared/layout/base/styles/navbar.css";
import MessageGradient from "@shared/assets/icons/MessageGradient";
import { List } from "@components/notifications/List"
import { NotificationStore } from "@components/notifications/store"

export const Notifications = () => {

  const { setFilter } = NotificationStore()

  return (
    <Popover
      position="bottom-end"
      offset={{ mainAxis: 7 }}
      width={450}
      radius={10}
    >
      <Popover.Target>
        <ActionIcon variant="transparent" size="md" aria-label="Settings">
          <BellDot
            style={{ width: "100%", height: "100%" }}
            // stroke={1.5}
            color="gray"
          />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown px={0}>
        <Flex justify="space-between" px={15}>
          <Text className="custom-gradient bg-clip-text text-transparent font-semibold text-xl pb-3 ">
            Notifications
          </Text>
          <MessageGradient size={22} tooltip="Mark All as Read" />
        </Flex>
        <Tabs color="orange" variant="pills"  radius="xs" defaultValue="all">
          <Tabs.List grow justify="center" px={10} pb={10}>
            <Tabs.Tab value="all" onClick={() => { setFilter('all') }}>All</Tabs.Tab>
            <Tabs.Tab value="application" onClick={() => { setFilter('application') }}>Application</Tabs.Tab>
            <Tabs.Tab value="events" onClick={() => { setFilter('events') }}>Events</Tabs.Tab>
            <Tabs.Tab value="actions" onClick={() => { setFilter('actions') }}>Actions</Tabs.Tab>
          </Tabs.List>

          <List />
        </Tabs>
      </Popover.Dropdown>
    </Popover>
  );
};
