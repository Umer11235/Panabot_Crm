'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { holidaysData } from "@/utils/data/holidays.data";
import { holidayColumns } from "@/utils/columns";
import ConfirmModal from '@/components/Modal/ConfirmModal';
import styles from './holidays.module.css';

export default function HolidaysPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  // close filter dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.filterDropdown}`)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [filterOpen]);

  const handleDelete = (holiday: any) => {
    setDeleteModal({ isOpen: true, item: holiday });
  };

  const confirmDelete = () => {
    console.log('Deleting holiday:', deleteModal.item);
    alert(`Holiday ${deleteModal.item.holiday} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Holidays</h1>
        <button className={styles.addBtn} onClick={() => window.location.href = '/holidays/new'}>+ Add Holiday</button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search holidays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.filterDropdown}>
          <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
            {filterStatus === 'all' ? 'All Status' : filterStatus}
          </button>
          <div className={`${styles.filterMenu} ${filterOpen ? styles.show : ''}`}>
            <button className={filterStatus === 'all' ? styles.active : ''} onClick={() => { setFilterStatus('all'); setFilterOpen(false); }}>All Status</button>
            <button className={filterStatus === 'Active' ? styles.active : ''} onClick={() => { setFilterStatus('Active'); setFilterOpen(false); }}>Active</button>
            <button className={filterStatus === 'Inactive' ? styles.active : ''} onClick={() => { setFilterStatus('Inactive'); setFilterOpen(false); }}>Inactive</button>
          </div>
        </div>
      </div>

      <DataTable
        title=""
        data={holidaysData}
        columns={holidayColumns}
        // onAdd={() => window.location.href = '/holidays/new'}
        onView={(holiday) => window.location.href = `/holidays/view/${encodeURIComponent(holiday.id)}`}
        onEdit={(holiday) => window.location.href = `/holidays/edit/${encodeURIComponent(holiday.id)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={holidaysData.length}
        onPageChange={(newPage) => setPage(newPage)}
      />
        
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, item: null })}
          onConfirm={confirmDelete}
          title="Delete Holiday"
          message="Are you sure you want to delete"
          itemName={deleteModal.item?.holiday}
        />
    </div>
  );
}
