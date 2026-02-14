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
      <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '14px', lineHeight: '1.5' }}>
        {message}
        {itemName && <strong style={{ color: 'var(--md-sys-color-on-surface)' }}> {itemName}</strong>}?
      </p>
    </Modal>
  );
}
