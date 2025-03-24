import React from 'react';
import '@modules/Applicants/styles/index.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ForTransfer: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="applicant-unreachable-modal-overlay " onClick={onClose}>
          <div className="applicant-unreachable h-[350px]" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      );
}

export default ForTransfer;