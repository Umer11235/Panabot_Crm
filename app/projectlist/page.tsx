"use client";

import DataTable from "@/components/DataTable/ProjectTable";
import { useState } from "react";
import { projectsData } from "@/utils/data/projects.data";
import { paginateData, handlePageChange } from "./functions";
import { projectColumns } from "@/utils/columns";
import ConfirmModal from "@/components/Modal/ConfirmModal";

export default function ProjectListPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const paginatedData = paginateData(projectsData, page, pageSize);

  const handleDelete = (project: any) => {
    setDeleteModal({ isOpen: true, item: project });
  };

  const confirmDelete = () => {
    console.log('Deleting project:', deleteModal.item);
    alert(`Project ${deleteModal.item.name} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>All Projects</h1>
      <DataTable
        title=""
        data={paginatedData}
        columns={projectColumns}
        addButtonText="+ Add New Project"
        onAdd={() => window.location.href = '/newproject'}
        onView={(p) => window.location.href = `/projectlist/view/${encodeURIComponent(p.id)}`}
        onEdit={(p) => window.location.href = `/projectlist/edit/${encodeURIComponent(p.id)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={projectsData.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
      />
      
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