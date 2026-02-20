"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { subscriptionsData } from '@/utils/data/subscriptions.data';
import SubscriptionForm, { type SubscriptionFormData } from '@/components/(Forms)/SubscriptionForm/SubscriptionForm';
import styles from './edit.module.css';

export default function EditSubscriptionPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const subscription = subscriptionsData.find(s => s.id === decodedId);

  const [formData, setFormData] = useState<SubscriptionFormData>({
    subscription: subscription?.subscription || '',
    vendor: subscription?.vendor || '',
    fromDate: subscription?.fromDate || '',
    toDate: subscription?.toDate || '',
    paymentBy: subscription?.paymentBy || '',
    paymentMode: subscription?.paymentMode || '',
    cost: subscription?.cost.toString() || '',
    status: subscription?.status || ''
  });

  if (!subscription) {
    return <div>Subscription not found</div>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Updated subscription:', formData);
    alert('Subscription updated successfully!');
    router.push('/subscriptions');
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
      title="Edit Subscription"
      submitButtonText="Update Subscription"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      onCancel={() => router.push('/subscriptions')}
    />
  );
}
