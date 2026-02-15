"use client";
import  { useMemo, useState } from "react";
import styles from "./ColumnForm.module.css";
import Button from "@/components/(Inputs)/Button/Button";
import { BoardFormProps } from "@/utils/types/kanban-components.types";
export default function BoardForm({
  initialName = "",
  submitLabel,
  onSubmit,
  onCancel,
}: BoardFormProps) {
  const [name, setName] = useState(initialName);
  const canSubmit = useMemo(() => name.trim().length > 0, [name]);
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit(name.trim());
      }}
    >
      <div className={styles.field}>
        <label className={styles.label}>Board name</label>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Test Project"
          autoFocus
        />
      </div>
      <div className={styles.actions}>
        <Button variant="outline" size="md" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
