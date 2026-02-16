"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { subscriptionsData } from '@/utils/data/subscriptions.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './edit.module.css';

export default function EditSubscriptionPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const subscription = subscriptionsData.find(s => s.id === decodedId);

  const [formData, setFormData] = useState({
    subscription: subscription?.subscription || '',
    vendor: subscription?.vendor || '',
    fromDate: subscription?.fromDate || '',
    toDate: subscription?.toDate || '',
    paymentBy: subscription?.paymentBy || '',
    paymentMode: subscription?.paymentMode || '',
    cost: subscription?.cost.toString() || '',
    status: subscription?.status || ''
  });
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.statusDropdown}`)) {
        setStatusOpen(false);
      }
    };
    if (statusOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [statusOpen]);

  if (!subscription) {
    return <div>Subscription not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated subscription:', formData);
    alert('Subscription updated successfully!');
    router.push('/subscriptions');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Subscription</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.formLayout}>
        <div className={styles.leftSection}>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Subscription</label>
              <input
                type="text"
                name="subscription"
                placeholder="Enter subscription name"
                value={formData.subscription}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Vendor</label>
              <input
                type="text"
                name="vendor"
                placeholder="Enter vendor name"
                value={formData.vendor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Payment By</label>
              <input
                type="text"
                name="paymentBy"
                placeholder="Enter payment by name"
                value={formData.paymentBy}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Payment Mode</label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                required
              >
                <option value="">Select payment mode</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>Cost</label>
              <input
                type="number"
                name="cost"
                placeholder="Enter cost"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Status</label>
              <div className={styles.statusDropdown}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setStatusOpen(!statusOpen)}
                >
                  {formData.status || 'Select status'}
                </button>
                <div className={`${styles.dropdownMenu} ${statusOpen ? styles.show : ''}`}>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Active' })); setStatusOpen(false); }}>Active</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Pending' })); setStatusOpen(false); }}>Pending</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Expired' })); setStatusOpen(false); }}>Expired</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, status: 'Inactive' })); setStatusOpen(false); }}>Inactive</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" type="submit" size="md">
              Update Subscription
            </Button>
            <Button variant="outline" type="button" size="md" onClick={() => router.push('/subscriptions')}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
