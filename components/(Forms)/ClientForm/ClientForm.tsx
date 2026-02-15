"use client";

import { useState } from 'react';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './ClientForm.module.css';

interface ClientFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ClientForm({ initialData, onSubmit, onCancel }: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    contactPerson: initialData?.contactPerson || '',
    contactPhone: initialData?.contactPhone || '',
    location: initialData?.location || '',
    industry: initialData?.industry || '',
    website: initialData?.website || '',
    contract: initialData?.contract || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Company Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter company name" required />
            </div>
            <div className={styles.field}>
              <label>Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Enter email address" required />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Contact Person *</label>
              <input type="text" value={formData.contactPerson} onChange={(e) => setFormData({...formData, contactPerson: e.target.value})} placeholder="Enter contact person" required />
            </div>
            <div className={styles.field}>
              <label>Contact Phone *</label>
              <input type="tel" value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} placeholder="Enter phone number" required />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Enter location" />
            </div>
            <div className={styles.field}>
              <label>Industry</label>
              <input type="text" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} placeholder="Enter industry" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Website</label>
              <input type="url" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} placeholder="Enter website URL" />
            </div>
            <div className={styles.field}>
              <label>Contract Period</label>
              <input type="text" value={formData.contract} onChange={(e) => setFormData({...formData, contract: e.target.value})} placeholder="e.g., Jan 1, 2025 - Dec 31, 2026" />
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Button type="submit" variant="outline" size="md">Save Client</Button>
          <Button type="button" variant="outline" size="md" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
