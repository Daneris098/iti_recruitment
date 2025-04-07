import React from 'react';
import '@modules/Applicants/styles/index.css'
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: string;
}

const JobOffersModal: React.FC<ModalProps> = ({ isOpen, onClose, children, header }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-[22px] text-[#559CDA] font-medium">{header}</h1>
          <button
            className="w-[30px] h-[30px] flex items-center justify-center text-3xl font-light"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {children}
      </div>
      <h1 className='text-red-500 bg-teal-700'>button</h1>
    </div>
  );
}

export default JobOffersModal;