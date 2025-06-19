import { Divider } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import profileImage from "@src/assets/jane.png";
import { useEffect, useMemo, useState } from "react";
import { useCloseModal } from "@modules/Applicants/store";
import { ViewApplicantsProps } from "@modules/Shared/types";
import { useApplicantIdStore } from "@src/modules/Shared/store";
import Modals from "@modules/Shared/components/viewApplicants/Modals";
import TabsPanel from "@modules/Shared/components/viewApplicants/TabsPanel";
import { SkillChip } from "@modules/Shared/utils/ApplicantModal/skillChips";
import { getTabs } from "@modules/Shared/utils/ApplicantModal/tabConfiguration";
import { StatusBadge } from "@modules/Shared/utils/ApplicantModal/statusColors";
import { ActionButton } from "@modules/Shared/utils/ApplicantModal/actionButton";
import { TextRenderer } from "@modules/Shared/utils/ApplicantModal/textRenderer";
import { useApplicantsById } from "@src/modules/Shared/hooks/useSharedApplicants";
import { getDisplayStatus } from "@modules/Shared/utils/ApplicantModal/getStatus";
import { fetchApplicantByIdService } from '@src/modules/Shared/utils/GetApplicantById/applicantServiceById';

export default function ViewApplicant({
  applicantName,
  position,
  status,
  email,
  phone,
  remarks,
  applicationDate,
  onClose,
  IsJobOffer,
  location
}: ViewApplicantsProps) {

  const applicantId = useApplicantIdStore((state) => state.id);
  const { data: applicantsById } = useApplicantsById(applicantId);

  const token = sessionStorage.getItem("accessToken") ?? undefined;
  const [applicant, setApplicant] = useState<any | null>(null);
  const [_isLoading, setLoading] = useState(false);
  const [_error, setError] = useState<unknown>(null);

  // const fullUrl = useMemo(() => {
  //   const photoPath = extractPhotoPath(applicant?.photo);
  //   return photoPath
  //     ? `/files/Uploads/applicants/${photoPath}`
  //     : profileImage;
  // }, [applicant?.photo]);

  // const memoizedImage = useMemo(() => (
  //   <img
  //     src={fullUrl}
  //     alt="Applicant"
  //     onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
  //     className="w-[100px] h-[100px] rounded-full shadow-sm object-cover"
  //   />
  // ), [fullUrl]);

  useEffect(() => {
    if (!applicantId || !token) return;

    setLoading(true);
    fetchApplicantByIdService(applicantId, token)
      .then(setApplicant)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [applicantId, token]);

  const {
    setIsOffered,
    isTransferPosition, setIsTransferPosition,
    isGenerateNewOffer, setIsGenerateNewOffer,
    isUpdateStatusButtonModalOpen, setIsUpdateStatusButtonModalOpen,
  } = useCloseModal();

  const [isViewPDF, togglePDF] = useState(false);
  const displayStatus = getDisplayStatus(status);
  const changeTabs = getTabs({ applicantName, status: status, remarks: remarks });

  // function extractPhotoPath(raw: unknown): string | undefined {
  //   if (!raw) return;

  //   // ① API sometimes sends it as a JSON string
  //   if (typeof raw === "string") {
  //     try {
  //       const parsed = JSON.parse(raw);
  //       return Array.isArray(parsed) && parsed[0]?.path;
  //     } catch {
  //       console.warn("photo field is not valid JSON:", raw);
  //       return;
  //     }
  //   }

  //   // ② Already an array
  //   if (Array.isArray(raw)) {
  //     return raw[0]?.path;
  //   }

  //   return;
  // }

  return (
    <div className="h-screen w-full p-4">

      {/* Title */}
      <div className="w-full flex justify-between items-center">
        <TextRenderer as="p" className="text-[#559CDA] font-medium text-[22px] mb-1">
          Applicant Profile
        </TextRenderer>
        <div className="flex items-center space-x-2">
          {/* <IconFileUpload stroke={1} className="w-[20px] h-[25px]" /> */}
          <IconX stroke={1} onClick={onClose} className="cursor-pointer w-[20px] h-[25px]" />
        </div>
      </div>
      <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />

      {/* Layout */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/4 p-2 sticky top-0 h-screen overflow-y-auto">
          <div className="flex flex-col items-start mt-3">
            <img src={profileImage} className="w-[100px] h-[100px] rounded-full shadow-sm" />
            {/* {memoizedImage} */}
            <TextRenderer as="p" className="text-[#559CDA] text-[20px] font-bold mt-2">
              {applicantName}
            </TextRenderer>
            <TextRenderer as="p" className="text-[#6D6D6D] text-[12px] font-medium">
              {position}
            </TextRenderer>
          </div>

          <div className="mt-8 text-[12px] text-[#6D6D6D]">
            <TextRenderer as="h1" className="pb-1">Current Status</TextRenderer>
            <StatusBadge Status={displayStatus} />
            {status !== "Hired" && status !== "Transferred" && (
              <p
                className={`text-white rounded-[10px] bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold mt-2 ${status === "Archived" ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                onClick={status !== "Archived" ? () => setIsUpdateStatusButtonModalOpen(true) : undefined}
              >
                {status === "Archived" ? "Inactive" : "Update Status"}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="mt-8 text-[12px] text-[#6D6D6D] space-y-3">
            <TextRenderer as="h1">Location</TextRenderer>
            <TextRenderer as="p" className="font-bold text-[14px]">{location ?? "Address not found"}</TextRenderer>

            <TextRenderer as="h1">Email</TextRenderer>
            <TextRenderer as="p" className="font-bold text-[14px] break-words">{email ?? "No Data"}</TextRenderer>

            <TextRenderer as="h1">Phone</TextRenderer>
            <TextRenderer as="p" className="font-bold text-[14px]">{phone ?? "No Data"}</TextRenderer>
          </div>

          {/* Skills */}
          <div className="mt-8 text-[12px] text-[#6D6D6D] pb-4">
            <TextRenderer as="h1">Skills</TextRenderer>
            <div className="flex gap-2 mt-2 flex-wrap">
              {applicantsById?.generalInformation?.skills?.length ? (
                applicantsById.generalInformation.skills.map((skill: string, index: number) => (
                  <SkillChip key={index} skill={skill} />
                ))
              ) : (
                <TextRenderer as="p" className='text-[#6D6D6D] poppins'>No Skills Listed</TextRenderer>
              )}
            </div>
          </div>

          {/* Start Date */}
          {(status === "For Transfer" || status === "Transferred" || status === "Hired") && (
            <div className="mt-3 text-[12px] text-[#6D6D6D]">
              <TextRenderer as="h1">Start Date</TextRenderer>
              <p className="font-semibold mt-1">{applicationDate}</p>
            </div>
          )}

          {IsJobOffer === "Yes" && (
            <TextRenderer as="h1" className="mt-8 text-[12px] text-[#6D6D6D]">
              Job Offer
            </TextRenderer>
          )}

          {/* Actions */}
          {(IsJobOffer === "Yes" || status !== "Archived") && (
            <ActionButton
              status={status}
              onPDFView={() => togglePDF(true)}
              onTransfer={() => setIsTransferPosition(true)}
            />
          )}

          {status === "Offered" && (
            <p
              className="text-white rounded-[10px] bg-[#6D6D6D] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer mt-2"
              onClick={() => setIsGenerateNewOffer(true)}
            >
              Generate new Offer
            </p>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-4/5 p-4 overflow-y-auto h-screen">
          <TabsPanel tabs={changeTabs} />
        </div>
      </div>

      {/* PDF Modal */}
      <Modals
        isUpdateStatusOpen={isUpdateStatusButtonModalOpen}
        isTransferPositionOpen={isTransferPosition}
        isGenerateNewOfferOpen={isGenerateNewOffer}
        isViewPDFOpen={isViewPDF}
        onCloseAll={() => {
          setIsUpdateStatusButtonModalOpen(false);
          setIsTransferPosition(false);
          setIsGenerateNewOffer(false);
          setIsOffered(false);
          togglePDF(false);
        }}
        onCloseUpdateStatus={() => setIsUpdateStatusButtonModalOpen(false)}
        onCloseTransferPosition={() => setIsTransferPosition(false)}
        onCloseGenerateNewOffer={() => setIsGenerateNewOffer(false)}
        onClosePDF={() => togglePDF(false)}
        applicantName={applicantName}
        Status={status}
        IsJobOffer={IsJobOffer}
        Position={position}
        Remarks={remarks}
        Acknowledgement={""}
        Department={""}
      />
    </div>
  );
}
