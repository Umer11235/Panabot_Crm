"use client";
import React from "react";
import { IoReorderTwo } from 'react-icons/io5';
import styles from "./TaskCard.module.css";
import type { Task, User } from "@/utils/types/kanban.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCardProps } from "@/utils/types/kanban-components.types";
function getAssignee(task: Task, users: User[]) {
  if (!task.assigneeId) return null;
  return users.find((u) => u.id === task.assigneeId) || null;
}
export default function TaskCard({ task, users, onClick, overlay = false }: TaskCardProps) {
  const { setNodeRef, transform, transition, attributes, listeners } = useSortable({
    id: task.id,
    data: { type: "task" },
    disabled: overlay,
  });
  const assignee = getAssignee(task, users);
  const style: React.CSSProperties = overlay ? {} : { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={[styles.card, overlay ? styles.overlay : ""].join(" ")}
      {...(overlay ? {} : attributes)}
      {...(overlay ? {} : listeners)}
      onDoubleClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.top}>
        <div className={styles.titleRow}>
          <span className={styles.grip}><IoReorderTwo size={16} /></span>
          <span className={styles.title}>{task.title}</span>
        </div>
        <span className={[styles.badge, styles[task.priority]].join(" ")}>
          {task.priority}
        </span>
      </div>
      <div className={styles.meta}>
        <div className={styles.assignee}>
          {assignee ? (
            <>
              <span className={styles.avatar}>
                {assignee.avatar ? <img src={assignee.avatar} alt="" /> : assignee.name.slice(0, 2).toUpperCase()}
              </span>
              <span className={styles.assigneeName}>{assignee.name}</span>
            </>
          ) : (
            <>
              <span className={styles.dot} />
              <span className={styles.assigneeName}>Unassigned</span>
            </>
          )}
        </div>
        <div className={styles.created}>
          Created {new Date(task.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </div>
      </div>
      {task.imageUrl && (
        <div className={styles.imageWrapper}>
          <img src={task.imageUrl} alt={task.title} className={styles.taskImage} />
        </div>
      )}
      {task.description ? <div className={styles.desc}>{task.description}</div> : null}
    </div>
  );
}
