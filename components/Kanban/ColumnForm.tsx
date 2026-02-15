"use client";
import styles from "./ColumnForm.module.css";
import { ColumnFormProps } from "@/utils/types/kanban-components.types";
export default function ColumnForm({ initialTitle = "", value, onChange }: any) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        Title <span className={styles.req}>*</span>
      </label>
      <input
        className={styles.input}
        value={value || initialTitle}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Testing"
        autoFocus
      />
    </div>
  );
}
