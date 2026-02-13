"use client";
import { IoClose } from 'react-icons/io5';
import styles from "./Modal.module.css";
import { ModalProps } from "@/utils/types/kanban-components.types";
export default function Modal({ open, title, subtitle, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.head}>
          <div>
            <div className={styles.title}>{title}</div>
            {subtitle ? <div className={styles.sub}>{subtitle}</div> : null}
          </div>
          <button className={styles.close} type="button" onClick={onClose} aria-label="Close">
            <IoClose size={24} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
