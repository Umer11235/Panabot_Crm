"use client";

import { useState } from 'react';
import styles from './LeaderSelector.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface Leader {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  image: string;
}

const leaders: Leader[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Lead Developer', department: 'Development', email: 'sarah@company.com', image: '/images/users.jpg' },
  { id: '2', name: 'Michael Chen', role: 'Backend Developer', department: 'Development', email: 'michael@company.com', image: '/images/users.jpg' },
  { id: '3', name: 'Lisa Anderson', role: 'Frontend Developer', department: 'Development', email: 'lisa@company.com', image: '/images/users.jpg' },
  { id: '4', name: 'Emily Davis', role: 'UI/UX Designer', department: 'Design', email: 'emily@company.com', image: '/images/users.jpg' },
  { id: '5', name: 'James Wilson', role: 'QA Engineer', department: 'Quality Assurance', email: 'james@company.com', image: '/images/users.jpg' },
];

export default function LeaderSelector({ isOpen, onClose, onSelect, selected }: any) {
  const [search, setSearch] = useState('');
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(selected || null);

  const filteredLeaders = leaders.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.role.toLowerCase().includes(search.toLowerCase()) ||
    l.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (leader: Leader) => {
    setSelectedLeader(leader);
  };

  const handleConfirm = () => {
    onSelect(selectedLeader);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Select Team Leader</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <input
          type="text"
          placeholder="Search leader..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        {selectedLeader && (
          <div className={styles.selectedSection}>
            <h3>Selected Leader</h3>
            <div className={styles.selectedCard}>
              <img src={selectedLeader.image} alt={selectedLeader.name} />
              <div>
                <h4>{selectedLeader.name}</h4>
                <p>{selectedLeader.role}</p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.leaderList}>
          {['Development', 'Design', 'Quality Assurance'].map(dept => (
            <div key={dept} className={styles.department}>
              <h3 className={styles.deptTitle}>{dept}</h3>
              <div className={styles.cardGrid}>
                {filteredLeaders.filter(l => l.department === dept).map(leader => (
                  <div
                    key={leader.id}
                    className={`${styles.card} ${selectedLeader?.id === leader.id ? styles.selected : ''}`}
                    onClick={() => handleSelect(leader)}
                  >
                    <img src={leader.image} alt={leader.name} className={styles.cardImage} />
                    <div className={styles.cardContent}>
                      <h3>{leader.name}</h3>
                      <p>{leader.role}</p>
                      <p className={styles.email}>{leader.email}</p>
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
          <Button variant="primary" size="lg" onClick={handleConfirm} disabled={!selectedLeader}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
