import React from 'react';
import styles from './Modal.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showActions?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showActions = false,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary'
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {showActions && (
          <div className={styles.actions}>
            <Button variant={confirmVariant} size="md" onClick={onConfirm}>
              {confirmText}
            </Button>
            <Button variant="outline" size="md" onClick={onClose}>
              {cancelText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
