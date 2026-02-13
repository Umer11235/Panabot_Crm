"use client";

import { useMemo, useState } from "react";
import styles from "./BoardsPage.module.css";
import { useKanbanStore } from "@/utils/stores/kanban.store";
import Button from "@/components/(Inputs)/Button/Button";
import Modal from "./Modal";
import BoardForm from "./BoardForm";
import ConfirmDelete from "./ConfirmDelete";
import type { Id } from "@/utils/types/kanban.types";

export default function BoardsPage() {
  const { state, addBoard, updateBoardName, deleteBoard } = useKanbanStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [editBoardId, setEditBoardId] = useState<Id | null>(null);
  const [deleteBoardId, setDeleteBoardId] = useState<Id | null>(null);

  const boards = useMemo(
    () => state.boardOrder.map((id) => state.boards[id]).filter(Boolean),
    [state]
  );

  const onCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const id = addBoard(trimmed);
    setName("");
    setOpen(false);
    window.location.href = `/boards/${id}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Boards</h1>
        <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
          + New Board
        </Button>
      </div>

      <div className={styles.grid}>
        {boards.map((b) => (
          <div key={b.id} className={styles.boardCard}>
            <a href={`/boards/${b.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className={styles.boardName}>{b.name}</div>
              <div className={styles.created}>
                Created {new Date(b.createdAt).toLocaleString()}
              </div>
            </a>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setEditBoardId(b.id);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteBoardId(b.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <div>
                <div className={styles.modalTitle}>New Board</div>
                <div className={styles.modalSub}>Create a new board.</div>
              </div>
              <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>
            <label className={styles.label}>Board name</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Test Project"
            />
            <div className={styles.modalActions}>
              <Button variant="primary" size="sm" onClick={onCreate} disabled={!name.trim()}>
                Create
              </Button>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={!!editBoardId}
        title="Edit Board"
        subtitle="Update the board name."
        onClose={() => setEditBoardId(null)}
      >
        <BoardForm
          initialName={editBoardId ? state.boards[editBoardId]?.name : ""}
          submitLabel="Update Board"
          onCancel={() => setEditBoardId(null)}
          onSubmit={(newName) => {
            if (editBoardId) updateBoardName(editBoardId, newName);
            setEditBoardId(null);
          }}
        />
      </Modal>

      <Modal
        open={!!deleteBoardId}
        title="Delete Board"
        subtitle="Are you sure you want to delete this board? All columns and tasks will be permanently removed."
        onClose={() => setDeleteBoardId(null)}
      >
        <ConfirmDelete
          onCancel={() => setDeleteBoardId(null)}
          onConfirm={() => {
            if (deleteBoardId) deleteBoard(deleteBoardId);
            setDeleteBoardId(null);
          }}
        />
      </Modal>
    </div>
  );
}
