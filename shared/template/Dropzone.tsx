import { Flex, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconCloudUp } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";

export default function Attachment() {
  return (
    <Group className="w-full">
      <Text size="md" fw={500} className="flex gap-2">
        Attachment<span className="text-red-400 font-semibold">*</span>
      </Text>
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className="border-dashed w-full"
        acceptColor="red"
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>

          <Flex direction="column" align="center" gap={5}>
            <IconCloudUp color="#559cda" stroke={1.5} size={80} />
            <Group gap={5}>
              <Text size="xl" inline className="flex justify-center">
                Drag & drop files or
              </Text>
              <Text size="xl" className="text-blue-400 underline">
                Browse
              </Text>
            </Group>
            <Text size="sm" c="dimmed" inline mt={7}>
              Supported formats: PDF, DOC, JPG, PNG, TXT, PDF
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Max File Size: 25mb
            </Text>
          </Flex>
        </Group>
      </Dropzone>
    </Group>
  );
}