"use client";

import { useState } from 'react';
import styles from './Selector.module.css';
import Button from '@/components/(Inputs)/Button/Button';

interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  image: string;
}

const clients: Client[] = [
  { id: '1', name: 'Acme Corporation', contact: 'John Doe', email: 'john@acme.com', image: '/images/clients.png' },
  { id: '2', name: 'Tech Corp', contact: 'Jane Smith', email: 'jane@techcorp.com', image: '/images/clients.png' },
  { id: '3', name: 'Innovate Inc', contact: 'Bob Wilson', email: 'bob@innovate.com', image: '/images/clients.png' },
];

export default function ClientSelector({ isOpen, onClose, onSelect, selected }: any) {
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(selected);

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    onSelect(selectedClient);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Select Client</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.cardGrid}>
          {filtered.map(client => (
            <div
              key={client.id}
              className={`${styles.card} ${selectedClient?.id === client.id ? styles.selected : ''}`}
              onClick={() => setSelectedClient(client)}
            >
              <img src={client.image} alt={client.name} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3>{client.name}</h3>
                <p>{client.contact}</p>
                <p className={styles.email}>{client.email}</p>
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
