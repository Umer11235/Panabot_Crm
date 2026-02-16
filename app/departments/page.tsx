'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { departmentsData } from "@/utils/data/departments.data";
import { paginateData, handlePageChange } from "./functions";
import { departmentColumns } from "@/utils/columns";
import ConfirmModal from '@/components/Modal/ConfirmModal';
import styles from './departments.module.css';

export default function DepartmentsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const paginatedData = paginateData(departmentsData, page, pageSize);

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

  const handleDelete = (dept: any) => {
    setDeleteModal({ isOpen: true, item: dept });
  };

  const confirmDelete = () => {
    console.log('Deleting department:', deleteModal.item);
    alert(`Department ${deleteModal.item.department} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Departments</h1>
        <button className={styles.addBtn} onClick={() => window.location.href = '/departments/new'}>+ Add Department</button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search departments..."
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
        data={paginatedData}
        columns={departmentColumns}
        // onAdd={() => window.location.href = '/departments/new'}
        onView={(dept) => window.location.href = `/departments/view/${encodeURIComponent(dept.id)}`}
        onEdit={(dept) => window.location.href = `/departments/edit/${encodeURIComponent(dept.id)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={departmentsData.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
        
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Department"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.department}
      />
    </div>
  );
}
