"use client";

import { useState } from 'react';
import styles from './MilestoneManager.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function MilestoneManager({ milestones: initialMilestones = [], onChange }: any) {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending' as const
  });

  const handleAdd = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      ...formData
    };
    const updated = [...milestones, newMilestone];
    setMilestones(updated);
    onChange(updated);
    resetForm();
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingId(milestone.id);
    setFormData({
      title: milestone.title,
      description: milestone.description,
      dueDate: milestone.dueDate,
      status: milestone.status
    });
    setShowForm(true);
  };

  const handleUpdate = () => {
    const updated = milestones.map(m => 
      m.id === editingId ? { ...m, ...formData } : m
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
    setFormData({ title: '', description: '', dueDate: '', status: 'pending' });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Project Milestones</h3>
        {!showForm && (
          <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
            + Add Milestone
          </Button>
        )}
      </div>

      {showForm && (
        <div className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label>Milestone Title</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter milestone title"
              />
            </div>
            <div className={styles.field}>
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter milestone description"
              rows={3}
            />
          </div>
          <div className={styles.field}>
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <Button variant="outline" size="sm" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={editingId ? handleUpdate : handleAdd}>
              {editingId ? 'Update' : 'Add'} Milestone
            </Button>
          </div>
        </div>
      )}

      <div className={styles.milestoneList}>
        {milestones.map(milestone => (
          <div key={milestone.id} className={styles.milestoneCard}>
            <div className={styles.milestoneHeader}>
              <h4>{milestone.title}</h4>
              <span className={`${styles.status} ${styles[milestone.status]}`}>
                {milestone.status.replace('-', ' ')}
              </span>
            </div>
            <p className={styles.description}>{milestone.description}</p>
            <div className={styles.milestoneFooter}>
              <span className={styles.dueDate}>Due: {milestone.dueDate}</span>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(milestone)} className={styles.editBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(milestone.id)} className={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {milestones.length === 0 && !showForm && (
          <div className={styles.empty}>No milestones added yet</div>
        )}
      </div>
    </div>
  );
}
