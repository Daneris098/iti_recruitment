import { Button, Flex, Text } from "@mantine/core";
import { IconFilePlus } from "@tabler/icons-react";

interface HeaderProps {
  buttonClick?: () => void;
  title?: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
  noButtonOpacity?: boolean;
}

export default function Header({
  buttonClick,
  title = "Title Header",
  buttonLabel = "Button Label",
  buttonIcon = <IconFilePlus size={25} stroke={2} />,
  noButtonOpacity = false,
}: HeaderProps) {
  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      justify={{ base: "center", sm: "space-between" }}
      align={{ base: "center", sm: "space-between" }}
      className="w-full"
    >
      <Text className="text-xl font-semibold text-[#559CDA]" fz={22}>
        {title}
      </Text>
      <Flex justify="center" gap={13}>
        <Button
          className="flex justify-between"
          radius="md"
          onClick={buttonClick}
          color="#559CDA"
          leftSection={buttonIcon}
          h={36}
          style={noButtonOpacity ? { opacity: 0, pointerEvents: "none" } : undefined}
        >
          {buttonLabel}
        </Button>
      </Flex>
    </Flex>
  );
}
