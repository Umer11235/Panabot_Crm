"use client";

import { useState, useEffect } from 'react';
import CompanyCard from "@/components/(Cards)/CompanyCard/CompanyCard";
import DataTable from "@/components/DataTable/ProjectTable";
import { clientsData } from '@/utils/data/clients.data';
import { clientColumns } from '@/utils/columns/client.columns';
import Button from '@/components/(Inputs)/Button/Button';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import Img1 from '../../public/images/client.jpg';
import styles from './clients.module.css';

export default function ClientsPage() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.dropdown}`) && !target.closest(`.${styles.filterDropdown}`)) {
        setOpenMenuId(null);
        setFilterOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const paginatedData = clientsData.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = (client: any) => {
    setDeleteModal({ isOpen: true, item: client });
  };

  const confirmDelete = () => {
    console.log('Deleting client:', deleteModal.item);
    alert(`Client ${deleteModal.item.name} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Clients</h1>
        <div className={styles.actions}>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'card' ? styles.active : ''}`}
              onClick={() => setViewMode('card')}
            >
              Card View
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'table' ? styles.active : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
          </div>
          <button className={styles.addBtn} onClick={() => window.location.href = '/clients/new'}>
            + Add New Client
          </button>
        </div>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.filterDropdown}>
          <button
            className={styles.filterBtn}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterStatus === 'all' ? 'All Clients' : filterStatus === 'active' ? 'Active' : 'Inactive'}
          </button>
          <div className={`${styles.filterMenu} ${filterOpen ? styles.show : ''}`}>
            <button className={filterStatus === 'all' ? styles.active : ''} onClick={() => { setFilterStatus('all'); setFilterOpen(false); }}>All Clients</button>
            <button className={filterStatus === 'active' ? styles.active : ''} onClick={() => { setFilterStatus('active'); setFilterOpen(false); }}>Active</button>
            <button className={filterStatus === 'inactive' ? styles.active : ''} onClick={() => { setFilterStatus('inactive'); setFilterOpen(false); }}>Inactive</button>
          </div>
        </div>
      </div>

      {viewMode === 'card' ? (
        <>
          <div className={styles.grid}>
            {paginatedData.map((client) => (
              <div key={client.id} className={styles.cardWrapper}>
                <CompanyCard
                  name={client.name}
                  email={client.email}
                  contactPerson={client.contactPerson}
                  contactPhone={client.contactPhone}
                  totalProjects={client.totalProjects}
                  logoSrc={Img1}
                  secondaryAction={{
                    label: 'View Details',
                    onClick: () => (window.location.href = `/clients/view/${encodeURIComponent(client.id)}`)
                  }}
                />
                <div className={styles.dropdown}>
                  <button 
                    className={styles.menuBtn} 
                    onClick={() => setOpenMenuId(openMenuId === client.id ? null : client.id)}
                  >
                    •••
                  </button>
                  <div className={`${styles.dropdownMenu} ${openMenuId === client.id ? styles.show : ''}`}>
                    <button onClick={() => { setOpenMenuId(null); window.location.href = `/clients/view/${encodeURIComponent(client.id)}`; }}>View</button>
                    <button onClick={() => { setOpenMenuId(null); window.location.href = `/clients/edit/${encodeURIComponent(client.id)}`; }}>Edit</button>
                    <button onClick={() => { setOpenMenuId(null); handleDelete(client); }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <p>Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, clientsData.length)} of {clientsData.length} entries</p>
            <div className={styles.paginationBtns}>
              <button className={styles.paginationBtn} disabled={page === 1} onClick={() => setPage(page - 1)}>←</button>
              {[...Array(Math.ceil(clientsData.length / pageSize))].map((_, i) => (
                <button key={i} className={`${styles.paginationBtn} ${page === i + 1 ? styles.active : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className={styles.paginationBtn} disabled={page === Math.ceil(clientsData.length / pageSize)} onClick={() => setPage(page + 1)}>→</button>
            </div>
          </div>
        </>
      ) : (
        <DataTable
          title=""
          data={paginatedData}
          columns={clientColumns}
          addButtonText=""
          onView={(c) => window.location.href = `/clients/view/${encodeURIComponent(c.id)}`}
          onEdit={(c) => window.location.href = `/clients/edit/${encodeURIComponent(c.id)}`}
          onDelete={handleDelete}
          currentPage={page}
          pageSize={pageSize}
          totalEntries={clientsData.length}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Client"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.name}
      />
    </div>
  );
}