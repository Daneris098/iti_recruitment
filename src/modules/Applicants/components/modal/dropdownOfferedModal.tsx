import React from 'react';
import '@modules/Applicants/styles/index.css'

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const OfferedStatus: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="update-status-offered-modal-overlay">
          <div className="update-status-offered-modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      );
}

export default OfferedStatus;