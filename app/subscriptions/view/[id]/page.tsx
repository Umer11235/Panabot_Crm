"use client";

import { useParams, useRouter } from 'next/navigation';
import { subscriptionsData } from '@/utils/data/subscriptions.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewSubscriptionPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const subscription = subscriptionsData.find(s => s.id === decodedId);

  if (!subscription) {
    return <div>Subscription not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Subscription Details</h1>
        <div className={styles.actions}>
          <Button variant="outline" size="md" onClick={() => router.push(`/subscriptions/edit/${encodeURIComponent(subscription.id)}`)}>
            Edit Subscription
          </Button>
          <Button variant="outline" size="md" onClick={() => router.push('/subscriptions')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Subscription Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Subscription</label>
              <p>{subscription.subscription}</p>
            </div>
            <div className={styles.field}>
              <label>Vendor</label>
              <p>{subscription.vendor}</p>
            </div>
            <div className={styles.field}>
              <label>From Date</label>
              <p>{subscription.fromDate}</p>
            </div>
            <div className={styles.field}>
              <label>To Date</label>
              <p>{subscription.toDate}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Payment Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Payment By</label>
              <p>{subscription.paymentBy}</p>
            </div>
            <div className={styles.field}>
              <label>Payment Mode</label>
              <p>{subscription.paymentMode}</p>
            </div>
            <div className={styles.field}>
              <label>Cost</label>
              <p>${subscription.cost.toFixed(2)}</p>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <p className={styles[subscription.status.replace(' ', '')]}>{subscription.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
