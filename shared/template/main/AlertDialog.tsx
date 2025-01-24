import { Flex, Text } from "@mantine/core";
import { Modal } from "@shared/template/";
import { FileCheck, FileX } from "lucide-react";
import React from "react";

interface DialogProps {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
  title: string;
  isChecked?: boolean;
  content: string;
}

export default function AlertDialog({
  opened,
  onClose,
  buttonClose,
  title,
  isChecked = false,
  content,
}: DialogProps) {
  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (opened) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="30%"
      buttonClose={buttonClose}
      title={title}
    >
      <Flex
        className="w-full"
        direction="column"
        align="center"
        justify="space-between"
        mt={30}
        mb={50}
      >
        {isChecked ? (
          <FileCheck color="#559cda" size={80} strokeWidth={1} />
        ) : (
          <FileX color="#559cda" size={80} strokeWidth={1} />
        )}
        <Text size="lg" c="#6d6d6d" className="w-4/6 text-center">
          {content}
        </Text>
      </Flex>
    </Modal>
  );
}
