'use client';
import DataTable from "@/components/DataTable/ProjectTable";
import Button from '@/components/(Inputs)/Button/Button';
import { useState } from "react";
import { holidaysData } from "@/utils/data/holidays.data";
import { handleDateChange, handleFormSubmit } from "./functions";
import { holidayColumns } from "@/utils/columns";

export default function HolidaysPage() {
  const [modalOpen, setModalOpen] = useState(false);
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
        onView={(holiday) => alert('Viewing ' + holiday.holiday)}
        onEdit={(holiday) => alert('Editing ' + holiday.holiday)}
        onDelete={(holiday) => alert('Deleting ' + holiday.holiday)}
        currentPage={1}
        pageSize={10}
        totalEntries={holidaysData.length}
        onPageChange={() => {}}
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
              <h2 style={{ font: 'var(--md-sys-typescale-headline-small)', color: 'var(--md-sys-color-on-surface)', margin: 0 }}>Add Holiday</h2>
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                ✕
              </Button>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
