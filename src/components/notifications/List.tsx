import { IconChecklist, IconClock, IconPhoneCall, IconUserPlus } from "@tabler/icons-react";
import { Avatar, Container, Divider, Flex, LoadingOverlay, Text } from "@mantine/core";
import items from "@components/notifications/value.json";
import { useEffect } from "react";
import { NotificationStore } from "./store";
import { Notification } from "@components/notifications/types";

export const List = () => {
  const { filter, notifications, setNotifications } = NotificationStore();

  useEffect(() => {
    let filteredNotifications = items;

    if (filter !== "all") {
      filteredNotifications = items.filter((item) => item.filing_status === filter);
    }
    setNotifications(filteredNotifications);
  }, [filter, items]);

  return (
    <div className="opacity-40">
      <LoadingOverlay
        visible={true}
        loaderProps={{
          children: (
            <Text className="poppins" fz={20} fw={500}>
              Coming Soon....
            </Text>
          ),
        }}
      />
      <Divider size={1} color="#ebe5e5" />
      {notifications.map((item: Notification, index: number) => (
        <>
          <Container key={index} py={10} className={`gap-10 w-full cursor-pointer select-none ${item.notif_status === 0 && "bg-blue-100"}`}>
            <Flex align="start" justify="start" gap={10}>
              <Avatar variant="filled" radius="md" color="rgb(219, 234, 254)" size={30}>
                {item.filing_status === "application" && <IconUserPlus color="#559CDA" style={{ width: "100%", height: "100%" }} stroke={1} />}
                {item.filing_status === "events" && <IconPhoneCall color="#ED8028" style={{ width: "100%", height: "100%", background: "#FFD8B6" }} stroke={1} />}
                {item.filing_status === "actions" && (
                  <IconChecklist
                    color={`${item.title === "Job Offer Accepted" ? "#5A9D27" : "#FF554A"} `}
                    style={{ width: "100%", height: "100%", background: `${item.title === "Job Offer Accepted" ? "#D7FFB9" : "#FFCBC7"} ` }}
                    stroke={1}
                  />
                )}
              </Avatar>
              <Flex direction="column" align="flex-start" gap={5}>
                <Flex direction="column">
                  <Text fw={600}>{item.title}</Text>
                </Flex>

                <Flex direction="row" justify="space-between" align="end" className="w-full">
                  <Flex direction="row" align="center" justify="start" gap={5}>
                    <IconClock size={13} stroke={1} />
                    <Text size="xs" c="dimmed">
                      {item.date_posted}
                    </Text>
                  </Flex>
                  <Text size="xs" c="gray">
                    Click to view details.
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Container>
          <Divider size={1} color="#ebe5e5" />
        </>
      ))}
    </div>
  );
};
