"use client";

import CreateProjectPage from "@/components/(Forms)/ProjectForm/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>Create New Project</h1>
      <CreateProjectPage />
    </div>
  );
}
