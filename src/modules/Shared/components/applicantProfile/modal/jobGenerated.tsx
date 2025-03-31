import React from 'react';
import '@modules/Applicants/styles/index.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ApplicantModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="job-offer-modal-overlay">
          <div className="job-generated" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      );
}

export default ApplicantModal;