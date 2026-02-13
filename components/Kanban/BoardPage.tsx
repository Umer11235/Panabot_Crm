"use client";
import { useMemo, useState } from "react";
import { IoSettingsOutline, IoArrowBack } from 'react-icons/io5';
import styles from "./BoardPage.module.css";
import { useKanbanStore } from "@/utils/stores/kanban.store";
import KanbanBoard from "./KanbanBoard";
import TaskForm from "./TaskForm";
import Modal from "./Modal";
import type { Id } from "@/utils/types/kanban.types";
import Button from "@/components/(Inputs)/Button/Button";
import ConfirmDelete from "./ConfirmDelete";
import ColumnForm from "./ColumnForm";
import BoardForm from "./BoardForm";
import Dropdown from "./Dropdown";
import { BoardPageProps } from "@/utils/types/kanban-components.types";
export default function BoardPage({ boardId }: BoardPageProps) {
  const { state, addColumn, addTask, updateTask, moveTask, reorderTaskWithinColumn,
  updateColumnTitle,  
  deleteColumn,       
  reorderColumns,
  updateBoardName, 
  deleteBoard,     
  } = useKanbanStore();
  const board = state.boards[boardId];
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskColumnId, setTaskColumnId] = useState<Id | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<Id | null>(null);
  const [columnModal, setColumnModal] = useState<null | { type: "add" | "edit"; columnId?: Id }>(null);
  const [deleteColumnId, setDeleteColumnId] = useState<Id | null>(null);
const [boardModal, setBoardModal] = useState<null | { type: "edit" | "delete" }>(null);
  const users = state.users;
  const openAddTask = (colId: Id) => {
    setEditingTaskId(null);
    setTaskColumnId(colId);
    setTaskModalOpen(true);
  };
  const openEditTask = (taskId: Id) => {
    setEditingTaskId(taskId);
    setTaskColumnId(null);
    setTaskModalOpen(true);
  };
  const taskInitial = useMemo(() => {
    if (!board || !editingTaskId) return null;
    const t = board.tasks[editingTaskId];
    if (!t) return null;
    const columnId =
      board.columnOrder.find((cid) => board.columns[cid].taskIds.includes(editingTaskId)) || board.columnOrder[0];
    return { ...t, columnId };
  }, [board, editingTaskId]);
  if (!board) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>Board not found.</div>        <a className={styles.back} href="/boards"><IoArrowBack size={16} /> Back to boards</a>
      </div>
    );
  }
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>{board.name}</h1>
        </div>
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={() => setColumnModal({ type: "add" })}>
            + Add Column
          </Button>
          <Dropdown
            trigger={
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
                <IoSettingsOutline size={20} /> Actions
              </span>
            }
            items={[
              {
                label: "Add Column",
                onClick: () => setColumnModal({ type: "add" }),
              },
              {
                label: "Edit Board",
                onClick: () => setBoardModal({ type: "edit" }),
              },
              { type: "separator" },
              {
                label: "Delete Board",
                onClick: () => setBoardModal({ type: "delete" }),
                danger: true,
              },
            ]}
          />
        </div>
      </div>
      <KanbanBoard
        board={board}
        users={users}
        onAddTask={openAddTask}
        onEditTask={openEditTask}
        onMoveTask={(fromColId, toColId, taskId, toIndex) => moveTask(boardId, fromColId, toColId, taskId, toIndex)}
        onReorder={(colId, nextIds) => reorderTaskWithinColumn(boardId, colId, nextIds)}
        onReorderColumns={(nextOrder) => reorderColumns(boardId, nextOrder)}
        onEditColumn={(columnId) => setColumnModal({ type: "edit", columnId })}
        onDeleteColumn={(columnId) => setDeleteColumnId(columnId)}
      />
      <Modal
        open={taskModalOpen}
        title={editingTaskId ? "Edit Task" : "Add Task"}
        subtitle={editingTaskId ? "Edit the task." : "Create a new task."}
        onClose={() => setTaskModalOpen(false)}
      >
        <TaskForm
          users={users}
          columns={board.columnOrder.map((cid) => board.columns[cid])}
          initial={
            editingTaskId && taskInitial
              ? taskInitial
              : {
                  title: "",
                  description: "",
                  priority: "MEDIUM",
                  assigneeId: undefined,
                  columnId: taskColumnId ?? board.columnOrder[0],
                }
          }
          submitLabel={editingTaskId ? "Update Task" : "Add Task"}
          onSubmit={(payload) => {
            if (editingTaskId) {
              updateTask(boardId, editingTaskId, {
                title: payload.title,
                description: payload.description,
                priority: payload.priority,
                assigneeId: payload.assigneeId,
                columnId: payload.columnId,
              });
            } else {
              addTask(boardId, payload.columnId, payload);
            }
            setTaskModalOpen(false);
          }}
          onCancel={() => setTaskModalOpen(false)}
        />
      </Modal>
      <Modal
        open={!!columnModal}
        title={columnModal?.type === "edit" ? "Edit Column" : "Add Column"}
        subtitle={columnModal?.type === "edit" ? "Edit the column." : "Add a new column to the board."}
        onClose={() => setColumnModal(null)}
      >
  <ColumnForm
    initialTitle={
      columnModal?.type === "edit" && columnModal.columnId
        ? board.columns[columnModal.columnId]?.title || ""
        : ""
    }
    submitLabel={columnModal?.type === "edit" ? "Update Column" : "Create Column"}
    onCancel={() => setColumnModal(null)}
    onSubmit={(title) => {
      if (columnModal?.type === "edit" && columnModal.columnId) {
        updateColumnTitle(boardId, columnModal.columnId, title);
      } else {
        addColumn(boardId, title);
      }
      setColumnModal(null);
    }}
  />
</Modal>
<Modal
  open={!!deleteColumnId}
  title="Delete Column"
  subtitle="Are you sure you want to delete this column? All tasks in this column will be permanently removed."
  onClose={() => setDeleteColumnId(null)}
>
  <ConfirmDelete
    onCancel={() => setDeleteColumnId(null)}
    onConfirm={() => {
      if (deleteColumnId) deleteColumn(boardId, deleteColumnId);
      setDeleteColumnId(null);
    }}
  />
</Modal>
<Modal
  open={boardModal?.type === "edit"}
  title="Edit Board"
  subtitle="Update the board name."
  onClose={() => setBoardModal(null)}
>
  <BoardForm
    initialName={board.name}
    submitLabel="Update Board"
    onCancel={() => setBoardModal(null)}
    onSubmit={(name) => {
      updateBoardName(boardId, name);
      setBoardModal(null);
    }}
  />
</Modal>
<Modal
  open={boardModal?.type === "delete"}
  title="Delete Board"
  subtitle="Are you sure you want to delete this board? All columns and tasks will be permanently removed."
  onClose={() => setBoardModal(null)}
>
  <ConfirmDelete
    onCancel={() => setBoardModal(null)}
    onConfirm={() => {
      deleteBoard(boardId);
      window.location.href = "/boards";
    }}
  />
</Modal>
    </div>
  );
}
