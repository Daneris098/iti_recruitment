import { Flex, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconCloudUp } from "@tabler/icons-react";
import { Dropzone, } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { useRef } from "react";
import { useFileUploadStore } from "@src/modules/Applicants/store";

export default function Attachment() {

    const openRef = useRef<() => void>(null);

    const { setFile, setFileName } = useFileUploadStore();

    const handleDrop = (files: File[]) => {
        setFile(files[0]);
        setFileName(files[0].name)
    }

    return (
        <Group className="w-full">
            <Dropzone
                openRef={openRef}
                onDrop={handleDrop}
                onReject={(files) => console.log('Rejected files', files)}
                maxSize={25 * 1024 * 1024}
                multiple={false}
                accept={[
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ]}
                className="border-dashed w-full p-0"
            >
                <div className="bg-[#F5F5F5]">
                    <Group justify="center" gap="xl" mih={220}>
                        <Dropzone.Accept>
                            <IconUpload
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>

                        <Flex
                            direction="column"
                            align="center"
                            gap={5}
                            className="bg-[#d5d5d599] h-[223px] w-[555px] poppins py-5 border-2 border-dashed border-[#6D6D6D] rounded-lg flex flex-col justify-center items-center"
                        >
                            <IconCloudUp color="#559cda" stroke={1.5} size={70} />
                            <Group gap={5}>
                                <Text size="xl" className="mb-2 font-semibold text-[15px] text-[#6D6D6D] poppins">
                                    Drag & drop files or{' '}
                                    <span
                                        className="text-[#559CDA] underline underline-offset-4 cursor-pointer poppins"
                                        onClick={() => openRef.current?.()}
                                    >
                                        Browse
                                    </span>
                                </Text>
                            </Group>
                            <Text className="text-[12px] text-[#6D6D6D] poppins">Supported formats: PDF, DOC, DOCX</Text>
                            <Text className="text-[12px] text-[#6D6D6D] poppins">Max File Size: 25MB</Text>
                            <Text className="text-[12px] text-[#6D6D6D] poppins">File Upload Limit: 1</Text>
                        </Flex>
                    </Group>
                </div>
            </Dropzone>
        </Group>
    );
}