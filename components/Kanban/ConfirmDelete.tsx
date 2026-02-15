"use client";
import styles from "./ConfirmDelete.module.css";
import Button from "@/components/(Inputs)/Button/Button";
import { ConfirmDeleteProps } from "@/utils/types/kanban-components.types";
export default function ConfirmDelete({ title, message, confirmLabel = "Delete", onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <>
      <p className={styles.msg}>{message}</p>
      <div className={styles.actions}>
        <Button variant="danger" size="md" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="outline" size="md" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
}
