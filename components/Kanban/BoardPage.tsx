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
  const [taskValue, setTaskValue] = useState<any>(null);
  const [columnModal, setColumnModal] = useState<null | { type: "add" | "edit"; columnId?: Id }>(null);
  const [columnTitle, setColumnTitle] = useState("");
  const [deleteColumnId, setDeleteColumnId] = useState<Id | null>(null);
const [boardModal, setBoardModal] = useState<null | { type: "edit" | "delete" }>(null);
  const users = state.users;
  
  const openAddTask = (colId: Id) => {
    setEditingTaskId(null);
    setTaskColumnId(colId);
    setTaskValue({
      title: "",
      description: "",
      priority: "MEDIUM",
      assigneeId: undefined,
      columnId: colId,
      imageUrl: undefined,
      imageFile: undefined,
    });
    setTaskModalOpen(true);
  };
  
  const openEditTask = (taskId: Id) => {
    setEditingTaskId(taskId);
    setTaskColumnId(null);
    const t = board.tasks[taskId];
    if (t) {
      const columnId = board.columnOrder.find((cid) => board.columns[cid].taskIds.includes(taskId)) || board.columnOrder[0];
      setTaskValue({ ...t, columnId, imageFile: undefined });
    }
    setTaskModalOpen(true);
  };
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
        <h1 className={styles.title}>{board.name}</h1>
        <div className={styles.actions}>
          <Dropdown
            trigger={
              <span className={styles.outlineBtn}>
                <IoSettingsOutline size={18} /> Actions
              </span>
            }
            items={[
              {
                label: "Add Column",
                onClick: () => { setColumnTitle(""); setColumnModal({ type: "add" }); },
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
          <button className={styles.addBtn} onClick={() => { setColumnTitle(""); setColumnModal({ type: "add" }); }}>
            + Add Column
          </button>
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
        onEditColumn={(columnId) => { setColumnTitle(board.columns[columnId]?.title || ""); setColumnModal({ type: "edit", columnId }); }}
        onDeleteColumn={(columnId) => setDeleteColumnId(columnId)}
      />
      <Modal
        open={taskModalOpen}
        title={editingTaskId ? "Edit Task" : "Add Task"}
        onClose={() => { setTaskModalOpen(false); setTaskValue(null); }}
        showActions
        confirmText={editingTaskId ? "Update Task" : "Add Task"}
        confirmVariant="primary"
        onConfirm={() => {
          if (!taskValue?.title?.trim()) return;
          if (editingTaskId) {
            updateTask(boardId, editingTaskId, {
              title: taskValue.title.trim(),
              description: taskValue.description?.trim() || "",
              priority: taskValue.priority,
              assigneeId: taskValue.assigneeId,
              columnId: taskValue.columnId,
              imageUrl: taskValue.imageUrl?.trim() || undefined,
            });
          } else {
            addTask(boardId, taskValue.columnId, {
              title: taskValue.title.trim(),
              description: taskValue.description?.trim() || "",
              priority: taskValue.priority,
              assigneeId: taskValue.assigneeId,
              imageUrl: taskValue.imageUrl?.trim() || undefined,
            });
          }
          setTaskModalOpen(false);
          setTaskValue(null);
        }}
      >
        {taskValue && (
          <TaskForm
            users={users}
            columns={board.columnOrder.map((cid) => board.columns[cid])}
            value={taskValue}
            onChange={setTaskValue}
          />
        )}
      </Modal>
      <Modal
        open={!!columnModal}
        title={columnModal?.type === "edit" ? "Edit Column" : "Add Column"}
        onClose={() => { setColumnModal(null); setColumnTitle(""); }}
        showActions
        confirmText={columnModal?.type === "edit" ? "Update Column" : "Create Column"}
        confirmVariant="primary"
        onConfirm={() => {
          if (!columnTitle.trim()) return;
          if (columnModal?.type === "edit" && columnModal.columnId) {
            updateColumnTitle(boardId, columnModal.columnId, columnTitle.trim());
          } else {
            addColumn(boardId, columnTitle.trim());
          }
          setColumnModal(null);
          setColumnTitle("");
        }}
      >
        <ColumnForm
          initialTitle={columnModal?.type === "edit" && columnModal.columnId ? board.columns[columnModal.columnId]?.title || "" : ""}
          value={columnTitle}
          onChange={setColumnTitle}
        />
      </Modal>
<Modal
  open={!!deleteColumnId}
  title="Delete Column"
  onClose={() => setDeleteColumnId(null)}
  showActions
  confirmText="Delete"
  confirmVariant="danger"
  onConfirm={() => {
    if (deleteColumnId) deleteColumn(boardId, deleteColumnId);
    setDeleteColumnId(null);
  }}
>
  <ConfirmDelete
    message="All tasks in this column will be permanently removed. This action cannot be undone."
  />
</Modal>
<Modal
  open={boardModal?.type === "edit"}
  title="Edit Board"
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
  onClose={() => setBoardModal(null)}
  showActions
  confirmText="Delete"
  confirmVariant="danger"
  onConfirm={() => {
    deleteBoard(boardId);
    window.location.href = "/boards";
  }}
>
  <ConfirmDelete
    message="All columns and tasks will be permanently removed. This action cannot be undone."
  />
</Modal>
    </div>
  );
}
