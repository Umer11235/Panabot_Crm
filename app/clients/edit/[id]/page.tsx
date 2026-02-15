"use client";

import { useParams, useRouter } from 'next/navigation';
import { clientsData } from '@/utils/data/clients.data';
import ClientForm from '@/components/(Forms)/ClientForm/ClientForm';
import styles from './edit.module.css';

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const client = clientsData.find(c => c.id === decodedId);

  if (!client) {
    return (
      <div className={styles.container}>
        <p>Client not found</p>
      </div>
    );
  }

  const handleSubmit = (data: any) => {
    console.log('Updating client:', data);
    alert('Client updated successfully!');
    router.push('/clients');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Client - {client.name}</h1>
      </div>
      <ClientForm initialData={client} onSubmit={handleSubmit} onCancel={() => router.push('/clients')} />
    </div>
  );
}
