import React from 'react';
import '@modules/Applicants/styles/index.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const UpdateStatusModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="update-status-modal-overlay">
          <div className="update-status-modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      );
}

export default UpdateStatusModal;