import { PDFViewer } from "@react-pdf/renderer";
import { ModalsProps } from "@modules/Shared/types";
import ViewPDF from "@modules/Applicants/components/modal/pdfModal";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import PDFDocument from "@modules/Applicants/components/documents/pdf/ApplicantsPDF";
import UpdateStatus from "@src/modules/Applicants/components/documents/buttons/UpdateStatus";
import TransferPosition from "@src/modules/Applicants/components/documents/buttons/TransferPosition";
import GenerateNewOffer from "@modules/Applicants/components/documents/buttons/GenerateNewOffer";

export default function Modals({
  Position, Remarks,
  Status, IsJobOffer,
  onClosePDF, applicantName,
  Acknowledgement, Department,
  onCloseAll, onCloseUpdateStatus,
  isGenerateNewOfferOpen, isViewPDFOpen,
  isUpdateStatusOpen, isTransferPositionOpen,
  onCloseTransferPosition, onCloseGenerateNewOffer,
}: ModalsProps) {

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
            width="100%"
            height="891"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          >
            <PDFDocument
              applicantName={applicantName}
              Position={Position}
              Remarks={Remarks}
              Acknowledgement={Acknowledgement}
              Department={Department}
            />
          </PDFViewer>
        </ViewPDF>
      )}
    </>
  );
}
