"use client";

import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable/ProjectTable';
import { subscriptionsData } from '@/utils/data/subscriptions.data';
import { subscriptionColumns } from '@/utils/columns';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ListPageHeader from '@/components/ListPage/ListPageHeader';
import SearchFilterBar from '@/components/ListPage/SearchFilterBar';
import styles from './subscriptions.module.css';

export default function SubscriptionsListPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.filterDropdown}`)) setFilterOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const filtered = subscriptionsData.filter(s => {
    const matchesSearch = `${s.subscription} ${s.vendor}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = (item: any) => setDeleteModal({ isOpen: true, item });
  const confirmDelete = () => {
    alert(`Deleted ${deleteModal.item?.subscription || deleteModal.item?.id}`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <ListPageHeader
        title="Subscriptions"
        classes={{ header: styles.header, title: styles.title, addBtn: styles.addBtn }}
        addButtonText="+ Add Subscription"
        onAdd={() => window.location.href = '/subscriptions/new'}
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
        searchPlaceholder="Search subscriptions..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterLabel={filterStatus === 'all' ? 'All Status' : filterStatus}
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen(!filterOpen)}
        filterValue={filterStatus}
        filterOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'Active', label: 'Active' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Expired', label: 'Expired' },
        ]}
        onSelectFilter={(value) => {
          setFilterStatus(value);
          setFilterOpen(false);
        }}
      />

      <DataTable
        title=""
        data={paginatedData}
        columns={subscriptionColumns}
        addButtonText=""
        onView={(s) => window.location.href = `/subscriptions/view/${encodeURIComponent(s.id)}`}
        onEdit={(s) => window.location.href = `/subscriptions/edit/${encodeURIComponent(s.id)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={filtered.length}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Subscription"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.subscription}
      />
    </div>
  );
}
