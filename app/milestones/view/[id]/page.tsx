"use client";

import { useParams, useRouter } from 'next/navigation';
import { milestonesData } from '@/utils/data/milestones.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';
import { useState } from 'react';

export default function ViewMilestonePage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const projectMilestones = milestonesData.filter(m => m.projectId === decodedId);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (projectMilestones.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Project Milestones</h1>
          <button className={styles.backBtn} onClick={() => router.push('/projectlist')}>
            Back to Projects
          </button>
        </div>
        <p className={styles.emptyState}>No milestones found for this project</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Milestones - {projectMilestones[0].projectName}</h1>
        <button className={styles.backBtn} onClick={() => router.push('/projectlist')}>
          Back to Projects
        </button>
      </div>

      <div className={styles.milestonesList}>
        {projectMilestones.map((milestone) => (
          <div key={milestone.milestoneId} className={styles.milestoneCard}>
            <div className={styles.cardHeader}>
              <div>
                <h3>{milestone.title}</h3>
                <span className={styles.milestoneId}>{milestone.milestoneId}</span>
              </div>
              <span className={`${styles.status} ${styles[milestone.status.replace(' ', '')]}`}>
                {milestone.status}
              </span>
            </div>
            <p className={styles.description}>{milestone.description}</p>
            <div className={styles.cardGrid}>
              <div className={styles.field}>
                <label>Due Date</label>
                <p>{milestone.dueDate}</p>
              </div>
              <div className={styles.field}>
                <label>Priority</label>
                <p className={styles[milestone.priority]}>{milestone.priority}</p>
              </div>
              <div className={styles.field}>
                <label>Net Amount</label>
                <p>{milestone.currency} {milestone.netAmount.toFixed(2)}</p>
              </div>
              <div className={styles.field}>
                <label>Remaining</label>
                <p>{milestone.currency} {milestone.remainingAmount.toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <span>{milestone.deliverables.length} Deliverables</span>
              <span>Created by {milestone.createdBy}</span>
              <button 
                className={styles.expandBtn} 
                onClick={() => setExpandedId(expandedId === milestone.milestoneId ? null : milestone.milestoneId)}
              >
                {expandedId === milestone.milestoneId ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {expandedId === milestone.milestoneId && (
              <div className={styles.expandedSection}>
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Financial Information</h4>
                  <div className={styles.financeGrid}>
                    <div className={styles.field}>
                      <label>Total Cost</label>
                      <p>{milestone.currency} {milestone.totalCost.toFixed(2)}</p>
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
                      <label>Amount Received</label>
                      <p className={styles.received}>{milestone.currency} {milestone.amountReceived.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Deliverables ({milestone.deliverables.length})</h4>
                  {milestone.deliverables.length > 0 ? (
                    <div className={styles.deliverablesList}>
                      {milestone.deliverables.map((deliverable, index) => (
                        <div key={deliverable.deliverableId} className={styles.deliverableCard}>
                          <div className={styles.deliverableHeader}>
                            <span>{index + 1}. {deliverable.title}</span>
                            <span className={`${styles.status} ${styles[deliverable.status]}`}>{deliverable.status}</span>
                          </div>
                          <p className={styles.deliverableDesc}>{deliverable.description}</p>
                          {deliverable.fileUrl && <p className={styles.fileUrl}>File: {deliverable.fileUrl}</p>}
                          <div className={styles.deliverableMeta}>
                            {deliverable.submittedAt && <span>Submitted: {deliverable.submittedAt}</span>}
                            {deliverable.approvedAt && <span>Approved: {deliverable.approvedAt}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.emptyText}>No deliverables added yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
