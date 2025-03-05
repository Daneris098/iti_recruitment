/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */
import { Button, Divider, Drawer, Flex, MultiSelect, Text, useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useCalendarStore } from "../store";

export default function DrawerFilter() {
  const drawerSize = useMatches({ base: "100%", xs: "30.8%", sm: "22.8%", md: "18.8%", lg: "18.8%", xl: "16.8%" });
  const buttonSize = useMatches({ base: "xs", xl: "sm" });
  const styles = { body: { height: "100%" } };
  const props = { backgroundOpacity: 0.2, blur: 0 };
  const { onViewFilter, setOnViewFilter } = useCalendarStore();
  const close = () => {
    setOnViewFilter(false);
  };
  return (
    <Drawer opened={onViewFilter} onClose={close} position="right" withCloseButton={false} size={drawerSize} overlayProps={props} styles={styles} pos="relative">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col gap-2 2xl:gap-4">
          <Flex className="w-full" direction="column" gap={10}>
            <Flex direction="row" justify="space-between">
              <Text fw={600} fz={22} c="#559CDA" children="Filter By" />
              <IconX className="cursor-pointer" onClick={close} size={30} color="gray" />
            </Flex>
          </Flex>
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect label="Department" placeholder="Select a Department" data={["IT", "HR", "Sales", "Admin"]} />
          <Flex className="w-full absolute bottom-5 right-5 gap-3 justify-end">
            <Button
              onClick={() => {}}
              variant="outline"
              size={buttonSize}
              radius={10}
              w={100}
              children={
                <Text fw={500} className="text-sm">
                  CLEAR
                </Text>
              }
            />
            <Button
              onClick={() => {}}
              variant="transparent"
              className="br-gradient border-none"
              size={buttonSize}
              radius={10}
              w={100}
              children={
                <Text fw={400} className="text-sm" c="white">
                  FILTER
                </Text>
              }
            />
          </Flex>
        </div>
      </div>
    </Drawer>
  );
}
