"use client";

import { useState, useEffect } from 'react';
import styles from './MilestoneManager.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface Deliverable {
  id: string;
  title: string;
  fileUrl: string;
  description: string;
}

interface Milestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  totalCost: string;
  currency: string;
  taxAmount: string;
  platformFee: string;
  netAmount: string;
  deliverables: Deliverable[];
}

export default function MilestoneManager({ milestones: initialMilestones = [], onChange }: any) {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    dueDate: '',
    priority: '' as any,
    description: '',
    totalCost: '0.00',
    currency: '' as any,
    taxAmount: '0.00',
    platformFee: '0.00',
    netAmount: '0.00'
  });
  const [deliverables, setDeliverables] = useState<Deliverable[]>([{
    id: '1',
    title: '',
    fileUrl: '',
    description: ''
  }]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.priorityDropdown}`) && !target.closest(`.${styles.currencyDropdown}`)) {
        setPriorityOpen(false);
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const calculateNetAmount = (total: string, tax: string, fee: string) => {
    const t = parseFloat(total) || 0;
    const tx = parseFloat(tax) || 0;
    const f = parseFloat(fee) || 0;
    return (t + tx + f).toFixed(2);
  };

  const handleCostChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    updated.netAmount = calculateNetAmount(updated.totalCost, updated.taxAmount, updated.platformFee);
    setFormData(updated);
  };

  const addDeliverable = () => {
    setDeliverables([...deliverables, {
      id: Date.now().toString(),
      title: '',
      fileUrl: '',
      description: ''
    }]);
  };

  const removeDeliverable = (id: string) => {
    setDeliverables(deliverables.filter(d => d.id !== id));
  };

  const updateDeliverable = (id: string, field: string, value: string) => {
    setDeliverables(deliverables.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const handleAdd = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      ...formData,
      deliverables
    };
    const updated = [...milestones, newMilestone];
    setMilestones(updated);
    onChange(updated);
    resetForm();
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingId(milestone.id);
    setFormData({
      projectId: milestone.projectId,
      title: milestone.title,
      dueDate: milestone.dueDate,
      priority: milestone.priority,
      description: milestone.description,
      totalCost: milestone.totalCost,
      currency: milestone.currency,
      taxAmount: milestone.taxAmount,
      platformFee: milestone.platformFee,
      netAmount: milestone.netAmount
    });
    setDeliverables(milestone.deliverables);
    setShowModal(true);
  };

  const handleUpdate = () => {
    const updated = milestones.map(m => 
      m.id === editingId ? { ...m, ...formData, deliverables } : m
    );
    setMilestones(updated);
    onChange(updated);
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updated = milestones.filter(m => m.id !== id);
    setMilestones(updated);
    onChange(updated);
  };

  const resetForm = () => {
    setFormData({ projectId: '', title: '', dueDate: '', priority: 'Medium', description: '', totalCost: '0.00', currency: 'USD', taxAmount: '0.00', platformFee: '0.00', netAmount: '0.00' });
    setDeliverables([{ id: '1', title: '', fileUrl: '', description: '' }]);
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Project Milestones</h3>
        <Button variant="outline" size="sm" onClick={() => setShowModal(true)}>
          + Add Milestone
        </Button>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={resetForm}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit Milestone' : 'Add New Milestone'}</h3>
              <button className={styles.closeBtn} onClick={resetForm}>&times;</button>
            </div>
            <div className={styles.modalBody}>
              <h4 className={styles.sectionTitle}>Basic Information</h4>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Project ID</label>
                  <input value={formData.projectId} onChange={(e) => setFormData({ ...formData, projectId: e.target.value })} placeholder="Enter project ID" />
                </div>
                <div className={styles.field}>
                  <label>Milestone Title</label>
                  <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Frontend Development" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Due Date</label>
                  <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} placeholder="mm/dd/yyyy" />
                </div>
                <div className={styles.field}>
                  <label>Priority</label>
                  <div className={styles.priorityDropdown}>
                    <button
                      type="button"
                      className={styles.dropdownBtn}
                      onClick={() => setPriorityOpen(!priorityOpen)}
                    >
                      {formData.priority || 'Select'}
                    </button>
                    <div className={`${styles.dropdownMenu} ${priorityOpen ? styles.show : ''}`}>
                      <button type="button" onClick={() => { setFormData({ ...formData, priority: 'Low' }); setPriorityOpen(false); }}>Low</button>
                      <button type="button" onClick={() => { setFormData({ ...formData, priority: 'Medium' }); setPriorityOpen(false); }}>Medium</button>
                      <button type="button" onClick={() => { setFormData({ ...formData, priority: 'High' }); setPriorityOpen(false); }}>High</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.field}>
                <label>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Detailed scope of the milestone" rows={3} />
              </div>

              <h4 className={styles.sectionTitle}>Financial Information</h4>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Total Cost</label>
                  <input type="number" step="0.01" value={formData.totalCost} onChange={(e) => handleCostChange('totalCost', e.target.value)} placeholder="0.00" />
                </div>
                <div className={styles.field}>
                  <label>Currency</label>
                  <div className={styles.currencyDropdown}>
                    <button
                      type="button"
                      className={styles.dropdownBtn}
                      onClick={() => setCurrencyOpen(!currencyOpen)}
                    >
                      {formData.currency || 'Select'}
                    </button>
                    <div className={`${styles.dropdownMenu} ${currencyOpen ? styles.show : ''}`}>
                      <button type="button" onClick={() => { setFormData({ ...formData, currency: 'USD' }); setCurrencyOpen(false); }}>USD</button>
                      <button type="button" onClick={() => { setFormData({ ...formData, currency: 'EUR' }); setCurrencyOpen(false); }}>EUR</button>
                      <button type="button" onClick={() => { setFormData({ ...formData, currency: 'GBP' }); setCurrencyOpen(false); }}>GBP</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Tax Amount (Optional)</label>
                  <input type="number" step="0.01" value={formData.taxAmount} onChange={(e) => handleCostChange('taxAmount', e.target.value)} placeholder="0.00" />
                </div>
                <div className={styles.field}>
                  <label>Platform Fee (Optional)</label>
                  <input type="number" step="0.01" value={formData.platformFee} onChange={(e) => handleCostChange('platformFee', e.target.value)} placeholder="0.00" />
                </div>
              </div>
              <div className={styles.field}>
                <label>Net Amount (Auto-calculated)</label>
                <input value={`${formData.currency} ${formData.netAmount}`} disabled />
              </div>

              {editingId && (
                <>
                  <div className={styles.deliverablesHeader}>
                    <h4 className={styles.sectionTitle}>Deliverables</h4>
                    <Button variant="outline" size="sm" onClick={addDeliverable}>+ Add Deliverable</Button>
                  </div>
                  {deliverables.map((deliverable, index) => (
                    <div key={deliverable.id} className={styles.deliverableCard}>
                      <div className={styles.deliverableHeader}>
                        <span>Deliverable {index + 1}</span>
                        {deliverables.length > 1 && (
                          <button className={styles.removeBtn} onClick={() => removeDeliverable(deliverable.id)}>&times;</button>
                        )}
                      </div>
                      <div className={styles.field}>
                        <label>Title</label>
                        <input value={deliverable.title} onChange={(e) => updateDeliverable(deliverable.id, 'title', e.target.value)} placeholder="Deliverable title" />
                      </div>
                      <div className={styles.field}>
                        <label>File URL (Optional)</label>
                        <input value={deliverable.fileUrl} onChange={(e) => updateDeliverable(deliverable.id, 'fileUrl', e.target.value)} placeholder="https://..." />
                      </div>
                      <div className={styles.field}>
                        <label>Description</label>
                        <textarea value={deliverable.description} onChange={(e) => updateDeliverable(deliverable.id, 'description', e.target.value)} placeholder="Deliverable description" rows={2} />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className={styles.modalFooter}>
              <Button variant="outline" size="md" onClick={resetForm}>Cancel</Button>
              <Button variant="primary" size="md" onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? 'Update' : 'Add'} Milestone
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.milestoneList}>
        {milestones.map(milestone => (
          <div key={milestone.id} className={styles.milestoneCard}>
            <div className={styles.milestoneHeader}>
              <div>
                <h4>{milestone.title}</h4>
                <span className={styles.milestoneId}>{milestone.projectId}</span>
              </div>
              <span className={`${styles.priority} ${styles[milestone.priority]}`}>{milestone.priority}</span>
            </div>
            <p className={styles.description}>{milestone.description}</p>
            <div className={styles.milestoneFooter}>
              <div>
                <span className={styles.dueDate}>Due: {milestone.dueDate}</span>
                <span className={styles.cost}>Net: {milestone.currency} {milestone.netAmount}</span>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(milestone)} className={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(milestone.id)} className={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {milestones.length === 0 && <div className={styles.empty}>No milestones added yet</div>}
      </div>
    </div>
  );
}
