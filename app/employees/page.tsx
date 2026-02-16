"use client";

import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { employeesData } from "@/utils/data/employees.data";
import { paginateData, handlePageChange } from "./functions";
import { employeeColumns } from "@/utils/columns";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import styles from "./employees.module.css";

export default function EmployeesPage() {
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

  const paginatedData = paginateData(employeesData, page, pageSize);

  const handleDelete = (employee: any) => {
    setDeleteModal({ isOpen: true, item: employee });
  };

  
  const confirmDelete = () => {
    console.log('Deleting employee:', deleteModal.item);
    alert(`Employee ${deleteModal.item.name} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Employees</h1>
        <button className={styles.addBtn} onClick={() => window.location.href = '/employees/new'}>
          + Add New Employee
        </button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search employees..."
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
            <button className={filterStatus === 'Active' ? styles.active : ''} onClick={() => { setFilterStatus('Active'); setFilterOpen(false); }}>Active</button>
            <button className={filterStatus === 'Inactive' ? styles.active : ''} onClick={() => { setFilterStatus('Inactive'); setFilterOpen(false); }}>Inactive</button>
          </div>
        </div>
      </div>

      <DataTable
        title=""
        data={paginatedData}
        columns={employeeColumns}
        addButtonText=""
        onView={(emp) => window.location.href = `/employees/view/${encodeURIComponent(emp.id)}`}
        onEdit={(emp) => window.location.href = `/employees/edit/${encodeURIComponent(emp.id)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={employeesData.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
      />
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Employee"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.name}
      />
    </div>
  );
}