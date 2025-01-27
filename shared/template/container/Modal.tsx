import { Divider, Modal, Text, Popover } from "@mantine/core";
import { IconCopy, IconFileUpload, IconX } from "@tabler/icons-react";
import "@shared/template/index.css";
import { useDisclosure } from '@mantine/hooks';
import { ScrollArea } from '@mantine/core';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  buttonClose?: () => void;
  size?: string;
  children?: React.ReactNode;
  centered?: boolean;
  title?: string;
  radius?: string;
  isIconsActionsRequired?: boolean
}
export default function ITIModal({
  opened,
  onClose,
  buttonClose,
  size = "xs",
  children,
  centered = true,
  title = "Modal",
  radius,
  isIconsActionsRequired
}: ModalProps) {
  const [openedExport, { close: closeExport, open: openExport }] = useDisclosure(false);
  const [openedCopy, { close: closeCopy, open: openCopy }] = useDisclosure(false);
  return (
    <Modal
      scrollAreaComponent={ScrollArea.Autosize}
      padding={30}
      radius={radius}
      opened={opened}
      onClose={onClose}
      centered={centered}
      size={size}
      withCloseButton={false}
    >
      <div className='flex justify-between'>
        <Text fw={600} fz={22} c="#559CDA">
          {title}
        </Text>
        <div className='flex gap-2'>

          {isIconsActionsRequired && (
            <>
              <Popover width={200} position="bottom" withArrow shadow="md" opened={openedCopy}>
                <Popover.Target>
                  <IconCopy onMouseEnter={openCopy} onMouseLeave={closeCopy}
                    className="cursor-pointer"
                    size={30}
                    color="gray"
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                  <Text size="sm">Copy</Text>
                </Popover.Dropdown>
              </Popover>

              <Popover width={200} position="bottom" withArrow shadow="md" opened={openedExport}>
                <Popover.Target>
                  <IconFileUpload onMouseEnter={openExport} onMouseLeave={closeExport}
                    className="cursor-pointer"
                    size={30}
                    color="gray"
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                  <Text size="sm">Export</Text>
                </Popover.Dropdown>
              </Popover>
            </>
          )}
          <IconX
            className="cursor-pointer"
            onClick={buttonClose}
            size={30}
            color="gray"
          />
        </div>
      </div>
      <div className='flex flex-col gap-5 mt-6' style={{ color: '#6D6D6D' }}>
        <Divider size="xs" color='#6D6D6D' />
        {children}
      </div>
    </Modal>
  );
}
