import { OrganizationSettingsStore } from "@modules/OrganizationSettings/store";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { AlertType } from "../../assets/Enum";

export default function AlertModals({ dataTableRef }: { dataTableRef: React.RefObject<{ saveAll: () => void; cancelAll: () => void }> }) {
  const { setAlert, alert, validationMessage } = OrganizationSettingsStore();
  const AlertAutoClose: Record<AlertType, boolean> = {
    [AlertType.Cancel]: false,
    [AlertType.Cancelled]: true,
    [AlertType.Saved]: true,
    [AlertType.Validation]: true,
  };

  useEffect(() => {
    if (alert && (AlertAutoClose as any)[alert]) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  const modalSize = useMatches({
    base: "100%",
    lg: "30%",
  });

  console.log(dataTableRef)

  return (
    <>
      <Modal opened={alert === AlertType.Saved} withCloseButton={false} onClose={() => setAlert("")} centered size={modalSize} padding={30}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-2xl text-[#559CDA] font-semibold">Save Changes</p>
            <IconX
              size={30}
              className="text-[#6D6D6D]"
              onClick={() => {
                setAlert("");
              }}
            />
          </div>
          <Divider size="xs" color="#6D6D6D" />
        </div>
        <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
          <CircleCheckBig color="#559cda" size={70} strokeWidth={1} />
          <Text className="text-xl font-semibold">All Changes have been successfully saved!</Text>
        </div>
      </Modal>

      <Modal
        opened={alert === AlertType.Cancelled}
        withCloseButton={false}
        onClose={() => setAlert("")}
        styles={{
          title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
        }}
        centered
        size={modalSize}
        padding={30}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-2xl text-[#559CDA] font-semibold">Cancel Changes</p>
            <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
          </div>
          <Divider size="xs" color="#6D6D6D" />
        </div>
        <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
          <CircleAlert color="#559cda" size={70} strokeWidth={1} />
          <Text className="text-xl font-bold">Changes have not been saved.</Text>
        </div>
      </Modal>

      <Modal
        opened={alert === AlertType.Validation}
        withCloseButton={false}
        onClose={() => setAlert("")}
        styles={{
          title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
        }}
        centered
        size={modalSize}
        padding={30}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-2xl text-[#559CDA] font-semibold">Validation</p>
            <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
          </div>
          <Divider size="xs" color="#6D6D6D" />
        </div>
        <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
          <CircleAlert color="#559cda" size={70} strokeWidth={1} />
          <Text className="text-xl font-bold text-center">{`${validationMessage}`}</Text>
        </div>
      </Modal>

      <Modal
        opened={alert === AlertType.Cancel}
        withCloseButton={false}
        onClose={() => setAlert("")}
        styles={{ title: { color: "#559CDA", fontSize: 22, fontWeight: 600 } }}
        centered
        size={modalSize}
        padding={30}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-2xl text-[#559CDA] font-semibold">Cancel Changes</p>
            <IconX size={30} className="text-[#6D6D6D]" onClick={() => setAlert("")} />
          </div>
          <Divider size="xs" color="#6D6D6D" />
        </div>
        <div className="flex flex-col mt-6 items-center gap-4 text-[#6D6D6D]">
          <CircleAlert color="#559cda" size={70} strokeWidth={1} />
          <Text className="text-xl font-bold text-center">Are you sure you want to cancel the changes?</Text>
          <div className="flex gap-2 w-[80%]">
            <Button
              className="w-[50%] rounded-md"
              variant="outline"
              onClick={() => {
                setAlert(AlertType.Cancelled);
              }}>
              YES
            </Button>
            <Button className="w-[50%] rounded-md border-none br-gradient" onClick={() => setAlert("")}>
              NO
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
