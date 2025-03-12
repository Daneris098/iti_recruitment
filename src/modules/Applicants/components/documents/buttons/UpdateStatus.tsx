{/*This is basically the component for Update Status Button inside the view applicant under the "current status" text*/}
import { Divider } from "@mantine/core";
import DropDown from "@src/modules/Applicants/components/documents/dropdown/DropDown";
import ApplicantModal from "@src/modules/Applicants/components/modal/dropdownOfferedModal";
import { Menu, Button } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { useState } from "react";
import StatusUpdatedModal from "@modules/Applicants/components/modal/jobGenerated";
import StatusUpdatedAlert from "@src/modules/Applicants/components/alerts/StatusUpdated";
import { 
  // useCloseModal, 
  useStatusStore } from "@src/modules/Applicants/store";

interface UpdateStatusProps {
  Status: string;
  onClose: () => void;
}

export default function UpdateStatus({ onClose, Status }: UpdateStatusProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedStatus, setSelectedStatus } = useStatusStore();
  const [isUpdated, setIsUpdated] = useState(false);

  const handleStatusClick = (status: "Offered" | "Archived" | "Hired" | "For Interview") => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const statusOptions = {
    Applied: ["For Interview", "Offered", "Archived"],
    "Final Interview": ["Offered", "Archived"],
    "Initial Interview": ["Offered", "Archived"],
    "Assessment": ["Offered", "Archived"],
    Offered: ["Hired", "Archived"],
    Hired: [],
    "For Transfer": ["Transferred", "Archived"],
    Transferred: [],
    Archived: [],
  } as const;

  type ApplicantStatus = keyof typeof statusOptions;

  // Ensure Status is a valid key
  let availableStatuses: readonly string[] =
    Object.keys(statusOptions).includes(Status)
      ? statusOptions[Status as ApplicantStatus]
      : [];

  const handleUpdate = () => {
    setIsUpdated(true); // Open StatusUpdatedModal FIRST

    setTimeout(() => {
      onClose(); // Close UpdateStatus.tsx slightly later
    }, 1000); // Small delay to keep the success modal visible
  };

  return (
    // Container
    <div className="w-full max-w-[606px] h-[290px] p-6 rounded-lg shadow-md">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[22px] font-semibold text-[#559CDA]">Update Applicant Status</h2>
          <IconX
            onClick={onClose}
            className="w-[15px] h-[15px] cursor-pointer" />
        </div>

        {/* Divider */}
        <Divider size={2} color="#A8A8A899" className="w-full mt-2" />
      </div>

      <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4">
        Status
        <span className="text-[#F14336]">
          *
        </span>
      </h3>

      <div>
        <Menu withinPortal={false}>
          <Menu.Target>
            <Button className="relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D]">
              <span className="text-left text-[#6D6D6D99] font-medium text-[16px]">
                {selectedStatus ?? Status}
              </span>
              <IconCaretDownFilled size={16} className="absolute right-4" />
            </Button>

          </Menu.Target>

          <div>
            {/* For Dynamically rendering the dropdown options based on the application movement. */}
            <Menu.Dropdown className="border-1 border-[#6D6D6D] rounded-[10px]" style={{ width: "559px" }}>
              {availableStatuses.length > 0 ? (
                availableStatuses.map((status) => (
                  <Menu.Item key={status} onClick={() => handleStatusClick(status as "For Interview" | "Offered" | "Archived" | "Hired")}>
                    {status}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item disabled>No status options available</Menu.Item>
              )}
            </Menu.Dropdown>
          </div>
        </Menu>

        {/* If the modal is trigger and set to true, open the drop down menu. This is the composition of dynamically rendered dropdown choices. */}
        {isModalOpen && (
          <ApplicantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DropDown onClose={() => setIsModalOpen(false)} Status={Status} />
            {/* <DropDown onCloseAll={handleCloseAll} Status={Status} onClose={onClose} /> */}

          </ApplicantModal>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-between pt-14">
        <Button onClick={onClose} className="bg-transparent text-[#559CDA] px-6 py-3 rounded-lg border-[#559CDA] font-medium text-[14px]">
          Cancel
        </Button>
        <Button
          className="custom-gradient text-white px-6 py-3 rounded-lg font-medium text-[14px]"
          // onClick={() => setIsUpdated(true)}
          onClick={handleUpdate}
        >
          {"Update".toUpperCase()}
        </Button>
      </div>

      <StatusUpdatedModal isOpen={isUpdated} onClose={() => setIsUpdated(false)}>
        <StatusUpdatedAlert
          onClose={onClose} />
      </StatusUpdatedModal>
    </div >
  );
}

// This modal will appear when you clicked the Update Status button under the status section of applicant profile