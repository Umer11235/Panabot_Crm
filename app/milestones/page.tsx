'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import { useState } from "react";
import { milestonesData } from "@/utils/data/milestones.data";
import { paginateData, handlePageChange } from "./functions";
import { milestoneColumns } from "@/utils/columns";
import ConfirmModal from "@/components/Modal/ConfirmModal";

export default function MilestonesPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });

  const paginatedData = paginateData(milestonesData, page, pageSize);

  const handleDelete = (milestone: any) => {
    setDeleteModal({ isOpen: true, item: milestone });
  };

  const confirmDelete = () => {
    console.log('Deleting milestone:', deleteModal.item);
    alert(`Milestone ${deleteModal.item.title} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>Project Milestones</h1>
      <DataTable
        title=""
        data={paginatedData}
        columns={milestoneColumns}
        onAdd={() => window.location.href = '/milestones/new'}
        addButtonText="+ Add Milestone"
        onView={(milestone) => window.location.href = `/milestones/view/${encodeURIComponent(milestone.milestoneId)}`}
        onEdit={(milestone) => window.location.href = `/milestones/edit/${encodeURIComponent(milestone.milestoneId)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={milestonesData.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
      />
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Milestone"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.title}
      />
    </div>
  );
}
