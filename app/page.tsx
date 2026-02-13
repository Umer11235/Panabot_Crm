"use client";

import DataTable from "@/components/DataTable/ProjectTable";
import { useState } from "react";
import { projectsData } from "@/utils/data/projects.data";
import { paginateData, handlePageChange } from "./page.functions";
import { projectColumns } from "@/utils/columns";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const paginatedData = paginateData(projectsData, page, pageSize);

  return (
    <div className="min-h-screen items-center font-sans" style={{ backgroundColor: 'var(--md-sys-color-background)', padding: '24px' }}>
      <DataTable
        title="All Projects"
        data={paginatedData}
        columns={projectColumns}
        onAdd={() => alert('Add New Clicked')}
        onDelete={(p) => alert('Deleting ' + p.id)}
        onView={(p) => alert('Viewing ' + p.id)}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={projectsData.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
      />
    </div>
  );
}
