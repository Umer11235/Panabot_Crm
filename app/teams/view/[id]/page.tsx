"use client";

import { useParams, useRouter } from 'next/navigation';
import { teamsData } from '@/utils/data/teams.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './view.module.css';

export default function ViewTeamPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const team = teamsData.find(t => t.id === decodedId);

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team Details</h1>
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={() => router.push('/teams')}>
            Back to List
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Team Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Team ID</label>
              <p>{team.id}</p>
            </div>
            <div className={styles.field}>
              <label>Team Name</label>
              <p>{team.name}</p>
            </div>
            <div className={styles.field}>
              <label>Leader</label>
              <p>{team.leader}</p>
            </div>
            <div className={styles.field}>
              <label>Leader Role</label>
              <p>{team.leaderRole}</p>
            </div>
            <div className={styles.field}>
              <label>Projects</label>
              <p>{team.projects}</p>
            </div>
            <div className={styles.field}>
              <label>Progress</label>
              <p>{team.progress}%</p>
            </div>
            <div className={styles.field}>
              <label>Created</label>
              <p>{team.createdAt}</p>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <p className={styles[team.status.replace(' ', '')]}>{team.status}</p>
            </div>
          </div>
          <div className={styles.fullField}>
            <label>Description</label>
            <p>{team.description || '-'}</p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Members</h3>
          <div className={styles.grid}>
            {team.members.map((m) => (
              <div key={m.id} className={styles.field}>
                <label>{m.name}</label>
                <p>{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
