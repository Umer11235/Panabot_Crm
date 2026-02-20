"use client";

import DataTable from "@/components/DataTable/ProjectTable";
import { useState, useEffect } from "react";
import { projectsData } from "@/utils/data/projects.data";
import { paginateData, handlePageChange } from "./functions";
import { projectColumns } from "@/utils/columns";
import ProjectCard from "@/components/(Cards)/ProjectCard/ProjectCard";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import ListPageHeader from "@/components/ListPage/ListPageHeader";
import SearchFilterBar from "@/components/ListPage/SearchFilterBar";
import styles from "./projectlist.module.css";

export default function ProjectListPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const paginatedData = paginateData(projectsData, page, pageSize);

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

  const handleDelete = (project: any) => {
    setDeleteModal({ isOpen: true, item: project });
  };

  const confirmDelete = () => {
    console.log('Deleting project:', deleteModal.item);
    alert(`Project ${deleteModal.item.name} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div className={styles.container}>
      <ListPageHeader
        title="All Projects"
        classes={{ header: styles.header, title: styles.title }}
        rightContent={
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
            <button className={styles.addBtn} onClick={() => window.location.href = '/newproject'}>
              + Add New Project
            </button>
          </div>
        }
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
        searchPlaceholder="Search projects..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterLabel={filterStatus === 'all' ? 'All Status' : filterStatus}
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen(!filterOpen)}
        filterValue={filterStatus}
        filterOptions={[
          { value: 'all', label: 'All Status' },
          { value: 'Completed', label: 'Completed' },
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Not Started', label: 'Not Started' },
        ]}
        onSelectFilter={(value) => {
          setFilterStatus(value);
          setFilterOpen(false);
        }}
      />
      
      {viewMode === 'card' ? (
        <>
          <div className={styles.grid}>
            {paginatedData.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                leaderName={project.manager}
                leaderRole="Project Manager"
                leaderAvatarSrc="/images/users.jpg"
                title={project.name}
                members={project.team?.map((m: any) => ({ id: m.id, name: m.name, avatarSrc: '/images/users.jpg' })) || []}
                progress={project.progress}
                progressLabel="Team Members:"
                ctaLabel="View Details"
                onCtaClick={() => window.location.href = `/projectlist/view/${encodeURIComponent(project.id)}`}
                menu={
                  <div className={styles.dropdown}>
                    <button 
                      className={styles.menuBtn} 
                      onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                    >
                      •••
                    </button>
                    <div className={`${styles.dropdownMenu} ${openMenuId === project.id ? styles.show : ''}`}>
                      <button onClick={() => { setOpenMenuId(null); window.location.href = `/projectlist/view/${encodeURIComponent(project.id)}`; }}>View</button>
                      <button onClick={() => { setOpenMenuId(null); window.location.href = `/projectlist/edit/${encodeURIComponent(project.id)}`; }}>Edit</button>
                      <button onClick={() => { setOpenMenuId(null); window.location.href = `/milestones/view/${encodeURIComponent(project.id)}`; }}>View Milestones</button>
                      <button onClick={() => { setOpenMenuId(null); handleDelete(project); }}>Delete</button>
                    </div>
                  </div>
                }
              />
            ))}
          </div>
          <div className={styles.pagination}>
            <p>Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, projectsData.length)} of {projectsData.length} entries</p>
            <div className={styles.paginationBtns}>
              <button
                className={styles.paginationBtn}
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1, setPage)}
              >
                ←
              </button>
              {[...Array(Math.ceil(projectsData.length / pageSize))].map((_, i) => (
                <button
                  key={i}
                  className={`${styles.paginationBtn} ${page === i + 1 ? styles.active : ''}`}
                  onClick={() => handlePageChange(i + 1, setPage)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={styles.paginationBtn}
                disabled={page === Math.ceil(projectsData.length / pageSize)}
                onClick={() => handlePageChange(page + 1, setPage)}
              >
                →
              </button>
            </div>
          </div>
        </>
      ) : (
        <DataTable
          title=""
          data={paginatedData}
          columns={projectColumns}
          addButtonText=""
          onView={(p) => window.location.href = `/projectlist/view/${encodeURIComponent(p.id)}`}
          onEdit={(p) => window.location.href = `/projectlist/edit/${encodeURIComponent(p.id)}`}
          onViewMilestones={(p) => window.location.href = `/milestones/view/${encodeURIComponent(p.id)}`}
          onDelete={handleDelete}
          currentPage={page}
          pageSize={pageSize}
          totalEntries={projectsData.length}
          onPageChange={(newPage) => handlePageChange(newPage, setPage)}
        />
      )}
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Project"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.name}
      />
    </div>
  );
}
