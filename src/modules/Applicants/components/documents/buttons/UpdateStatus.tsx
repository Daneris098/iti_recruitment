import { Divider } from "@mantine/core";
import DropDownOffered from "@src/modules/Applicants/components/documents/dropdown/DropdownOffered";
import DropDownArchived from "@src/modules/Applicants/components/documents/dropdown/DropDownArchived";
import ApplicantModal from "@src/modules/Applicants/components/modal/dropdownOfferedModal";
import { Menu, Button } from "@mantine/core";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import { useState } from "react";
import StatusUpdatedModal from "@modules/Applicants/components/modal/jobGenerated"
import StatusUpdatedAlert from "@modules/Applicants/components/documents/alerts/StatusUpdated"

interface UpdateStatusProps {
  onClose: () => void;
}

export default function UpdateStatus({ onClose }: UpdateStatusProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<"Offered" | "Archived" | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleStatusClick = (status: "Offered" | "Archived") => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  return (

    // Container
    <div className="w-full max-w-[606px] h-[280px] p-6 rounded-lg shadow-md">

      {/* Header */}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[22px] font-semibold text-[#559CDA]">Update Applicant Status</h2>
          <IconX
            onClick={onClose}
            className="w-[15px] h-[15px] cursor-pointer" />
        </div>
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
            <Button
              className="
              relative flex items-center w-full h-[56px] px-4
              bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D]
              hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D]">

              <span className="text-left">{selectedStatus || "For Interview"}</span>
              <IconChevronDown size={16} className="absolute right-4" />
            </Button>

          </Menu.Target>

          <div>
            <Menu.Dropdown className="border-1 border-[#6D6D6D] rounded-[10px]" style={{ width: "559px" }}>
              <Menu.Item onClick={() => handleStatusClick("Offered")}>Offered</Menu.Item>
              <Menu.Item onClick={() => handleStatusClick("Archived")}>Archived</Menu.Item>
            </Menu.Dropdown>
          </div>
        </Menu>

        {isModalOpen &&
          <ApplicantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {selectedStatus === "Offered" && <DropDownOffered onClose={() => setIsModalOpen(false)} />}
            {selectedStatus === "Archived" && <DropDownArchived onClose={() => setIsModalOpen(false)} />}
          </ApplicantModal>
        }
      </div>

      {/* Submit Button */}
      <div className="flex justify-between pt-12">
        <Button onClick={onClose} className="bg-transparent text-[#559CDA] px-6 py-3 rounded-lg border-[#559CDA] font-medium text-[15px]">
          Cancel
        </Button>
        <Button
          className="custom-gradient text-white px-6 py-3 rounded-lg font-medium text-[15px]"
          onClick={() => setIsUpdated(true)}
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