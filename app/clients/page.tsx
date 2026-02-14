"use client";

import CompanyCard from "@/components/(Cards)/CompanyCard/CompanyCard";
import { clientsData } from '@/utils/data/clients.data';
import Img1 from '../../public/images/clients.png';

export default function ClientsPage() {
  return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>Clients</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {clientsData.map((client) => (
          <CompanyCard
            key={client.id}
            name={client.name}
            email={client.email}
            contactPerson={client.contactPerson}
            contactPhone={client.contactPhone}
            totalProjects={client.totalProjects}
            logoSrc={Img1}
            secondaryAction={{
              label: 'View Details',
              onClick: () => (window.location.href = `/clients/view/${encodeURIComponent(client.id)}`)
            }}
          />
        ))}
      </div>
    </div>
  );
}