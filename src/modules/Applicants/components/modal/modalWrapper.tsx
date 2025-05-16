import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  onClose?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  children,
  overlayClassName = 'default-modal-overlay',
  contentClassName = 'default-modal-content',
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={overlayClassName} onClick={onClose}>
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
