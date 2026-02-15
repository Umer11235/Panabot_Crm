"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { projectsData } from '@/utils/data/projects.data';
import styles from './edit.module.css';
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import FileUpload from '@/components/FileUpload/FileUpload';
import Button from '@/components/(Inputs)/Button/Button';
import ClientSelector from '@/components/(Forms)/ProjectForm/ClientSelector';
import TeamSelector from '@/components/(Forms)/ProjectForm/TeamSelector';
import ManagerSelector from '@/components/(Forms)/ProjectForm/ManagerSelector';
import MilestoneManager from '@/components/(Forms)/ProjectForm/MilestoneManager';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id as string);
  const project = projectsData.find(p => p.id === decodedId);

  const [formData, setFormData] = useState({
    projectName: project?.name || '',
    projectId: project?.id || '',
    startDate: project?.start || '',
    endDate: project?.end || '',
    description: '',
    budget: project?.budget || '',
    priority: '',
    category: '',
    manager: project?.manager || '',
    client: '',
    team: '',
    tags: ''
  });
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>({ teams: [], additionalMembers: [] });
  const [selectedManager, setSelectedManager] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [priorityOpen, setPriorityOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.priorityDropdown}`)) {
        setPriorityOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form:", formData, "Image:", previewImage, "Files:", attachedFiles);
    alert('Project updated successfully!');
    router.push('/projectlist');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Edit Project</h2>
        <form onSubmit={handleSubmit} className={styles.formLayout}>
          <div className={styles.leftSection}>
            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Project Name</label>
                <input name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Write Project Name" />
              </div>
              <div className={styles.fieldGroup}>
                <label>Project ID</label>
                <input name="projectId" value={formData.projectId} onChange={handleChange} placeholder="Write Project ID" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
              </div>
              <div className={styles.fieldGroup}>
                <label>End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.fullRow}>
              <label>Description</label>
              <RichTextEditor
                value={formData.description}
                onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Budget</label>
                <input name="budget" value={formData.budget} onChange={handleChange} placeholder="Enter Budget" />
              </div>
              <div className={styles.fieldGroup}>
                <label>Priority Status</label>
                <div className={styles.priorityDropdown}>
                  <button
                    type="button"
                    className={styles.dropdownBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriorityOpen(!priorityOpen);
                    }}
                  >
                    {formData.priority ? formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1) : 'Select'}
                  </button>
                  <div className={`${styles.dropdownMenu} ${priorityOpen ? styles.show : ''}`}>
                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, priority: 'high' })); setPriorityOpen(false); }}>High</button>
                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, priority: 'medium' })); setPriorityOpen(false); }}>Medium</button>
                    <button type="button" onClick={() => { setFormData(prev => ({ ...prev, priority: 'low' })); setPriorityOpen(false); }}>Low</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <label>Assign Client</label>
                <div className={styles.selectBox} onClick={() => setShowClientModal(true)}>
                  {selectedClient ? selectedClient.name : 'Click to select client'}
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label>Project Manager</label>
                <div className={styles.selectBox} onClick={() => setShowManagerModal(true)}>
                  {selectedManager ? selectedManager.name : 'Click to select manager'}
                </div>
              </div>
            </div>

            <div className={styles.fullRow}>
              <label>Assign Team & Members</label>
              <div className={styles.selectBox} onClick={() => setShowTeamModal(true)}>
                {selectedTeam?.teams?.length > 0 || selectedTeam?.additionalMembers?.length > 0
                  ? `${(selectedTeam.teams?.reduce((sum: number, t: any) => sum + t.memberCount, 0) || 0) + (selectedTeam.additionalMembers?.length || 0)} members selected`
                  : 'Click to select team & members'}
              </div>
            </div>

            <div className={styles.fullRow}>
              <MilestoneManager milestones={milestones} onChange={setMilestones} />
            </div>

            <div className={styles.actions}>
              <Button variant="outline" type='submit' size='md'>
                Update Project
              </Button>
              <Button variant="outline" type='button' size='md' onClick={() => router.push('/projectlist')}>
                Cancel
              </Button>
            </div>
          </div>

          <div className={styles.rightSection}>
            <FileUpload
              name='photo'
              label="Project Preview Image"
              multiple={false}
              accept="image/*"
              files={previewImage ? [previewImage] : []}
              setFiles={(files) => setPreviewImage(files[0])}
            />
            <FileUpload
              name='file'
              label="Attached Files"
              multiple={true}
              files={attachedFiles}
              setFiles={setAttachedFiles}
            />
          </div>
        </form>

        <ClientSelector
          isOpen={showClientModal}
          onClose={() => setShowClientModal(false)}
          onSelect={setSelectedClient}
          selected={selectedClient}
        />

        <TeamSelector
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          onSelect={setSelectedTeam}
          selected={selectedTeam}
        />

        <ManagerSelector
          isOpen={showManagerModal}
          onClose={() => setShowManagerModal(false)}
          onSelect={setSelectedManager}
          selected={selectedManager}
        />
      </div>
    </div>
  );
}
