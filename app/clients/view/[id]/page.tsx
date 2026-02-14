"use client";

import { useParams, useRouter } from 'next/navigation';
import { clientsData } from '@/utils/data/clients.data';
import { projectsData } from '@/utils/data/projects.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewClientPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const client = clientsData.find(c => c.id === decodedId);

  if (!client) {
    return <div>Client not found</div>;
  }

  // Filter completed projects for this client
  const completedProjects = projectsData.filter(
    p => client.projectIds.includes(p.id) && p.status === 'Completed'
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Details</h1>
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={() => router.push('/clients')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Client Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Client ID</label>
              <p>{client.id}</p>
            </div>
            <div className={styles.field}>
              <label>Company Name</label>
              <p>{client.name}</p>
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <p>{client.email}</p>
            </div>
            <div className={styles.field}>
              <label>Website</label>
              <p>{client.website} </p>
            </div>
            <div className={styles.field}>
              <label>Contact Person</label>
              <p>{client.contactPerson}</p>
            </div>
            <div className={styles.field}>
              <label>Contact Phone</label>
              <p>{client.contactPhone}</p>
            </div>
            <div className={styles.field}>
              <label>Industry</label>
              <p>{client.industry}</p>
            </div>
            <div className={styles.field}>
              <label>Location</label>
              <p>{client.location}</p>
            </div>
            <div className={styles.field}>
              <label>Total Projects</label>
              <p>{client.totalProjects}</p>
            </div>
            <div className={styles.field}>
              <label>Completed Projects</label>
              <p>{completedProjects.length}</p>
            </div>
          </div>
          <div className={styles.fullField}>
            <label>Contract Period</label>
            <p>{client.contract}</p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Completed Projects ({completedProjects.length})</h3>
          {completedProjects.length > 0 ? (
            <div className={styles.projectsTable}>
              <table>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Manager</th>
                    <th>Budget</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {completedProjects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.name}</td>
                      <td>{project.manager}</td>
                      <td>${project.budget}</td>
                      <td>{project.start}</td>
                      <td>{project.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>No completed projects yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
