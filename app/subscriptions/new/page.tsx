'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import SubscriptionForm, { type SubscriptionFormData } from '@/components/(Forms)/SubscriptionForm/SubscriptionForm';
import styles from './addSubscription.module.css';

export default function AddSubscriptionPage() {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    subscription: '',
    vendor: '',
    fromDate: '',
    toDate: '',
    paymentBy: '',
    paymentMode: '',
    cost: '',
    status: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Subscription saved:', formData);
    alert('Subscription saved successfully');
    window.location.href = '/subscriptions';
  };

  const handleCancel = () => {
    window.location.href = '/subscriptions';
  };

  return (
    <SubscriptionForm
      classes={{
        pageWrapper: styles.pageWrapper,
        header: styles.header,
        title: styles.title,
        formLayout: styles.formLayout,
        leftSection: styles.leftSection,
        row: styles.row,
        fieldGroup: styles.fieldGroup,
        paymentModeDropdown: styles.paymentModeDropdown,
        statusDropdown: styles.statusDropdown,
        dropdownBtn: styles.dropdownBtn,
        dropdownMenu: styles.dropdownMenu,
        show: styles.show,
        actions: styles.actions,
      }}
      title="Add New Subscription"
      submitButtonText="+ Add Subscription"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
