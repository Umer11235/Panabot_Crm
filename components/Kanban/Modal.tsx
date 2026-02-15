"use client";
import styles from "./Modal.module.css";
import { ModalProps } from "@/utils/types/kanban-components.types";
import Button from "@/components/(Inputs)/Button/Button";
export default function Modal({ open, title, subtitle, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
