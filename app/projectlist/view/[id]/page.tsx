"use client";

import { useParams, useRouter } from 'next/navigation';
import { projectsData } from '@/utils/data/projects.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewProjectPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const project = projectsData.find(p => p.id === decodedId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Details</h1>
        <div className={styles.actions}>
          <Button variant="primary" size="sm" onClick={() => router.push(`/projectlist/edit/${encodeURIComponent(project.id)}`)}>
            Edit Project
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push('/projectlist')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Project Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Project ID</label>
              <p>{project.id}</p>
            </div>
            <div className={styles.field}>
              <label>Project Name</label>
              <p>{project.name}</p>
            </div>
            <div className={styles.field}>
              <label>Start Date</label>
              <p>{project.start}</p>
            </div>
            <div className={styles.field}>
              <label>End Date</label>
              <p>{project.end}</p>
            </div>
            <div className={styles.field}>
              <label>Project Manager</label>
              <p>{project.manager}</p>
            </div>
            <div className={styles.field}>
              <label>Budget</label>
              <p>${project.budget}</p>
            </div>
            <div className={styles.field}>
              <label>Priority Status</label>
              <p>-</p>
            </div>
            <div className={styles.field}>
              <label>Categories</label>
              <p>-</p>
            </div>
            <div className={styles.field}>
              <label>Add Team Members</label>
              <p>-</p>
            </div>
            <div className={styles.field}>
              <label>Project Tags</label>
              <p>-</p>
            </div>
            <div className={styles.field}>
              <label>Progress</label>
              <p>{project.progress}%</p>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <p className={styles[project.status.replace(' ', '')]}>{project.status}</p>
            </div>
          </div>
          <div className={styles.fullField}>
            <label>Description</label>
            <p>-</p>
          </div>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Attachments</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Project Preview Image</label>
              <p>No image uploaded</p>
            </div>
            <div className={styles.field}>
              <label>Attached Files</label>
              <p>No files attached</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
