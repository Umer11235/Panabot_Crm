"use client";
import { ConfirmDeleteProps } from "@/utils/types/kanban-components.types";
export default function ConfirmDelete({ message }: ConfirmDeleteProps) {
  return (
    <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
      {message}
    </p>
  );
}
