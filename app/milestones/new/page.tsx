"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './addMilestone.module.css';

export default function AddMilestonePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    totalCost: '',
    currency: 'USD',
    taxAmount: '',
    platformFee: ''
  });

  const [deliverables, setDeliverables] = useState([
    { title: '', description: '', fileUrl: '' }
  ]);

  const addDeliverable = () => {
    setDeliverables([...deliverables, { title: '', description: '', fileUrl: '' }]);
  };

  const removeDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const updateDeliverable = (index: number, field: string, value: string) => {
    const updated = [...deliverables];
    updated[index] = { ...updated[index], [field]: value };
    setDeliverables(updated);
  };

  const calculateNetAmount = () => {
    const total = parseFloat(formData.totalCost) || 0;
    const tax = parseFloat(formData.taxAmount) || 0;
    const fee = parseFloat(formData.platformFee) || 0;
    return (total - tax - fee).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Milestone Data:', formData);
    console.log('Deliverables:', deliverables);
    alert('Milestone created successfully!');
    router.push('/milestones');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Milestone</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Section 1: Basic Info */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Project ID</label>
              <input
                type="text"
                placeholder="Enter project ID"
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Milestone Title</label>
              <input
                type="text"
                placeholder="e.g., Frontend Development"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className={styles.fieldFull}>
            <label>Description</label>
            <textarea
              placeholder="Detailed scope of the milestone"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>
        </div>

        {/* Section 2: Financial */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Financial Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Total Cost</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.totalCost}
                onChange={(e) => setFormData({ ...formData, totalCost: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="USD">USD</option>
                <option value="PKR">PKR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Tax Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.taxAmount}
                onChange={(e) => setFormData({ ...formData, taxAmount: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label>Platform Fee (Optional)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.platformFee}
                onChange={(e) => setFormData({ ...formData, platformFee: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.calculatedField}>
            <label>Net Amount (Auto-calculated)</label>
            <p className={styles.netAmount}>{formData.currency} {calculateNetAmount()}</p>
          </div>
        </div>

        {/* Section 3: Deliverables */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Deliverables</h3>
            <Button type="button" variant="outline" size="sm" onClick={addDeliverable}>
              + Add Deliverable
            </Button>
          </div>
          {deliverables.map((deliverable, index) => (
            <div key={index} className={styles.deliverableCard}>
              <div className={styles.deliverableHeader}>
                <span className={styles.deliverableNumber}>Deliverable {index + 1}</span>
                {deliverables.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeDeliverable(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Deliverable title"
                    value={deliverable.title}
                    onChange={(e) => updateDeliverable(index, 'title', e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>File URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={deliverable.fileUrl}
                    onChange={(e) => updateDeliverable(index, 'fileUrl', e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.fieldFull}>
                <label>Description</label>
                <textarea
                  placeholder="Deliverable description"
                  value={deliverable.description}
                  onChange={(e) => updateDeliverable(index, 'description', e.target.value)}
                  rows={2}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="primary" type="submit" size="md">
            Create Milestone
          </Button>
          <Button variant="outline" type="button" size="md" onClick={() => router.push('/milestones')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
