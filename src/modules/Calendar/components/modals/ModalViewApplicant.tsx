/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */

//--- Mantine Components
import {
  Container,
  Flex,
  LoadingOverlay,
  Pill,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
//--- Shared Template
import Modal from "@shared/template/container/Modal";
//--- Calendar Store
import { useCalendarStore } from "../../store";
//--- Calendar Assets
import { ModalViewApplicantProps } from "../../assets/Types";

export default function ModalViewApplicant(props: ModalViewApplicantProps) {
  const { downloadBtn } = props;
  const { onViewApplicant, setOnViewApplicant } = useCalendarStore();

  return (
    <Modal
      centered
      opened={onViewApplicant}
      onClose={() => setOnViewApplicant(false)}
      buttonClose={() => setOnViewApplicant(false)}
      isIconsActionsRequired={true}
      downloadBtn={downloadBtn}
      title="View Applicant Profile"
      size="60%">
      <Stack className="text-[#6D6D6D] flex flex-col gap-3  p-2 text-sm sm:text-md overflow-auto">
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "pink", type: "bars" }}
        />
        <Skeleton visible={false}>
          <Stack className="flex flex-col sm:flex-row">
            <div className="flex flex-col h-full w-full sm:w-[20%]">
              {/* Applicant Info */}
              <Container p={0} className="flex flex-col w-full">
                <img
                  src="https://i.pinimg.com/474x/aa/f4/b9/aaf4b9b4ad9765c810e34199f264af70.jpg"
                  alt="Profile Picture"
                  className="w-[100%] h-40 object-cover rounded-lg"
                />
                <Text fw={600} size="md" c="#0078EB">
                  Myoui Minari
                </Text>
                <Text size="xs">Web Developer</Text>
              </Container>
              {/* Applicant Status */}
              <Container p={0} className="flex flex-col w-full gap-2" mt={40}>
                <Text size="xs">Current Status</Text>
                <div className="w-full text-center font-semibold bg-[#ed8028] text-white py-2 rounded-lg">
                  For Interview
                </div>
                <div className="w-full text-center font-regular bg-[#559cda] text-white py-1 text-xs rounded-lg">
                  Update Status
                </div>
              </Container>
              {/* Applicant Details */}
              <Container p={0} className="flex flex-col w-full gap-3" mt={40}>
                <Flex direction="column" className="w-full gap-1">
                  <Text size="xs">Location</Text>
                  <Text size="xs" fw={700}>
                    San Antonio, Texas
                  </Text>
                </Flex>
                <Flex direction="column" className="w-full gap-1">
                  <Text size="xs">Email</Text>
                  <Text size="xs" fw={700}>
                    myouimina@gmail.com
                  </Text>
                </Flex>
                <Flex direction="column" className="w-full gap-1">
                  <Text size="xs">Phone</Text>
                  <Text size="xs" fw={700}>
                    +8180-1234-5678
                  </Text>
                </Flex>
                <Flex direction="column" className="w-full gap-1">
                  <Text size="xs">Skills</Text>
                  <Container
                    p={0}
                    className="flex flex-row justify-start w-full gap-3">
                    <Pill>CSS</Pill>
                    <Pill>HTML</Pill>
                    <Pill>JS</Pill>
                  </Container>
                </Flex>
                <div className="w-full text-center font-regular bg-[#559cda] text-white py-1 text-xs rounded-lg mt-3">
                  Transfer Position
                </div>
              </Container>
            </div>
            <Stack className="flex flex-col w-full gap-6">
              {/* Family Background */}
              <Container p={0} className="flex flex-col h-full w-full">
                <p className="text-[#0078EB] text-lg font-semibold">
                  Family Background
                </p>
                <Flex direction="row">
                  <div className="flex flex-col p-2 gap-5 w-1/2">
                    <div>
                      <p className="text-[#6D6D6D]">Father's Name</p>
                      <p className="font-bold">Myoui Akira</p>
                    </div>
                    <div>
                      <p className="text-[#6D6D6D]">Age</p>
                      <p className="font-bold">70</p>
                    </div>

                    <div>
                      <p className="text-[#6D6D6D]">Occupation</p>
                      <p className="font-bold">Clinical Professor</p>
                    </div>

                    <div>
                      <p className="text-[#6D6D6D]">Contact Number</p>
                      <p className="font-bold">+8180-1234-5678 </p>
                    </div>
                  </div>
                  <div className="flex flex-col p-2 gap-5 w-1/2 ">
                    <div>
                      <p className="text-[#6D6D6D]">Mother's Name</p>
                      <p className="font-bold">Myoui Sachiko</p>
                    </div>
                    <div>
                      <p className="text-[#6D6D6D]">Age</p>
                      <p className="font-bold">70</p>
                    </div>

                    <div>
                      <p className="text-[#6D6D6D]">Occupation</p>
                      <p className="font-bold">House Wife</p>
                    </div>

                    <div>
                      <p className="text-[#6D6D6D]">Contact Number</p>
                      <p className="font-bold">+8180-1234-5678 </p>
                    </div>
                  </div>
                </Flex>
              </Container>
              {/* Government ID Number */}
              <Container p={0} className="flex flex-col h-full w-full">
                <p className="text-[#0078EB] text-lg font-semibold">
                  Government ID/Number
                </p>
                <Flex direction="row">
                  <div className="flex flex-col p-2 gap-5 w-1/2">
                    <div>
                      <p className="text-[#6D6D6D]">SSS</p>
                      <p className="font-bold">1123456789</p>
                    </div>
                    <div>
                      <p className="text-[#6D6D6D]">Philhealth No.</p>
                      <p className="font-bold">1123456789</p>
                    </div>

                    <div>
                      <p className="text-[#6D6D6D]">Driver License</p>
                      <p className="font-bold">1123456789</p>
                    </div>
                  </div>
                  <div className="flex flex-col p-2 gap-5 w-1/2">
                    <div>
                      <p className="text-[#6D6D6D]">Pag-ibig No.</p>
                      <p className="font-bold">1123456789</p>
                    </div>
                    <div>
                      <p className="text-[#6D6D6D]">TIN ID.</p>
                      <p className="font-bold">1123456789</p>
                    </div>

                    <div>
                      <p className="text-[#6D6D6D]">Passport</p>
                      <p className="font-bold">1123456789</p>
                    </div>
                  </div>
                </Flex>
              </Container>
              {/* Other Information */}
              <Container p={0} className="flex flex-col h-full w-full">
                <p className="text-[#0078EB] text-lg font-semibold">
                  Other Information
                </p>
                <Flex direction="row">
                  <Container p={0} className="flex flex-col p-2 gap-5 w-1/2">
                    <Flex direction="column">
                      <p className="text-[#6D6D6D]">Special Technical Skills</p>
                      <p className="font-bold">Adobe Photoshop</p>
                    </Flex>
                    <div>
                      <p className="text-[#6D6D6D]">Convicted Crime</p>
                      <p className="font-bold">No</p>
                    </div>
                    <div>
                      <p className="text-[#6D6D6D]">Medical Condition</p>
                      <p className="font-bold">No</p>
                    </div>
                  </Container>
                  <div className="flex flex-col p-2 gap-5 w-1/2">
                    <div>
                      <p className="text-[#6D6D6D]">Hospitalized</p>
                      <p className="font-bold">No</p>
                    </div>
                    <div>
                      <p className="text-[#6D6D6D]">
                        Family Employed within the Company
                      </p>
                      <p className="font-bold">No</p>
                    </div>
                  </div>
                </Flex>
              </Container>
            </Stack>
          </Stack>
        </Skeleton>
      </Stack>
    </Modal>
  );
}
