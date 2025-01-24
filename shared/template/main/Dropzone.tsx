import { Flex, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconCloudUp } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";

interface Props {
  isColored?: boolean;
  content?: React.ReactNode;
  isBold?: boolean;
  itHasValue?: boolean;
}

export default function Attachment({
  isColored = false,
  isBold = false,
  content,
  itHasValue = false,
}: Props) {
  return (
    <Group className="w-full">
      {itHasValue ? (
        <>
          <Text
            size="md"
            fw={isBold ? 700 : 500}
            className="flex gap-2"
            c={`${isColored && "blue"}`}
          >
            Attachment
          </Text>
          {content}
        </>
      ) : (
        <>
          <Text
            size="md"
            fw={isBold ? 700 : 500}
            className="flex gap-2"
            c={`${isColored ? "blue" : "#6d6d6d"} `}
          >
            Attachment<span className="text-red-400 font-semibold">*</span>
          </Text>
          <Dropzone
            onDrop={(files) => console.log("accepted files", files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            disabled
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
                {content ? content : "Add Contents"}
                <Text size="sm" c="dimmed" inline mt={7}>
                  Supported formats: PDF, DOC
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Max File Size: 25mb
                </Text>
              </Flex>
            </Group>
          </Dropzone>
        </>
      )}
    </Group>
  );
}
