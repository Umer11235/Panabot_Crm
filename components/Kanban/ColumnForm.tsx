"use client";
import { useMemo, useState } from "react";
import styles from "./ColumnForm.module.css";
import Button from "@/components/(Inputs)/Button/Button";
import { ColumnFormProps } from "@/utils/types/kanban-components.types";
export default function ColumnForm({ initialTitle = "", submitLabel, onSubmit, onCancel }: ColumnFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const canSubmit = useMemo(() => title.trim().length > 0, [title]);
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit(title.trim());
      }}
    >
      <div className={styles.field}>
        <label className={styles.label}>
          Title <span className={styles.req}>*</span>
        </label>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Testing"
          autoFocus
        />
      </div>
      <div className={styles.actions}>
        <Button variant="primary" size="sm" fullWidth type="submit" disabled={!canSubmit}>
          {submitLabel}
        </Button>
        <Button variant="outline" size="sm" fullWidth type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
