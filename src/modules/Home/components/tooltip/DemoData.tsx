import { useDisclosure } from "@mantine/hooks";
import { Popover, Text, Pill, MantineSize, StyleProp } from "@mantine/core";
import { IconExclamationMark } from "@tabler/icons-react";

interface DemoDataProps {
  size?: MantineSize;
  fs?: StyleProp<React.CSSProperties["fontStyle"]>;
}

export default function DemoDataHover({ size = "xs", fs }: DemoDataProps) {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={250} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <div onMouseEnter={open} onMouseLeave={close} className="cursor-pointer">
          <Pill children="Demo Data Only" c="#ED8028" bg="#ffd4b1" size={size} className={`h-sm:text-[${fs}]`} />
        </div>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: "none" }} className="flex flex-row items-center gap-5">
        <div>
          <IconExclamationMark size={50} className="border-2 border-[#559Cda] w-12 h-12 rounded-full" />
        </div>
        <Text size="sm" className="poppins w-full">
          Not enough data to generate analytics dashboard.
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
