'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { leavesData } from "@/utils/data/leaves.data";
import { paginateData, handlePageChange } from "./functions";
import { leaveColumns } from "@/utils/columns";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import styles from './leaves.module.css';

export default function LeavesPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.filterDropdown}`)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [filterOpen]);

  const filtered = leavesData.filter(l => {
    const matchesSearch = [l.name, l.department, l.position, l.leaveType].join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedData = paginateData(filtered, page, pageSize);

  const handleDelete = (leave: any) => {
    setDeleteModal({ isOpen: true, item: leave });
  };

  const confirmDelete = () => {
    console.log('Deleting leave:', deleteModal.item);
    alert(`Leave for ${deleteModal.item.name} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Employee Leave</h1>
        <button className={styles.addBtn} onClick={() => window.location.href = '/leaves/new'}>+ Add New Leave</button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search leaves..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            <button className={filterStatus === 'Approved' ? styles.active : ''} onClick={() => { setFilterStatus('Approved'); setFilterOpen(false); }}>Approved</button>
            <button className={filterStatus === 'Pending' ? styles.active : ''} onClick={() => { setFilterStatus('Pending'); setFilterOpen(false); }}>Pending</button>
            <button className={filterStatus === 'Denied' ? styles.active : ''} onClick={() => { setFilterStatus('Denied'); setFilterOpen(false); }}>Denied</button>
          </div>
        </div>
      </div>

      <DataTable
        title=""
        data={paginatedData}
        columns={leaveColumns}
        addButtonText=""
        onView={(leave) => window.location.href = `/leaves/view/${encodeURIComponent(leave.id)}`}
        onEdit={(leave) => window.location.href = `/leaves/edit/${encodeURIComponent(leave.id)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={filtered.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Leave"
        message="Are you sure you want to delete leave for"
        itemName={deleteModal.item?.name}
      />
    </div>
  );
}
