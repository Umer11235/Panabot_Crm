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
          <Button variant="outline" size="md" onClick={() => router.push(`/projectlist/edit/${encodeURIComponent(project.id)}`)}>
            Edit Project
          </Button>
          <Button variant="outline" size="md" onClick={() => router.push('/projectlist')}>
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
              <label>Progress</label>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${project.progress}%` }}></div>
              </div>
              <p className={styles.progressText}>{project.progress}%</p>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <p className={styles[project.status.replace(' ', '')]}>{project.status}</p>
            </div>
          </div>
          <div className={styles.fullField}>
            <label>Notes</label>
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

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Client Information</h3>
            <Button variant="outline" size="md" onClick={() => router.push('/clients')}>
              View Details
            </Button>
          </div>
          <div className={styles.clientCard}>
            <div className={styles.clientAvatar}>
              <img src="/images/client.jpg" alt="Client" />
            </div>
            <div className={styles.clientDetails}>
              <div className={styles.field}>
                <label>Client Name</label>
                <p>Acme Corporation</p>
              </div>
              <div className={styles.field}>
                <label>Contact Person</label>
                <p>John Doe</p>
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <p>john.doe@acme.com</p>
              </div>
              <div className={styles.field}>
                <label>Phone</label>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Team Members</h3>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
                <img src="/images/users.jpg" alt="Team Member" />
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>Sarah Johnson</p>
                <p className={styles.memberRole}>Lead Developer</p>
                <p className={styles.memberEmail}>sarah.j@company.com</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
                <img src="/images/users.jpg" alt="Team Member" />
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>Michael Chen</p>
                <p className={styles.memberRole}>Backend Developer</p>
                <p className={styles.memberEmail}>michael.c@company.com</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
                <img src="/images/users.jpg" alt="Team Member" />
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>Emily Davis</p>
                <p className={styles.memberRole}>UI/UX Designer</p>
                <p className={styles.memberEmail}>emily.d@company.com</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
                <img src="/images/users.jpg" alt="Team Member" />
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>James Wilson</p>
                <p className={styles.memberRole}>QA Engineer</p>
                <p className={styles.memberEmail}>james.w@company.com</p>
              </div>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
                <img src="/images/users.jpg" alt="Team Member" />
              </div>
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>Lisa Anderson</p>
                <p className={styles.memberRole}>Frontend Developer</p>
                <p className={styles.memberEmail}>lisa.a@company.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Description</h3>
          <div className={styles.description}>
            <p>No description available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
