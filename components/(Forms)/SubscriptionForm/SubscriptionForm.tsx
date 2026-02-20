'use client';

import { useEffect, useState } from 'react';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import Button from '@/components/(Inputs)/Button/Button';

export type SubscriptionFormData = {
  subscription: string;
  vendor: string;
  fromDate: string;
  toDate: string;
  paymentBy: string;
  paymentMode: string;
  cost: string;
  status: string;
};

type SubscriptionFormClasses = {
  pageWrapper: string;
  header: string;
  title: string;
  formLayout: string;
  leftSection: string;
  row: string;
  fieldGroup: string;
  paymentModeDropdown: string;
  statusDropdown: string;
  dropdownBtn: string;
  dropdownMenu: string;
  show: string;
  actions: string;
};

type SubscriptionFormProps = {
  classes: SubscriptionFormClasses;
  title: string;
  submitButtonText: string;
  formData: SubscriptionFormData;
  setFormData: Dispatch<SetStateAction<SubscriptionFormData>>;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
};

export default function SubscriptionForm({
  classes,
  title,
  submitButtonText,
  formData,
  setFormData,
  onSubmit,
  onCancel,
}: SubscriptionFormProps) {
  const [paymentModeOpen, setPaymentModeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${classes.paymentModeDropdown}`)) {
        setPaymentModeOpen(false);
      }
      if (!target.closest(`.${classes.statusDropdown}`)) {
        setStatusOpen(false);
      }
    };
    if (paymentModeOpen || statusOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [classes.paymentModeDropdown, classes.statusDropdown, paymentModeOpen, statusOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.header}>
        <h1 className={classes.title}>{title}</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.formLayout}>
        <div className={classes.leftSection}>
          <div className={classes.row}>
            <div className={classes.fieldGroup}>
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
            <div className={classes.fieldGroup}>
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
          <div className={classes.row}>
            <div className={classes.fieldGroup}>
              <label>From Date</label>
              <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
            </div>
            <div className={classes.fieldGroup}>
              <label>To Date</label>
              <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.fieldGroup}>
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
            <div className={classes.fieldGroup}>
              <label>Payment Mode</label>
              <div className={classes.paymentModeDropdown}>
                <button
                  type="button"
                  className={classes.dropdownBtn}
                  onClick={() => setPaymentModeOpen(!paymentModeOpen)}
                >
                  {formData.paymentMode || 'Select payment mode'}
                </button>
                <div className={`${classes.dropdownMenu} ${paymentModeOpen ? classes.show : ''}`}>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, paymentMode: 'Cash' })); setPaymentModeOpen(false); }}>Cash</button>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, paymentMode: 'Card' })); setPaymentModeOpen(false); }}>Card</button>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, paymentMode: 'Online' })); setPaymentModeOpen(false); }}>Online</button>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, paymentMode: 'Cheque' })); setPaymentModeOpen(false); }}>Cheque</button>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, paymentMode: 'Bank Transfer' })); setPaymentModeOpen(false); }}>Bank Transfer</button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.fieldGroup}>
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
            <div className={classes.fieldGroup}>
              <label>Status</label>
              <div className={classes.statusDropdown}>
                <button type="button" className={classes.dropdownBtn} onClick={() => setStatusOpen(!statusOpen)}>
                  {formData.status || 'Select status'}
                </button>
                <div className={`${classes.dropdownMenu} ${statusOpen ? classes.show : ''}`}>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, status: 'Active' })); setStatusOpen(false); }}>Active</button>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, status: 'Pending' })); setStatusOpen(false); }}>Pending</button>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, status: 'Expired' })); setStatusOpen(false); }}>Expired</button>
                  <button type="button" onClick={() => { setFormData((prev) => ({ ...prev, status: 'Inactive' })); setStatusOpen(false); }}>Inactive</button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.actions}>
            <Button variant="outline" type="submit" size="md">
              {submitButtonText}
            </Button>
            <Button variant="outline" type="button" size="md" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
