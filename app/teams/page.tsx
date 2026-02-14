"use client";

import { useState } from 'react';
import ProjectCard from "@/components/(Cards)/ProjectCard/ProjectCard";
import Dropdown from '@/components/Kanban/Dropdown';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import userimg from '../../public/images/users.jpg';
import { teamsData } from '@/utils/data/teams.data';

export default function TeamsPage() {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null as any });

  const handleDelete = (team: any) => {
    setDeleteModal({ isOpen: true, item: team });
  };

  const confirmDelete = () => {
    alert(`Team ${deleteModal.item?.name} deleted successfully!`);
    setDeleteModal({ isOpen: false, item: null });
  };

 return (
    <div>
      <h1 style={{
        font: 'var(--md-sys-typescale-headline-medium)',
        color: 'var(--md-sys-color-on-surface)',
        marginBottom: '24px'
      }}>Teams</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {teamsData.map((team) => (
          <ProjectCard
            key={team.id}
            leaderName={team.leader}
            leaderRole={team.leaderRole || 'Team Leader'}
            leaderAvatarSrc={userimg}
            title={team.name}
            members={team.members}
            progress={team.progress}
            progressLabel={`Projects: ${team.projects}`}
            menu={(
              <Dropdown
                trigger={<span aria-hidden>•••</span>}
                items={[
                  { label: 'View', onClick: () => (window.location.href = `/teams/view/${encodeURIComponent(team.id)}`) },
                  { label: 'Edit', onClick: () => (window.location.href = `/teams/edit/${encodeURIComponent(team.id)}`) },
                  { type: 'separator' },
                  { label: 'Delete', onClick: () => handleDelete(team), danger: true }
                ]}
                align="right"
              />
            )}
            ctaLabel="View Details"
            onCtaClick={() => (window.location.href = `/teams/view/${encodeURIComponent(team.id)}`)}
          />
        ))}
      </div>

n      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={confirmDelete}
        title="Delete Team"
        message="Are you sure you want to delete"
        itemName={deleteModal.item?.name}
      />
    </div>
  );
}