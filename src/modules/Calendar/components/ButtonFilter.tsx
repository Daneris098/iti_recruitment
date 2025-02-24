/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

//--- React
import React from "react";
//--- Mantine Components
import { Stack, Flex, Text, Checkbox } from "@mantine/core";
//--- Calendar Store
import { useCalendarStore } from "../store";

//--- Dummy Data
import { departments } from "../assets/Array";

const ButtonFilter: React.FC = () => {
  const { checkedItems, toggleCheckedItem } = useCalendarStore();

  const flexProps = { w: "auto", h: 25, gap: 10, pl: 10, pr: 20 };

  return (
    <Stack>
      <Flex direction="row" justify="center" gap={20}>
        {departments.map((item, index) => {
          const isChecked = checkedItems.includes(item.name);
          return (
            <Flex
              key={index}
              bg={item.backgroundColor}
              direction="row"
              justify="flex-start"
              align="center"
              {...flexProps}
              className="rounded-lg cursor-pointer"
              onClick={() => toggleCheckedItem(item.name)}>
              <Checkbox
                checked={isChecked}
                size="xs"
                w="30%"
                color={item.color}
              />
              <Text fw={600} size="sm" c={item.color} w="70%">
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Stack>
  );
};

export default ButtonFilter;
