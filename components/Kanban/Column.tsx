"use client";
import React from "react";
import { IoEllipsisVertical } from 'react-icons/io5';
import styles from "./Column.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import Button from "@/components/(Inputs)/Button/Button";
import Dropdown from "./Dropdown";
import Icon from "@/utils/Icons";
import { ColumnProps } from "@/utils/types/kanban-components.types";
export default function Column({ column, tasks, users, onAddTask, onEditTask, onEditColumn, onDeleteColumn }: ColumnProps) {
  const { setNodeRef, transform, transition, attributes, listeners,isDragging  } = useSortable({
    id: column.id,
    data: { type: "column" },
  });
  const style: React.CSSProperties = { 
    transform: CSS.Transform.toString(transform), 
    transition: transition || 'transform 200ms ease'
  };
  return (
    <div ref={setNodeRef} style={style}  className={[styles.col, isDragging ? styles.dragging : ""].join(" ")} {...attributes}>
      <div className={styles.head}>
        <div className={styles.left}>
          <button type="button" className={styles.gripBtn} {...listeners} aria-label="Drag column">
            <Icon name="drag" size={18} />
          </button>
          <span className={styles.title}>{column.title}</span>
          <span className={styles.count}>{tasks.length}</span>
        </div>
        <Dropdown
          trigger={<span className={styles.menuDot}><IoEllipsisVertical size={20} /></span>}
          items={[
            { label: "Edit Column", onClick: () => onEditColumn(column.id) },
            { label: "Add Task", onClick: onAddTask },
            { type: "separator" },
            { label: "Delete Column", onClick: () => onDeleteColumn(column.id), danger: true },
          ]}
        />
      </div>
      <div className={styles.body}>
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <TaskCard key={t.id} task={t} users={users} onClick={() => onEditTask(t.id)} />
          ))
        ) : (
          <div className={styles.empty}>
            <div className={styles.plus}>+</div>
            <div className={styles.emptyTitle}>No tasks yet</div>
            <div className={styles.emptySub}>Add a task to get started</div>
            <div className={styles.emptyBtn}>
              <Button variant="outline" size="sm" fullWidth onClick={onAddTask}>
                + Add Task
              </Button>
            </div>
          </div>
        )}
      </div>
      {tasks.length > 0 ? (
        <div className={styles.addRow}>
          <Button variant="outline" size="sm" fullWidth onClick={onAddTask}>
            + Add Task
          </Button>
        </div>
      ) : null}
    </div>
  );
}
