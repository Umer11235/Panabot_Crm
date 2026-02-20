'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { leavesData } from "@/utils/data/leaves.data";
import { paginateData, handlePageChange } from "./functions";
import { leaveColumns } from "@/utils/columns";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import ListPageHeader from "@/components/ListPage/ListPageHeader";
import SearchFilterBar from "@/components/ListPage/SearchFilterBar";
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
      <ListPageHeader
        title="Employee Leave"
        classes={{ header: styles.header, title: styles.title, addBtn: styles.addBtn }}
        addButtonText="+ Add New Leave"
        onAdd={() => window.location.href = '/leaves/new'}
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
        searchPlaceholder="Search leaves..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterLabel={filterStatus === 'all' ? 'All Status' : filterStatus}
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen(!filterOpen)}
        filterValue={filterStatus}
        filterOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'Approved', label: 'Approved' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Denied', label: 'Denied' },
        ]}
        onSelectFilter={(value) => {
          setFilterStatus(value);
          setFilterOpen(false);
        }}
      />

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
