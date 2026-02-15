"use client";

import { useState } from 'react';
import styles from './Selector.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface Manager {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  image: string;
}

const managers: Manager[] = [
  { id: '1', name: 'John Doe', role: 'Senior Project Manager', department: 'Management', email: 'john@company.com', image: '/images/users.jpg' },
  { id: '2', name: 'Jane Smith', role: 'Project Manager', department: 'Management', email: 'jane@company.com', image: '/images/users.jpg' },
  { id: '3', name: 'Mike Johnson', role: 'Technical Lead', department: 'Development', email: 'mike@company.com', image: '/images/users.jpg' },
  { id: '4', name: 'Sarah Williams', role: 'Product Manager', department: 'Product', email: 'sarah.w@company.com', image: '/images/users.jpg' },
];

export default function ManagerSelector({ isOpen, onClose, onSelect, selected }: any) {
  const [search, setSearch] = useState('');
  const [selectedManager, setSelectedManager] = useState<Manager | null>(selected);

  const filtered = managers.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc, manager) => {
    if (!acc[manager.department]) acc[manager.department] = [];
    acc[manager.department].push(manager);
    return acc;
  }, {} as Record<string, Manager[]>);

  const handleConfirm = () => {
    onSelect(selectedManager);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Select Project Manager</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <input
          type="text"
          placeholder="Search managers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.departmentList}>
          {Object.entries(grouped).map(([dept, managers]) => (
            <div key={dept} className={styles.department}>
              <h3 className={styles.deptTitle}>{dept}</h3>
              <div className={styles.cardGrid}>
                {managers.map(manager => (
                  <div
                    key={manager.id}
                    className={`${styles.card} ${selectedManager?.id === manager.id ? styles.selected : ''}`}
                    onClick={() => setSelectedManager(manager)}
                  >
                    <img src={manager.image} alt={manager.name} className={styles.cardImage} />
                    <div className={styles.cardContent}>
                      <h3>{manager.name}</h3>
                      <p>{manager.role}</p>
                      <p className={styles.email}>{manager.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
