"use client";

import { useState, useEffect } from 'react';
import DataTable from '@/components/DataTable/ProjectTable';
import { subscriptionsData } from '@/utils/data/subscriptions.data';
import { subscriptionColumns } from '@/utils/columns';
import Button from '@/components/(Inputs)/Button/Button';
import ConfirmModal from '@/components/Modal/ConfirmModal';
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
      <div className={styles.header}>
        <h1 className={styles.title}>Subscriptions</h1>
         <button className={styles.addBtn} onClick={() => window.location.href = '/subscriptions/new'}>+ Add Subscription</button>

      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />



               <div className={styles.actions}>
          <div className={styles.filterDropdown}>
            <button className={styles.filterBtn} onClick={() => setFilterOpen(!filterOpen)}>
              {filterStatus === 'all' ? 'All Status' : filterStatus}
            </button>
            <div className={`${styles.filterMenu} ${filterOpen ? styles.show : ''}`}>
              <button className={filterStatus === 'all' ? styles.active : ''} onClick={() => { setFilterStatus('all'); setFilterOpen(false); }}>All Status</button>
              <button className={filterStatus === 'Active' ? styles.active : ''} onClick={() => { setFilterStatus('Active'); setFilterOpen(false); }}>Active</button>
              <button className={filterStatus === 'Pending' ? styles.active : ''} onClick={() => { setFilterStatus('Pending'); setFilterOpen(false); }}>Pending</button>
              <button className={filterStatus === 'Expired' ? styles.active : ''} onClick={() => { setFilterStatus('Expired'); setFilterOpen(false); }}>Expired</button>
            </div>
          </div>
          {/* <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/subscriptions/new'}>+ Add Subscription</Button>
          </div> */}
        </div>
      </div>

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
