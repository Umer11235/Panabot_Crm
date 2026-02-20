'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { holidaysData } from "@/utils/data/holidays.data";
import { holidayColumns } from "@/utils/columns";
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ListPageHeader from "@/components/ListPage/ListPageHeader";
import SearchFilterBar from "@/components/ListPage/SearchFilterBar";
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
      <ListPageHeader
        title="Holidays"
        classes={{ header: styles.header, title: styles.title, addBtn: styles.addBtn }}
        addButtonText="+ Add Holiday"
        onAdd={() => window.location.href = '/holidays/new'}
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
        searchPlaceholder="Search holidays..."
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
