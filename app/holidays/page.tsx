'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import Button from '@/components/(Inputs)/Button/Button';
import { useState } from "react";
import { holidaysData } from "@/utils/data/holidays.data";
import { handleDateChange, handleFormSubmit } from "./functions";
import { holidayColumns } from "@/utils/columns";
import Modal from '@/components/Modal/Modal';
import ConfirmModal from '@/components/Modal/ConfirmModal';

export default function HolidaysPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });
  const [formData, setFormData] = useState({
    holiday: '',
    date: '',
    day: '',
    type: ''
  });

  const initialFormData = { holiday: '', date: '', day: '', type: '' };

  const handleSubmit = (e: React.FormEvent) => {
    handleFormSubmit(e, formData, setModalOpen, setFormData, initialFormData, 'Holiday added successfully!');
  };

  const handleDelete = (holiday: any) => {
    setDeleteModal({ isOpen: true, item: holiday });
  };

  const confirmDelete = () => {
    console.log('Deleting holiday:', deleteModal.item);
    alert(`Holiday ${deleteModal.item.holiday} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

  return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>Holidays</h1>

      <DataTable
        title=""
        data={holidaysData}
        columns={holidayColumns}
        onAdd={() => setModalOpen(true)}
        onView={(holiday) => window.location.href = `/holidays/view/${encodeURIComponent(holiday.id)}`}
        onEdit={(holiday) => window.location.href = `/holidays/edit/${encodeURIComponent(holiday.id)}`}
        onDelete={handleDelete}
        currentPage={1}
        pageSize={10}
        totalEntries={holidaysData.length}
        onPageChange={() => {}}
      />

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Add Holiday"
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Holiday Name</label>
                <input
                  type="text"
                  placeholder="Enter holiday name"
                  value={formData.holiday}
                  onChange={(e) => setFormData({ ...formData, holiday: e.target.value })}
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
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e.target.value, formData, setFormData)}
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
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Day</label>
                <input
                  type="text"
                  placeholder="Auto-filled"
                  value={formData.day}
                  readOnly
                  style={{
                    height: '56px',
                    padding: '0 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-body-large)',
                    outline: 'none',
                    backgroundColor: 'var(--md-sys-color-surface-variant)',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ font: 'var(--md-sys-typescale-body-large)', fontWeight: 500, color: 'var(--md-sys-color-on-surface)' }}>Holiday Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
                >
                  <option value="">Select</option>
                  <option value="Public">Public</option>
                  <option value="Religious">Religious</option>
                  <option value="Public/National">Public/National</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="primary" type="submit" size="md">
                  + Add Holiday
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
          title="Delete Holiday"
          message="Are you sure you want to delete"
          itemName={deleteModal.item?.holiday}
        />
    </div>
  );
}
