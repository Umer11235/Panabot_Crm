"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/(Inputs)/Button/Button';
import MemberSelector from '@/components/MemberSelector/MemberSelector';
import LeaderSelector from '@/components/LeaderSelector/LeaderSelector';
import styles from './new.module.css';

export default function NewTeamPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    leader: '',
    leaderRole: '',
    projects: 0,
    progress: 0,
    status: 'Active',
    description: ''
  });
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<any>([]);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.statusDropdown}`) && !target.closest(`.${styles.filterDropdown}`)) {
        setStatusOpen(false);
        setFilterOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating team:', formData, 'Members:', selectedMembers);
    alert('Team created successfully!');
    router.push('/teams');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Team</h1>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.filterDropdown}>
          <button
            className={styles.filterBtn}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterStatus === 'all' ? 'All Status' : filterStatus}
          </button>
          <div className={`${styles.filterMenu} ${filterOpen ? styles.show : ''}`}>
            <button className={filterStatus === 'all' ? styles.active : ''} onClick={() => { setFilterStatus('all'); setFilterOpen(false); }}>All Status</button>
            <button className={filterStatus === 'Active' ? styles.active : ''} onClick={() => { setFilterStatus('Active'); setFilterOpen(false); }}>Active</button>
            <button className={filterStatus === 'Inactive' ? styles.active : ''} onClick={() => { setFilterStatus('Inactive'); setFilterOpen(false); }}>Inactive</button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Team Name *</label>
              <input
                type="text"
                placeholder="Enter team name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Leader *</label>
              <div className={styles.selectBox} onClick={() => setShowLeaderModal(true)}>
                {selectedLeader ? selectedLeader.name : 'Click to select leader'}
              </div>
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
              <label>Status</label>
              <div className={styles.statusDropdown}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setStatusOpen(!statusOpen)}
                >
                  {formData.status || 'Select'}
                </button>
                <div className={`${styles.dropdownMenu} ${statusOpen ? styles.show : ''}`}>
                  <button type="button" onClick={() => { setFormData({ ...formData, status: 'Active' }); setStatusOpen(false); }}>Active</button>
                  <button type="button" onClick={() => { setFormData({ ...formData, status: 'Inactive' }); setStatusOpen(false); }}>Inactive</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Team Members</h3>
          <div className={styles.field}>
            <label>Assign Team Members</label>
            <div className={styles.selectBox} onClick={() => setShowMemberModal(true)}>
              {selectedMembers?.length > 0
                ? `${selectedMembers.length} members selected`
                : 'Click to select team members'}
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
          <Button variant="outline" type="submit" size="md">
            Create Team
          </Button>
          <Button variant="outline" type="button" size="md" onClick={() => router.push('/teams')}>
            Cancel
          </Button>
        </div>
      </form>

      <MemberSelector
        isOpen={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        onSelect={setSelectedMembers}
        selected={selectedMembers}
      />

      <LeaderSelector
        isOpen={showLeaderModal}
        onClose={() => setShowLeaderModal(false)}
        onSelect={(leader: any) => {
          setSelectedLeader(leader);
          setFormData({ ...formData, leader: leader.name, leaderRole: leader.role });
        }}
        selected={selectedLeader}
      />
    </div>
  );
}
