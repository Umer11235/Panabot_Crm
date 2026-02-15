"use client";

import { useState } from 'react';
import styles from './MemberSelector.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Lead Developer', department: 'Development', email: 'sarah@company.com', image: '/images/users.jpg' },
  { id: '2', name: 'Michael Chen', role: 'Backend Developer', department: 'Development', email: 'michael@company.com', image: '/images/users.jpg' },
  { id: '3', name: 'Lisa Anderson', role: 'Frontend Developer', department: 'Development', email: 'lisa@company.com', image: '/images/users.jpg' },
  { id: '4', name: 'Emily Davis', role: 'UI/UX Designer', department: 'Design', email: 'emily@company.com', image: '/images/users.jpg' },
  { id: '5', name: 'James Wilson', role: 'QA Engineer', department: 'Quality Assurance', email: 'james@company.com', image: '/images/users.jpg' },
];

export default function MemberSelector({ isOpen, onClose, onSelect, selected }: any) {
  const [search, setSearch] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>(selected || []);

  const filteredMembers = teamMembers.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.department.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMember = (member: TeamMember) => {
    if (selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleConfirm = () => {
    onSelect(selectedMembers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Select Team Members</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        {selectedMembers.length > 0 && (
          <div className={styles.selectedSection}>
            <h3>Selected ({selectedMembers.length})</h3>
            <div className={styles.selectedChips}>
              {selectedMembers.map(member => (
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
          {['Development', 'Design', 'Quality Assurance'].map(dept => (
            <div key={dept} className={styles.department}>
              <h3 className={styles.deptTitle}>{dept}</h3>
              <div className={styles.cardGrid}>
                {filteredMembers.filter(m => m.department === dept).map(member => (
                  <div
                    key={member.id}
                    className={`${styles.card} ${selectedMembers.find(m => m.id === member.id) ? styles.selected : ''}`}
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
        </div>

        <div className={styles.actions}>
          <Button variant="outline" size="lg" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="lg" onClick={handleConfirm}>
            Confirm ({selectedMembers.length} selected)
          </Button>
        </div>
      </div>
    </div>
  );
}
