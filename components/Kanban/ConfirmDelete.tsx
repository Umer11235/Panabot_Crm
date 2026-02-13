"use client";
import styles from "./ConfirmDelete.module.css";
import Button from "@/components/(Inputs)/Button/Button";
import { ConfirmDeleteProps } from "@/utils/types/kanban-components.types";
export default function ConfirmDelete({ title, message, confirmLabel = "Delete", onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{title}</div>
      <div className={styles.msg}>{message}</div>
      <div className={styles.actions}>
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
