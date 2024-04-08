import React from 'react';
import { useEffect } from 'react';

import './PopupWithForm.css';

interface Popup {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onPosition: string;
}

const PopupWithForm: React.FC<Popup> = ({ isOpen, onClose, onPosition, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    function handleESC(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleESC);

    return () => document.removeEventListener('keydown', handleESC);
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''} popup_${onPosition}`}
      onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}>
      <div className={`popup__container popup__container_${onPosition}`}>{children}</div>
    </div>
  );
};

export default PopupWithForm;
