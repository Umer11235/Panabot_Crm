"use client";
import styles from "./Modal.module.css";
import Button from "@/components/(Inputs)/Button/Button";
import { ModalProps } from "@/utils/types/kanban-components.types";
export default function Modal({ open, title, subtitle, onClose, children, showActions, onConfirm, confirmText = "Confirm", confirmVariant = "primary" ,imageUrl}: ModalProps) {
  if (!open) return null;
  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
        {showActions && (
          <div className={styles.modalFooter}>
            <Button variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={confirmVariant} size="md" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
