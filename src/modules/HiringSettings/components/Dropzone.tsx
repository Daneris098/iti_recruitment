import { Flex, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconCloudUp, IconNotes } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";

export default function Attachment() {
  return (
    <Group className="w-full">
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className="border-dashed w-full p-0"
        acceptColor="red"
      >
        <div className="bg-[#F5F5F5]"
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
                <IconNotes />
                <Text size="xl" inline className="flex justify-center gap-2 text-[#6D6D6D]">
                  File:<span className="text-blue-400">Offer.pdf</span>
                </Text>
                <Text className="text-[#6D6D6D]">
                  Size: 20mb
                </Text>
              </Group>
              <Text size="sm" className="text-blue-400 underline">
                Replace Existing File
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Supported formats: Excel
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Max File Size: 25mb
              </Text>
            </Flex>
          </Group>
        </div>
      </Dropzone>
    </Group>
  );
}