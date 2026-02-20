'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { departmentsData } from "@/utils/data/departments.data";
import { paginateData, handlePageChange } from "./functions";
import { departmentColumns } from "@/utils/columns";
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ListPageHeader from "@/components/ListPage/ListPageHeader";
import SearchFilterBar from "@/components/ListPage/SearchFilterBar";
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
      <ListPageHeader
        title="Departments"
        classes={{ header: styles.header, title: styles.title, addBtn: styles.addBtn }}
        addButtonText="+ Add Department"
        onAdd={() => window.location.href = '/departments/new'}
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
        searchPlaceholder="Search departments..."
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
