"use client";

import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { employeesData } from "@/utils/data/employees.data";
import { paginateData, handlePageChange } from "./functions";
import { employeeColumns } from "@/utils/columns";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import ListPageHeader from "@/components/ListPage/ListPageHeader";
import SearchFilterBar from "@/components/ListPage/SearchFilterBar";
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
      <ListPageHeader
        title="All Employees"
        classes={{ header: styles.header, title: styles.title, addBtn: styles.addBtn }}
        addButtonText="+ Add New Employee"
        onAdd={() => window.location.href = '/employees/new'}
      />

      <SearchFilterBar
        classes={{
          searchBar: styles.searchBar,
          searchInput: styles.searchInput,
          filterDropdown: styles.filterDropdown,
          filterBtn: styles.filterBtn,
          filterMenu: styles.filterMenu,
          show: styles.show,
          active: styles.active,
        }}
        searchPlaceholder="Search employees..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterLabel={filterStatus === 'all' ? 'All Status' : filterStatus}
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen(!filterOpen)}
        filterValue={filterStatus}
        filterOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ]}
        onSelectFilter={(value) => {
          setFilterStatus(value);
          setFilterOpen(false);
        }}
      />

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
