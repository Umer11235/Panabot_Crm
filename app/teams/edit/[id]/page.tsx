"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { teamsData } from '@/utils/data/teams.data';
import Button from '@/components/(Inputs)/Button/Button';
import styles from './edit.module.css';

export default function EditTeamPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const team = teamsData.find(t => t.id === decodedId);

  const [formData, setFormData] = useState({
    name: team?.name || '',
    leader: team?.leader || '',
    leaderRole: team?.leaderRole || '',
    projects: team?.projects || 0,
    progress: team?.progress || 0,
    status: team?.status || 'Active',
    description: team?.description || ''
  });

  if (!team) {
    return <div>Team not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated team:', formData);
    alert('Team updated successfully!');
    router.push('/teams');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Team</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Team Information</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Team Name</label>
              <input
                type="text"
                placeholder="Enter team name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Leader</label>
              <input
                type="text"
                placeholder="Enter leader name"
                value={formData.leader}
                onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Leader Role</label>
              <input
                type="text"
                placeholder="e.g. Team Lead"
                value={formData.leaderRole}
                onChange={(e) => setFormData({ ...formData, leaderRole: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label>Projects</label>
              <input
                type="number"
                value={formData.projects}
                onChange={(e) => setFormData({ ...formData, projects: parseInt(e.target.value || '0') })}
              />
            </div>
            <div className={styles.field}>
              <label>Progress (%)</label>
              <input
                type="number"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value || '0') })}
                min={0}
                max={100}
              />
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Description</h3>
          <div className={styles.field}>
            <textarea
              rows={4}
              placeholder="Team description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" type="submit" size="md">
            Update Team
          </Button>
          <Button variant="outline" type="button" size="md" onClick={() => router.push('/teams')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
