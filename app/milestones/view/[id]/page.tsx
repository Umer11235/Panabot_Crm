"use client";

import { useParams, useRouter } from 'next/navigation';
import { milestonesData } from '@/utils/data/milestones.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewMilestonePage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const milestone = milestonesData.find(m => m.milestoneId === decodedId);

  if (!milestone) {
    return <div>Milestone not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Milestone Details</h1>
        <div className={styles.actions}>
          <Button variant="primary" size="sm" onClick={() => router.push(`/milestones/edit/${encodeURIComponent(milestone.milestoneId)}`)}>
            Edit Milestone
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push('/milestones')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Basic Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Milestone ID</label>
              <p>{milestone.milestoneId}</p>
            </div>
            <div className={styles.field}>
              <label>Project</label>
              <p>{milestone.projectName}</p>
            </div>
            <div className={styles.field}>
              <label>Title</label>
              <p>{milestone.title}</p>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <p className={styles[milestone.status.replace(' ', '')]}>{milestone.status}</p>
            </div>
            <div className={styles.field}>
              <label>Priority</label>
              <p className={styles[milestone.priority]}>{milestone.priority}</p>
            </div>
            <div className={styles.field}>
              <label>Due Date</label>
              <p>{milestone.dueDate}</p>
            </div>
            <div className={styles.field}>
              <label>Created By</label>
              <p>{milestone.createdBy}</p>
            </div>
            <div className={styles.field}>
              <label>Created At</label>
              <p>{milestone.createdAt}</p>
            </div>
          </div>
          <div className={styles.fieldFull}>
            <label>Description</label>
            <p>{milestone.description}</p>
          </div>
        </div>

        {/* Financial Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Financial Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Total Cost</label>
              <p className={styles.amount}>{milestone.currency} {milestone.totalCost.toFixed(2)}</p>
            </div>
            <div className={styles.field}>
              <label>Tax Amount</label>
              <p>{milestone.currency} {milestone.taxAmount.toFixed(2)}</p>
            </div>
            <div className={styles.field}>
              <label>Platform Fee</label>
              <p>{milestone.currency} {milestone.platformFee.toFixed(2)}</p>
            </div>
            <div className={styles.field}>
              <label>Net Amount</label>
              <p className={styles.amount}>{milestone.currency} {milestone.netAmount.toFixed(2)}</p>
            </div>
            <div className={styles.field}>
              <label>Amount Received</label>
              <p className={styles.received}>{milestone.currency} {milestone.amountReceived.toFixed(2)}</p>
            </div>
            <div className={styles.field}>
              <label>Remaining Amount</label>
              <p className={styles.remaining}>{milestone.currency} {milestone.remainingAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Deliverables ({milestone.deliverables.length})</h3>
          {milestone.deliverables.length > 0 ? (
            <div className={styles.deliverablesList}>
              {milestone.deliverables.map((deliverable, index) => (
                <div key={deliverable.deliverableId} className={styles.deliverableCard}>
                  <div className={styles.deliverableHeader}>
                    <span className={styles.deliverableTitle}>{index + 1}. {deliverable.title}</span>
                    <span className={styles[deliverable.status]}>{deliverable.status}</span>
                  </div>
                  <p className={styles.deliverableDesc}>{deliverable.description}</p>
                  {deliverable.fileUrl && (
                    <p className={styles.fileUrl}>File: {deliverable.fileUrl}</p>
                  )}
                  <div className={styles.deliverableMeta}>
                    {deliverable.submittedAt && <span>Submitted: {deliverable.submittedAt}</span>}
                    {deliverable.approvedAt && <span>Approved: {deliverable.approvedAt}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No deliverables added yet</p>
          )}
        </div>

        {/* Payments */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Payment History ({milestone.payments.length})</h3>
          {milestone.payments.length > 0 ? (
            <div className={styles.paymentsList}>
              {milestone.payments.map((payment) => (
                <div key={payment.paymentId} className={styles.paymentCard}>
                  <div className={styles.paymentHeader}>
                    <span className={styles.paymentAmount}>{milestone.currency} {payment.amount.toFixed(2)}</span>
                    <span className={styles[payment.status]}>{payment.status}</span>
                  </div>
                  <div className={styles.paymentDetails}>
                    <span>Method: {payment.paymentMethod}</span>
                    {payment.transactionId && <span>Transaction: {payment.transactionId}</span>}
                    {payment.paidAt && <span>Paid: {payment.paidAt}</span>}
                  </div>
                  {payment.notes && <p className={styles.paymentNotes}>{payment.notes}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No payments recorded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
