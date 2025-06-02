import { ModalsProps } from "@modules/Shared/types";
import { useApplicantIdStore } from "@modules/Applicants/store";
import ViewPDF from "@modules/Applicants/components/modal/pdfModal";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import { useSingleAcceptedOffer } from "@src/modules/Shared/hooks/useSharedApplicants";
import UpdateStatus from "@src/modules/Applicants/components/documents/buttons/UpdateStatus";
import GenerateNewOffer from "@modules/Applicants/components/documents/buttons/GenerateNewOffer";
import TransferPosition from "@src/modules/Applicants/components/documents/buttons/TransferPosition";

export default function Modals({
  Status, IsJobOffer,
  onClosePDF, applicantName,
  onCloseAll, onCloseUpdateStatus,
  isGenerateNewOfferOpen, isViewPDFOpen,
  isUpdateStatusOpen, isTransferPositionOpen,
  onCloseTransferPosition, onCloseGenerateNewOffer,
}: ModalsProps) {

  const applicantId = useApplicantIdStore((state) => state.id);
  const { data: acceptedOffer } = useSingleAcceptedOffer(applicantId);

  // const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
  // const fileUrl = `${FILE_BASE_URL}/${acceptedOffer?.data?.[0]?.path}`;
  const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
  const filePath = acceptedOffer?.data?.[0]?.path.replace(/^files\//, '');
  const fileUrl = `${FILE_BASE_URL}${filePath}`;

  return (
    <>
      {/* Update Status Modal */}
      {isUpdateStatusOpen && (
        <ModalWrapper
          isOpen
          overlayClassName="update-status-modal-overlay"
          contentClassName="update-status-offered-modal-content"
          onClose={onCloseUpdateStatus}
        >
          <UpdateStatus
            Status={Status}
            onClose={onCloseAll}
            IsJobOffer={IsJobOffer}
            Name={applicantName}
          />
        </ModalWrapper>
      )}

      {/* Transfer Position Modal */}
      {isTransferPositionOpen && (
        <ModalWrapper
          isOpen
          overlayClassName="modal-overlay"
          contentClassName="update-status-offered-modal-content"
          onClose={onCloseTransferPosition}
        >
          <TransferPosition
            Applicant_Name={applicantName}
            onClose={onCloseTransferPosition}
          />
        </ModalWrapper>
      )}

      {/* Generate New Offer Modal */}
      {isGenerateNewOfferOpen && (
        <ModalWrapper
          isOpen
          overlayClassName="modal-overlay"
          contentClassName="update-status-offered-modal-content"
          onClose={onCloseGenerateNewOffer}
        >
          <GenerateNewOffer
            ApplicantName={applicantName}
            onClose={onCloseGenerateNewOffer}
          />
        </ModalWrapper>
      )}

      {/* PDF Viewer Modal */}
      {isViewPDFOpen && (
        <ViewPDF isOpen onClose={onClosePDF}>
          <iframe
            src={fileUrl}
            width="100%"
            height="891"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        </ViewPDF>
      )}
    </>
  );
}
