"use client";

import { useRouter } from 'next/navigation';
import ClientForm from '@/components/(Forms)/ClientForm/ClientForm';
import styles from './new.module.css';

export default function NewClientPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Creating client:', data);
    alert('Client created successfully!');
    router.push('/clients');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New Client</h1>
      </div>
      <ClientForm onSubmit={handleSubmit} onCancel={() => router.push('/clients')} />
    </div>
  );
}
