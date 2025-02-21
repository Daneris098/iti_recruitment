import { IconClock, IconChecklist } from "@tabler/icons-react";
import { Avatar, Container, Divider, Flex, Text } from "@mantine/core";
import items from "@shared/services/notification.json";

export const Actions = ({ filingStatus }: { filingStatus?: string }) => {
    return (
        <>
            <Divider size={1} color="#ebe5e5" />
            {(filingStatus
                ? items.notifications.filter(
                    (notification) => notification.filing_status === filingStatus
                )
                : items.notifications
            ).map((items, index) => (
                <>
                    <Container
                        key={index}
                        py={10}
                        className={`gap-10 w-full cursor-pointer select-none ${items.notif_status === 0 && "bg-blue-100"
                            }`}
                    >
                        <Flex align="start" justify="start" gap={10}>
                            <Avatar variant="filled" radius="md" color="#FFD8B6" size={30}>
                                <IconChecklist
                                    color="#ED8028"
                                    style={{ width: "100%", height: "100%" }}
                                    stroke={1}
                                />
                            </Avatar>
                            <Flex direction="column" align="flex-start" gap={5}>
                                <Flex direction="column">
                                    <Text fw={600}>{items.title}</Text>
                                    <Text fw={200}>{items.description}</Text>
                                    <Text fw={200}>{items.document_no}</Text>
                                </Flex>

                                <Flex
                                    direction="row"
                                    justify="space-between"
                                    align="end"
                                    className="w-full"
                                >
                                    <Flex direction="row" align="center" justify="start" gap={5}>
                                        <IconClock size={13} stroke={1} />
                                        <Text size="xs" c="dimmed">
                                            {items.date_posted}
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
        </>
    );
};
