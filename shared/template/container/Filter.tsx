import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, Flex, Group, Pill, Text } from "@mantine/core";

export default function Filter({ filterOpen }: { filterOpen: () => void }) {
  const pills = Array(2)
    .fill(0)
    .map((_, index) => (
      <Pill key={index} withRemoveButton>
        Item {index}
      </Pill>
    ));
  return (
    <Flex
      className="w-full rounded-md border-[1px] border-[#a8a8a8]"
      flex="row"
      justify="space-between"
      align="center"
    >
      <Flex className="h-full flex flex-row items-center justify-center">
        <Flex
          bg="#eeeeee"
          className="h-full items-center px-2 gap-2 rounded-l-md"
        >
          <ListFilter size={20} color="#6d6d6d" />
          <Text fw={500} c="#6d6d6d" visibleFrom="md">
            FILTERS APPLIED
          </Text>
        </Flex>
        <Group>
          <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
            <Text>Doc No:</Text>
            <Pill.Group>{pills}</Pill.Group>
            <Text size="xl" c="#eeeeee">
              |
            </Text>
          </Flex>
          <Flex direction="row" align="center" gap={7} mx={8} visibleFrom="md">
            <Text>Status:</Text>
            <Pill.Group>{pills}</Pill.Group>
            <Text size="xl" c="#eeeeee">
              |
            </Text>
          </Flex>
        </Group>
      </Flex>

      <Flex pr={10} py={8} gap={5}>
        <ActionIcon
          variant="transparent"
          color="gray"
          size="md"
          aria-label="Settings"
          onClick={filterOpen}
        >
          <IconCirclePlus
            style={{ width: "100%", height: "100%" }}
            stroke={1.5}
            color="#6d6d6d"
          />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          color="gray"
          size="md"
          aria-label="Settings"
        >
          <IconTrash
            style={{ width: "100%", height: "100%" }}
            stroke={1.5}
            color="#6d6d6d"
          />
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
