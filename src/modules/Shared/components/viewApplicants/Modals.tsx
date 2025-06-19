import { ModalsProps } from "@modules/Shared/types";
import { useApplicantIdStore } from "@src/modules/Shared/store";
import ViewPDF from "@modules/Applicants/components/modal/pdfModal";
import { PDFViewer } from "@modules/Shared/components/pdfViewer/PDFViewer";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import UpdateStatus from "@src/modules/Applicants/components/documents/buttons/UpdateStatus";
import GenerateNewOffer from "@modules/Applicants/components/documents/buttons/GenerateNewOffer";
import TransferPosition from "@src/modules/Applicants/components/documents/buttons/TransferPosition";
import { getApplicantPDFPath, getPendingApplicantPDFPath } from "@modules/Shared/utils/PdfViewer/pdfUtils";

export default function Modals({
  Status,
  IsJobOffer,
  onClosePDF,
  onCloseAll,
  isViewPDFOpen,
  applicantName,
  isUpdateStatusOpen,
  onCloseUpdateStatus,
  isGenerateNewOfferOpen,
  isTransferPositionOpen,
  onCloseTransferPosition,
  onCloseGenerateNewOffer,
}: ModalsProps) {
  const applicantId = useApplicantIdStore((state) => state.id);

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
          <PDFViewer
            identifier={applicantId}
            getApplicantStatus={async () => "Accepted"}
            getPdfPathFnHired={getApplicantPDFPath}
            getPdfPathFnPending={getPendingApplicantPDFPath}
          />
        </ViewPDF>
      )}
    </>
  );
}
