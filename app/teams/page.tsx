"use client";

import { useState, useEffect } from 'react';
import ProjectCard from "@/components/(Cards)/ProjectCard/ProjectCard";
import DataTable from "@/components/DataTable/ProjectTable";
import Button from '@/components/(Inputs)/Button/Button';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import userimg from '../../public/images/users.jpg';
import { teamsData } from '@/utils/data/teams.data';
import { teamColumns } from '@/utils/columns/team.columns';
import styles from './teams.module.css';

export default function TeamsPage() {
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

  const paginatedData = teamsData.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = (team: any) => {
    setDeleteModal({ isOpen: true, item: team });
  };

  const confirmDelete = () => {
    console.log('Deleting team:', deleteModal.item);
    alert(`Team ${deleteModal.item.name} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Teams</h1>
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
          <button className={styles.addBtn} onClick={() => window.location.href = '/teams/new'}>
            + Add New Team
          </button>
        </div>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search teams..."
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

      {viewMode === 'card' ? (
        <>
          <div className={styles.grid}>
            {paginatedData.map((team) => (
              <ProjectCard
                key={team.id}
                leaderName={team.leader}
                leaderRole={team.leaderRole || 'Team Leader'}
                leaderAvatarSrc={userimg}
                title={team.name}
                members={team.members}
                progress={team.progress}
                progressLabel={`Projects: ${team.projects}`}
                menu={
                  <div className={styles.dropdown}>
                    <button 
                      className={styles.menuBtn} 
                      onClick={() => setOpenMenuId(openMenuId === team.id ? null : team.id)}
                    >
                      •••
                    </button>
                    <div className={`${styles.dropdownMenu} ${openMenuId === team.id ? styles.show : ''}`}>
                      <button onClick={() => { setOpenMenuId(null); window.location.href = `/teams/view/${encodeURIComponent(team.id)}`; }}>View</button>
                      <button onClick={() => { setOpenMenuId(null); window.location.href = `/teams/edit/${encodeURIComponent(team.id)}`; }}>Edit</button>
                      <button onClick={() => { setOpenMenuId(null); handleDelete(team); }}>Delete</button>
                    </div>
                  </div>
                }
                ctaLabel="View Details"
                onCtaClick={() => (window.location.href = `/teams/view/${encodeURIComponent(team.id)}`)}
              />
            ))}
          </div>
          <div className={styles.pagination}>
            <p>Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, teamsData.length)} of {teamsData.length} entries</p>
            <div className={styles.paginationBtns}>
              <button className={styles.paginationBtn} disabled={page === 1} onClick={() => setPage(page - 1)}>←</button>
              {[...Array(Math.ceil(teamsData.length / pageSize))].map((_, i) => (
                <button key={i} className={`${styles.paginationBtn} ${page === i + 1 ? styles.active : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className={styles.paginationBtn} disabled={page === Math.ceil(teamsData.length / pageSize)} onClick={() => setPage(page + 1)}>→</button>
            </div>
          </div>
        </>
      ) : (
        <DataTable
          title=""
          data={paginatedData}
          columns={teamColumns}
          addButtonText=""
          onView={(t) => window.location.href = `/teams/view/${encodeURIComponent(t.id)}`}
          onEdit={(t) => window.location.href = `/teams/edit/${encodeURIComponent(t.id)}`}
          onDelete={handleDelete}
          currentPage={page}
          pageSize={pageSize}
          totalEntries={teamsData.length}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Team"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.name}
      />
    </div>
  );
}