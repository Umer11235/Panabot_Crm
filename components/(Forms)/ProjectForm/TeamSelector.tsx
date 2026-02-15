"use client";

import { useState } from 'react';
import styles from './Selector.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface Team {
  id: string;
  name: string;
  department: string;
  memberCount: number;
  members: string[];
  workload: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  image: string;
}

const teams: Team[] = [
  { id: '1', name: 'Development Team A', department: 'Development', memberCount: 5, members: ['Sarah Johnson', 'Michael Chen', 'Lisa Anderson'], workload: 85 },
  { id: '2', name: 'Design Team', department: 'Design', memberCount: 3, members: ['Emily Davis', 'John Smith'], workload: 45 },
  { id: '3', name: 'QA Team', department: 'Quality Assurance', memberCount: 2, members: ['James Wilson'], workload: 60 },
];

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Lead Developer', department: 'Development', email: 'sarah@company.com', image: '/images/users.jpg' },
  { id: '2', name: 'Michael Chen', role: 'Backend Developer', department: 'Development', email: 'michael@company.com', image: '/images/users.jpg' },
  { id: '3', name: 'Lisa Anderson', role: 'Frontend Developer', department: 'Development', email: 'lisa@company.com', image: '/images/users.jpg' },
  { id: '4', name: 'Emily Davis', role: 'UI/UX Designer', department: 'Design', email: 'emily@company.com', image: '/images/users.jpg' },
  { id: '5', name: 'James Wilson', role: 'QA Engineer', department: 'Quality Assurance', email: 'james@company.com', image: '/images/users.jpg' },
];

export default function TeamSelector({ isOpen, onClose, onSelect, selected }: any) {
  const [search, setSearch] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<Team[]>(selected?.teams || []);
  const [additionalMembers, setAdditionalMembers] = useState<TeamMember[]>(selected?.additionalMembers || []);
  const [showAdditional, setShowAdditional] = useState(false);

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMembers = teamMembers.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTeam = (team: Team) => {
    if (selectedTeams.find(t => t.id === team.id)) {
      setSelectedTeams(selectedTeams.filter(t => t.id !== team.id));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const toggleMember = (member: TeamMember) => {
    if (additionalMembers.find(m => m.id === member.id)) {
      setAdditionalMembers(additionalMembers.filter(m => m.id !== member.id));
    } else {
      setAdditionalMembers([...additionalMembers, member]);
    }
  };

  const handleConfirm = () => {
    onSelect({ teams: selectedTeams, additionalMembers });
    onClose();
  };

  const totalCount = selectedTeams.reduce((sum, t) => sum + t.memberCount, 0) + additionalMembers.length;

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Select Teams & Members</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <input
          type="text"
          placeholder="Search teams or members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.tabButtons}>
          <button 
            className={`${styles.tabBtn} ${!showAdditional ? styles.activeTab : ''}`}
            onClick={() => setShowAdditional(false)}
          >
            Teams ({selectedTeams.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${showAdditional ? styles.activeTab : ''}`}
            onClick={() => setShowAdditional(true)}
          >
            Additional Members ({additionalMembers.length})
          </button>
        </div>

        {(selectedTeams.length > 0 || additionalMembers.length > 0) && (
          <div className={styles.selectedSection}>
            <h3>Selected ({totalCount} total)</h3>
            <div className={styles.selectedChips}>
              {selectedTeams.map(team => (
                <div key={team.id} className={styles.chip}>
                  <span>{team.name} ({team.memberCount})</span>
                  <button onClick={(e) => { e.stopPropagation(); toggleTeam(team); }}>×</button>
                </div>
              ))}
              {additionalMembers.map(member => (
                <div key={member.id} className={styles.chip}>
                  <img src={member.image} alt={member.name} />
                  <span>{member.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); toggleMember(member); }}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.departmentList}>
          {!showAdditional ? (
            <div className={styles.cardGrid}>
              {filteredTeams.map(team => (
                <div
                  key={team.id}
                  className={`${styles.teamCard} ${selectedTeams.find(t => t.id === team.id) ? styles.selected : ''}`}
                  onClick={() => toggleTeam(team)}
                >
                  <h3>{team.name}</h3>
                  <p className={styles.department}>{team.department}</p>
                  <p className={styles.memberCount}>{team.memberCount} members</p>
                  <div className={styles.workloadBar}>
                    <div 
                      className={styles.workloadFill} 
                      style={{ 
                        width: `${team.workload}%`,
                        backgroundColor: team.workload > 80 ? '#ef4444' : team.workload > 60 ? '#f59e0b' : '#22c55e'
                      }}
                    ></div>
                  </div>
                  <p className={styles.workloadText}>{team.workload}% workload</p>
                  <div className={styles.teamMembers}>
                    {teamMembers.filter(m => team.members.includes(m.name)).map(member => (
                      <img key={member.id} src={member.image} alt={member.name} className={styles.teamMemberAvatar} title={member.name} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {['Development', 'Design', 'Quality Assurance'].map(dept => (
                <div key={dept} className={styles.department}>
                  <h3 className={styles.deptTitle}>{dept}</h3>
                  <div className={styles.cardGrid}>
                    {filteredMembers.filter(m => m.department === dept).map(member => (
                      <div
                        key={member.id}
                        className={`${styles.card} ${additionalMembers.find(m => m.id === member.id) ? styles.selected : ''}`}
                        onClick={() => toggleMember(member)}
                      >
                        <img src={member.image} alt={member.name} className={styles.cardImage} />
                        <div className={styles.cardContent}>
                          <h3>{member.name}</h3>
                          <p>{member.role}</p>
                          <p className={styles.email}>{member.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={styles.actions}>
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleConfirm}>
            Confirm ({totalCount} total)
          </Button>
        </div>
      </div>
    </div>
  );
}
