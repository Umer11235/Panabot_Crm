"use client";

import { useMemo, useState } from "react";
import styles from "./TaskForm.module.css";
import type { User } from "@/utils/types/kanban.types";
import Button from "@/components/(Inputs)/Button/Button";
import { TaskFormProps } from "@/utils/types/kanban-components.types";

type Priority = "LOW" | "MEDIUM" | "HIGH";

export default function TaskForm({ users, columns, initial, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const [value, setValue] = useState(initial);
  const canSubmit = useMemo(() => value.title.trim().length > 0, [value.title]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit({
          ...value,
          title: value.title.trim(),
          description: value.description?.trim() || "",
        });
      }}
    >
      <div className={styles.field}>
        <label className={styles.label}>
          Title <span className={styles.req}>*</span>
        </label>
        <input
          className={styles.input}
          value={value.title}
          onChange={(e) => setValue((v) => ({ ...v, title: e.target.value }))}
          placeholder="Task title"
        />
      </div>

      <div className={styles.row2}>
        <div className={styles.field}>
          <label className={styles.label}>
            Priority <span className={styles.req}>*</span>
          </label>
          <select
            className={styles.select}
            value={value.priority}
            onChange={(e) => setValue((v) => ({ ...v, priority: e.target.value as Priority }))}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Column <span className={styles.req}>*</span>
          </label>
          <select
            className={styles.select}
            value={value.columnId}
            onChange={(e) => setValue((v) => ({ ...v, columnId: e.target.value }))}
          >
            {columns.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Assign to</label>
        <select
          className={styles.select}
          value={value.assigneeId ?? ""}
          onChange={(e) => setValue((v) => ({ ...v, assigneeId: e.target.value || undefined }))}
        >
          <option value="">Select member</option>
          {users.map((u: User) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={value.description ?? ""}
          onChange={(e) => setValue((v) => ({ ...v, description: e.target.value }))}
          placeholder="Write something..."
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
