"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import styles from "./KanbanBoard.module.css";
import type { Id } from "@/utils/types/kanban.types";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { KanbanBoardProps, ActiveDrag } from "@/utils/types/kanban-components.types";

export default function KanbanBoard({
  board,
  users,
  onAddTask,
  onEditTask,
  onMoveTask,
  onReorder,
  onEditColumn,
  onDeleteColumn,
  onReorderColumns
}: KanbanBoardProps) {
  const [active, setActive] = useState<ActiveDrag>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 1 } }));
  const columns = useMemo(() => board.columnOrder.map((id) => board.columns[id]), [board]);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        shell.scrollLeft += e.deltaY;
      }
    };

    shell.addEventListener('wheel', handleWheel, { passive: false });
    return () => shell.removeEventListener('wheel', handleWheel);
  }, []);

  const findColumnByTaskId = (taskId: Id): Id | null => {
    for (const colId of board.columnOrder) {
      if (board.columns[colId].taskIds.includes(taskId)) return colId;
    }
    return null;
  };

  const onDragStart = (e: DragStartEvent) => {
    const type = e.active.data.current?.type as "column" | "task" | undefined;
    const id = String(e.active.id) as Id;
    if (type === "column") setActive({ type: "column", id });
    if (type === "task") setActive({ type: "task", id });
  };

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = String(active.id) as Id;
    const overId = String(over.id) as Id;
    const activeType = active.data.current?.type as "column" | "task" | undefined;
    const overType = over.data.current?.type as "column" | "task" | undefined;

    if (activeType === "column" && overType === "column" && activeId !== overId) {
      const oldIndex = board.columnOrder.indexOf(activeId);
      const newIndex = board.columnOrder.indexOf(overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(board.columnOrder, oldIndex, newIndex);
        onReorderColumns(newOrder);
      }
    }

    if (activeType === "task") {
      const fromColId = findColumnByTaskId(activeId);
      if (!fromColId) return;

      if (overType === "column") {
        const toColId = overId;
        if (toColId !== fromColId) onMoveTask(fromColId, toColId, activeId, board.columns[toColId].taskIds.length);
      } else if (overType === "task") {
        const toColId = findColumnByTaskId(overId);
        if (!toColId) return;

        if (toColId === fromColId) {
          const ids = board.columns[fromColId].taskIds;
          const oldIndex = ids.indexOf(activeId);
          const newIndex = ids.indexOf(overId);
          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            onReorder(fromColId, arrayMove(ids, oldIndex, newIndex));
          }
        } else {
          const insertIndex = board.columns[toColId].taskIds.indexOf(overId);
          onMoveTask(fromColId, toColId, activeId, insertIndex);
        }
      }
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActive(null);
  };

  return (
    <div ref={shellRef} className={styles.shell}>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={board.columnOrder} strategy={horizontalListSortingStrategy}>
          <div className={styles.columns}>
            {columns.map((col) => (
              <SortableContext key={col.id} items={col.taskIds} strategy={verticalListSortingStrategy}>
                <Column
                  column={col}
                  tasks={col.taskIds.map((tid) => board.tasks[tid])}
                  users={users}
                  onAddTask={() => onAddTask(col.id)}
                  onEditTask={onEditTask}
                  onEditColumn={onEditColumn}
                  onDeleteColumn={onDeleteColumn}
                />
              </SortableContext>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {active?.type === "task" ? (
            <div className={styles.overlayCard}>
              <TaskCard task={board.tasks[active.id]} users={users} overlay />
            </div>
          ) : active?.type === "column" ? (
            <div className={styles.overlayColumn}>
              <div className={styles.overlayColHead}>
                <span className={styles.overlayGrip}>⋮⋮</span>
                <span className={styles.overlayTitle}>{board.columns[active.id]?.title}</span>
              </div>
              <div className={styles.overlayColBody}>Moving…</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
