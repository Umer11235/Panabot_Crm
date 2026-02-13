'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import Button from '@/components/(Inputs)/Button/Button';
import { useState } from "react";
import { departmentsData } from "@/utils/data/departments.data";
import { paginateData, handlePageChange, handleFormSubmit, handleInputChange } from "./functions";
import { departmentColumns } from "@/utils/columns";

export default function DepartmentsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    head: '',
    email: '',
    phone: '',
    employees: '',
    budget: ''
  });

  const paginatedData = paginateData(departmentsData, page, pageSize);
  const initialFormData = { department: '', head: '', email: '', phone: '', employees: '', budget: '' };

  const handleSubmit = (e: React.FormEvent) => {
    handleFormSubmit(e, formData, setModalOpen, setFormData, initialFormData, 'Department added successfully!');
  };

  return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>Departments</h1>

      <DataTable
        title=""
        data={paginatedData}
        columns={departmentColumns}
        onAdd={() => setModalOpen(true)}
        onView={(dept) => alert('Viewing ' + dept.department)}
        onEdit={(dept) => alert('Editing ' + dept.department)}
        onDelete={(dept) => alert('Deleting ' + dept.department)}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={departmentsData.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
      />

      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--md-sys-color-scrim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => setModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--md-sys-color-surface)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderRadius: 'var(--md-sys-shape-corner-extra-large)',
            padding: '24px',
            width: '100%',
            maxWidth: '560px'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ font: 'var(--md-sys-typescale-headline-small)', color: 'var(--md-sys-color-on-surface)', margin: 0 }}>Add Department</h2>
              <button onClick={() => setModalOpen(false)} style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: 'var(--md-sys-color-on-surface-variant)',
                cursor: 'pointer',
                padding: 0,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--md-sys-shape-corner-large)'
              }}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Department Name</label>
                <input
                  type="text"
                  placeholder="Enter department name"
                  value={formData.department}
                  onChange={(e) => handleInputChange(formData, setFormData, 'department', e.target.value)}
                  required
                  style={{
                    height: '56px',
                    padding: '0 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-body-large)',
                    outline: 'none',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Head of Department</label>
                <input
                  type="text"
                  placeholder="Enter head name"
                  value={formData.head}
                  onChange={(e) => handleInputChange(formData, setFormData, 'head', e.target.value)}
                  required
                  style={{
                    height: '56px',
                    padding: '0 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-body-large)',
                    outline: 'none',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Contact Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(formData, setFormData, 'email', e.target.value)}
                  required
                  style={{
                    height: '56px',
                    padding: '0 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-body-large)',
                    outline: 'none',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(formData, setFormData, 'phone', e.target.value)}
                  required
                  style={{
                    height: '56px',
                    padding: '0 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-body-large)',
                    outline: 'none',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Number of Employees</label>
                <input
                  type="number"
                  placeholder="Enter number"
                  value={formData.employees}
                  onChange={(e) => handleInputChange(formData, setFormData, 'employees', e.target.value)}
                  required
                  style={{
                    height: '56px',
                    padding: '0 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-body-large)',
                    outline: 'none',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Budget</label>
                <input
                  type="text"
                  placeholder="Enter budget (e.g., $500,000)"
                  value={formData.budget}
                  onChange={(e) => handleInputChange(formData, setFormData, 'budget', e.target.value)}
                  required
                  style={{
                    height: '56px',
                    padding: '0 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-body-large)',
                    outline: 'none',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="primary" type="submit" size="sm">
                  + Add Department
                </Button>
                <Button variant="danger" type="button" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
