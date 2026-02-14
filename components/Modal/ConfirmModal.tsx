import React from 'react';
import Modal from '@/components/Modal/Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  itemName?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  itemName
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showActions
      onConfirm={onConfirm}
      confirmText={confirmText}
      confirmVariant="danger"
    >
      <p style={{ color: '#5f6368', fontSize: '14px', lineHeight: '1.5' }}>
        {message}
        {itemName && <strong style={{ color: '#202124' }}> {itemName}</strong>}?
      </p>
    </Modal>
  );
}
