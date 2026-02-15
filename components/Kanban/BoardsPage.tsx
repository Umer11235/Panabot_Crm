"use client";

import { useMemo, useState, useEffect } from "react";
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
  const [editName, setEditName] = useState("");
  const [deleteBoardId, setDeleteBoardId] = useState<Id | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<Id | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.filterDropdown}`) && !target.closest(`.${styles.dropdown}`)) {
        setFilterOpen(false);
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  const onUpdate = () => {
    const trimmed = editName.trim();
    if (!trimmed || !editBoardId) return;
    updateBoardName(editBoardId, trimmed);
    setEditBoardId(null);
    setEditName("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Boards</h1>
        <button className={styles.addBtn} onClick={() => setOpen(true)}>
          + New Board
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search boards..."
          className={styles.searchInput}
        />
        <div className={styles.filterDropdown}>
          <button
            className={styles.filterBtn}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterStatus === 'all' ? 'All Status' : filterStatus}
          </button>
          <div className={`${styles.filterMenu} ${filterOpen ? styles.show : ''}`}>
            <button className={filterStatus === 'all' ? styles.active : ''} onClick={() => { setFilterStatus('all'); setFilterOpen(false); }}>All Status</button>
            <button className={filterStatus === 'Active' ? styles.active : ''} onClick={() => { setFilterStatus('Active'); setFilterOpen(false); }}>Active</button>
            <button className={filterStatus === 'Archived' ? styles.active : ''} onClick={() => { setFilterStatus('Archived'); setFilterOpen(false); }}>Archived</button>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {boards.map((b) => (
          <div key={b.id} className={styles.cardWrapper}>
            <div className={styles.boardCard}>
              <a href={`/boards/${b.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={styles.boardHeader}>
                  <div className={styles.boardIcon}>📋</div>
                  <div className={styles.boardName}>{b.name}</div>
                </div>
                <div className={styles.boardDetails}>
                  <p className={styles.detailItem}>
                    <span className={styles.detailIcon}>Created:</span>
                    <span className={styles.detailText}>{new Date(b.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className={styles.detailItem}>
                    <span className={styles.detailIcon}>Columns:</span>
                    <span className={styles.detailText}>{Object.keys(state.boards[b.id]?.columns || {}).length}</span>
                  </p>
                  <p className={styles.detailItem}>
                    <span className={styles.detailIcon}>Total Tasks:</span>
                    <span className={styles.detailText}>
                      {Object.values(state.boards[b.id]?.columns || {}).reduce((acc, col: any) => acc + (col.taskIds?.length || 0), 0)}
                    </span>
                  </p>
                </div>
              </a>
              <div className={styles.cardFooter}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/boards/${b.id}`;
                  }}
                  fullWidth={true}
                >
                  View Details
                </Button>
              </div>
            </div>
            <div className={styles.dropdown}>
              <button 
                className={styles.menuBtn} 
                onClick={() => setOpenMenuId(openMenuId === b.id ? null : b.id)}
              >
                •••
              </button>
              <div className={`${styles.dropdownMenu} ${openMenuId === b.id ? styles.show : ''}`}>
                <button onClick={() => { setOpenMenuId(null); window.location.href = `/boards/${b.id}`; }}>View</button>
                <button onClick={() => { setOpenMenuId(null); setEditName(b.name); setEditBoardId(b.id); }}>Edit</button>
                <button onClick={() => { setOpenMenuId(null); setDeleteBoardId(b.id); }}>Delete</button>
              </div>
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
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label>Board name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Test Project"
                />
              </div>
            </div>
            <div className={styles.modalActions}>
              <Button variant="outline" size="md" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={onCreate} disabled={!name.trim()}>
                Create
              </Button>
            </div>
          </div>
        </div>
      )}

      {editBoardId && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <div>
                <div className={styles.modalTitle}>Edit Board</div>
                <div className={styles.modalSub}>Update board name.</div>
              </div>
              <button className={styles.close} onClick={() => setEditBoardId(null)} aria-label="Close">
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label>Board name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Test Project"
                />
              </div>
            </div>
            <div className={styles.modalActions}>
              <Button variant="outline" size="md" onClick={() => setEditBoardId(null)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                onClick={onUpdate}
                disabled={!editName.trim()}
              >
                Update Board
              </Button>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={!!deleteBoardId}
        title="Delete Board"
        onClose={() => setDeleteBoardId(null)}
      >
        <ConfirmDelete
          message="Are you sure you want to delete this board? All columns and tasks will be permanently removed."
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
