"use client";

import { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";
import type { User } from "@/utils/types/kanban.types";
import { TaskFormProps } from "@/utils/types/kanban-components.types";
import Icon from "@/utils/Icons";
import { IoEyeOutline } from "react-icons/io5";

type Priority = "LOW" | "MEDIUM" | "HIGH";

export default function TaskForm({ users, columns, value, onChange }: any) {
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [columnOpen, setColumnOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.priorityDropdown}`)) {
        setPriorityOpen(false);
      }
      if (!target.closest(`.${styles.columnDropdown}`)) {
        setColumnOpen(false);
      }
      if (!target.closest(`.${styles.assignDropdown}`)) {
        setAssignOpen(false);
      }
    };
    if (priorityOpen || columnOpen || assignOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [priorityOpen, columnOpen, assignOpen]);

  return (
    <>
      <div className={styles.field}>
        <label className={styles.label}>
          Title <span className={styles.req}>*</span>
        </label>
        <input
          className={styles.input}
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          placeholder="Task title"
        />
      </div>

      <div className={styles.row2}>
        <div className={styles.field}>
          <label className={styles.label}>
            Priority <span className={styles.req}>*</span>
          </label>
          <div className={styles.priorityDropdown}>
            <button
              type="button"
              className={styles.dropdownBtn}
              onClick={() => setPriorityOpen(!priorityOpen)}
            >
              {value.priority || 'Select'}
            </button>
            <div className={`${styles.dropdownMenu} ${priorityOpen ? styles.show : ''}`}>
              <button type="button" onClick={() => { onChange({ ...value, priority: 'HIGH' }); setPriorityOpen(false); }}>HIGH</button>
              <button type="button" onClick={() => { onChange({ ...value, priority: 'MEDIUM' }); setPriorityOpen(false); }}>MEDIUM</button>
              <button type="button" onClick={() => { onChange({ ...value, priority: 'LOW' }); setPriorityOpen(false); }}>LOW</button>
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Column <span className={styles.req}>*</span>
          </label>
          <div className={styles.columnDropdown}>
            <button
              type="button"
              className={styles.dropdownBtn}
              onClick={() => setColumnOpen(!columnOpen)}
            >
              {columns.find((c: any) => c.id === value.columnId)?.title || 'Select'}
            </button>
            <div className={`${styles.dropdownMenu} ${columnOpen ? styles.show : ''}`}>
              {columns.map((c: any) => (
                <button key={c.id} type="button" onClick={() => { onChange({ ...value, columnId: c.id }); setColumnOpen(false); }}>{c.title}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Assign to</label>
        <div className={styles.assignDropdown}>
          <button
            type="button"
            className={styles.dropdownBtn}
            onClick={() => setAssignOpen(!assignOpen)}
          >
            {users.find((u: User) => u.id === value.assigneeId)?.name || 'Select member'}
          </button>
          <div className={`${styles.dropdownMenu} ${assignOpen ? styles.show : ''}`}>
            <button type="button" onClick={() => { onChange({ ...value, assigneeId: undefined }); setAssignOpen(false); }}>Select member</button>
            {users.map((u: User) => (
              <button key={u.id} type="button" onClick={() => { onChange({ ...value, assigneeId: u.id }); setAssignOpen(false); }}>{u.name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={value.description ?? ""}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Write something..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Task Image</label>
        <div className={styles.dropzone}>
          <div className={styles.uploadIcon}>
            <Icon name="file" size={20} />
          </div>
          <p className={styles.dropzoneText}>
            Drag and drop an image or <span className={styles.browse}>Browse</span>
          </p>
          <input
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  onChange({ ...value, imageUrl: reader.result as string, imageFile: file });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        {value.imageFile && (
          <div className={styles.filePreviewItem}>
            <span className={styles.fileName}>{value.imageFile.name}</span>
            <button
              type="button"
              className={styles.viewBtn}
              onClick={() => {
                const url = URL.createObjectURL(value.imageFile);
                window.open(url, "_blank");
              }}
            >
              <IoEyeOutline size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
