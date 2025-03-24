import React from 'react';
import '@modules/JobOffers/styles/index.css'
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ViewPDF: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            {children}
          </div>
        </div>
      );
}

export default ViewPDF;