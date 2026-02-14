'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import Button from '@/components/(Inputs)/Button/Button';
import { useState } from "react";
import { departmentsData } from "@/utils/data/departments.data";
import { paginateData, handlePageChange, handleFormSubmit, handleInputChange } from "./functions";
import { departmentColumns } from "@/utils/columns";
import Modal from '@/components/Modal/Modal';
import ConfirmModal from '@/components/Modal/ConfirmModal';

export default function DepartmentsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
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

  const handleDelete = (dept: any) => {
    setDeleteModal({ isOpen: true, item: dept });
  };

  const confirmDelete = () => {
    console.log('Deleting department:', deleteModal.item);
    alert(`Department ${deleteModal.item.department} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
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
        onView={(dept) => window.location.href = `/departments/view/${encodeURIComponent(dept.id)}`}
        onEdit={(dept) => window.location.href = `/departments/edit/${encodeURIComponent(dept.id)}`}
        onDelete={handleDelete}
        currentPage={page}
        pageSize={pageSize}
        totalEntries={departmentsData.length}
        onPageChange={(newPage) => handlePageChange(newPage, setPage)}
      />

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Department"
        >
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
                <Button variant="primary" type="submit" size="md">
                  + Add Department
                </Button>
                <Button variant="danger" type="button" size="md" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>
        )}
        
        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, item: null })}
          onConfirm={confirmDelete}
          title="Delete Department"
          message="Are you sure you want to delete"
          itemName={deleteModal.item?.department}
        />
    </div>
  );
}
