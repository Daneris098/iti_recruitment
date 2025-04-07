import React from 'react';
import '@modules/Applicants/styles/index.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const TransferEmployeeModal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="transfer-employee-overlay">
          <div className="transfer-employee-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      );
}

export default TransferEmployeeModal;